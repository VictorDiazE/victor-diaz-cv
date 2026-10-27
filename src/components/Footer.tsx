import { type Lang, getDict, EMAIL, GITHUB, LINKEDIN } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <footer id="contact" className="border-t">
      <div className="container footer">
        <a href={`mailto:${EMAIL}`} className="big wide">
          {EMAIL}
        </a>
        <div className="footer-row">
          <span>{t.footer.based}</span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href={GITHUB}>GitHub</a>
            <a href={LINKEDIN}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
