'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from 'next-intl';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";

type DemoMsg = { type: string; text: string };

function PhoneDemo({ msgs, avatar, bg, name, replayLabel, runningLabel }: { msgs: DemoMsg[]; avatar: string; bg: string; name: string; replayLabel: string; runningLabel: string }) {
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);

  const play = useCallback(() => {
    setVisibleMsgs([]);
    setShowTyping(false);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    let delay = 300;
    msgs.forEach((msg, i) => {
      if (i > 0) {
        const t1 = setTimeout(() => setShowTyping(true), delay);
        timers.current.push(t1);
        delay += msg.type === 'ai' ? 1200 : 600;
      }
      const t2 = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(prev => [...prev, i]);
      }, delay);
      timers.current.push(t2);
      delay += msg.type === 'ai' ? 2000 : 900;
    });
  }, [msgs]);

  useEffect(() => { play(); return () => timers.current.forEach(clearTimeout); }, [play]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [visibleMsgs, showTyping]);

  return (
    <div className="sc-phone">
      <div className="sc-phone-inner">
        {/* status bar */}
        <div style={{ background: '#000', padding: '10px 18px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: '-apple-system,sans-serif', letterSpacing: -0.3 }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.5" y="5" width="3" height="7" rx="1"/><rect x="9" y="2.5" width="3" height="9.5" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><path d="M8 2.5C10.5 2.5 12.7 3.5 14.3 5.1L15.5 3.9C13.6 2 11 1 8 1S2.4 2 .5 3.9L1.7 5.1C3.3 3.5 5.5 2.5 8 2.5Z" opacity=".4"/><path d="M8 5C9.7 5 11.2 5.7 12.3 6.8L13.5 5.6C12.1 4.2 10.1 3.3 8 3.3S3.9 4.2 2.5 5.6L3.7 6.8C4.8 5.7 6.3 5 8 5Z" opacity=".7"/><circle cx="8" cy="10" r="1.5"/></svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div style={{ width: 22, height: 11, border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: 2.5, padding: 1.5 }}>
                <div style={{ background: '#fff', borderRadius: 1, height: '100%', width: '75%' }} />
              </div>
              <div style={{ width: 2, height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>
        {/* dynamic island */}
        <div style={{ width: 100, height: 28, background: '#000', borderRadius: 20, margin: '0 auto 6px', flexShrink: 0 }} />
        {/* screen */}
        <div style={{ background: '#F8F2ED', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '0 0 34px 34px' }}>
          <div style={{ background: '#fff', padding: '10px 14px', borderBottom: '1px solid rgba(42,31,25,0.08)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              {avatar}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19', fontFamily: "'Manrope', sans-serif" }}>{name}</div>
              <div style={{ fontSize: 11, color: '#22c55e', fontFamily: "'Manrope', sans-serif", display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                {runningLabel}
              </div>
            </div>
          </div>
          <div ref={msgsRef} style={{ flex: 1, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', scrollBehavior: 'smooth' }}>
            {msgs.map((msg, i) => (
              visibleMsgs.includes(i) && (
                <div key={i} className={`sc-msg ${msg.type}`} style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
              )
            ))}
            {showTyping && (
              <div className="sc-typing"><span /><span /><span /></div>
            )}
          </div>
          <div style={{ padding: '8px 12px 14px', flexShrink: 0 }}>
            <button onClick={play} style={{ width: '100%', background: 'rgba(230,92,70,0.1)', border: 'none', borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 700, color: '#E65C46', cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>
              {replayLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillCustomPage() {
  const t = useTranslations('skillCustom');
  const [activeDemo, setActiveDemo] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", desc: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);

  // ─── Demo messages ────────────────────────────────────────────────
  const DEMO_CASES = [
    {
      label: t('demoCase1Label'),
      avatar: "🛒",
      bg: "#b6e3f4",
      messages: [
        { type: "user", text: "帮我爬取京东上 iPhone 16 Pro 256G 最近7天的价格变动" },
        { type: "ai",   text: "好的，正在登录京东并抓取商品历史价格……" },
        { type: "ai",   text: "✅ 完成！\n\n**京东 · iPhone 16 Pro 256G**\n最低价：¥8,499（3天前）\n当前价：¥8,799\n7日均价：¥8,632\n\n📉 建议：价格处于近期高位，可等待下跌后下单。已为您设置价格预警，低于 ¥8,550 时自动通知。" },
      ],
    },
    {
      label: t('demoCase2Label'),
      avatar: "🏢",
      bg: "#c0aede",
      messages: [
        { type: "user", text: "把今天的销售报表数据录入到我们公司的 ERP 系统里" },
        { type: "ai",   text: "收到，正在登录公司内网 ERP，地址：erp.yourcompany.cn……" },
        { type: "ai",   text: "✅ 录入完成！\n\n共处理 **47 条** 销售记录：\n- 新增订单：32 条\n- 更新订单：15 条\n- 跳过重复：0 条\n\n已生成录入报告并发送至您的邮箱。" },
      ],
    },
    {
      label: t('demoCase3Label'),
      avatar: "📡",
      bg: "#d1d4f9",
      messages: [
        { type: "user", text: "每天早上9点监控竞争对手官网的产品更新和定价变化" },
        { type: "ai",   text: "✅ 已设置定时任务，每日 09:00 执行。\n\n**今日监控报告（刚刚完成）：**\n\n🔴 发现 2 处变动：\n1. A竞品 新增产品「专业版 Pro」定价 ¥299/月\n2. B竞品 将基础版从 ¥99 调整为 ¥129\n\n📊 详细对比表格已推送到您的飞书群。" },
      ],
    },
  ];

  // ─── Cases ────────────────────────────────────────────────────────
  const CASES = [
    {
      emoji: "🛍️",
      client: t('case1Client'),
      title: t('case1Title'),
      desc: t('case1Desc'),
      tag: t('case1Tag'),
      result: t('case1Result'),
    },
    {
      emoji: "🏗️",
      client: t('case2Client'),
      title: t('case2Title'),
      desc: t('case2Desc'),
      tag: t('case2Tag'),
      result: t('case2Result'),
    },
    {
      emoji: "📰",
      client: t('case3Client'),
      title: t('case3Title'),
      desc: t('case3Desc'),
      tag: t('case3Tag'),
      result: t('case3Result'),
    },
    {
      emoji: "🏪",
      client: t('case4Client'),
      title: t('case4Title'),
      desc: t('case4Desc'),
      tag: t('case4Tag'),
      result: t('case4Result'),
    },
  ];

  // ─── Pricing ──────────────────────────────────────────────────────
  const PRICING = [
    {
      name: t('plan1Name'),
      price: t('plan1Price'),
      unit: t('plan1Unit'),
      highlight: false,
      desc: t('plan1Desc'),
      features: [
        t('plan1Feature1'),
        t('plan1Feature2'),
        t('plan1Feature3'),
        t('plan1Feature4'),
        t('plan1Feature5'),
      ],
      cta: t('plan1Cta'),
    },
    {
      name: t('plan2Name'),
      price: t('plan2Price'),
      unit: t('plan2Unit'),
      highlight: true,
      desc: t('plan2Desc'),
      features: [
        t('plan2Feature1'),
        t('plan2Feature2'),
        t('plan2Feature3'),
        t('plan2Feature4'),
        t('plan2Feature5'),
        t('plan2Feature6'),
      ],
      cta: t('plan2Cta'),
    },
    {
      name: t('plan3Name'),
      price: t('plan3Price'),
      unit: "",
      highlight: false,
      desc: t('plan3Desc'),
      features: [
        t('plan3Feature1'),
        t('plan3Feature2'),
        t('plan3Feature3'),
        t('plan3Feature4'),
        t('plan3Feature5'),
        t('plan3Feature6'),
      ],
      cta: t('plan3Cta'),
    },
  ];

  const FAQS = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{clawStyles}</style>
      <style>{`
        .sc-phone {
          width: 300px;
          background: linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 100%);
          border-radius: 48px;
          padding: 14px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 32px 80px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.12);
          position: relative;
          flex-shrink: 0;
        }
        .sc-phone::before {
          content: '';
          position: absolute;
          left: -3px; top: 90px;
          width: 3px; height: 34px;
          background: #333; border-radius: 3px 0 0 3px;
          box-shadow: 0 44px 0 #333;
        }
        .sc-phone::after {
          content: '';
          position: absolute;
          right: -3px; top: 110px;
          width: 3px; height: 54px;
          background: #333; border-radius: 0 3px 3px 0;
        }
        .sc-phone-inner {
          background: #000;
          border-radius: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 560px;
        }
        .sc-msg {
          max-width: 82%;
          padding: 9px 13px;
          border-radius: 16px;
          font-size: 12px;
          line-height: 1.55;
          font-family: 'Manrope', sans-serif;
          animation: scMsgIn 0.35s ease;
        }
        @keyframes scMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sc-msg.ai {
          background: #fff; color: #2A1F19;
          border-bottom-left-radius: 4px; align-self: flex-start;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .sc-msg.user {
          background: #E65C46; color: #fff;
          border-bottom-right-radius: 4px; align-self: flex-end;
        }
        .sc-typing {
          display: flex; gap: 4px; align-items: center;
          padding: 10px 14px;
          background: #fff; border-radius: 16px; border-bottom-left-radius: 4px;
          width: fit-content; box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          animation: scMsgIn 0.2s ease;
        }
        .sc-typing span {
          width: 6px; height: 6px; background: #9e8074; border-radius: 50%;
          animation: scDot 1.2s infinite;
        }
        .sc-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sc-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes scDot { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }

        .sc-demo-tab {
          padding: 6px 16px; border-radius: 100px; font-size: 13px;
          font-weight: 600; cursor: pointer; border: 1.5px solid rgba(42,31,25,0.15);
          background: white; color: #6B5549;
          font-family: 'Manrope', sans-serif; transition: all 0.15s;
        }
        .sc-demo-tab.active { background: #2A1F19; color: white; border-color: #2A1F19; }

        .sc-cases-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .sc-pricing-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start;
        }
        .sc-price-card {
          background: white; border: 1px solid rgba(42,31,25,0.08);
          border-radius: 16px; padding: 28px 24px; position: relative;
        }
        .sc-price-card.hi {
          border: 2px solid #E65C46;
          box-shadow: 0 8px 32px rgba(230,92,70,0.15);
        }
        .sc-feat {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: #6B5549; line-height: 1.55;
          padding: 6px 0; border-bottom: 1px solid rgba(42,31,25,0.05);
        }
        .sc-feat:last-child { border-bottom: none; }
        .sc-check {
          width: 16px; height: 16px; border-radius: 50%;
          background: rgba(74,158,107,0.12); color: #2a7a4a;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 900; flex-shrink: 0; margin-top: 1px;
        }
        .sc-demo-layout {
          display: flex; gap: 56px; align-items: flex-start;
        }
        .sc-demo-text { flex: 1; min-width: 0; }
        @media (max-width: 860px) {
          .sc-demo-layout { flex-direction: column; align-items: center; }
          .sc-demo-text { width: 100%; }
          .sc-phone { width: 270px; }
          .sc-phone-inner { height: 510px; }
          .sc-cases-grid { grid-template-columns: 1fr; }
          .sc-pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="claw-page">
        <ClawNav />

        {/* Hero */}
        <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
          <h1 className="claw-h1" style={{ whiteSpace: 'nowrap' }}>
            {t('heroTitle')}
          </h1>
          <p className="claw-lead" style={{ maxWidth: 600, marginBottom: 8 }}>
            {t('heroLead1')}
          </p>
          <p className="claw-lead" style={{ maxWidth: 600 }}>
            {t('heroLead2')}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <button className="claw-btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}
              onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <Zap size={16} />
              {t('submitBtn')}
            </button>
            <button className="claw-btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('viewDemoBtn')}
            </button>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* What we can do */}
        <section style={{ padding: '56px 24px', background: 'rgba(240,232,225,0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('whatCanDoLabel')}</div>
            <h2 className="claw-h2">{t('whatCanDoTitle')}</h2>
            <p className="claw-lead">{t('whatCanDoLead')}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 8 }}>
              {[
                {
                  icon: "🕷️",
                  title: t('type1Title'),
                  color: "rgba(101,179,255,0.1)",
                  examples: [
                    t('type1Ex1'),
                    t('type1Ex2'),
                    t('type1Ex3'),
                    t('type1Ex4'),
                  ],
                },
                {
                  icon: "🔐",
                  title: t('type2Title'),
                  color: "rgba(230,92,70,0.07)",
                  examples: [
                    t('type2Ex1'),
                    t('type2Ex2'),
                    t('type2Ex3'),
                    t('type2Ex4'),
                  ],
                },
                {
                  icon: "⚙️",
                  title: t('type3Title'),
                  color: "rgba(134,239,172,0.1)",
                  examples: [
                    t('type3Ex1'),
                    t('type3Ex2'),
                    t('type3Ex3'),
                    t('type3Ex4'),
                  ],
                },
              ].map((item, i) => (
                <div key={i} style={{ background: item.color, border: '1px solid rgba(42,31,25,0.08)', borderRadius: 16, padding: 28 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: '#2A1F19', marginBottom: 16 }}>
                    {item.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {item.examples.map((ex, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#6B5549' }}>
                        <span style={{ color: '#E65C46', fontWeight: 700, flexShrink: 0 }}>›</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Phone Demo */}
        <section id="demo" style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">{t('demoLabel')}</div>
          <div className="sc-demo-layout">
            <div className="sc-demo-text">
              <h2 className="claw-h2">{t('demoTitle')}</h2>
              <p className="claw-lead">{t('demoLead')}</p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                {DEMO_CASES.map((c, i) => (
                  <button key={i} className={`sc-demo-tab${activeDemo === i ? ' active' : ''}`}
                    onClick={() => setActiveDemo(i)}>
                    {c.avatar} {c.label}
                  </button>
                ))}
              </div>

              <div className="claw-highlight-box">
                <div style={{ fontWeight: 700, color: '#2A1F19', fontSize: 15, marginBottom: 6 }}>
                  {t('demoRealScene')}
                </div>
                <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.7 }}>
                  {t('demoRealSceneDesc')}
                </div>
              </div>
            </div>

            <PhoneDemo
              key={activeDemo}
              msgs={DEMO_CASES[activeDemo].messages}
              avatar={DEMO_CASES[activeDemo].avatar}
              bg={DEMO_CASES[activeDemo].bg}
              name={DEMO_CASES[activeDemo].label}
              replayLabel={t('demoReplay')}
              runningLabel={t('demoRunning')}
            />
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Cases */}
        <section style={{ padding: '56px 24px', background: 'rgba(240,232,225,0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('casesLabel')}</div>
            <h2 className="claw-h2">{t('casesTitle')}</h2>
            <p className="claw-lead">{t('casesLead')}</p>

            <div className="sc-cases-grid">
              {CASES.map((c, i) => (
                <div key={i} className="claw-card" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: 28 }}>{c.emoji}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#9e8074', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c.client}</div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginTop: 2 }}>{c.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65, margin: '0 0 16px' }}>{c.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(42,31,25,0.07)' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(230,92,70,0.1)', color: '#bf3f30', padding: '3px 10px', borderRadius: 100 }}>
                      {c.tag}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2a7a4a' }}>
                      ✓ {c.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Pricing */}
        <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">{t('pricingLabel')}</div>
          <h2 className="claw-h2">{t('pricingTitle')}</h2>
          <p className="claw-lead">{t('pricingLead')}</p>

          <div className="sc-pricing-grid">
            {PRICING.map((plan, i) => (
              <div key={i} className={`sc-price-card${plan.highlight ? ' hi' : ''}`}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#E65C46', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                    {t('plan2Popular')}
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 600, color: '#9e8074', marginBottom: 4, fontFamily: "'Manrope', sans-serif" }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: plan.price === t('plan3Price') ? 28 : 36, fontWeight: 800, color: plan.highlight ? '#E65C46' : '#2A1F19', letterSpacing: '-0.02em' }}>
                    {plan.price}
                  </span>
                  {plan.unit && <span style={{ fontSize: 14, color: '#9e8074' }}>{plan.unit}</span>}
                </div>
                <div style={{ fontSize: 13, color: '#6B5549', marginBottom: 20, lineHeight: 1.5 }}>{plan.desc}</div>
                <div style={{ marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} className="sc-feat">
                      <div className="sc-check">✓</div>
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  className={plan.highlight ? "claw-btn-primary" : "claw-btn-ghost"}
                  style={{ width: '100%', justifyContent: 'center', padding: '11px 0', fontSize: 14 }}
                  onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 20, fontSize: 13, color: '#9e8074', textAlign: 'center' }}>
            {t('pricingNote')}
          </p>
        </section>

        <hr className="claw-divider" />

        {/* Order form */}
        <section id="order-form" style={{ padding: '56px 24px', background: 'rgba(240,232,225,0.5)' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="claw-label">{t('formLabel')}</div>
            <h2 className="claw-h2">{t('formTitle')}</h2>
            <p className="claw-lead" style={{ fontSize: 15 }}>{t('formLead')}</p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0', background: 'white', borderRadius: 16, border: '1px solid rgba(42,31,25,0.08)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: '#2A1F19', marginBottom: 8 }}>{t('submittedTitle')}</h3>
                <p style={{ fontSize: 14, color: '#6B5549' }}>{t('submittedDesc')}</p>
                <button className="claw-btn-ghost" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>{t('submittedBack')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(42,31,25,0.08)', padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="name" className="claw-form-label">{t('formNameLabel')}</label>
                    <input id="name" required className="claw-input" value={formData.name} onChange={handleChange} placeholder="张三" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="contact" className="claw-form-label">{t('formContactLabel')}</label>
                    <input id="contact" required className="claw-input" value={formData.contact} onChange={handleChange} placeholder={t('formContactPlaceholder')} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="desc" className="claw-form-label">{t('formDescLabel')}</label>
                  <textarea id="desc" required rows={5} className="claw-textarea" value={formData.desc} onChange={handleChange}
                    placeholder={t('formDescPlaceholder')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="budget" className="claw-form-label">{t('formBudgetLabel')}</label>
                  <select id="budget" className="claw-input" value={formData.budget} onChange={handleChange} style={{ cursor: 'pointer' }}>
                    <option value="">{t('budgetUnknown')}</option>
                    <option value="500以内">{t('budget1')}</option>
                    <option value="500-2000">{t('budget2')}</option>
                    <option value="2000-5000">{t('budget3')}</option>
                    <option value="5000以上">{t('budget4')}</option>
                  </select>
                </div>
                <button type="submit" className="claw-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 0', fontSize: 15, fontWeight: 700 }}>
                  <Zap size={16} />
                  {t('formSubmitBtn')}
                </button>
                <p style={{ textAlign: 'center', fontSize: 12, color: '#9e8074', margin: 0 }}>
                  {t('formNote')}
                </p>
              </form>
            )}
          </div>
        </section>

        <hr className="claw-divider" />

        {/* FAQ */}
        <section style={{ padding: '56px 24px', maxWidth: 720, margin: '0 auto' }}>
          <div className="claw-label">{t('faqLabel')}</div>
          <h2 className="claw-h2">{t('faqTitle')}</h2>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="claw-accordion">
                <button className="claw-accordion-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  {openFaq === i
                    ? <ChevronUp size={16} style={{ flexShrink: 0, marginLeft: 8 }} />
                    : <ChevronDown size={16} style={{ flexShrink: 0, marginLeft: 8 }} />
                  }
                </button>
                {openFaq === i && (
                  <div className="claw-accordion-body">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <ClawFooter />
      </div>
    </>
  );
}
