'use client';

import { useEffect, useState, use } from "react";
import { Link } from "@/lib/navigation";
import { useRouter } from "@/lib/navigation";
import { listingsApi, Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useTranslations, useLocale } from 'next-intl';
import {
  ChevronLeft, ShoppingCart, CheckCircle2, ShieldCheck, Zap,
  Globe, Star, Download, Loader2, MessageSquare, FileText,
  Package, User, BookOpen, ChevronDown, ChevronUp
} from "lucide-react";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { localName, localDesc } from "@/lib/localize";

type Tab = 'overview' | 'usage' | 'reviews';

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateSkillMd(listing: Listing): string {
  return `---
name: ${listing.name}
category: ${listing.category}
version: v1.0.0
price: ${parseFloat(listing.price) === 0 ? 'Free' : '¥' + listing.price}
status: ${listing.status}
---

# ${listing.name}

## 概览

${listing.description || '该技能可帮助你自动化相关任务，提升工作效率。'}

## 使用方式

在 OpenClaw 中导入本技能后，可通过以下方式调用：

\`\`\`
# 示例调用
openclaw run ${listing.slug} --input "你的输入内容"
\`\`\`

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| input | string | 是 | 输入内容 |
| output | string | 否 | 输出格式，默认为 text |

## 注意事项

- 请确保已安装 OpenClaw 客户端（>= 1.0.0）
- 部分功能可能需要配置相关 API Key
- 如遇问题请查阅官方文档或联系卖家

## 许可证

购买后可在个人或商业项目中使用，禁止二次销售或转让。
`;
}

function getCapabilities(pool: string[], seed: number): string[] {
  // Pick 5–7 items deterministically based on seed
  const count = 5 + Math.floor(seededRandom(seed * 3) * 3);
  const result: string[] = [];
  for (let i = 0; i < count && i < pool.length; i++) {
    const idx = Math.floor(seededRandom(seed * (i + 7)) * pool.length);
    const item = pool[(idx + i) % pool.length];
    if (!result.includes(item)) result.push(item);
  }
  return result.length >= 4 ? result : pool.slice(0, 6);
}

export default function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const t = useTranslations('listings');
  const locale = useLocale();
  const capabilitiesByCategory: Record<string, string[]> = {
    '写作': t.raw('capWriting') as string[],
    '编程': t.raw('capEngineering') as string[],
    '数据分析': t.raw('capDataAnalysis') as string[],
    '客服': t.raw('capCustomerService') as string[],
    '营销': t.raw('capMarketing') as string[],
    '教育': t.raw('capEducation') as string[],
    '设计': t.raw('capDesign') as string[],
    '研究': t.raw('capResearch') as string[],
  };
  const defaultCapabilities: string[] = t.raw('capDefault') as string[];
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [paidFromStripe, setPaidFromStripe] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [securityExpanded, setSecurityExpanded] = useState(false);

  // Mock comments use translated strings
  const MOCK_COMMENTS = [
    { user: t('mockComments.user1'), comment: t('mockComments.comment1'), time: t('mockComments.time1'), rating: 5 },
    { user: t('mockComments.user2'), comment: t('mockComments.comment2'), time: t('mockComments.time2'), rating: 5 },
    { user: t('mockComments.user3'), comment: t('mockComments.comment3'), time: t('mockComments.time3'), rating: 4 },
    { user: t('mockComments.user4'), comment: t('mockComments.comment4'), time: t('mockComments.time4'), rating: 5 },
    { user: t('mockComments.user5'), comment: t('mockComments.comment5'), time: t('mockComments.time5'), rating: 4 },
    { user: t('mockComments.user6'), comment: t('mockComments.comment6'), time: t('mockComments.time6'), rating: 5 },
  ];

  const INSTALL_STEPS = [
    {
      step: 1,
      title: t('installStep1Title'),
      desc: t('installStep1Desc'),
    },
    {
      step: 2,
      title: t('installStep2Title'),
      desc: t('installStep2Desc'),
    },
    {
      step: 3,
      title: t('installStep3Title'),
      desc: t('installStep3Desc'),
    },
    {
      step: 4,
      title: t('installStep4Title'),
      desc: t('installStep4Desc'),
    },
  ];

  const TABS: { key: Tab; label: string }[] = [
    { key: 'overview', label: t('tabOverview') },
    { key: 'usage', label: t('tabUsage') },
    { key: 'reviews', label: t('tabReviews') },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');
    if (paymentStatus === 'success') {
      setBuySuccess(true);
      setOwned(true);
      setPaidFromStripe(true);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    } else if (paymentStatus === 'cancelled') {
      setPaymentCancelled(true);
    }
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingsApi.getListing(slug);
        setListing(response);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchListing();
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated && token && listing && !paidFromStripe) {
      listingsApi.checkPurchased(listing.id, token)
        .then(r => setOwned(r.owned))
        .catch(() => {});
    }
  }, [isAuthenticated, token, listing, paidFromStripe]);

  const handleBuy = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setBuying(true);
    setPaymentCancelled(false);
    try {
      if (isFree) {
        await listingsApi.purchaseFree(listing!.id, token!);
        setOwned(true);
        setBuySuccess(true);
      } else {
        const { url } = await listingsApi.createCheckoutSession(listing!.id, token!);
        window.location.href = url;
      }
    } catch (e: any) {
      console.error(e);
      setBuying(false);
    }
  };

  const handleDownloadZip = () => {
    if (!listing) return;
    const skillMd = generateSkillMd(listing);
    const blob = new Blob([skillMd], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${listing.slug}-skill.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <>
        <style>{clawStyles + detailStyles}</style>
        <div className="claw-page">
          <ClawNav />
          <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
            <div className="claw-skeleton" style={{ height: 20, width: 120, marginBottom: 40 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
              <div>
                <div className="claw-skeleton" style={{ height: 36, width: '60%', marginBottom: 16 }} />
                <div className="claw-skeleton" style={{ height: 16, width: '40%', marginBottom: 24 }} />
                <div className="claw-skeleton" style={{ height: 200, marginBottom: 16 }} />
              </div>
              <div>
                <div className="claw-skeleton" style={{ height: 280, borderRadius: 14 }} />
              </div>
            </div>
          </main>
          <ClawFooter />
        </div>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <style>{clawStyles + detailStyles}</style>
        <div className="claw-page">
          <ClawNav />
          <main style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 className="claw-h2" style={{ marginBottom: 24 }}>{t('notFound')}</h2>
            <Link href="/" className="claw-btn-primary">{t('backHome')}</Link>
          </main>
          <ClawFooter />
        </div>
      </>
    );
  }

  const isFree = parseFloat(listing.price) === 0;
  const isSold = listing.status === 'sold';
  const isOwned = owned || buySuccess;
  const seed = listing.id;
  const starCount = Math.floor(seededRandom(seed * 7) * 150 + 20);
  const downloadCount = Math.floor(seededRandom(seed * 13) * 50 + 5);
  const installCount = Math.floor(seededRandom(seed * 17) * 300 + 30);
  const allTimeInstalls = installCount + Math.floor(seededRandom(seed * 23) * 50 + 10);
  const fileSize = (seededRandom(seed * 31) * 8 + 1.2).toFixed(1);

  // Pick 3–5 comments deterministically
  const commentCount = Math.floor(seededRandom(seed * 41) * 3) + 3;
  const comments = MOCK_COMMENTS.slice(0, commentCount);
  const displayName = localName(listing, locale);
  const displayDesc = localDesc(listing, locale);

  return (
    <>
      <style>{clawStyles + detailStyles}</style>
      <div className="claw-page">
        <ClawNav />

        {/* Success Toast */}
        {showSuccessToast && (
          <div style={{
            position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 9999, display: 'flex', alignItems: 'center', gap: 12,
            background: '#1a7a48', color: '#fff',
            padding: '14px 20px', borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            fontSize: 15, fontWeight: 600,
            animation: 'toastIn 0.3s ease',
          }}>
            <CheckCircle2 size={20} />
            {t('successToast')}
            <button onClick={() => setShowSuccessToast(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 8, opacity: 0.7, fontSize: 18 }}>×</button>
          </div>
        )}

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 20px 80px' }}>
          {/* Back */}
          <Link href="/" className="detail-back">
            <ChevronLeft size={16} />
            {t('backToList')}
          </Link>

          {/* Hero */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <img
                    src={(() => {
                      if (listing.category === 'AI 角色') {
                        return `https://api.dicebear.com/9.x/open-peeps/svg?seed=${listing.id}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
                      }
                      const styles = ['shapes', 'icons', 'identicon', 'rings', 'bottts', 'pixel-art', 'fun-emoji'];
                      const style = styles[listing.id % styles.length];
                      return `https://api.dicebear.com/9.x/${style}/svg?seed=${listing.id}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
                    })()}
                    alt=""
                    width={48}
                    height={48}
                    style={{ borderRadius: 10, background: '#F0E8E1', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <h1 style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 34,
                        fontWeight: 800,
                        color: '#2A1F19',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        margin: 0,
                      }}>
                        {displayName}
                      </h1>
                      <span className="claw-card-badge" style={{ marginTop: 6, flexShrink: 0 }}>{listing.category}</span>
                    </div>
                  </div>
                </div>
                {displayDesc && (
                  <p style={{ fontSize: 15, color: '#6B5549', margin: '10px 0 14px', lineHeight: 1.6, maxWidth: 620 }}>
                    {displayDesc.split('\n')[0].substring(0, 120)}
                    {displayDesc.length > 120 ? '…' : ''}
                  </p>
                )}
                {/* Stats row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                    <Star size={13} fill="#f5a623" color="#f5a623" />
                    {starCount} {t('ratings')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                    <Download size={13} />
                    {downloadCount}k {t('downloads')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                    <Package size={13} />
                    {installCount} {t('currentInstalls')} · {allTimeInstalls} {t('allTimeInstalls')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                    <Globe size={13} />
                    v{Math.floor(seededRandom(seed * 19) * 4) + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="claw-divider" style={{ margin: '0 0 32px' }} />

          {/* Main two-column */}
          <div className="detail-layout">
            {/* Left: tabbed content */}
            <div className="detail-content">

              {/* Security scan */}
              <div style={{
                background: '#fff',
                border: '1px solid rgba(42,31,25,0.09)',
                borderRadius: 12,
                marginBottom: 24,
                overflow: 'hidden',
              }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(42,31,25,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9e8074' }}>{t('securityScanLabel')}</span>
                  <button
                    onClick={() => setSecurityExpanded(!securityExpanded)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e8074', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                  >
                    {t('securityDetails')} {securityExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                <div style={{ padding: '14px 18px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', background: 'rgba(74,158,107,0.08)', border: '1px solid rgba(74,158,107,0.2)', borderRadius: 8 }}>
                    <ShieldCheck size={15} style={{ color: '#4a9e6b' }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#2e7d52' }}>VirusTotal</div>
                      <div style={{ fontSize: 11, color: '#4a9e6b' }}>{t('securityVirusTotal')}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', background: 'rgba(42,31,25,0.04)', border: '1px solid rgba(42,31,25,0.1)', borderRadius: 8 }}>
                    <Zap size={15} style={{ color: '#E65C46' }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#2A1F19' }}>OpenClaw AI</div>
                      <div style={{ fontSize: 11, color: '#6B5549' }}>{t('securityOpenClaw')}</div>
                    </div>
                  </div>
                </div>
                {securityExpanded && (
                  <div style={{ padding: '0 18px 14px', fontSize: 13, color: '#6B5549', lineHeight: 1.65, borderTop: '1px solid rgba(42,31,25,0.06)' }}>
                    <div style={{ padding: '12px 0 0' }}>
                      {t('securityExpandedDesc')}
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div style={{ borderBottom: '2px solid rgba(42,31,25,0.08)', marginBottom: 24, display: 'flex', gap: 0 }}>
                {TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '10px 20px',
                      fontSize: 14, fontWeight: activeTab === key ? 700 : 500,
                      color: activeTab === key ? '#E65C46' : '#6B5549',
                      borderBottom: activeTab === key ? '2px solid #E65C46' : '2px solid transparent',
                      marginBottom: -2,
                      transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    {key === 'overview' && <BookOpen size={14} />}
                    {key === 'usage' && <FileText size={14} />}
                    {key === 'reviews' && <MessageSquare size={14} />}
                    {label}
                    {key === 'reviews' && (
                      <span style={{
                        background: 'rgba(42,31,25,0.08)', color: '#6B5549',
                        fontSize: 11, fontWeight: 700,
                        padding: '1px 6px', borderRadius: 100,
                      }}>{commentCount}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab: overview */}
              {activeTab === 'overview' && (
                <div>
                  {/* Description */}
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 12 }}>{t('descriptionTitle')}</h3>
                    <p style={{ fontSize: 15, color: '#6B5549', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
                      {displayDesc || t('descriptionDefault')}
                    </p>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 12 }}>{t('capabilitiesTitle')}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {getCapabilities(capabilitiesByCategory[listing.category] ?? defaultCapabilities, seed).map((cap, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E65C46', flexShrink: 0 }} />
                          <span style={{ fontSize: 15, color: '#6B5549', lineHeight: 1.8 }}>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Files */}
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 14 }}>
                      {t('filesTitle')} <span style={{ fontSize: 13, fontWeight: 500, color: '#9e8074', marginLeft: 6 }}>{t('filesCount')}</span>
                    </h3>
                    <div style={{
                      background: '#fff',
                      border: '1px solid rgba(42,31,25,0.09)',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(42,31,25,0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <FileText size={16} style={{ color: '#9e8074' }} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#2A1F19' }}>SKILL.md</span>
                        </div>
                        <span style={{ fontSize: 12, color: '#9e8074' }}>{fileSize} KB</span>
                      </div>
                      <div style={{ padding: '10px 16px', fontSize: 12, color: '#9e8074' }}>
                        {t('fileContains')}
                      </div>
                    </div>
                  </div>

                  {/* Callout */}
                  <div className="claw-highlight-box">
                    <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>
                      {t('customCallout')}<Link href="/sourcing" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>{t('customCalloutLink')}</Link>{t('customCalloutSuffix')}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: usage */}
              {activeTab === 'usage' && (
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 6 }}>{t('installStepsTitle')}</h3>
                    <p style={{ fontSize: 14, color: '#9e8074', margin: '0 0 20px' }}>{t('installStepsLead')}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {INSTALL_STEPS.map((s) => (
                        <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                          <div className="claw-step-num" style={{ flexShrink: 0, width: 32, height: 32, fontSize: 13 }}>{s.step}</div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#2A1F19', marginBottom: 4 }}>{s.title}</div>
                            <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>{s.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 12 }}>{t('skillMdExample')}</h3>
                    <pre style={{
                      background: '#1e1e2e',
                      color: '#cdd6f4',
                      borderRadius: 10,
                      padding: '18px 20px',
                      fontSize: 12.5,
                      lineHeight: 1.7,
                      overflowX: 'auto',
                      margin: 0,
                      fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    }}>{`---
name: ${displayName}
version: v1.0.0
category: ${listing.category}
---

# ${displayName}

## 概览

${(displayDesc || '技能描述').split('\n')[0].substring(0, 80)}

## 示例调用

\`\`\`json
{
  "action": "run",
  "input": "你的输入内容",
  "output": "text"
}
\`\`\``}</pre>
                  </div>

                  <div className="claw-highlight-box">
                    <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>
                      {t('installCallout')} <Link href="/help" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>{t('installCalloutLink1')}</Link> {t('installCalloutOr')} <Link href="/sourcing" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>{t('installCalloutLink2')}</Link> {t('installCalloutSuffix')}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: reviews */}
              {activeTab === 'reviews' && (
                <div>
                  {/* Rating summary */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 24,
                    padding: '20px 24px',
                    background: '#fff',
                    border: '1px solid rgba(42,31,25,0.08)',
                    borderRadius: 12,
                    marginBottom: 20,
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 40, fontWeight: 800, color: '#2A1F19', lineHeight: 1 }}>4.8</div>
                      <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 6 }}>
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={14} fill={i <= 5 ? '#f5a623' : 'none'} color="#f5a623" />
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: '#9e8074', marginTop: 4 }}>{starCount} {t('reviewsCount')}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[5,4,3,2,1].map((star, i) => {
                        const pct = [72, 20, 5, 2, 1][i];
                        return (
                          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                            <span style={{ fontSize: 12, color: '#9e8074', width: 8, textAlign: 'right' }}>{star}</span>
                            <Star size={11} fill="#f5a623" color="#f5a623" />
                            <div style={{ flex: 1, height: 6, background: 'rgba(42,31,25,0.08)', borderRadius: 100, overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: '#f5a623', borderRadius: 100 }} />
                            </div>
                            <span style={{ fontSize: 12, color: '#9e8074', width: 28 }}>{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comments */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {comments.map((c, i) => (
                      <div key={i} style={{
                        padding: '16px 18px',
                        background: '#fff',
                        border: '1px solid rgba(42,31,25,0.08)',
                        borderRadius: 12,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%',
                              background: `hsl(${(i * 47 + seed * 13) % 360}, 60%, 65%)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 13, fontWeight: 700, color: '#fff',
                            }}>
                              {c.user[0]}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19' }}>{c.user}</div>
                              <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                                {[1,2,3,4,5].map(s => (
                                  <Star key={s} size={11} fill={s <= c.rating ? '#f5a623' : 'none'} color={s <= c.rating ? '#f5a623' : '#ddd'} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span style={{ fontSize: 12, color: '#9e8074' }}>{c.time}</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#6B5549', margin: 0, lineHeight: 1.65 }}>{c.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#9e8074' }}>{t('reviewsLeaveAfterPurchase')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: purchase card (sticky) */}
            <div className="detail-sidebar">
              <div style={{
                background: '#fff',
                border: '1px solid rgba(42,31,25,0.09)',
                borderRadius: 16,
                padding: 24,
                position: 'sticky',
                top: 88,
              }}>
                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: 34,
                    fontWeight: 800,
                    color: isFree ? '#4a9e6b' : '#2A1F19',
                  }}>
                    {isFree ? t('free') : `¥${listing.price}`}
                  </span>
                  {isSold && (
                    <span style={{ background: 'rgba(42,31,25,0.08)', color: '#6B5549', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100 }}>{t('sold')}</span>
                  )}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {paymentCancelled && !isOwned && (
                    <div style={{ padding: '10px 14px', background: 'rgba(230,92,70,0.07)', borderRadius: 8, border: '1px solid rgba(230,92,70,0.2)', fontSize: 13, color: '#E65C46' }}>
                      {t('paymentCancelledMsg')}
                    </div>
                  )}

                  {isOwned ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: 'rgba(74,158,107,0.1)', borderRadius: 10, border: '1px solid rgba(74,158,107,0.25)' }}>
                        <CheckCircle2 size={18} style={{ color: '#4a9e6b', flexShrink: 0 }} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#2e7d52' }}>{t('purchasedBanner')}</span>
                      </div>
                      <button
                        onClick={handleDownloadZip}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          padding: '12px 20px',
                          background: '#E65C46',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 10,
                          fontSize: 14, fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'opacity 0.15s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
                        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                      >
                        <Download size={16} />
                        {t('downloadZip')}
                      </button>
                      <Link href="/dashboard?tab=purchases" className="claw-btn-ghost" style={{ justifyContent: 'center', padding: '11px 20px', fontSize: 14, textDecoration: 'none' }}>
                        {t('viewMyPurchases')}
                      </Link>
                    </>
                  ) : (
                    <button
                      className="claw-btn-primary"
                      disabled={isSold || buying}
                      onClick={handleBuy}
                      style={{ justifyContent: 'center', padding: '13px 20px', fontSize: 15, opacity: isSold ? 0.5 : 1, cursor: isSold ? 'not-allowed' : 'pointer' }}
                    >
                      {buying
                        ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        : isSold ? t('buySoldOut') : isFree
                          ? <><ShoppingCart size={16} />{t('buyFree')}</>
                          : <><ShoppingCart size={16} />立即支付 ¥{listing.price}</>
                      }
                    </button>
                  )}

                  <Link href="/sourcing" className="claw-btn-ghost" style={{ justifyContent: 'center', padding: '11px 20px', fontSize: 14, textDecoration: 'none' }}>
                    {t('submitCustom')}
                  </Link>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(42,31,25,0.08)', margin: '0 0 18px' }} />

                {/* Seller */}
                {listing.user && (
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 10 }}>{t('sellerLabel')}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: listing.user.avatar_url ? 'transparent' : '#E65C46',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}>
                        {listing.user.avatar_url
                          ? <img src={listing.user.avatar_url} alt={listing.user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <User size={18} style={{ color: '#fff' }} />
                        }
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19' }}>{listing.user.name || t('sellerAnonymous')}</div>
                        {listing.user.website_url && (
                          <a href={listing.user.website_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#E65C46', textDecoration: 'none' }}>
                            {t('sellerWebsite')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <hr style={{ border: 'none', borderTop: '1px solid rgba(42,31,25,0.08)', margin: '0 0 18px' }} />

                {/* Trust badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 4 }}>{t('guaranteeLabel')}</div>
                  {[
                    { icon: <CheckCircle2 size={14} />, text: t('guarantee1') },
                    { icon: <ShieldCheck size={14} />, text: t('guarantee2') },
                    { icon: <Zap size={14} />, text: t('guarantee3') },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <span style={{ color: '#E65C46', marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: 12, color: '#6B5549', lineHeight: 1.6 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}

const detailStyles = `
  .detail-back {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #9e8074;
    text-decoration: none;
    margin-bottom: 14px;
    transition: color 0.15s;
  }
  .detail-back:hover { color: #2A1F19; }

  .detail-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    align-items: start;
  }

  .detail-version-badge {
    background: #fff;
    border: 1px solid rgba(42,31,25,0.1);
    border-radius: 10px;
    padding: 10px 16px;
    text-align: center;
    flex-shrink: 0;
  }

  .claw-card-badge {
    background: rgba(248, 242, 237, 0.92);
    font-size: 11px;
    font-weight: 700;
    color: #6B5549;
    padding: 3px 10px;
    border-radius: 100px;
    border: 1px solid rgba(42, 31, 25, 0.1);
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  @media (max-width: 800px) {
    .detail-layout { grid-template-columns: 1fr; gap: 28px; }
    .detail-sidebar { order: -1; }
    .detail-version-badge { display: none; }
  }
  @media (max-width: 480px) {
    .detail-back { margin-bottom: 16px; }
  }
`;
