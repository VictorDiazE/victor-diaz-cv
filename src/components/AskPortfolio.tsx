"use client";

import { useState } from "react";
import { Sparkle } from "./icons";

type Text = {
  title: string;
  hint: string;
  placeholder: string;
  send: string;
  thinking: string;
  suggestions: string[];
  sources: string;
  error: string;
  limit: string;
};
type Source = { id: string; title: string; path: string };

export function AskPortfolio({ text, lang, email }: { text: Text; lang: "en" | "es"; email: string }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<{ answer: string; sources: Source[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ask(question: string) {
    const value = question.trim();
    if (value.length < 3 || loading) return;
    setQ(value);
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: value, lang }),
      });
      if (res.status === 429) return setError(text.limit);
      if (!res.ok) return setError(text.error);
      setAnswer(await res.json());
    } catch {
      setError(text.error);
    } finally {
      setLoading(false);
    }
  }

  const localize = (path: string) => (lang === "es" ? (path.startsWith("/#") ? `/es${path.slice(1)}` : `/es${path}`) : path);

  return (
    <section id="ask" aria-labelledby="ask-h" className="ask ai-border" style={{ marginTop: 40, maxWidth: 760 }}>
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
          ask(q);
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
          <button key={s} type="button" className="chip" onClick={() => ask(s)} disabled={loading}>
            {s}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {answer && (
          <div className="ask-answer">
            <p>{answer.answer}</p>
            {answer.sources.length > 0 && (
              <div className="ask-sources mono">
                <span className="muted">{text.sources}:</span>
                {answer.sources.map((s) => (
                  <a key={s.id} href={localize(s.path)}>
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {error && (
          <p className="ask-answer">
            {error} <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
    </section>
  );
}
