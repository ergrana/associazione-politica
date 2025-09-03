import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://example.com"; // ← tuo dominio
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
