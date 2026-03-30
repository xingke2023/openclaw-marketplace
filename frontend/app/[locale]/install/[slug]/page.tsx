'use client';

import { useEffect, useState, use } from "react";
import { Link } from "@/lib/navigation";
import { useRouter } from "@/lib/navigation";
import { listingsApi, Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useTranslations, useLocale } from 'next-intl';
import { localName, localDesc } from "@/lib/localize";
import {
  ChevronLeft, Download, CheckCircle2, Terminal,
  Package, Zap, ArrowRight, Copy, Check, ExternalLink, Loader2
} from "lucide-react";

export default function InstallPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const t = useTranslations('install');
  const locale = useLocale();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [mode, setMode] = useState<'openclaw' | 'service'>('openclaw');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const fetchAndCheck = async () => {
      try {
        const l = await listingsApi.getListing(slug);
        setListing(l);
        if (token) {
          const { owned } = await listingsApi.checkPurchased(l.id, token);
          if (!owned) {
            router.push(`/listings/${slug}`);
            return;
          }
          setAuthorized(true);
        }
      } catch {
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchAndCheck();
  }, [slug, isAuthenticated, token, router]);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading || !listing || !authorized) {
    return (
      <>
        <style>{clawStyles}</style>
        <div className="claw-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Loader2 size={28} style={{ color: '#E65C46', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </>
    );
  }

  const zipFileName = `${listing.slug}.zip`;
  const skillId = listing.slug;
  const displayName = localName(listing, locale);
  const displayDesc = localDesc(listing, locale);

  return (
    <>
      <style>{clawStyles + installStyles}</style>
      <div className="claw-page">
        <ClawNav />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
          {/* Back */}
          <Link href="/dashboard?tab=purchases" className="install-back">
            <ChevronLeft size={15} /> {t('backLink')}
          </Link>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 40 }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>🤖</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span className="claw-card-badge" style={{ position: 'static', display: 'inline-block' }}>{listing.category}</span>
                <span style={{ fontSize: 12, color: '#4a9e6b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={12} /> {t('owned')}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 800, color: '#2A1F19', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {displayName}
              </h1>
              <p style={{ fontSize: 14, color: '#6B5549', margin: 0, lineHeight: 1.6 }}>
                {displayDesc}
              </p>
            </div>
          </div>

          {/* Download ZIP */}
          <div className="claw-card" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 6 }}>
                  {t('skillPackLabel')}
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 4 }}>
                  {zipFileName}
                </div>
                <div style={{ fontSize: 13, color: '#9e8074' }}>
                  {t('skillPackContains')}
                </div>
              </div>
              <a
                href={`/api/placeholder-zip/${listing.slug}`}
                download={zipFileName}
                className="install-dl-btn"
                onClick={e => {
                  // Simulate download with a real zip blob
                  e.preventDefault();
                  const content = generateZipReadme(listing, t, displayName, displayDesc);
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${listing.slug}-readme.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={16} />
                {t('downloadBtn')}
              </a>
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19', marginBottom: 12 }}>{t('selectMode')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={`install-mode-btn${mode === 'openclaw' ? ' active' : ''}`}
                onClick={() => setMode('openclaw')}
              >
                <Zap size={15} />
                {t('modeHasOpenClaw')}
              </button>
              <button
                className={`install-mode-btn${mode === 'service' ? ' active' : ''}`}
                onClick={() => setMode('service')}
              >
                <Package size={15} />
                {t('modeNoOpenClaw')}
              </button>
            </div>
          </div>

          {/* Mode: has OpenClaw */}
          {mode === 'openclaw' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="claw-highlight-box" style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 13, color: '#6B5549' }}>
                  {t('hasOpenClawHint')}
                </div>
              </div>

              {[
                {
                  step: 1,
                  title: t('step1Title'),
                  desc: t('step1Desc'),
                  code: null,
                  lang: null,
                },
                {
                  step: 2,
                  title: t('step2Title'),
                  desc: t('step2Desc'),
                  code: skillId,
                  lang: 'skill-id',
                },
                {
                  step: 3,
                  title: t('step3Title'),
                  desc: t('step3Desc'),
                  code: null,
                  lang: null,
                },
                {
                  step: 4,
                  title: t('step4Title'),
                  desc: t('step4Desc'),
                  code: `@${skillId} 你好，请介绍一下你的功能`,
                  lang: 'prompt',
                },
              ].map(item => (
                <div key={item.step} className="claw-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div className="claw-step-num" style={{ flexShrink: 0, marginTop: 2 }}>{item.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65, marginBottom: item.code ? 14 : 0 }}>
                        {item.desc}
                      </div>
                      {item.code && (
                        <div className="install-code-block">
                          <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 13 }}>{item.code}</span>
                          <button
                            className="install-copy-btn"
                            onClick={() => copy(item.code!, `step-${item.step}`)}
                          >
                            {copied === `step-${item.step}` ? <Check size={13} /> : <Copy size={13} />}
                            {copied === `step-${item.step}` ? t('copied') : t('copy')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mode: no OpenClaw */}
          {mode === 'service' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="claw-highlight-box" style={{ marginBottom: 4, borderLeftColor: '#f5a623', background: 'rgba(245,166,35,0.06)' }}>
                <div style={{ fontSize: 13, color: '#6B5549' }}>
                  {t('noOpenClawHint')}
                </div>
              </div>

              {/* What's included */}
              <div className="claw-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 16 }}>
                  {t('serviceIncludesLabel')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { icon: '🖥️', title: t('serviceInclude1Title'), desc: t('serviceInclude1Desc') },
                    { icon: '🤖', title: t('serviceInclude2Title'), desc: `安装并配置「${displayName}」` },
                    { icon: '🔑', title: t('serviceInclude3Title'), desc: t('serviceInclude3Desc') },
                    { icon: '✅', title: t('serviceInclude4Title'), desc: t('serviceInclude4Desc') },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 16px', background: '#F8F2ED', borderRadius: 10 }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19', marginBottom: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: '#9e8074', lineHeight: 1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              {[
                {
                  step: 1,
                  title: t('serviceStep1Title'),
                  desc: t('serviceStep1Desc'),
                  action: (
                    <Link href={`/sourcing?skill=${listing.slug}&service=install`} className="claw-btn-primary" style={{ display: 'inline-flex', marginTop: 14 }}>
                      {t('serviceStep1Btn')} <ArrowRight size={15} />
                    </Link>
                  ),
                },
                {
                  step: 2,
                  title: t('serviceStep2Title'),
                  desc: t('serviceStep2Desc'),
                  action: null,
                },
                {
                  step: 3,
                  title: t('serviceStep3Title'),
                  desc: t('serviceStep3Desc'),
                  action: null,
                },
              ].map(item => (
                <div key={item.step} className="claw-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div className="claw-step-num" style={{ flexShrink: 0, marginTop: 2 }}>{item.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>{item.desc}</div>
                      {item.action}
                    </div>
                  </div>
                </div>
              ))}

              {/* What is OpenClaw */}
              <div className="claw-card" style={{ padding: 24, background: '#2A1F19' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,242,237,0.5)', marginBottom: 12 }}>
                  {t('whatIsOpenClawLabel')}
                </div>
                <p style={{ fontSize: 14, color: 'rgba(248,242,237,0.85)', lineHeight: 1.7, margin: '0 0 16px' }}>
                  {t('whatIsOpenClawDesc')}
                </p>
                <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#E65C46', textDecoration: 'none' }}>
                  {t('learnMoreOpenClaw')} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#9e8074', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              {t('faqLabel')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { q: t('faq.q1'), a: t('faq.a1') },
                { q: t('faq.q2'), a: t('faq.a2') },
                { q: t('faq.q3'), a: t('faq.a3') },
                { q: t('faq.q4'), a: t('faq.a4') },
              ].map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
            </div>
          </div>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="claw-accordion">
      <button className="claw-accordion-btn" onClick={() => setOpen(v => !v)}>
        <span>{q}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none', fontSize: 18, color: '#9e8074', lineHeight: 1 }}>+</span>
      </button>
      {open && <div className="claw-accordion-body">{a}</div>}
    </div>
  );
}

function generateZipReadme(listing: Listing, t: ReturnType<typeof useTranslations<'install'>>, displayName: string, displayDesc: string | null): string {
  return `
================================================================
  ${displayName}
  ${t('readmeFrom')}
================================================================

${t('readmeSkillId')}: ${listing.slug}
${t('readmeCategory')}: ${listing.category}

${t('readmeDescription')}
${displayDesc || t('readmeNoDesc')}

${t('readmeInstallTitle')}
1. 打开 OpenClaw 技能管理器
2. 在搜索框输入 Skill ID: ${listing.slug}
3. 点击「安装」完成一键安装
4. 或选择「从文件导入」，选中此 ZIP 文件

${t('readmeUsageTitle')}
在 OpenClaw 对话框中输入：
@${listing.slug} [你的指令]

例如：
@${listing.slug} 你好，请介绍你的功能

${t('readmeServiceTitle')}
如果你还没有安装 OpenClaw，可以访问：
https://clawmart.ai/sourcing?skill=${listing.slug}&service=install
提交一站式安装需求，我们的工程师将远程协助你完成配置。

${t('readmeSupportTitle')}
- 官网: https://clawmart.ai
- 众包需求: https://clawmart.ai/sourcing

================================================================
© 2026 CLAW MART · An OpenClaw Project
================================================================
`.trim();
}

const installStyles = `
  .install-back {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 13px; font-weight: 600; color: #9e8074;
    text-decoration: none; margin-bottom: 36px; transition: color 0.15s;
  }
  .install-back:hover { color: #2A1F19; }

  .install-dl-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #2A1F19; color: white;
    font-size: 14px; font-weight: 600;
    padding: 11px 22px; border-radius: 10px;
    text-decoration: none; font-family: 'Manrope', sans-serif;
    transition: background 0.15s, transform 0.1s; white-space: nowrap;
    flex-shrink: 0;
  }
  .install-dl-btn:hover { background: #3d2d24; transform: translateY(-1px); }

  .install-mode-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 600;
    border: 1.5px solid rgba(42,31,25,0.15); background: white; color: #6B5549;
    cursor: pointer; font-family: 'Manrope', sans-serif; transition: all 0.15s;
  }
  .install-mode-btn:hover { border-color: #E65C46; color: #E65C46; }
  .install-mode-btn.active { background: #E65C46; color: white; border-color: #E65C46; }

  .install-code-block {
    display: flex; align-items: center; gap: 12;
    background: #2A1F19; border-radius: 8px;
    padding: 12px 16px; color: #F8F2ED;
    gap: 12px;
  }

  .install-copy-btn {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(248,242,237,0.12); color: rgba(248,242,237,0.8);
    border: none; padding: 4px 10px; border-radius: 6px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    font-family: 'Manrope', sans-serif; transition: background 0.12s;
    white-space: nowrap; flex-shrink: 0;
  }
  .install-copy-btn:hover { background: rgba(248,242,237,0.2); }

  .claw-card-badge {
    background: rgba(248,242,237,0.92); font-size: 11px; font-weight: 700;
    color: #6B5549; padding: 3px 10px; border-radius: 100px;
    border: 1px solid rgba(42,31,25,0.1);
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 600px) {
    .install-mode-btn { font-size: 13px; padding: 9px 14px; }
  }
`;
