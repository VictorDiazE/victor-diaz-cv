import { notFound } from "next/navigation";
import { getDict, isLang, EMAIL, type Lang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Pipeline, NeuralIcon } from "@/components/Pipeline";
import { AskPortfolio, AskTrigger } from "@/components/AskPortfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Sparkle } from "@/components/icons";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);

  return (
    <>
      <Nav lang={lang} altPath="/" />
      <main>
        <section aria-labelledby="hero-h" className="hero-glow">
          <div className="container" style={{ paddingTop: 40, paddingBottom: 56 }}>
            <div className="hero-top">
              <p className="mono muted" style={{ fontSize: 13, lineHeight: "22px" }}>
                {t.hero.kicker.map((k, i) => (
                  <span key={k}>
                    {k}
                    {i < t.hero.kicker.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p style={{ maxWidth: 500, fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)" }}>{t.hero.intro}</p>
            </div>
            <h1 id="hero-h" className="hero-title wide">
              {t.hero.title}
            </h1>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                {t.hero.ctaWork}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn-ghost mono" style={{ fontWeight: 400, fontSize: 14 }}>
                {EMAIL}
              </a>
              <span className="divider-v" aria-hidden="true" />
              {t.hero.chipsAi.map((c) => (
                <span key={c} className="chip ai-border">
                  <Sparkle />
                  {c}
                </span>
              ))}
              <span className="chip">{t.hero.chipStack}</span>
            </div>
            <AskPortfolio text={t.ask} lang={lang} email={EMAIL} />
          </div>
          <Pipeline text={t.pipeline} />
        </section>

        <section id="work" aria-labelledby="work-h" className="container section">
          <div className="section-head">
            <h2 id="work-h" className="h2 wide">
              {t.work.title}
            </h2>
            <span className="mono muted" style={{ fontSize: 13 }}>
              {t.work.hint}
            </span>
          </div>
          <div className="bento">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} lang={lang} />
            ))}
          </div>
        </section>

        <section id="ai" aria-labelledby="ai-h" className="sec-ai">
          <div className="container section">
            <div className="section-head">
              <h2 id="ai-h" className="h2 wide">
                <Sparkle size={34} />
                {t.ai.title}
              </h2>
              <span className="mono muted" style={{ fontSize: 13 }}>
                {t.ai.tools}
              </span>
            </div>
            <div className="grid-3">
              {t.ai.cards.map((c, i) => (
                <div key={c.title} className={`ai-card${i === 0 ? " ai-border" : ""}`}>
                  <span className="icon" aria-hidden="true">
                    {i === 1 ? <NeuralIcon size={30} /> : <Sparkle size={20} color={i === 2 ? "#67e8f9" : "#a9b8ff"} />}
                  </span>
                  <h3 className="semi">{c.title}</h3>
                  <p>{c.body}</p>
                  {i === 2 && (
                    <AskTrigger className="link-btn mono">{t.ai.tryIt} →</AskTrigger>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-h" className="theme-light">
          <div className="container section about">
            <h2 id="about-h" className="h2 wide" style={{ alignSelf: "flex-start" }}>
              {t.about.title}
            </h2>
            <div className="about-body">
              <p>{t.about.body}</p>
              <dl className="stats">
                {t.about.stats.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd className="wide">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h3 className="mono muted" style={{ fontSize: 12, fontWeight: 400, marginBottom: 8 }}>
                  {t.about.experience}
                </h3>
                <ul className="jobs">
                  {t.about.jobs.map((j) => (
                    <li key={j.role + j.when}>
                      <span>
                        <strong style={{ fontWeight: 600 }}>{j.role}</strong> <span className="muted">· {j.org}</span>
                      </span>
                      <span className="when">{j.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="wrap">
                {t.about.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
