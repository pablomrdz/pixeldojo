import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://pixeldojo-pablordz94-5328s-projects.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/en/play", "/es/play"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
