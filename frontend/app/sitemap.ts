import { MetadataRoute } from "next";

const BASE_URL = "https://www.clawmart.cn";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/company`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/help`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/sourcing`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://0.0.0.0:8068/api";
    const res = await fetch(`${apiUrl}/listings?per_page=200`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return STATIC_PAGES;

    const data = await res.json();
    const listings: Array<{ slug: string; updated_at: string }> = data.data ?? data ?? [];

    const listingPages: MetadataRoute.Sitemap = listings.map((l) => ({
      url: `${BASE_URL}/listings/${l.slug}`,
      lastModified: new Date(l.updated_at),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    return [...STATIC_PAGES, ...listingPages];
  } catch {
    return STATIC_PAGES;
  }
}
