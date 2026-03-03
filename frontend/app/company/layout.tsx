import { Metadata } from "next";

export const metadata: Metadata = {
  title: "公司介绍 — HONGKONG MACRODATA TECHNOLOGY LIMITED",
  description:
    "HONGKONG MACRODATA TECHNOLOGY LIMITED 是一家专注于 AI 自动化技术与智能工作流交付的香港科技企业，运营 Claw Mart AI 员工市场。",
  alternates: { canonical: "https://www.clawmart.cn/company" },
  openGraph: {
    title: "公司介绍 — Claw Mart",
    description:
      "HONGKONG MACRODATA TECHNOLOGY LIMITED：专注 AI 自动化技术，让每家企业都能用上专业 AI 员工。",
    url: "https://www.clawmart.cn/company",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "HONGKONG MACRODATA TECHNOLOGY LIMITED",
  alternateName: "Claw Mart",
  url: "https://www.clawmart.cn",
  logo: "https://www.clawmart.cn/favicon.png",
  description:
    "专注于 AI 自动化技术与智能工作流交付的科技公司，运营 Claw Mart AI 员工市场，致力于帮助企业和个人用最低成本获得最强的 AI 员工能力。",
  email: "xiaomi@xingke888.com",
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressCountry: "HK",
    addressRegion: "Hong Kong",
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: "10" },
  knowsAbout: ["AI 自动化", "OpenClaw", "AI 员工", "智能工作流", "提示词工程"],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.clawmart.cn" },
      { "@type": "ListItem", position: 2, name: "公司介绍", item: "https://www.clawmart.cn/company" },
    ],
  },
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
