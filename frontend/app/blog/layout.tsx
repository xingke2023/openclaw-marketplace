import { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客 — AI 员工资讯与使用指南",
  description:
    "Claw Mart 博客：AI 员工使用技巧、OpenClaw 工作流教程、提示词工程实践、AI 自动化案例分享。",
  alternates: { canonical: "https://www.clawmart.cn/blog" },
  openGraph: {
    title: "博客 — Claw Mart AI 员工资讯",
    description:
      "AI 员工使用技巧、OpenClaw 工作流教程与 AI 自动化最佳实践。",
    url: "https://www.clawmart.cn/blog",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Claw Mart 博客",
  url: "https://www.clawmart.cn/blog",
  description: "AI 员工使用指南、OpenClaw 工作流教程与 AI 自动化实践分享",
  publisher: {
    "@type": "Organization",
    name: "Claw Mart",
    url: "https://www.clawmart.cn",
  },
  inLanguage: "zh-CN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.clawmart.cn" },
      { "@type": "ListItem", position: 2, name: "博客", item: "https://www.clawmart.cn/blog" },
    ],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
