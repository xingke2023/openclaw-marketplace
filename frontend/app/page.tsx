'use client';

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { listingsApi, Listing, ListingParams } from "@/lib/api";
import { Star, Download, Loader2 } from "lucide-react";
import { ClawNav, ClawFooter } from "@/components/claw-layout";

const CATEGORIES = [
  { label: "全部", value: "all" },
  { label: "🦞 AI员工", value: "AI 角色" },
  { label: "营销", value: "营销" },
  { label: "工程", value: "工程" },
  { label: "设计", value: "设计" },
  { label: "其他", value: "其他" },
];

const SORT_OPTIONS = [
  { label: "最热门", value: "popular" },
  { label: "最新发布", value: "newest" },
  { label: "价格：从低到高", value: "price_asc" },
  { label: "价格：从高到低", value: "price_desc" },
];

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.slug}`} className="claw-card">
      <div className="claw-card-body">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
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
            style={{ borderRadius: 10, background: '#F0E8E1' }}
          />
          <span className="claw-card-badge" style={{ position: 'static', display: 'inline-block', flexShrink: 0 }}>{listing.category}</span>
        </div>
        <div className="claw-card-title">{listing.name}</div>
        <p className="claw-card-desc">{listing.description}</p>
        <div className="claw-card-footer">
          <div className="claw-card-stats">
            <span className="claw-card-stat">
              <Star size={11} fill="currentColor" style={{ color: '#f5a623' }} />
              {Math.floor(Math.random() * 200 + 20)}
            </span>
            <span className="claw-card-stat">
              <Download size={11} />
              {Math.floor(Math.random() * 50 + 5)}k
            </span>
          </div>
          <span className={`claw-card-price${parseFloat(listing.price) === 0 ? ' free' : ''}`}>
            {parseFloat(listing.price) === 0 ? '免费' : `¥${listing.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="claw-grid">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="claw-skeleton-card">
          <div style={{ padding: '16px' }}>
            <div className="claw-skeleton" style={{ height: 16, marginBottom: 12, width: '40%' }} />
            <div className="claw-skeleton" style={{ height: 20, marginBottom: 8, width: '70%' }} />
            <div className="claw-skeleton" style={{ height: 14, marginBottom: 6 }} />
            <div className="claw-skeleton" style={{ height: 14, width: '80%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  // Personas section (AI 角色)
  const [personas, setPersonas] = useState<Listing[]>([]);
  const [personasLoading, setPersonasLoading] = useState(true);
  const [personasPage, setPersonasPage] = useState(1);
  const [personasHasMore, setPersonasHasMore] = useState(false);

  // Skills section (non-AI 角色)
  const [skills, setSkills] = useState<Listing[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsPage, setSkillsPage] = useState(1);
  const [skillsHasMore, setSkillsHasMore] = useState(false);

  // When filtering by a specific category, show unified list
  const isFiltered = category !== 'all' || search;

  const [filtered, setFiltered] = useState<Listing[]>([]);
  const [filteredLoading, setFilteredLoading] = useState(false);
  const [filteredPage, setFilteredPage] = useState(1);
  const [filteredHasMore, setFilteredHasMore] = useState(false);

  const fetchPersonas = useCallback(async (isLoadMore = false) => {
    if (!isLoadMore) setPersonasLoading(true);
    try {
      const params: ListingParams = { page: isLoadMore ? personasPage + 1 : 1, category: 'AI 角色', sort };
      const res = await listingsApi.getListings(params);
      const data = res?.data || [];
      if (isLoadMore) {
        setPersonas(prev => [...prev, ...data]);
        setPersonasPage(res?.current_page || 1);
      } else {
        setPersonas(data);
        setPersonasPage(1);
      }
      setPersonasHasMore((res?.current_page || 1) < (res?.last_page || 1));
    } catch (e) {
      console.error(e);
    } finally {
      setPersonasLoading(false);
    }
  }, [sort, personasPage]);

  const fetchSkills = useCallback(async (isLoadMore = false) => {
    if (!isLoadMore) setSkillsLoading(true);
    try {
      // Fetch all non-persona categories by excluding AI 角色 via no category filter
      // We'll filter client-side from a broad fetch, or just use no category (backend returns all, we filter)
      const params: ListingParams = { page: isLoadMore ? skillsPage + 1 : 1, sort };
      const res = await listingsApi.getListings(params);
      const data = (res?.data || []).filter((l: Listing) => l.category !== 'AI 角色');
      if (isLoadMore) {
        setSkills(prev => [...prev, ...data]);
        setSkillsPage(res?.current_page || 1);
      } else {
        setSkills(data);
        setSkillsPage(1);
      }
      setSkillsHasMore((res?.current_page || 1) < (res?.last_page || 1));
    } catch (e) {
      console.error(e);
    } finally {
      setSkillsLoading(false);
    }
  }, [sort, skillsPage]);

  const fetchFiltered = useCallback(async (isLoadMore = false) => {
    setFilteredLoading(true);
    try {
      const params: ListingParams = {
        page: isLoadMore ? filteredPage + 1 : 1,
        search: search || undefined,
        category: category !== 'all' ? category : undefined,
        sort,
      };
      const res = await listingsApi.getListings(params);
      const data = res?.data || [];
      if (isLoadMore) {
        setFiltered(prev => [...prev, ...data]);
        setFilteredPage(res?.current_page || 1);
      } else {
        setFiltered(data);
        setFilteredPage(1);
      }
      setFilteredHasMore((res?.current_page || 1) < (res?.last_page || 1));
    } catch (e) {
      console.error(e);
    } finally {
      setFilteredLoading(false);
    }
  }, [search, category, sort, filteredPage]);

  useEffect(() => {
    const q = searchParams.get('search') || "";
    setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    if (isFiltered) {
      fetchFiltered();
    } else {
      fetchPersonas();
      fetchSkills();
    }
  }, [category, sort, search]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700&display=swap');

        .claw-app {
          font-family: 'Manrope', 'Bricolage Grotesque', sans-serif;
          background-color: #F8F2ED;
          color: #2A1F19;
          min-height: 100vh;
        }

        /* Hero */
        .claw-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 24px 56px;
        }
        .claw-hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          color: #2A1F19;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .claw-hero-title span {
          color: #E65C46;
        }
        .claw-hero-subtitle {
          font-size: 17px;
          color: #6B5549;
          line-height: 1.65;
          margin: 0;
          font-weight: 400;
        }

        /* Category nav bar */
        .claw-cat-nav {
          background: rgba(248, 242, 237, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(42, 31, 25, 0.08);
          position: sticky;
          top: 60px;
          z-index: 40;
        }
        .claw-cat-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 4px;
          height: 44px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .claw-cat-nav-inner::-webkit-scrollbar { display: none; }
        .claw-cat-nav-pill {
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          font-family: 'Manrope', sans-serif;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
          color: #6B5549;
          background: transparent;
          flex-shrink: 0;
        }
        .claw-cat-nav-pill:hover:not(.active) {
          background: rgba(42, 31, 25, 0.06);
          color: #2A1F19;
        }
        .claw-cat-nav-pill.active {
          background: #2A1F19;
          color: white;
        }

        /* Section */
        .claw-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .claw-section + .claw-section {
          padding-top: 0;
        }
        .claw-section-header {
          margin-bottom: 24px;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .claw-section-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #2A1F19;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .claw-section-subtitle {
          font-size: 13px;
          color: #9e8074;
          margin: 0;
        }
        .claw-section-divider {
          border: none;
          border-top: 1px solid rgba(42, 31, 25, 0.08);
          margin: 0 24px;
          max-width: 1152px;
          margin-left: auto;
          margin-right: auto;
        }

        .claw-sort-select {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #6B5549;
          background: white;
          border: 1.5px solid rgba(42, 31, 25, 0.12);
          border-radius: 8px;
          padding: 6px 12px;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          outline: none;
        }

        /* Cards grid */
        .claw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .claw-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 768px) {
          .claw-hero { padding: 40px 16px 32px; }
          .claw-hero-title { font-size: 32px; }
          .claw-hero-subtitle { font-size: 15px; }
          .claw-section { padding: 32px 16px; }
        }
        @media (max-width: 480px) {
          .claw-grid { grid-template-columns: 1fr; gap: 12px; }
          .claw-hero-title { font-size: 28px; }
          .claw-hero { padding: 32px 16px 24px; }
        }

        .claw-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(42, 31, 25, 0.06);
          box-shadow: 0 2px 8px rgba(42, 31, 25, 0.05);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }
        .claw-card:hover {
          box-shadow: 0 8px 28px rgba(42, 31, 25, 0.12);
          transform: translateY(-2px);
        }
        .claw-card-badge {
          background: rgba(248, 242, 237, 0.92);
          backdrop-filter: blur(6px);
          font-size: 11px;
          font-weight: 700;
          color: #6B5549;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(42, 31, 25, 0.1);
        }
        .claw-card-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .claw-card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #2A1F19;
          margin: 0 0 6px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .claw-card-desc {
          font-size: 13px;
          color: #6B5549;
          line-height: 1.55;
          margin: 0 0 14px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .claw-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(42, 31, 25, 0.07);
        }
        .claw-card-stats {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #9e8074;
          font-weight: 500;
        }
        .claw-card-stat {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .claw-card-price {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #2A1F19;
        }
        .claw-card-price.free {
          color: #4a9e6b;
          font-size: 13px;
          font-weight: 700;
        }

        /* Skeleton */
        .claw-skeleton {
          background: linear-gradient(90deg, rgba(42,31,25,0.06) 25%, rgba(42,31,25,0.10) 50%, rgba(42,31,25,0.06) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .claw-skeleton-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(42, 31, 25, 0.06);
        }

        /* Load more */
        .claw-load-more {
          text-align: center;
          margin-top: 32px;
        }

        /* Empty state */
        .claw-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 24px;
        }
        .claw-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .claw-empty-text {
          font-size: 16px;
          color: #6B5549;
          margin: 0;
          font-style: italic;
        }

        /* Section label tag */
        .claw-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9e8074;
          background: rgba(42,31,25,0.06);
          padding: 3px 10px;
          border-radius: 100px;
        }

      `}</style>

      <div className="claw-app">
        <ClawNav />

        {/* Hero */}
        <div className="claw-hero">
          <div>
            <h1 className="claw-hero-title">
              OpenClaw<span>机器人</span>员工市场
            </h1>
            <p className="claw-hero-subtitle">
              我们的OpenClaw机器人，不仅仅是聊天机器人，是一个为你的业务定制搭建的数字工作者，了解你的业务，真正完成工作。<br />
              我们为你构建一个托管 AI 员工。它 24/7 工作，成本比人类低 90%，每个月都在变更好——因为我们一直在训练它。<br />
              您无需进行繁琐的工程设计，您只需使用您的手机即可直接使用我们的OpenClaw员工。
            </p>
          </div>
        </div>

        {/* Category nav bar */}
        <div className="claw-cat-nav">
          <div className="claw-cat-nav-inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`claw-cat-nav-pill${category === cat.value ? ' active' : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <select
                className="claw-sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isFiltered ? (
          /* Unified filtered view */
          <section className="claw-section">
            <div className="claw-section-header">
              <h2 className="claw-section-title">
                {search ? `"${search}" 的搜索结果` : CATEGORIES.find(c => c.value === category)?.label}
              </h2>
              <span className="claw-section-subtitle">{filtered.length} 个结果</span>
            </div>
            {filteredLoading ? (
              <SkeletonGrid />
            ) : (
              <>
                <div className="claw-grid">
                  {filtered.length > 0 ? filtered.map(l => <ListingCard key={l.id} listing={l} />) : (
                    <div className="claw-empty">
                      <div className="claw-empty-icon">🔍</div>
                      <p className="claw-empty-text">没有找到匹配的智能体，换个关键词试试吧。</p>
                    </div>
                  )}
                </div>
                {filteredHasMore && (
                  <div className="claw-load-more">
                    <button onClick={() => fetchFiltered(true)} disabled={filteredLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                      {filteredLoading ? <Loader2 size={16} /> : '加载更多'}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        ) : (
          <>
            {/* Section 1: Most Popular Personas */}
            <section className="claw-section">
              <div className="claw-section-header">
                <h2 className="claw-section-title">最受欢迎的员工</h2>
                <span className="claw-section-tag">Most Popular Personas</span>
              </div>
              {personasLoading ? (
                <SkeletonGrid />
              ) : (
                <>
                  <div className="claw-grid">
                    {personas.length > 0 ? personas.map(l => <ListingCard key={l.id} listing={l} />) : (
                      <div className="claw-empty">
                        <div className="claw-empty-icon">🤖</div>
                        <p className="claw-empty-text">暂无角色，敬请期待。</p>
                      </div>
                    )}
                  </div>
                  {personasHasMore && (
                    <div className="claw-load-more">
                      <button onClick={() => fetchPersonas(true)} disabled={personasLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                        {personasLoading ? <Loader2 size={16} /> : '查看更多角色'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

            <hr className="claw-section-divider" />

            {/* Section 2: 最热门技能 */}
            <section className="claw-section">
              <div className="claw-section-header">
                <h2 className="claw-section-title">最受欢迎的员工技能</h2>
                <span className="claw-section-tag">顶级技能套餐</span>
              </div>
              {skillsLoading ? (
                <SkeletonGrid />
              ) : (
                <>
                  <div className="claw-grid">
                    {skills.length > 0 ? skills.map(l => <ListingCard key={l.id} listing={l} />) : (
                      <div className="claw-empty">
                        <div className="claw-empty-icon">✨</div>
                        <p className="claw-empty-text">暂无技能套餐，敬请期待。</p>
                      </div>
                    )}
                  </div>
                  {skillsHasMore && (
                    <div className="claw-load-more">
                      <button onClick={() => fetchSkills(true)} disabled={skillsLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                        {skillsLoading ? <Loader2 size={16} /> : '查看更多技能'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}

        <ClawFooter />
      </div>
    </>
  );
}
