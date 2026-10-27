import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { LANGS, SITE_URL, getDict, isLang } from "@/lib/i18n";
import "./globals.css";

const sans = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#0b1020", colorScheme: "dark" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: "%s — Víctor Díaz Egurbide" },
    description: t.meta.description,
    alternates: { canonical: lang === "en" ? "/" : "/es", languages: { en: "/", es: "/es" } },
    openGraph: { type: "website", siteName: "vdiaz.dev", locale: lang === "en" ? "en_US" : "es_ES", title: t.meta.title, description: t.meta.description },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Víctor Díaz Egurbide",
    jobTitle: "Senior Full-Stack Engineer",
    url: SITE_URL,
    email: "mailto:hi@vdiaz.dev",
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
    sameAs: ["https://github.com/VictorDiazE", "https://www.linkedin.com/in/victor-diaz-egurbide"],
    knowsAbout: ["Python", "AWS Lambda", "Amazon SQS", "Shopify Plus", "Shopify Hydrogen", "React", "Next.js", "TypeScript", "AI-assisted engineering"],
  };
  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        {children}
      </body>
    </html>
  );
}
