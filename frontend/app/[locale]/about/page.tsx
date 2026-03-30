'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <>
      <style>{clawStyles + `
        .about-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
        .about-three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 32px 0; }
        @media (max-width: 640px) {
          .about-two-col { grid-template-columns: 1fr; }
          .about-three-col { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>
      <div className="claw-page">
        <ClawNav />

        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('heroLabel')}</div>
            <h1 className="claw-h1">OpenClaw<br /><span className="claw-accent">{t('heroTitleAccent')}</span></h1>
            <p className="claw-lead">
              {t('heroLead')}
            </p>
            <p className="claw-body">
              {t('heroBody')}
            </p>
          </section>

          <hr className="claw-divider" />

          {/* Two product types */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <h2 className="claw-h2">{t('productTypesTitle')}</h2>
            <div className="about-two-col">
              {[
                {
                  emoji: '🧑‍💼',
                  title: t('personaTitle'),
                  desc: t('personaDesc'),
                  note: t('personaNote'),
                },
                {
                  emoji: '⚡',
                  title: t('skillTitle'),
                  desc: t('skillDesc'),
                  note: t('skillNote'),
                },
              ].map((item, i) => (
                <div key={i} className="claw-card">
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: '#2A1F19', margin: '0 0 10px' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65, marginBottom: 16 }}>{item.desc}</p>
                  <p style={{ fontSize: 12, color: '#9e8074', borderTop: '1px solid rgba(42,31,25,0.08)', paddingTop: 14, margin: 0 }}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="claw-divider" />

          {/* How it works */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }} className="claw-muted-section">
            <h2 className="claw-h2">{t('howItWorksTitle')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 32 }}>
              {[
                { num: '1', title: t('step1Title'), desc: t('step1Desc') },
                { num: '2', title: t('step2Title'), desc: t('step2Desc') },
                { num: '3', title: t('step3Title'), desc: t('step3Desc') },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div className="claw-step-num">{step.num}</div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: '#2A1F19', margin: '0 0 6px' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="claw-divider" />

          {/* For creators */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <h2 className="claw-h2">{t('creatorsTitle')}</h2>
            <p className="claw-body">
              {t('creatorsBody')}
            </p>
            <div className="about-three-col">
              {[
                { stat: t('stat1Num'), desc: t('stat1Desc') },
                { stat: t('stat2Num'), desc: t('stat2Desc') },
                { stat: t('stat3Num'), desc: t('stat3Desc') },
              ].map((item, i) => (
                <div key={i} className="claw-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: '#E65C46', marginBottom: 8 }}>{item.stat}</div>
                  <div style={{ fontSize: 13, color: '#6B5549' }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#" className="claw-btn-primary">{t('startSellingBtn')}</a>
              <a href="#" className="claw-btn-ghost">{t('creatorTermsBtn')}</a>
            </div>
          </section>

          <hr className="claw-divider" />

          {/* Why this exists */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }} className="claw-muted-section">
            <h2 className="claw-h2">{t('whyTitle')}</h2>
            <p className="claw-body">
              {t('whyBody1')}
            </p>
            <p className="claw-body">
              {t('whyBody2')}
            </p>
            <div className="claw-highlight-box">
              <p style={{ fontSize: 16, fontWeight: 700, color: '#2A1F19', margin: 0 }}>
                {t('whyHighlight')}
              </p>
            </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
