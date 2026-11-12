import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

const routes = ["/", "/privacy/", "/delete-account/"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.5,
  }))
}
