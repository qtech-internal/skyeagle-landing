import type { Metadata } from "next"
import { site } from "@/lib/site"

// Built from src/app/opengraph-image.tsx. Listed explicitly because a page's
// own `openGraph` object would otherwise drop the file-based image.
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${site.brand}: phones sold on instalments, managed with confidence`,
}

export const defaultTitle = `${site.brand} | Phones sold on instalments, managed with confidence`
export const defaultDescription =
  "Sky Eagle helps mobile retailers enrol the phones they sell on instalments, keep the instalment record and stay in touch with the customer until the last payment."

/**
 * Per-page metadata. Next.js replaces (not merges) `openGraph` and `twitter`
 * objects from the layout, so every page builds the full set here to get the
 * right canonical, og:url, og:title and description.
 */
export function pageMetadata({
  title,
  description = defaultDescription,
  path,
}: {
  title?: string
  description?: string
  path: `/${string}`
}): Metadata {
  const socialTitle = title ? `${title} | ${site.brand}` : defaultTitle
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: "en_IN",
      url: path,
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: "/twitter-image", alt: ogImage.alt }],
    },
  }
}
