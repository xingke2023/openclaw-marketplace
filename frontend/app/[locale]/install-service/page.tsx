'use client';

import { Link } from "@/lib/navigation";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useTranslations } from 'next-intl';
import { CheckCircle2, Zap, Clock, Gift, Headphones, ShieldCheck } from "lucide-react";

export default function InstallServicePage() {
  const t = useTranslations('installService');

  const INCLUDES = [
    { icon: "🤖", title: t('include1Title'), desc: t('include1Desc') },
    { icon: "🎁", title: t('include2Title'), desc: t('include2Desc') },
    { icon: "⚡", title: t('include3Title'), desc: t('include3Desc') },
    { icon: "🛡️", title: t('include4Title'), desc: t('include4Desc') },
  ];

  const STEPS = [
    { num: "1", title: t('step1Title'), desc: t('step1Desc') },
    { num: "2", title: t('step2Title'), desc: t('step2Desc') },
    { num: "3", title: t('step3Title'), desc: t('step3Desc') },
    { num: "4", title: t('step4Title'), desc: t('step4Desc') },
  ];

  const FAQS = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];

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
          <div className="install-hero-badge">{t('heroBadge')}</div>
          <h1 className="claw-h1" style={{ maxWidth: 720 }}>
            <span className="claw-accent">{t('heroTitle')}</span>{t('heroTitleMain')}
          </h1>
          <p className="claw-lead" style={{ maxWidth: 580 }}>
            {t('heroLead')}
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
                  {t('priceBadge')}
                </div>
              </div>
            </div>
            <div style={{ paddingBottom: 8 }}>
              <Link href="/sourcing" className="install-btn-white"
                style={{ background: '#E65C46', color: 'white', boxShadow: '0 4px 20px rgba(230,92,70,0.35)' }}>
                <Zap size={18} />
                {t('ctaBtn')}
              </Link>
              <div style={{ fontSize: 12, color: '#9e8074', marginTop: 8, fontFamily: "'Manrope', sans-serif" }}>
                {t('paymentNote')}
              </div>
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* What's included */}
        <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">{t('includesLabel')}</div>
          <h2 className="claw-h2">{t('includesTitle')}</h2>
          <p className="claw-lead">{t('includesLead')}</p>

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
              {t('valueTitle')}
            </div>
            <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.8 }}>
              {t('valueDesc').split('\n').map((line, i) => (
                <span key={i}>{line}{i < t('valueDesc').split('\n').length - 1 && <br />}</span>
              ))}
              <br />
              <strong style={{ color: '#E65C46' }}>{t('valueCta')}</strong>
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* How fast / trust points */}
        <section className="claw-muted-section" style={{ padding: '56px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('whyLabel')}</div>
            <h2 className="claw-h2">{t('whyTitle')}</h2>

            <div className="install-trust-row" style={{ marginTop: 40, justifyContent: 'flex-start', gap: 40 }}>
              {[
                { icon: <Clock size={32} color="#E65C46" />, num: t('statInstallTime'), label: t('statInstallTimeLabel') },
                { icon: <ShieldCheck size={32} color="#E65C46" />, num: t('statSuccessRate'), label: t('statSuccessRateLabel') },
                { icon: <Headphones size={32} color="#E65C46" />, num: t('statAfterSale'), label: t('statAfterSaleLabel') },
                { icon: <Gift size={32} color="#E65C46" />, num: t('statGifts'), label: t('statGiftsLabel') },
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
          <div className="claw-label">{t('stepsLabel')}</div>
          <h2 className="claw-h2">{t('stepsTitle')}</h2>
          <p className="claw-lead">{t('stepsLead')}</p>

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
            <div className="claw-label">{t('faqLabel')}</div>
            <h2 className="claw-h2">{t('faqTitle')}</h2>

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
                {t('ctaSectionBadge')}
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                {t('ctaSectionTitle').split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '0 0 32px', fontFamily: "'Manrope', sans-serif", lineHeight: 1.6 }}>
                {t('ctaSectionLead')}
              </p>
              <Link href="/sourcing" className="install-btn-white">
                <Zap size={18} />
                {t('ctaSectionBtn')}
              </Link>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 16, fontFamily: "'Manrope', sans-serif" }}>
                {t('ctaSectionNote')}
              </div>
            </div>
          </div>
        </section>

        <ClawFooter />
      </div>
    </>
  );
}
