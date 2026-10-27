import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, getDict, href, isLang, type Lang } from "@/lib/i18n";
import { caseStudies, getProject } from "@/lib/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Story } from "@/components/StoryDiagram";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => caseStudies.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!isLang(lang) || !p?.caseStudy) return {};
  return {
    title: p.title[lang],
    description: p.caseStudy.lede[lang],
    alternates: { canonical: href(lang, `/work/${slug}`), languages: { en: `/work/${slug}`, es: `/es/work/${slug}` } },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const p = getProject(slug);
  if (!isLang(raw) || !p?.caseStudy) notFound();
  const lang: Lang = raw;
  const cs = p.caseStudy;
  const t = getDict(lang);
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <Nav lang={lang} altPath={`/work/${slug}`} />
      <main>
        <article>
          <header className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
            <Link href={`${href(lang)}#work`} className="mono" style={{ fontSize: 13, textDecoration: "none" }}>
              ← {t.cs.back}
            </Link>
            <p className="mono" style={{ marginTop: 40, fontSize: 13, color: "var(--cobalt)" }}>
              {p.kicker[lang]}
            </p>
            <h1 className="cs-title wide">{p.title[lang]}</h1>
            <p className="cs-lede">{cs.lede[lang]}</p>
            <dl className="facts">
              <div>
                <dt>{t.cs.role}</dt>
                <dd>{cs.role[lang]}</dd>
              </div>
              <div>
                <dt>{t.cs.context}</dt>
                <dd>{cs.context[lang]}</dd>
              </div>
              <div>
                <dt>{t.cs.scope}</dt>
                <dd>{cs.scope[lang]}</dd>
              </div>
              <div>
                <dt>{t.cs.stack}</dt>
                <dd className="wrap" style={{ marginTop: 8 }}>
                  {p.tags.map((x) => (
                    <span key={x} className="chip chip-sm">
                      {x}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </header>

          <div className="container" style={{ paddingBottom: 48 }}>
            <Story
              nodes={cs.nodes}
              edges={cs.edges}
              label={p.visual.kind === "flow" ? p.visual.aria[lang] : p.title[lang]}
              steps={cs.steps.map((s) => ({ title: s.title[lang], body: s.body[lang], highlight: s.highlight }))}
            />
          </div>

          {next && next.slug !== slug && (
            <div className="container" style={{ paddingBottom: 96 }}>
              <Link href={href(lang, `/work/${next.slug}`)} className="card" style={{ maxWidth: 520 }}>
                <span className="kicker">{t.cs.next}</span>
                <h3 className="semi">{next.title[lang]}</h3>
                <span className="cta">{t.cs.readNext}</span>
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
