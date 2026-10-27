"use client";

import { useRef } from "react";

type Props = {
  label: string;
  title: string;
  points: string[];
  lookingFor: string;
  download: string;
  email: string;
  close: string;
  cvHref: string;
  mail: string;
};

export function TldrDialog(p: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => ref.current?.showModal()}>
        {p.label}
      </button>
      <dialog ref={ref} className="tldr" aria-labelledby="tldr-title" onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="tldr-inner">
          <h2 id="tldr-title" className="semi">
            {p.title}
          </h2>
          <ul>
            {p.points.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p style={{ color: "var(--ink)" }}>{p.lookingFor}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a className="btn btn-primary" href={p.cvHref} download>
              {p.download}
            </a>
            <a className="btn btn-ghost mono" href={`mailto:${p.mail}`}>
              {p.mail}
            </a>
            <button type="button" className="btn btn-ghost" style={{ marginLeft: "auto" }} onClick={() => ref.current?.close()}>
              {p.close}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
