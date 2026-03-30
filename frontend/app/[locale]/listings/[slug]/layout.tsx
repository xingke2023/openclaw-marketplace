import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://hk.clawmart.cn";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://0.0.0.0:8068/api";

interface Listing {
  id: number;
  name: string;
  name_ja: string | null;
  slug: string;
  price: string;
  description: string | null;
  description_ja: string | null;
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
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const listing = await getListing(slug);
  const t = await getTranslations({ locale, namespace: 'meta' });

  if (!listing) {
    return {
      title: t('listingDetail.title'),
      description: t('listingDetail.desc'),
    };
  }

  const displayName = (locale === 'ja' && listing.name_ja) ? listing.name_ja : listing.name;
  const displayDesc = (locale === 'ja' && listing.description_ja) ? listing.description_ja : listing.description;
  const isFree = parseFloat(listing.price) === 0;
  const priceLabel = isFree ? t('listingDetail.free') : `¥${listing.price}`;
  const shortDesc = displayDesc
    ? displayDesc.replace(/\n/g, " ").substring(0, 155)
    : `${displayName} — ${priceLabel}`;

  const pageUrl = `${BASE_URL}/${locale === 'ja' ? 'ja/' : ''}listings/${slug}`;

  return {
    title: `${displayName} — ${listing.category} ${priceLabel}`,
    description: shortDesc,
    keywords: [displayName, listing.category, "OpenClaw", "Claw Mart"],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${displayName} | Claw Mart`,
      description: shortDesc,
      url: pageUrl,
      type: "website",
      images: listing.image_url
        ? [{ url: listing.image_url, alt: displayName }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: displayName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} | Claw Mart`,
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
