import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/install/", "/posts", "/api/"],
      },
    ],
    sitemap: "https://www.clawmart.cn/sitemap.xml",
    host: "https://www.clawmart.cn",
  };
}
