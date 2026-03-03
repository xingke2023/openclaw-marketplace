import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description:
    "Claw Mart 隐私政策：了解我们如何收集、使用、存储和保护您的个人信息，包括账户数据、支付信息及 Cookie 政策。",
  alternates: { canonical: "https://www.clawmart.cn/privacy" },
  openGraph: {
    title: "隐私政策 — Claw Mart",
    description: "了解 Claw Mart 如何处理和保护您的个人信息。",
    url: "https://www.clawmart.cn/privacy",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "隐私政策",
  url: "https://www.clawmart.cn/privacy",
  description: "Claw Mart 平台隐私政策，由 HONGKONG MACRODATA TECHNOLOGY LIMITED 发布。",
  dateModified: "2026-02-21",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.clawmart.cn" },
      { "@type": "ListItem", position: 2, name: "隐私政策", item: "https://www.clawmart.cn/privacy" },
    ],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
