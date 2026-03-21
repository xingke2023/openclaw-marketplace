'use client';

import Link from "next/link";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { CheckCircle2, Zap, Clock, Gift, Headphones, ShieldCheck } from "lucide-react";

const INCLUDES = [
  { icon: "🤖", title: "送1个AI员工", desc: "免费赠送价值 ¥39 的 AI 员工角色一个，直接上岗，无需配置。" },
  { icon: "🎁", title: "送3个专有技能", desc: "免费赠送3个技能包（营销/工程/设计任选），总价值 ¥29.7。" },
  { icon: "⚡", title: "5分钟内装好", desc: "全程远程操作，平均完成时长 3–5 分钟，你只需等待通知。" },
  { icon: "🛡️", title: "30天售后保障", desc: "装好后30天内遇到任何问题，免费重装或调整，无需额外付费。" },
];

const STEPS = [
  { num: "1", title: "提交订单", desc: "点击立即安装，填写你使用的平台/工具信息（微信、企微、钉钉等），支付 ¥299。" },
  { num: "2", title: "专人接单", desc: "工作人员 5 分钟内接单，通过微信/企微与你联系，确认安装环境。" },
  { num: "3", title: "远程安装", desc: "工程师远程登录或由你提供授权，3–5 分钟内完成部署和配置。" },
  { num: "4", title: "验收交付", desc: "你与员工/技能实际对话验收，满意后我们发送全套使用文档，完成交付。" },
];

const FAQS = [
  {
    q: "支持哪些平台安装？",
    a: "目前支持：OpenClaw App、企业微信、微信服务号/订阅号、钉钉、飞书、网页 API 接入。如有其他平台需求可在下单时备注。",
  },
  {
    q: "不懂技术也能用吗？",
    a: "完全可以。整个安装过程由我们的工程师负责，你只需要有对应平台的管理员权限，或按提示操作 2–3 步即可。",
  },
  {
    q: "¥299 包含什么？",
    a: "包含：全程安装服务 + 1个AI员工角色（¥39）+ 3个技能包（¥29.7）+ 30天售后 + 使用文档。合计价值超过 ¥400。",
  },
  {
    q: "装好之后需要自己维护吗？",
    a: "不需要。AI 员工和技能由 CLAW MART 平台持续更新维护，你不需要做任何维护工作。",
  },
  {
    q: "如果安装失败怎么办？",
    a: "100% 无风险：安装失败（非用户原因）全额退款，或免费重试直至成功。",
  },
];

export default function InstallServicePage() {
  return (
    <>
      <style>{clawStyles}</style>
      <style>{`
        .install-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(230,92,70,0.12);
          color: #bf3f30;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .install-price-tag {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 72px;
          font-weight: 800;
          color: #E65C46;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .install-price-sup {
          font-size: 32px;
          vertical-align: top;
          margin-top: 14px;
          display: inline-block;
        }
        .install-price-sub {
          font-size: 16px;
          color: #9e8074;
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          margin-left: 4px;
        }
        .install-value-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(74,158,107,0.1);
          color: #2a7a4a;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          margin-top: 12px;
        }
        .install-includes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 640px) {
          .install-includes-grid { grid-template-columns: 1fr; }
          .install-price-tag { font-size: 52px; }
        }
        .install-includes-card {
          background: white;
          border-radius: 14px;
          border: 1px solid rgba(42,31,25,0.07);
          padding: 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .install-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(230,92,70,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .install-steps-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .install-step-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          position: relative;
        }
        .install-step-row:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: calc(100% - 16px);
          background: rgba(230,92,70,0.2);
        }
        .install-step-num {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E65C46;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          flex-shrink: 0;
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .install-step-content {
          padding-bottom: 32px;
          flex: 1;
        }
        .install-cta-box {
          background: linear-gradient(135deg, #E65C46 0%, #c94533 100%);
          border-radius: 20px;
          padding: 56px 40px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .install-cta-box::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }
        .install-cta-box::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -40px;
          width: 160px; height: 160px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }
        .install-btn-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #E65C46;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          font-family: 'Manrope', sans-serif;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .install-btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        }
        .install-faq-item {
          border-bottom: 1px solid rgba(42,31,25,0.08);
          padding: 20px 0;
        }
        .install-faq-item:last-child { border-bottom: none; }
        .install-trust-row {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .install-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }
        @media (max-width: 480px) {
          .install-cta-box { padding: 36px 20px; }
        }
      `}</style>

      <div className="claw-page">
        <ClawNav />

        {/* Hero */}
        <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="install-hero-badge">🦞 限时特惠 · 在线安装服务</div>
          <h1 className="claw-h1" style={{ maxWidth: 720 }}>
            <span className="claw-accent">5分钟</span>装好你的<br />AI数字员工
          </h1>
          <p className="claw-lead" style={{ maxWidth: 580 }}>
            不懂技术？没关系。专属工程师帮你远程安装配置，全程陪同，几分钟内上线运转。
            你只需要等一条"装好了"的消息。
          </p>

          {/* Price block */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="install-price-tag">
                <span className="install-price-sup">¥</span>299
              </div>
              <div style={{ marginTop: 6 }}>
                <div className="install-value-badge">
                  <CheckCircle2 size={13} />
                  价值 ¥400+ 套餐，现价 ¥299
                </div>
              </div>
            </div>
            <div style={{ paddingBottom: 8 }}>
              <Link href="/sourcing" className="install-btn-white"
                style={{ background: '#E65C46', color: 'white', boxShadow: '0 4px 20px rgba(230,92,70,0.35)' }}>
                <Zap size={18} />
                立即安装 · ¥299
              </Link>
              <div style={{ fontSize: 12, color: '#9e8074', marginTop: 8, fontFamily: "'Manrope', sans-serif" }}>
                支持微信支付 / 支付宝 · 安装失败全额退款
              </div>
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* What's included */}
        <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">套餐包含</div>
          <h2 className="claw-h2">¥299 包含这些</h2>
          <p className="claw-lead">安装服务 + 免费赠品，超值打包。</p>

          <div className="install-includes-grid">
            {INCLUDES.map((item, i) => (
              <div key={i} className="install-includes-card">
                <div className="install-icon-circle">{item.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison callout */}
          <div className="claw-highlight-box" style={{ marginTop: 32, maxWidth: 560 }}>
            <div style={{ fontWeight: 700, color: '#2A1F19', fontSize: 15, marginBottom: 6 }}>
              算一算实际价值
            </div>
            <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.8 }}>
              安装服务 <span style={{ color: '#9e8074' }}>（远程人工）</span> ≈ ¥200<br />
              AI员工角色 ¥39 + 技能包 ×3 ¥29.7<br />
              30天售后 + 使用文档<br />
              <strong style={{ color: '#E65C46' }}>合计价值 ¥400+ → 现在只需 ¥299</strong>
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* How fast / trust points */}
        <section className="claw-muted-section" style={{ padding: '56px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">为什么选我们</div>
            <h2 className="claw-h2">快、省、稳</h2>

            <div className="install-trust-row" style={{ marginTop: 40, justifyContent: 'flex-start', gap: 40 }}>
              {[
                { icon: <Clock size={32} color="#E65C46" />, num: "3–5 分钟", label: "平均安装时长" },
                { icon: <ShieldCheck size={32} color="#E65C46" />, num: "100%", label: "安装成功率保障" },
                { icon: <Headphones size={32} color="#E65C46" />, num: "30 天", label: "售后免费支持" },
                { icon: <Gift size={32} color="#E65C46" />, num: "4 件", label: "免费赠品随附" },
              ].map((stat, i) => (
                <div key={i} className="install-trust-item">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(230,92,70,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                  </div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: '#2A1F19', lineHeight: 1 }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: 13, color: '#6B5549', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Steps */}
        <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">安装流程</div>
          <h2 className="claw-h2">4步搞定，全程托管</h2>
          <p className="claw-lead">你只需要提供账号权限，其余全部由我们完成。</p>

          <div className="install-steps-list" style={{ maxWidth: 600, marginTop: 40 }}>
            {STEPS.map((step, i) => (
              <div key={i} className="install-step-row">
                <div className="install-step-num">{step.num}</div>
                <div className="install-step-content">
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="claw-divider" />

        {/* FAQ */}
        <section className="claw-muted-section" style={{ padding: '56px 24px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="claw-label">常见问题</div>
            <h2 className="claw-h2">你可能想知道</h2>

            <div style={{ marginTop: 32 }}>
              {FAQS.map((faq, i) => (
                <div key={i} className="install-faq-item">
                  <div style={{ fontWeight: 700, color: '#2A1F19', fontSize: 15, marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Q: {faq.q}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* CTA */}
        <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="install-cta-box">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 16, fontFamily: "'Manrope', sans-serif" }}>
                限时特惠
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                现在下单，5分钟后<br />你的 AI 员工就位
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '0 0 32px', fontFamily: "'Manrope', sans-serif", lineHeight: 1.6 }}>
                一次性买断，终身使用，无月费。赠员工 + 赠技能 + 30天售后，¥299 全包。
              </p>
              <Link href="/sourcing" className="install-btn-white">
                <Zap size={18} />
                立即安装 · ¥299
              </Link>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 16, fontFamily: "'Manrope', sans-serif" }}>
                安装失败全额退款 · 无任何隐藏费用
              </div>
            </div>
          </div>
        </section>

        <ClawFooter />
      </div>
    </>
  );
}
