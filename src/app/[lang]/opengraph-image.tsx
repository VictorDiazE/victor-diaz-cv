import { ImageResponse } from "next/og";

export const alt = "Víctor Díaz Egurbide — Senior Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const box = (label: string, color = "#34436b", bg = "#121a2e") => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 52,
      padding: "0 18px",
      borderRadius: 14,
      border: `2px solid ${color}`,
      background: bg,
      color: "#e8ecf4",
      fontSize: 20,
    }}
  >
    {label}
  </div>
);
const link = () => <div style={{ display: "flex", width: 36, height: 2, background: "#7c93ff" }} />;

export default async function OG({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const title = lang === "es" ? "Sistemas en producción, de principio a fin." : "Production systems, owned end to end.";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0b1020", color: "#e8ecf4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#98a3ba" }}>
          <span>vdiaz.dev</span>
          <span>Senior Full-Stack Engineer · Barcelona</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {box("feeds")}
          {link()}
          {box("ingest")}
          {link()}
          {box("sqs")}
          {link()}
          {box("workers", "#7c93ff")}
          {link()}
          {box("eu", "#7c93ff", "#18213d")}
          <div style={{ display: "flex", width: 12 }} />
          {box("mena", "#fbbf24", "#18213d")}
          <div style={{ display: "flex", width: 32 }} />
          {box("AI agent", "#67e8f9", "#141b36")}
        </div>
      </div>
    ),
    size,
  );
}
