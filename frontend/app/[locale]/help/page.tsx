'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useState } from "react";

export default function HelpPage() {
  const t = useTranslations('help');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQS = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') },
  ];

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
            <div className="claw-label">{t('labelTag')}</div>
            <h1 className="claw-h1">{t('title')}<span className="claw-accent">{t('titleAccent')}</span></h1>
            <p className="claw-lead">
              {t('lead')}
            </p>
            <a
              href="mailto:xiaomi@xingke888.com"
              className="claw-btn-primary"
              style={{ fontSize: 15, padding: '12px 32px' }}
            >
              {t('emailUsBtn')}
            </a>
          </section>

          <hr className="claw-divider" />

          {/* Contact cards */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('contactLabel')}</div>
            <h2 className="claw-h2">{t('contactTitle')}</h2>
            <div className="help-contact-grid">
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>📧</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>{t('emailTitle')}</div>
                <a href="mailto:xiaomi@xingke888.com" style={{ fontSize: 15, color: '#E65C46', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' as const }}>
                  xiaomi@xingke888.com
                </a>
                <p style={{ fontSize: 13, color: '#9e8074', margin: '8px 0 0', lineHeight: 1.6 }}>
                  {t('emailDesc')}
                </p>
              </div>
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>⏱️</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>{t('responseTitle')}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#E65C46', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t('responseTime')}</div>
                <p style={{ fontSize: 13, color: '#9e8074', margin: '8px 0 0', lineHeight: 1.6 }}>
                  {t('responseDesc')}
                </p>
              </div>
            </div>
          </section>

          <hr className="claw-divider" />

          {/* FAQ */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('faqLabel')}</div>
            <h2 className="claw-h2">{t('faqTitle')}</h2>
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
            <h2 className="claw-h2">{t('ctaTitle')}</h2>
            <p className="claw-lead" style={{ marginBottom: 24 }}>
              {t('ctaLead')}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:xiaomi@xingke888.com" className="claw-btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>
                {t('ctaContact')}
              </a>
              <Link href="/" className="claw-btn-ghost" style={{ padding: '12px 28px', fontSize: 15 }}>
                {t('ctaHome')}
              </Link>
            </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
