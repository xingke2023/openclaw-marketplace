'use client';

import Link from "next/link";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useState } from "react";

const FAQS = [
  {
    q: "购买后如何获取 AI 员工？",
    a: "支付成功后，您可以在「Dashboard → 我的购买」中找到已购商品，点击进入安装页面，按照步骤指引完成部署即可。整个过程通常只需几分钟。",
  },
  {
    q: "我可以申请退款吗？",
    a: "所有数字商品一经交付即为最终销售，原则上不支持退款。如果您遇到商品无法正常使用或与描述严重不符的情况，请联系我们，我们将为您评估并协助处理。",
  },
  {
    q: "如何成为卖家并上架我的 AI 员工？",
    a: "登录后进入 Dashboard，点击「开始销售」即可申请成为卖家。审核通过后，您可以在「我的销售」中创建和管理商品。",
  },
  {
    q: "支持哪些支付方式？",
    a: "目前支持信用卡/借记卡、支付宝、微信支付，通过 Stripe 安全处理。所有支付均经过加密保护。",
  },
  {
    q: "购买的 AI 员工可以用在多台设备上吗？",
    a: "购买授予个人使用许可，可在您本人的设备上使用。不得将购买的文件转发、转售或分享给他人。",
  },
  {
    q: "如果 AI 员工与描述不符怎么办？",
    a: "请发送邮件至 xiaomi@xingke888.com，说明购买的商品名称及具体问题，我们将在一个工作日内回复并协助解决。",
  },
  {
    q: "如何修改我的账户信息？",
    a: "登录后进入 Dashboard → 我的设置，可修改昵称、头像、个人网站及简介等信息。",
  },
  {
    q: "忘记密码怎么办？",
    a: "目前请发送邮件至 xiaomi@xingke888.com，说明注册邮箱，我们将协助您重置密码。",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <style>{clawStyles + `
        .help-faq-item {
          border-bottom: 1px solid rgba(42,31,25,0.08);
        }
        .help-faq-item:last-child { border-bottom: none; }
        .help-faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; background: none; border: none; cursor: pointer;
          font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 600;
          color: #2A1F19; text-align: left; gap: 16px;
        }
        .help-faq-btn:hover { color: #E65C46; }
        .help-faq-body {
          font-size: 14px; color: #6B5549; line-height: 1.75;
          padding-bottom: 18px;
        }
        .help-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 32px;
        }
        @media (max-width: 600px) {
          .help-contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="claw-page">
        <ClawNav />

        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">帮助中心</div>
            <h1 className="claw-h1">我们随时<span className="claw-accent">为您服务</span></h1>
            <p className="claw-lead">
              无论是下载问题、付款疑问还是卖家权限申请，请随时联系我们，我们将在一个工作日内回复。
            </p>
            <a
              href="mailto:xiaomi@xingke888.com"
              className="claw-btn-primary"
              style={{ fontSize: 15, padding: '12px 32px' }}
            >
              发送邮件给我们
            </a>
          </section>

          <hr className="claw-divider" />

          {/* Contact cards */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">联系方式</div>
            <h2 className="claw-h2">如何找到我们</h2>
            <div className="help-contact-grid">
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>📧</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>电子邮件</div>
                <a href="mailto:xiaomi@xingke888.com" style={{ fontSize: 15, color: '#E65C46', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' as const }}>
                  xiaomi@xingke888.com
                </a>
                <p style={{ fontSize: 13, color: '#9e8074', margin: '8px 0 0', lineHeight: 1.6 }}>
                  适合：购买问题、退款申请、卖家入驻、商务合作
                </p>
              </div>
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>⏱️</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>回复时效</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#E65C46', fontFamily: "'Bricolage Grotesque', sans-serif" }}>1 个工作日内</div>
                <p style={{ fontSize: 13, color: '#9e8074', margin: '8px 0 0', lineHeight: 1.6 }}>
                  周一至周五（香港时间）。节假日可能稍有延迟，感谢您的耐心等待。
                </p>
              </div>
            </div>
          </section>

          <hr className="claw-divider" />

          {/* FAQ */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">常见问题</div>
            <h2 className="claw-h2">您可能想知道的</h2>
            <div className="claw-card" style={{ padding: '4px 28px', marginTop: 28 }}>
              {FAQS.map((faq, i) => (
                <div key={i} className="help-faq-item">
                  <button
                    className="help-faq-btn"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: 20, color: '#9e8074', flexShrink: 0, transition: 'transform 0.15s', transform: openIndex === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  {openIndex === i && (
                    <div className="help-faq-body">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="claw-divider" />

          {/* Bottom CTA */}
          <section style={{ padding: '56px 24px 72px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="claw-h2">还有其他问题？</h2>
            <p className="claw-lead" style={{ marginBottom: 24 }}>
              如果以上内容没有解答您的疑问，请直接发邮件给我们，我们会尽快回复。
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:xiaomi@xingke888.com" className="claw-btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>
                联系支持团队
              </a>
              <Link href="/" className="claw-btn-ghost" style={{ padding: '12px 28px', fontSize: 15 }}>
                返回首页
              </Link>
            </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
