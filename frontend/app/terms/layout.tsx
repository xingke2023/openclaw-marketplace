import { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用条款",
  description:
    "Claw Mart 使用条款：平台规则、购买政策、卖家责任、免责声明及适用法律，由 HONGKONG MACRODATA TECHNOLOGY LIMITED 发布。",
  alternates: { canonical: "https://www.clawmart.cn/terms" },
  openGraph: {
    title: "使用条款 — Claw Mart",
    description: "使用 Claw Mart 平台前请阅读本使用条款。",
    url: "https://www.clawmart.cn/terms",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "使用条款",
  url: "https://www.clawmart.cn/terms",
  description: "Claw Mart 平台使用条款，由 HONGKONG MACRODATA TECHNOLOGY LIMITED 发布。",
  dateModified: "2026-02-21",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.clawmart.cn" },
      { "@type": "ListItem", position: 2, name: "使用条款", item: "https://www.clawmart.cn/terms" },
    ],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
