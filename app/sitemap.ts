import type { MetadataRoute } from "next";
import { principles } from "@/data/learning";

const base = "https://pixeldojo-pablordz94-5328s-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: `${base}/en`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/es`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/en/ux`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/es/ux`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const trustPages = ["about", "contact", "support", "privacy", "terms"];
  const trust: MetadataRoute.Sitemap = trustPages.flatMap((slug) => [
    { url: `${base}/en/${slug}`, changeFrequency: "monthly", priority: slug === "about" ? 0.6 : 0.4 },
    { url: `${base}/es/${slug}`, changeFrequency: "monthly", priority: slug === "about" ? 0.6 : 0.4 },
  ]);

  const pages: MetadataRoute.Sitemap = principles.flatMap((item) => [
    {
      url: `${base}/en/ux/${item.slug.en}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/es/ux/${item.slug.es}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [...core, ...trust, ...pages];
}
