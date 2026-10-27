import Link from "next/link";
import { type Lang, getDict, href, EMAIL, CV_PDF } from "@/lib/i18n";
import { TldrDialog } from "./TldrDialog";

export function Nav({ lang, altPath }: { lang: Lang; altPath: string }) {
  const t = getDict(lang);
  const other: Lang = lang === "en" ? "es" : "en";
  return (
    <header>
      <nav aria-label="Main" className="container nav">
        <Link href={href(lang)} className="brand semi">
          vdiaz.dev
        </Link>
        <div className="nav-links">
          <a href={`${href(lang)}#work`}>{t.nav.work}</a>
          <a href={`${href(lang)}#ai`}>{t.nav.ai}</a>
          <a href={`${href(lang)}#about`}>{t.nav.about}</a>
          <a href={`${href(lang)}#contact`}>{t.nav.contact}</a>
          <TldrDialog
            label={t.nav.tldr}
            title={t.tldr.title}
            points={t.tldr.points}
            lookingFor={t.tldr.lookingFor}
            download={t.tldr.download}
            email={t.tldr.email}
            close={t.tldr.close}
            cvHref={CV_PDF}
            mail={EMAIL}
          />
          <Link href={href(other, altPath)} hrefLang={other} lang={other} className="lang-switch" aria-label={t.nav.switchLabel}>
            {t.nav.switchTo}
          </Link>
        </div>
      </nav>
    </header>
  );
}
