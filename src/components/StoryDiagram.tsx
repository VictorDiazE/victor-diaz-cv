"use client";

import { useEffect, useRef, useState } from "react";
import type { DiagramNode } from "@/lib/projects";

type StepView = { title: string; body: string; highlight: string[] };

export function Story({ nodes, edges, steps, label }: { nodes: DiagramNode[]; edges: [string, string][]; steps: StepView[]; label: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const lit = new Set(steps[active]?.highlight ?? []);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const W = 104;
  const maxX = Math.max(...nodes.map((n) => n.x)) + W / 2 + 20;
  const maxY = Math.max(...nodes.map((n) => n.y)) + 50;

  return (
    <div className="story">
      <div className="story-diagram">
        <div className="canvas">
          <svg viewBox={`0 0 ${maxX} ${maxY}`} role="img" aria-label={label}>
            {edges.map(([a, b]) => {
              const A = byId[a];
              const B = byId[b];
              const x1 = A.x + W / 2;
              const x2 = B.x - W / 2;
              const mx = (x1 + x2) / 2;
              const d = A.y === B.y ? `M${x1} ${A.y} H${x2}` : `M${x1} ${A.y} C${mx} ${A.y} ${mx} ${B.y} ${x2} ${B.y}`;
              return <path key={`${a}-${b}`} className={`sd-edge${lit.has(a) && lit.has(b) ? " on" : ""}`} d={d} />;
            })}
            {nodes.map((n) => (
              <g key={n.id} className={`sd-node${lit.has(n.id) ? " on" : ""}`} transform={`translate(${n.x - W / 2} ${n.y - 20})`}>
                <rect width={W} height={40} rx={10} />
                <text x={W / 2} y={25} textAnchor="middle">
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div className="story-steps">
        {steps.map((s, i) => (
          <section
            key={s.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`story-step${i === active ? " on" : ""}`}
          >
            <h2 className="semi">{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
