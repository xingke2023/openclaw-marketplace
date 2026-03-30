'use client';

import { useTranslations } from 'next-intl';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function TermsPage() {
  const t = useTranslations('terms');
  return (
    <>
      <style>{clawStyles + `
        .terms-content h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2A1F19;
          margin: 36px 0 10px;
          letter-spacing: -0.01em;
        }
        .terms-content p {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .terms-content ul {
          margin: 0 0 14px;
          padding-left: 20px;
        }
        .terms-content ul li {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .terms-content strong { color: #2A1F19; font-weight: 600; }
        .terms-upper { text-transform: uppercase; font-size: 14px; }
      `}</style>
      <div className="claw-page">
        <ClawNav />
        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('labelTag')}</div>
            <h1 className="claw-h1">{t('title')}</h1>
            <p className="claw-lead" style={{ marginBottom: 0 }}>
              {t('lead')}
            </p>
            <p style={{ fontSize: 13, color: '#9e8074', marginTop: 16 }}>{t('lastUpdated')}</p>
          </section>

          <hr className="claw-divider" />

          <section style={{ padding: '48px 24px 96px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="terms-content">

            <h2>{t('s1Title')}</h2>
            <p>
              {t('s1Desc')}
            </p>

            <h2>{t('s2Title')}</h2>
            <p>
              {t('s2Desc')}
            </p>

            <h2>{t('s3Title')}</h2>
            <ul>
              <li>{t('s3Item1')}</li>
              <li>{t('s3Item2')}</li>
              <li>{t('s3Item3')}</li>
            </ul>

            <h2>{t('s4Title')}</h2>
            <ul>
              <li>{t('s4Item1')}</li>
              <li>{t('s4Item2')}</li>
              <li>{t('s4Item3')}</li>
              <li>{t('s4Item4')}</li>
            </ul>

            <h2>{t('s5Title')}</h2>
            <p>
              {t('s5Lead')}
            </p>
            <ul>
              <li>{t('s5Item1')}</li>
              <li>{t('s5Item2')}</li>
              <li>{t('s5Item3')}</li>
              <li>{t('s5Item4')}</li>
            </ul>
            <p>
              {t('s5Contact')}
            </p>

            <h2>{t('s6Title')}</h2>
            <p>{t('s6Lead')}</p>
            <ul>
              <li>{t('s6Item1')}</li>
              <li>{t('s6Item2')}</li>
              <li>{t('s6Item3')}</li>
              <li>{t('s6Item4')}</li>
              <li>{t('s6Item5')}</li>
              <li>{t('s6Item6')}</li>
            </ul>

            <h2>{t('s7Title')}</h2>
            <p className="terms-upper">
              {t('s7Desc')}
            </p>

            <h2>{t('s8Title')}</h2>
            <p className="terms-upper">
              {t('s8Desc1')}
            </p>
            <p className="terms-upper">
              {t('s8Desc2')}
            </p>

            <h2>{t('s9Title')}</h2>
            <p>
              {t('s9Desc')}
            </p>

            <h2>{t('s10Title')}</h2>
            <p>
              {t('s10Desc')}
            </p>

            <h2>{t('s11Title')}</h2>
            <p>
              {t('s11Desc')}
            </p>

            <h2>{t('s12Title')}</h2>
            <p>
              {t('s12Desc')}
            </p>

            <h2>{t('s13Title')}</h2>
            <p>
              {t('s13Lead')}
            </p>
            <p>
              {t('s13Company')}
            </p>
          </div>
          </section>
        </main>
        <ClawFooter />
      </div>
    </>
  );
}
