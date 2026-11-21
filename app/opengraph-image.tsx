import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Imagem de compartilhamento (WhatsApp, Instagram, LinkedIn, X) herdada por
// todas as rotas. Gerada no build com a identidade atual: fundo #030712,
// brilho azul do hero, logo oficial e o gradiente .gradient-text-brand.

export const alt = "SpaceFast — criação de sites, landing pages e sistemas para empresas"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(59,130,246,0.30) 0%, rgba(139,92,246,0.10) 52%, rgba(3,7,18,0) 75%)",
          fontFamily: "Geist",
        }}
      >
        <img src={logoSrc} width={560} height={98} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 56,
            fontSize: 58,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#ffffff" }}>Sites, landing pages e sistemas</span>
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            para empresas
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 26, color: "#9ca3af" }}>
          www.spacefast.com.br
        </div>
      </div>
    ),
    { ...size },
  )
}
