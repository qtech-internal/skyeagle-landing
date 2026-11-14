import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export const dynamic = "force-static"

// The policy pages change only when the policy does; the landing page is
// stamped with the build date.
const policyDate = new Date(`${site.policyEffectiveDate} UTC`)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy/`, lastModified: policyDate, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/delete-account/`, lastModified: policyDate, changeFrequency: "yearly", priority: 0.5 },
  ]
}
