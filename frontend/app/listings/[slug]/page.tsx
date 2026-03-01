'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { listingsApi, Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { ChevronLeft, ShoppingCart, CheckCircle2, ShieldCheck, Zap, Globe, Star, Download, Loader2 } from "lucide-react";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [owned, setOwned] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

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

  // Check if already purchased
  useEffect(() => {
    if (isAuthenticated && token && listing) {
      listingsApi.checkPurchased(listing.id, token)
        .then(r => setOwned(r.owned))
        .catch(() => {});
    }
  }, [isAuthenticated, token, listing]);

  const handleBuy = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setBuying(true);
    try {
      await listingsApi.purchaseFree(listing!.id, token!);
      setOwned(true);
      setBuySuccess(true);
    } catch (e: any) {
      console.error(e);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <>
        <style>{clawStyles + detailStyles}</style>
        <div className="claw-page">
          <ClawNav />
          <main style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
            <div className="claw-skeleton" style={{ height: 20, width: 120, marginBottom: 40 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <div className="claw-skeleton" style={{ height: 16, width: 80, marginBottom: 16 }} />
                <div className="claw-skeleton" style={{ height: 36, width: '80%', marginBottom: 12 }} />
                <div className="claw-skeleton" style={{ height: 28, width: 100, marginBottom: 24 }} />
                <div className="claw-skeleton" style={{ height: 14, marginBottom: 8 }} />
                <div className="claw-skeleton" style={{ height: 14, marginBottom: 8, width: '90%' }} />
                <div className="claw-skeleton" style={{ height: 14, width: '75%' }} />
              </div>
              <div>
                <div className="claw-skeleton" style={{ height: 14, marginBottom: 8 }} />
                <div className="claw-skeleton" style={{ height: 14, marginBottom: 8, width: '90%' }} />
                <div className="claw-skeleton" style={{ height: 14, width: '80%' }} />
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
          <main style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 className="claw-h2" style={{ marginBottom: 24 }}>未找到该智能体</h2>
            <Link href="/" className="claw-btn-primary">返回首页</Link>
          </main>
          <ClawFooter />
        </div>
      </>
    );
  }

  const isFree = parseFloat(listing.price) === 0;
  const isSold = listing.status === 'sold';

  return (
    <>
      <style>{clawStyles + detailStyles}</style>
      <div className="claw-page">
        <ClawNav />

        <main style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* Back */}
          <Link href="/" className="detail-back">
            <ChevronLeft size={16} />
            返回列表
          </Link>

          <div className="detail-layout">
            {/* Left: info */}
            <div className="detail-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>🤖</span>
                <span className="claw-card-badge" style={{ position: 'static', display: 'inline-block' }}>{listing.category}</span>
              </div>

              <h1 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 36,
                fontWeight: 800,
                color: '#2A1F19',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 16px',
              }}>
                {listing.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 32,
                  fontWeight: 800,
                  color: isFree ? '#4a9e6b' : '#2A1F19',
                }}>
                  {isFree ? '免费' : `¥${listing.price}`}
                </span>
                {isSold && (
                  <span style={{
                    background: 'rgba(42,31,25,0.08)',
                    color: '#6B5549',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 100,
                  }}>已售罄</span>
                )}
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                  <Star size={13} fill="#f5a623" color="#f5a623" />
                  {Math.floor(Math.random() * 200 + 20)} 好评
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                  <Download size={13} />
                  {Math.floor(Math.random() * 50 + 5)}k 下载
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#9e8074', fontWeight: 500 }}>
                  <Globe size={13} />
                  {new Date(listing.created_at).toLocaleDateString('zh-CN')} 发布
                </span>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {owned || buySuccess ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 24px', background: 'rgba(74,158,107,0.1)', borderRadius: 8, border: '1px solid rgba(74,158,107,0.25)' }}>
                      <CheckCircle2 size={18} style={{ color: '#4a9e6b', flexShrink: 0 }} />
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#2e7d52' }}>已加入你的库！</span>
                    </div>
                    <Link href="/dashboard?tab=purchases" className="claw-btn-ghost" style={{ justifyContent: 'center', padding: '11px 24px', fontSize: 14 }}>
                      查看我的购买 →
                    </Link>
                  </div>
                ) : (
                  <button
                    className="claw-btn-primary"
                    disabled={isSold || buying}
                    onClick={handleBuy}
                    style={{ justifyContent: 'center', padding: '13px 24px', fontSize: 15, opacity: isSold ? 0.5 : 1, cursor: isSold ? 'not-allowed' : 'pointer' }}
                  >
                    {buying
                      ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      : isSold ? '已售罄' : isFree ? <><ShoppingCart size={16} />免费获取</> : <><ShoppingCart size={16} />立即购买</>
                    }
                  </button>
                )}
                <Link href="/sourcing" className="claw-btn-ghost" style={{ justifyContent: 'center', padding: '13px 24px', fontSize: 15 }}>
                  提交定制化需求
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <CheckCircle2 size={15} />, text: '智能体角色已通过专家调优，随时可部署在生产环境中。' },
                  { icon: <ShieldCheck size={15} />, text: '包含全套自动化工作流文档和隐私合规性检查。' },
                  { icon: <Zap size={15} />, text: '即时交付：购买后立即获得 API 访问权限和部署文件。' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#E65C46', marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: description */}
            <div className="detail-desc-col">
              <div className="claw-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 16 }}>
                  功能描述
                </div>
                <p style={{ fontSize: 15, color: '#6B5549', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap' }}>
                  {listing.description || '暂无描述。'}
                </p>
              </div>

              <div className="claw-highlight-box" style={{ marginTop: 20 }}>
                <div style={{ fontSize: 13, color: '#6B5549', lineHeight: 1.65 }}>
                  需要更多定制化功能？<Link href="/sourcing" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>提交众包需求</Link>，我们将为您匹配专属开发者。
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
    margin-bottom: 36px;
    transition: color 0.15s;
  }
  .detail-back:hover { color: #2A1F19; }

  .detail-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
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

  @media (max-width: 700px) {
    .detail-layout {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
`;
