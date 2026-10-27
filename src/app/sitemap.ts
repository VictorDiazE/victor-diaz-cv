import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n";
import { caseStudies } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...caseStudies.map((p) => `/work/${p.slug}`)];
  return pages.flatMap((path) => [
    { url: `${SITE_URL}${path}`, alternates: { languages: { es: `${SITE_URL}/es${path === "/" ? "" : path}` } } },
    { url: `${SITE_URL}/es${path === "/" ? "" : path}` },
  ]);
}
