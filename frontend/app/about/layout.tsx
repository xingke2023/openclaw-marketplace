import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 — AI 员工交付中心",
  description:
    "了解 Claw Mart：我们是由每天在生产环境中运行 AI 员工的人创建的市场，提供经过验证的 OpenClaw AI 员工人设与技能，帮助任何人在几分钟内完成部署。",
  alternates: { canonical: "https://www.clawmart.cn/about" },
  openGraph: {
    title: "关于 Claw Mart — AI 员工交付中心",
    description:
      "Claw Mart 是专业的 AI 员工市场，提供经生产验证的 OpenClaw AI 员工人设与技能包。",
    url: "https://www.clawmart.cn/about",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "关于 Claw Mart",
  url: "https://www.clawmart.cn/about",
  description:
    "Claw Mart 是专业的 AI 员工市场，由 HONGKONG MACRODATA TECHNOLOGY LIMITED 运营，提供即购即用的 OpenClaw AI 员工。",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.clawmart.cn" },
      { "@type": "ListItem", position: 2, name: "关于我们", item: "https://www.clawmart.cn/about" },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
