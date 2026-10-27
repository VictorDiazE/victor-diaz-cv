import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { href, getDict } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

export function ProjectCard({ p, lang }: { p: Project; lang: Lang }) {
  const t = getDict(lang);
  const target = p.caseStudy ? href(lang, `/work/${p.slug}`) : p.link;
  const external = !p.caseStudy;
  const visual =
    p.visual.kind === "shot" ? (
      <div className="shot">
        <Image src={p.visual.src} alt={p.visual.alt[lang]} width={1600} height={900} sizes="(max-width: 960px) 100vw, 420px" />
      </div>
    ) : (
      <div className="mini" role="img" aria-label={p.visual.aria[lang]}>
        {p.visual.rows.map((row, r) => (
          <div className="mini-row" key={r}>
            {row.map((n, i) => (
              <span key={n.label} style={{ display: "contents" }}>
                {i > 0 && (
                  <span className="mini-link" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                )}
                <span className={`mini-node${n.accent ? " accent" : ""}`}>{n.label}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    );

  const body = (
    <>
      {!p.featured && visual}
      <span className="kicker">{p.kicker[lang]}</span>
      <h3 className="semi">{p.title[lang]}</h3>
      <p>{p.summary[lang]}</p>
      {p.featured && visual}
      <div className="foot">
        <div className="tags" style={{ marginTop: 0 }}>
          {p.tags.map((x) => (
            <span key={x} className="chip chip-sm">
              {x}
            </span>
          ))}
        </div>
        {target && <span className="cta">{p.caseStudy ? t.work.readCase : t.work.visit}</span>}
      </div>
    </>
  );

  const cls = `card${p.featured ? " feat" : ""}`;
  if (!target) return <div className={cls}>{body}</div>;
  if (external)
    return (
      <a className={cls} href={target} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  return (
    <Link className={cls} href={target}>
      {body}
    </Link>
  );
}
