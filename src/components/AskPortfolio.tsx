"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkle } from "./icons";
import { ask, resetChat, setInlineVisible, setOpen, useAsk, type Msg } from "./ask/store";

export type AskText = {
  title: string;
  hint: string;
  placeholder: string;
  send: string;
  thinking: string;
  suggestions: string[];
  sources: string;
  error: string;
  limit: string;
  dock: string;
  open: string;
  close: string;
  reset: string;
  welcome: string;
  you: string;
  agent: string;
  disclaimer: string;
};
type Lang = "en" | "es";

const localize = (lang: Lang, path: string) => (lang === "es" ? (path.startsWith("/#") ? `/es${path.slice(1)}` : `/es${path}`) : path);

/* ------------------------------------------------------------------ */
/* Inline hero card: the expanded launcher. Asking opens the chat.     */
/* ------------------------------------------------------------------ */
export function AskPortfolio({ text, lang }: { text: AskText; lang: Lang; email: string }) {
  const ref = useRef<HTMLElement>(null);
  const [q, setQ] = useState("");
  const { loading } = useAsk();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setInlineVisible(true);
    const io = new IntersectionObserver(([e]) => setInlineVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => {
      io.disconnect();
      setInlineVisible(false);
    };
  }, []);

  const go = (value: string) => {
    if (value.trim().length < 3) return;
    setOpen(true);
    ask(value, lang);
    setQ("");
  };

  return (
    <section ref={ref} id="ask" aria-labelledby="ask-h" className="ask ai-border" style={{ marginTop: 40, maxWidth: 760 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10 }}>
        <h2 id="ask-h" className="semi" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 800 }}>
          <Sparkle size={16} />
          {text.title}
        </h2>
        <span className="muted" style={{ fontSize: 13 }}>
          {text.hint}
        </span>
      </div>
      <form
        className="ask-row"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <label htmlFor="ask-input" className="sr-only">
          {text.title}
        </label>
        <input id="ask-input" value={q} maxLength={300} onChange={(e) => setQ(e.target.value)} placeholder={text.placeholder} autoComplete="off" />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? text.thinking : text.send}
        </button>
      </form>
      <div className="ask-sugg">
        {text.suggestions.map((s) => (
          <button key={s} type="button" className="chip" onClick={() => go(s)} disabled={loading}>
            {s}
          </button>
        ))}
      </div>
    </section>
  );
}

/** Any element that should open the chat (e.g. "Try it" in the AI section). */
export function AskTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Dock: collapsed pill at the bottom + chat panel (Sidekick-style).   */
/* ------------------------------------------------------------------ */
export function AskDock({ text, lang, email }: { text: AskText; lang: Lang; email: string }) {
  const { msgs, loading, open, inlineVisible } = useAsk();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const showPill = !open && !inlineVisible;

  // keyboard: "/" or Cmd/Ctrl+K opens, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // focus management
  useEffect(() => {
    if (open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    } else if (returnTo.current && document.activeElement && list.current?.closest(".ask-panel")?.contains(document.activeElement)) {
      returnTo.current.focus({ preventScroll: true });
    }
  }, [open]);

  // keep the newest message in view
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs.length, loading, open]);

  const send = (value: string) => {
    if (value.trim().length < 3) return;
    ask(value, lang);
    setQ("");
  };

  return (
    <>
      <button type="button" className={`ask-pill ai-border${showPill ? " show" : ""}`} onClick={() => setOpen(true)} aria-label={text.open} tabIndex={showPill ? 0 : -1} aria-hidden={!showPill}>
        <Sparkle size={16} />
        <span className="ask-pill-text">{text.dock}</span>
        <kbd className="mono">/</kbd>
      </button>

      <div className={`ask-panel${open ? " open" : ""}`} role="dialog" aria-modal="false" aria-labelledby="ask-panel-h" inert={!open}>
        <header className="ask-panel-head">
          <span className="ask-avatar ai-border" aria-hidden="true">
            <Sparkle size={14} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 id="ask-panel-h" className="semi">
              {text.title}
            </h2>
            <p className="mono muted">claude · CV + case studies</p>
          </div>
          {msgs.length > 0 && (
            <button type="button" className="icon-btn mono" onClick={resetChat}>
              {text.reset}
            </button>
          )}
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={text.close}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div ref={list} className="ask-thread" aria-live="polite">
          <Bubble role="agent" label={text.agent}>
            {text.welcome}
          </Bubble>
          {msgs.length === 0 && (
            <div className="ask-sugg" style={{ paddingLeft: 36 }}>
              {text.suggestions.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => send(s)} disabled={loading}>
                  {s}
                </button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => (
            <Message key={i} m={m} text={text} lang={lang} email={email} />
          ))}
          {loading && (
            <Bubble role="agent" label={text.agent}>
              <span className="typing" aria-label={text.thinking}>
                <i />
                <i />
                <i />
              </span>
            </Bubble>
          )}
        </div>

        <form
          className="ask-compose"
          onSubmit={(e) => {
            e.preventDefault();
            send(q);
          }}
        >
          <label htmlFor="ask-panel-input" className="sr-only">
            {text.title}
          </label>
          <input ref={input} id="ask-panel-input" value={q} maxLength={300} onChange={(e) => setQ(e.target.value)} placeholder={text.dock} autoComplete="off" />
          <button type="submit" className="send" disabled={loading || q.trim().length < 3} aria-label={text.send}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
        <p className="ask-disclaimer">{text.disclaimer}</p>
      </div>
    </>
  );
}

function Bubble({ role, label, children }: { role: "user" | "agent"; label: string; children: React.ReactNode }) {
  return (
    <div className={`msg ${role}`}>
      {role === "agent" && (
        <span className="msg-avatar" aria-hidden="true">
          <Sparkle size={12} />
        </span>
      )}
      <div className="msg-body">
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </div>
  );
}

function Message({ m, text, lang, email }: { m: Msg; text: AskText; lang: Lang; email: string }) {
  if (m.role === "user")
    return (
      <Bubble role="user" label={text.you}>
        {m.text}
      </Bubble>
    );
  if (m.role === "error")
    return (
      <Bubble role="agent" label={text.agent}>
        {m.kind === "limit" ? text.limit : text.error} <a href={`mailto:${email}`}>{email}</a>
      </Bubble>
    );
  return (
    <Bubble role="agent" label={text.agent}>
      <p>{m.text}</p>
      {m.sources.length > 0 && (
        <div className="msg-sources mono">
          <span className="muted">{text.sources}</span>
          {m.sources.map((s) => (
            <a key={s.id} href={localize(lang, s.path)} onClick={() => setOpen(false)}>
              {s.title}
            </a>
          ))}
        </div>
      )}
    </Bubble>
  );
}
