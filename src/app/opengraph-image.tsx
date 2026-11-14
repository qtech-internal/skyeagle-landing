import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Rendered once at build time into a static PNG (also used for twitter:image).
export const dynamic = "force-static"
export const alt = `${site.brand}: phones sold on instalments, managed with confidence`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const icon = await readFile(join(process.cwd(), "public/brand/icon-512.png"))
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #000000 0%, #1d1d1f 100%)",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={iconSrc} width={96} height={96} alt="" style={{ borderRadius: 22 }} />
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{site.brand}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 980 }}>
            Phones sold on instalments. Managed with confidence.
          </div>
          <div style={{ fontSize: 30, color: "#a1a1a6", maxWidth: 940, lineHeight: 1.35 }}>
            Enrol each phone, keep the instalment record, and stay in touch with the customer until the last payment.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#a1a1a6" }}>{site.url.replace("https://", "")}</div>
      </div>
    ),
    size,
  )
}
