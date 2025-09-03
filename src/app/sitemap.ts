import { POSTS, EVENTS } from "@/lib/content";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // ← sostituisci col dominio reale
  const staticPages = [
    "", "chi-siamo", "programma", "notizie", "eventi", "partecipa", "trasparenza", "contatti",
  ].map(p => ({ url: `${base}/${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));

  const postPages = POSTS.map(p => ({
    url: `${base}/notizie/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventPages = EVENTS.map(e => ({
    url: `${base}/eventi/${e.id}`,
    lastModified: new Date(e.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...eventPages];
}
