'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function CompanyPage() {
  const t = useTranslations('company');
  return (
    <>
      <style>{clawStyles + `
        .company-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 32px;
        }
        .company-three {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .company-grid { grid-template-columns: 1fr; }
          .company-three { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>
      <div className="claw-page">
        <ClawNav />

        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('labelTag')}</div>
            <h1 className="claw-h1">
              {t('heroTitle')} <span className="claw-accent">{t('heroTitleAccent')}</span>
            </h1>
            <p className="claw-lead">
              {t('heroLead')}
            </p>
          </section>

          <hr className="claw-divider" />

          {/* Mission */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div className="claw-label">{t('missionLabel')}</div>
                <h2 className="claw-h2">{t('missionTitle')}<span className="claw-accent">{t('missionTitleAccent')}</span></h2>
                <p className="claw-body">
                  {t('missionBody1')}
                </p>
                <p className="claw-body">
                  {t('missionBody2')}
                </p>
              </div>
              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { num: t('missionStat1Num'), label: t('missionStat1Label'), desc: t('missionStat1Desc') },
                  { num: t('missionStat2Num'), label: t('missionStat2Label'), desc: t('missionStat2Desc') },
                  { num: t('missionStat3Num'), label: t('missionStat3Label'), desc: t('missionStat3Desc') },
                ].map((item, i) => (
                  <div key={i} className="claw-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 20px' }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 800, color: '#E65C46', flexShrink: 0, lineHeight: 1 }}>{item.num}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#2A1F19', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.55 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <hr className="claw-divider" />

          {/* What we do */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('whatLabel')}</div>
            <h2 className="claw-h2">{t('whatTitle')}</h2>
            <p className="claw-body" style={{ marginBottom: 0 }}>
              {t('whatBody')}
            </p>
            <div className="company-grid">
              {[
                {
                  emoji: '🤖',
                  title: t('item1Title'),
                  desc: t('item1Desc'),
                },
                {
                  emoji: '📱',
                  title: t('item2Title'),
                  desc: t('item2Desc'),
                },
                {
                  emoji: '⚡',
                  title: t('item3Title'),
                  desc: t('item3Desc'),
                },
                {
                  emoji: '🛡️',
                  title: t('item4Title'),
                  desc: t('item4Desc'),
                },
              ].map((item, i) => (
                <div key={i} className="claw-card claw-card-hover" style={{ padding: '24px' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{item.emoji}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="claw-divider" />

          {/* Values */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('valuesLabel')}</div>
            <h2 className="claw-h2">{t('valuesTitle')}</h2>
            <div className="company-three">
              {[
                { icon: '🎯', title: t('value1Title'), desc: t('value1Desc') },
                { icon: '🔓', title: t('value2Title'), desc: t('value2Desc') },
                { icon: '🤝', title: t('value3Title'), desc: t('value3Desc') },
              ].map((item, i) => (
                <div key={i} className="claw-card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="claw-divider" />

          {/* Company info */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('infoLabel')}</div>
            <h2 className="claw-h2">{t('contactTitle')}</h2>
            <div className="company-grid">
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9e8074', marginBottom: 16 }}>{t('registeredLabel')}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  HONGKONG MACRODATA TECHNOLOGY LIMITED
                </div>
                <div style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65 }}>
                  {t('companyAddress')}<br />
                  {t('companyFocus')}
                </div>
              </div>
              <div className="claw-card" style={{ padding: '28px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9e8074', marginBottom: 16 }}>{t('contactLabel')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#9e8074', fontWeight: 600, marginBottom: 2 }}>{t('businessLabel')}</div>
                    <a href="mailto:xiaomi@xingke888.com" style={{ fontSize: 15, color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>xiaomi@xingke888.com</a>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#9e8074', fontWeight: 600, marginBottom: 2 }}>{t('websiteLabel')}</div>
                    <a href="https://www.clawmart.cn" style={{ fontSize: 15, color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>www.clawmart.cn</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '56px 24px 72px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
            <div className="claw-highlight-box" style={{ textAlign: 'left', marginBottom: 32 }}>
              <p style={{ fontSize: 15, color: '#6B5549', lineHeight: 1.7, margin: 0 }}>
                {t('ctaHighlight')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="claw-btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>{t('ctaBrowse')}</Link>
              <a href="mailto:xiaomi@xingke888.com" className="claw-btn-ghost" style={{ padding: '12px 28px', fontSize: 15 }}>{t('ctaContact')}</a>
            </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
