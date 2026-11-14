import "./globals.css"

import type { Metadata, Viewport } from "next"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { MotionProvider } from "@/components/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { defaultDescription, defaultTitle, pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  ...pageMetadata({ path: "/" }),
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.brand}` },
  description: defaultDescription,
  applicationName: site.brand,
  keywords: [
    "phone EMI management",
    "mobile instalment software",
    "device lock on EMI",
    "mobile retailer software",
    "EMI phone finance India",
    "Sky Eagle Partner",
    "Sky Eagle Customer",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.brand,
      legalName: site.legalName,
      url: `${site.url}/`,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/icon-512.png`, width: 512, height: 512 },
      email: site.supportEmail,
      address: { "@type": "PostalAddress", addressLocality: "Ludhiana", addressRegion: "Punjab", addressCountry: "IN" },
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail, areaServed: "IN" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.brand,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          // Static JSON built from site.ts at build time; no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Without scripts the scroll reveals never run, so show their content outright. */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <a className="skip" href="#main">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
