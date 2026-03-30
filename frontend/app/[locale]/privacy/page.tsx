'use client';

import { useTranslations } from 'next-intl';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  return (
    <>
      <style>{clawStyles + `
        .privacy-content h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #2A1F19;
          margin: 36px 0 10px;
          letter-spacing: -0.01em;
        }
        .privacy-content p {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin: 0 0 14px;
        }
        .privacy-content ul {
          margin: 0 0 14px;
          padding-left: 20px;
        }
        .privacy-content ul li {
          font-size: 15px;
          color: #6B5549;
          line-height: 1.75;
          margin-bottom: 6px;
        }
        .privacy-content strong { color: #2A1F19; font-weight: 600; }
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
          <div className="privacy-content">

            <h2>{t('s1Title')}</h2>
            <p><strong>{t('s1ActiveProvided')}</strong></p>
            <ul>
              <li>{t('s1Active1')}</li>
              <li>{t('s1Active2')}</li>
              <li>{t('s1Active3')}</li>
              <li>{t('s1Active4')}</li>
            </ul>
            <p><strong>{t('s1AutoCollected')}</strong></p>
            <ul>
              <li>{t('s1Auto1')}</li>
              <li>{t('s1Auto2')}</li>
              <li>{t('s1Auto3')}</li>
            </ul>
            <p><strong>{t('s1ThirdParty')}</strong></p>
            <p>
              {t('s1ThirdPartyDesc')}
            </p>

            <h2>{t('s2Title')}</h2>
            <p>{t('s2Lead')}</p>
            <ul>
              <li>{t('s2Use1')}</li>
              <li>{t('s2Use2')}</li>
              <li>{t('s2Use3')}</li>
              <li>{t('s2Use4')}</li>
              <li>{t('s2Use5')}</li>
              <li>{t('s2Use6')}</li>
              <li>{t('s2Use7')}</li>
            </ul>
            <p>{t('s2NoMarketing')}</p>

            <h2>{t('s3Title')}</h2>
            <p>{t('s3Lead')}</p>
            <ul>
              <li><strong>{t('s3Share1').split('：')[0]}：</strong>{t('s3Share1').split('：')[1]}</li>
              <li><strong>{t('s3Share2').split('：')[0]}：</strong>{t('s3Share2').split('：')[1]}</li>
              <li><strong>{t('s3Share3').split('：')[0]}：</strong>{t('s3Share3').split('：')[1]}</li>
              <li><strong>{t('s3Share4').split('：')[0]}：</strong>{t('s3Share4').split('：')[1]}</li>
              <li><strong>{t('s3Share5').split('：')[0]}：</strong>{t('s3Share5').split('：')[1]}</li>
            </ul>

            <h2>{t('s4Title')}</h2>
            <p>
              {t('s4Desc1')}
            </p>
            <p>
              {t('s4Desc2')}
            </p>

            <h2>{t('s5Title')}</h2>
            <p>
              {t('s5Lead')}
            </p>
            <ul>
              <li>{t('s5Except1')}</li>
              <li>{t('s5Except2')}</li>
            </ul>

            <h2>{t('s6Title')}</h2>
            <p>{t('s6Lead')}</p>
            <ul>
              <li><strong>{t('s6Right1').split('：')[0]}：</strong>{t('s6Right1').split('：')[1]}</li>
              <li><strong>{t('s6Right2').split('：')[0]}：</strong>{t('s6Right2').split('：')[1]}</li>
              <li><strong>{t('s6Right3').split('：')[0]}：</strong>{t('s6Right3').split('：')[1]}</li>
              <li><strong>{t('s6Right4').split('：')[0]}：</strong>{t('s6Right4').split('：')[1]}</li>
              <li><strong>{t('s6Right5').split('：')[0]}：</strong>{t('s6Right5').split('：')[1]}</li>
            </ul>
            <p>
              {t('s6Contact')}
            </p>

            <h2>{t('s7Title')}</h2>
            <p>{t('s7Lead')}</p>
            <ul>
              <li><strong>{t('s7Cookie1').split('：')[0]}：</strong>{t('s7Cookie1').split('：')[1]}</li>
              <li><strong>{t('s7Cookie2').split('：')[0]}：</strong>{t('s7Cookie2').split('：')[1]}</li>
              <li><strong>{t('s7Cookie3').split('：')[0]}：</strong>{t('s7Cookie3').split('：')[1]}</li>
            </ul>
            <p>{t('s7Manage')}</p>

            <h2>{t('s8Title')}</h2>
            <p>
              {t('s8Desc')}
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
              {t('s11Lead')}
            </p>
            <p>
              <strong>{t('s11CompanyLabel')}</strong>HONGKONG MACRODATA TECHNOLOGY LIMITED<br />
              <strong>{t('s11EmailLabel')}</strong><a href="mailto:xiaomi@xingke888.com" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>xiaomi@xingke888.com</a>
            </p>

          </div>
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
