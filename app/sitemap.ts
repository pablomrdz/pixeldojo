import type { MetadataRoute } from "next";
import { principles } from "@/data/learning";
import { seoPrinciples } from "@/data/seo-principles";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/en`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/es`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/en/ux`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/es/ux`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/en/ux/laws`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/es/ux/laws`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/en/ux/gestalt`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/es/ux/gestalt`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/en/tools/color-contrast-checker`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/es/tools/color-contrast-checker`, changeFrequency: "monthly", priority: 0.9 },
  ];

  const trustPages = ["about", "contact", "support", "privacy", "terms"];
  const trust: MetadataRoute.Sitemap = trustPages.flatMap((slug) => [
    { url: `${siteUrl}/en/${slug}`, changeFrequency: "monthly", priority: slug === "about" ? 0.6 : 0.4 },
    { url: `${siteUrl}/es/${slug}`, changeFrequency: "monthly", priority: slug === "about" ? 0.6 : 0.4 },
  ]);

  const pages: MetadataRoute.Sitemap = [...principles, ...seoPrinciples].flatMap((item) => [
    {
      url: `${siteUrl}/en/ux/${item.slug.en}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/es/ux/${item.slug.es}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [...core, ...trust, ...pages];
}
