"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkle } from "./icons";

type Market = "eu" | "mena";
type Stage = "in" | "queued" | "toWorker" | "processing" | "out";
type Item = { id: number; market: Market; stage: Stage; t: number; worker: number; retries: number; queuedAt: number };
type Worker = { item: number | null; downUntil: number };
type Pt = { x: number; y: number };

export type PipelineText = {
  label: string;
  legendRaw: string;
  legendEu: string;
  legendMena: string;
  burst: string;
  breakWorker: string;
  queued: string;
  processed: string;
  retries: string;
  down: string;
  agent: string;
  agentTools: string;
  idle: string[];
  onBurst: string;
  onBreak: string;
  onRecover: string;
  aria: string;
  reduced: string;
};

// Layout in viewBox units (1200 × 330)
const N = {
  feeds: { x: 90, y: 120 },
  ingest: { x: 300, y: 120 },
  sqs: { x: 530, y: 120 },
  workers: [
    { x: 790, y: 55 },
    { x: 790, y: 120 },
    { x: 790, y: 185 },
  ],
  eu: { x: 1070, y: 85 },
  mena: { x: 1070, y: 165 },
  agent: { x: 610, y: 280 },
};
const HALF = 46; // half node width

const DUR: Record<Exclude<Stage, "queued">, number> = { in: 1500, toWorker: 520, processing: 720, out: 760 };
const SPAWN_EVERY = 950;
const DOWN_FOR = 4200;

function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}
function curve(a: Pt, b: Pt): [Pt, Pt, Pt, Pt] {
  const p0 = { x: a.x + HALF, y: a.y };
  const p3 = { x: b.x - HALF, y: b.y };
  return [p0, { x: p0.x + 110, y: p0.y }, { x: p3.x - 110, y: p3.y }, p3];
}
function curvePath(a: Pt, b: Pt) {
  const [p0, p1, p2, p3] = curve(a, b);
  return `M${p0.x} ${p0.y} C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`;
}
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function position(it: Item): Pt | null {
  if (it.stage === "queued") return null;
  const t = Math.min(1, it.t);
  if (it.stage === "in") {
    const startX = N.feeds.x + HALF;
    const endX = N.sqs.x - HALF;
    return { x: startX + (endX - startX) * ease(t), y: N.feeds.y };
  }
  const w = N.workers[it.worker];
  if (it.stage === "toWorker") return cubic(...curve(N.sqs, w), ease(t));
  if (it.stage === "processing") return { x: w.x, y: w.y };
  return cubic(...curve(w, it.market === "eu" ? N.eu : N.mena), ease(t));
}

export function Pipeline({ text }: { text: PipelineText }) {
  const items = useRef<Item[]>([]);
  const workers = useRef<Worker[]>([{ item: null, downUntil: 0 }, { item: null, downUntil: 0 }, { item: null, downUntil: 0 }]);
  const stats = useRef({ processed: 0, retries: 0 });
  const nextId = useRef(1);
  const lastSpawn = useRef(0);
  const clock = useRef(0);
  const pendingBurst = useRef(0);
  const eventMsg = useRef<{ text: string; until: number } | null>(null);
  const wasDown = useRef([false, false, false]);

  const stageRef = useRef<HTMLDivElement>(null);
  const [, setFrame] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [idleIdx, setIdleIdx] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setIdleIdx((i) => (i + 1) % text.idle.length), 3200);
    return () => window.clearInterval(id);
  }, [text.idle.length]);

  const spawn = useCallback(() => {
    items.current.push({
      id: nextId.current++,
      market: Math.random() < 0.6 ? "eu" : "mena",
      stage: "in",
      t: 0,
      worker: 0,
      retries: 0,
      queuedAt: 0,
    });
  }, []);

  const step = useCallback(
    (dt: number) => {
      clock.current += dt;
      const now = clock.current;

      // spawn steady traffic plus any pending burst
      if (now - lastSpawn.current > SPAWN_EVERY) {
        lastSpawn.current = now;
        spawn();
      }
      if (pendingBurst.current > 0) {
        const n = Math.min(pendingBurst.current, 2);
        for (let i = 0; i < n; i++) spawn();
        pendingBurst.current -= n;
      }

      // worker recovery messages
      workers.current.forEach((w, i) => {
        const down = w.downUntil > now;
        if (wasDown.current[i] && !down) eventMsg.current = { text: text.onRecover.replace("{w}", `λ w${i + 1}`), until: now + 2600 };
        wasDown.current[i] = down;
      });

      const done: number[] = [];
      for (const it of items.current) {
        if (it.stage === "queued") continue;
        it.t += dt / DUR[it.stage];
        if (it.t < 1) continue;
        it.t = 0;
        if (it.stage === "in") {
          it.stage = "queued";
          it.queuedAt = now;
        } else if (it.stage === "toWorker") {
          it.stage = "processing";
        } else if (it.stage === "processing") {
          workers.current[it.worker].item = null;
          it.stage = "out";
        } else if (it.stage === "out") {
          done.push(it.id);
          stats.current.processed++;
        }
      }
      if (done.length) items.current = items.current.filter((i) => !done.includes(i.id));

      // dispatch FIFO from the queue to free, healthy workers
      const queue = items.current.filter((i) => i.stage === "queued").sort((a, b) => a.queuedAt - b.queuedAt);
      for (let w = 0; w < workers.current.length && queue.length; w++) {
        const wk = workers.current[w];
        if (wk.item !== null || wk.downUntil > now) continue;
        const it = queue.shift()!;
        it.stage = "toWorker";
        it.t = 0;
        it.worker = w;
        wk.item = it.id;
      }
    },
    [spawn, text],
  );

  // animation loop: runs only while on screen and motion is allowed
  useEffect(() => {
    if (!visible || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      step(dt);
      setFrame((f) => (f + 1) % 1e6);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced, step]);

  // with reduced motion, advance the simulation in coarse ticks so buttons still do something
  useEffect(() => {
    if (!reduced || !visible) return;
    const id = window.setInterval(() => {
      for (let i = 0; i < 10; i++) step(100);
      setFrame((f) => (f + 1) % 1e6);
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduced, visible, step]);

  const onBurst = () => {
    pendingBurst.current += 24;
    eventMsg.current = { text: text.onBurst, until: clock.current + 2800 };
    setFrame((f) => f + 1);
  };

  const onBreak = () => {
    const now = clock.current;
    const healthy = workers.current.map((w, i) => ({ w, i })).filter(({ w }) => w.downUntil <= now);
    if (!healthy.length) return;
    const busy = healthy.filter(({ w }) => w.item !== null);
    const pick = (busy.length ? busy : healthy)[Math.floor(Math.random() * (busy.length ? busy.length : healthy.length))];
    const wk = pick.w;
    if (wk.item !== null) {
      const it = items.current.find((i) => i.id === wk.item);
      if (it && (it.stage === "processing" || it.stage === "toWorker")) {
        it.stage = "queued";
        it.t = 0;
        it.queuedAt = now - 100000; // retried messages go to the front
        it.retries++;
        stats.current.retries++;
      }
      wk.item = null;
    }
    wk.downUntil = now + DOWN_FOR;
    wasDown.current[pick.i] = true;
    eventMsg.current = { text: text.onBreak.replace("{w}", `λ w${pick.i + 1}`), until: now + 3000 };
    setFrame((f) => f + 1);
  };

  const now = clock.current;
  const queued = items.current.filter((i) => i.stage === "queued").length;
  const bars = Math.min(5, Math.ceil(queued / 3));
  const ev = eventMsg.current && eventMsg.current.until > now ? eventMsg.current.text : null;

  const pct = (p: Pt) => ({ left: `${(p.x / 1200) * 100}%`, top: `${(p.y / 330) * 100}%` });

  const node = (p: Pt, label: string, sub?: string, cls = "", w = HALF * 2) => (
    <g className={`pl-node ${cls}`} transform={`translate(${p.x - w / 2} ${p.y - 22})`}>
      <rect width={w} height={44} rx={12} />
      <text x={w / 2} y={sub ? 19 : 27} textAnchor="middle">
        {label}
      </text>
      {sub && (
        <text className="sub" x={w / 2} y={34} textAnchor="middle">
          {sub}
        </text>
      )}
    </g>
  );

  return (
    <div className={`band${visible && !reduced ? "" : " paused"}`}>
      <div className="container band-head mono">
        <span>{text.label}</span>
        <span className="legend" aria-hidden="true">
          <i style={{ background: "var(--cyan)" }} />
          {text.legendRaw}
          <i style={{ background: "var(--cobalt)" }} />
          {text.legendEu}
          <i style={{ background: "var(--amber)" }} />
          {text.legendMena}
        </span>
      </div>

      <div className="band-scroll">
        <div className="band-stage" ref={stageRef} role="img" aria-label={text.aria}>
          <svg viewBox="0 0 1200 330" aria-hidden="true">
            <path className="pl-edge" d={`M${N.feeds.x + HALF} ${N.feeds.y} H${N.sqs.x - HALF}`} />
            <path className="pl-flow" d={`M${N.feeds.x + HALF} ${N.feeds.y} H${N.sqs.x - HALF}`} />
            {N.workers.map((w, i) => (
              <g key={`e${i}`}>
                <path className="pl-edge" d={curvePath(N.sqs, w)} />
                <path className="pl-flow" d={curvePath(N.sqs, w)} />
                <path className="pl-edge" d={curvePath(w, N.eu)} />
                <path className="pl-edge" d={curvePath(w, N.mena)} />
              </g>
            ))}
            <path className="pl-ai" d={`M${N.agent.x} ${N.agent.y - 26} C${N.agent.x} 220 ${N.sqs.x + 20} 200 ${N.sqs.x} ${N.sqs.y + 24}`} />
            <path className="pl-ai" d={`M${N.agent.x} ${N.agent.y - 26} C${N.agent.x} 230 ${N.workers[2].x - 40} 240 ${N.workers[2].x - 20} ${N.workers[2].y + 22}`} />

            {node(N.feeds, "feeds", "catalog data")}
            {node(N.ingest, "λ ingest", "python")}
            <g className="pl-node" transform={`translate(${N.sqs.x - 56} ${N.sqs.y - 22})`}>
              <rect width={112} height={44} rx={12} />
              <text x={40} y={19} textAnchor="middle">
                sqs
              </text>
              <text className="sub" x={40} y={34} textAnchor="middle">
                {queued} {text.queued}
              </text>
              {[0, 1, 2, 3, 4].map((b) => (
                <rect key={b} className={`pl-q${b < bars ? " on" : ""}`} x={78 + b * 6} y={30 - (b + 1) * 3.2} width={4} height={(b + 1) * 3.2 + 4} rx={1} />
              ))}
            </g>
            {N.workers.map((w, i) => {
              const wk = workers.current[i];
              const down = wk.downUntil > now;
              return <g key={`w${i}`}>{node(w, `λ w${i + 1}`, down ? text.down : undefined, down ? "down" : wk.item !== null ? "busy" : "")}</g>;
            })}
            {node(N.eu, "eu stores", undefined, "eu", 108)}
            {node(N.mena, "mena stores", undefined, "mena", 108)}

            {items.current.map((it) => {
              const p = position(it);
              if (!p) return null;
              const colored = it.stage === "out" || (it.stage === "processing" && it.t > 0.6);
              const color = colored ? (it.market === "eu" ? "#7c93ff" : "#fbbf24") : "#67e8f9";
              return (
                <rect
                  key={it.id}
                  className="pl-pk"
                  x={p.x - 5}
                  y={p.y - 5}
                  width={10}
                  height={10}
                  rx={3}
                  fill={color}
                  color={color}
                  stroke={it.retries ? "#f87171" : "none"}
                  strokeWidth={it.retries ? 2 : 0}
                />
              );
            })}
          </svg>

          <div className="ai-agent ai-border mono" style={pct(N.agent)}>
            <NeuralIcon />
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span className="name">
                <Sparkle size={14} />
                {text.agent}
              </span>
              <span className="tools">{text.agentTools}</span>
            </span>
          </div>
          <div className={`ai-bubble mono${ev ? " event" : ""}`} style={{ left: `${((N.agent.x + 120) / 1200) * 100}%`, top: `${(N.agent.y / 330) * 100}%` }} aria-live="polite">
            <Sparkle size={11} color="#67e8f9" />
            <span>{ev ?? text.idle[idleIdx]}</span>
          </div>
        </div>
      </div>

      <div className="container pl-controls">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onBurst}>
            {text.burst}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onBreak}>
            {text.breakWorker}
          </button>
        </div>
        <div className="pl-metrics mono" aria-live="off">
          <span>
            <b>{queued}</b>
            {text.queued}
          </span>
          <span>
            <b>{stats.current.processed}</b>
            {text.processed}
          </span>
          <span>
            <b>{stats.current.retries}</b>
            {text.retries}
          </span>
        </div>
        {reduced && <p className="muted" style={{ width: "100%", fontSize: 13 }}>{text.reduced}</p>}
      </div>
    </div>
  );
}

export function NeuralIcon({ size = 46 }: { size?: number }) {
  return (
    <svg className="nn" aria-hidden="true" width={size} height={(size * 34) / 46} viewBox="0 0 46 34">
      <line className="e1" x1="5" y1="8" x2="23" y2="5" />
      <line className="e1" x1="5" y1="8" x2="23" y2="17" />
      <line className="e1" x1="5" y1="26" x2="23" y2="17" />
      <line className="e1" x1="5" y1="26" x2="23" y2="29" />
      <line className="e2" x1="23" y1="5" x2="41" y2="17" />
      <line className="e2" x1="23" y1="17" x2="41" y2="17" />
      <line className="e2" x1="23" y1="29" x2="41" y2="17" />
      <circle className="l1" cx="5" cy="8" r="3" />
      <circle className="l1" cx="5" cy="26" r="3" />
      <circle className="l2" cx="23" cy="5" r="3" />
      <circle className="l2" cx="23" cy="17" r="3" />
      <circle className="l2" cx="23" cy="29" r="3" />
      <circle className="l3" cx="41" cy="17" r="3.5" />
    </svg>
  );
}
