import { Metadata } from "next";

const BASE_URL = "https://www.clawmart.cn";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://0.0.0.0:8068/api";

interface Listing {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string | null;
  image_url: string | null;
  status: string;
  category: string;
  updated_at: string;
  user?: { name: string };
}

async function getListing(slug: string): Promise<Listing | null> {
  try {
    const res = await fetch(`${API_URL}/listings/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return {
      title: "AI 员工详情",
      description: "在 Claw Mart 查看并购买专业 AI 员工。",
    };
  }

  const isFree = parseFloat(listing.price) === 0;
  const priceLabel = isFree ? "免费" : `¥${listing.price}`;
  const shortDesc = listing.description
    ? listing.description.replace(/\n/g, " ").substring(0, 155)
    : `在 Claw Mart 购买「${listing.name}」AI 员工，${priceLabel}获取，几分钟内完成部署。`;

  const pageUrl = `${BASE_URL}/listings/${slug}`;

  return {
    title: `${listing.name} — ${listing.category} AI 员工 ${priceLabel}`,
    description: shortDesc,
    keywords: [listing.name, listing.category, "AI员工", "OpenClaw", "Claw Mart", "AI自动化"],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${listing.name} | Claw Mart`,
      description: shortDesc,
      url: pageUrl,
      type: "website",
      images: listing.image_url
        ? [{ url: listing.image_url, alt: listing.name }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: listing.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.name} | Claw Mart`,
      description: shortDesc,
    },
  };
}

export default async function ListingLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const listing = await getListing(slug);

  const productSchema = listing
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: listing.name,
        description: listing.description ?? `OpenClaw AI 员工：${listing.name}`,
        url: `${BASE_URL}/listings/${slug}`,
        image: listing.image_url ?? `${BASE_URL}/og-image.png`,
        category: listing.category,
        brand: {
          "@type": "Brand",
          name: "Claw Mart",
        },
        seller: {
          "@type": "Organization",
          name: listing.user?.name ?? "Claw Mart",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "CNY",
          price: parseFloat(listing.price) === 0 ? "0" : listing.price,
          availability:
            listing.status === "available"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `${BASE_URL}/listings/${slug}`,
          seller: {
            "@type": "Organization",
            name: "Claw Mart",
          },
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首页", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "AI 员工市场", item: BASE_URL },
            { "@type": "ListItem", position: 3, name: listing.name, item: `${BASE_URL}/listings/${slug}` },
          ],
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {children}
    </>
  );
}
