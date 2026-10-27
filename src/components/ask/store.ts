"use client";

import { useSyncExternalStore } from "react";

export type Source = { id: string; title: string; path: string };
export type Msg =
  | { role: "user"; text: string }
  | { role: "agent"; text: string; sources: Source[] }
  | { role: "error"; kind: "limit" | "error" };

type State = {
  msgs: Msg[];
  loading: boolean;
  open: boolean;
  /** true while the inline hero version is on screen, so the dock pill stays hidden */
  inlineVisible: boolean;
};

let state: State = { msgs: [], loading: false, open: false, inlineVisible: false };
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  emit();
};

const SERVER: State = { msgs: [], loading: false, open: false, inlineVisible: true };

export function useAsk() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => state,
    () => SERVER,
  );
}

export const setOpen = (open: boolean) => set({ open });
export const setInlineVisible = (inlineVisible: boolean) => set({ inlineVisible });
export const resetChat = () => set({ msgs: [] });

/** Last two exchanges, sent so follow-up questions ("and on AWS?") have context. */
function history() {
  const out: { role: "user" | "assistant"; text: string }[] = [];
  for (const m of state.msgs) {
    if (m.role === "user") out.push({ role: "user", text: m.text });
    else if (m.role === "agent") out.push({ role: "assistant", text: m.text });
  }
  // keep complete user→assistant pairs only
  const pairs: typeof out = [];
  for (let i = 0; i + 1 < out.length; i++) {
    if (out[i].role === "user" && out[i + 1].role === "assistant") pairs.push(out[i], out[i + 1]);
  }
  return pairs.slice(-4);
}

export async function ask(question: string, lang: "en" | "es") {
  const value = question.trim().slice(0, 300);
  if (value.length < 3 || state.loading) return;
  const prior = history();
  set({ msgs: [...state.msgs, { role: "user", text: value }], loading: true });
  let next: Msg;
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question: value, lang, history: prior }),
    });
    if (res.status === 429) next = { role: "error", kind: "limit" };
    else if (!res.ok) next = { role: "error", kind: "error" };
    else {
      const data = (await res.json()) as { answer?: string; sources?: Source[] };
      next = data.answer ? { role: "agent", text: data.answer, sources: data.sources ?? [] } : { role: "error", kind: "error" };
    }
  } catch {
    next = { role: "error", kind: "error" };
  }
  set({ msgs: [...state.msgs, next], loading: false });
}
