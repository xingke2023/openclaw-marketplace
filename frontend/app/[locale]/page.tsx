'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { listingsApi, Listing, ListingParams, DemoMessage } from "@/lib/api";
import { Star, Download, Loader2 } from "lucide-react";
import { ClawNav, ClawFooter } from "@/components/claw-layout";
import { localName, localDesc } from "@/lib/localize";

function ListingCard({ listing, onDemo }: { listing: Listing; onDemo?: (messages: DemoMessage[], name: string, avatarUrl: string) => void }) {
  const t = useTranslations('home');
  const locale = useLocale();
  const displayName = localName(listing, locale);
  const displayDesc = localDesc(listing, locale);
  const hasDemo = !!(listing.demo_messages && listing.demo_messages.length > 0);
  const avatarUrl = listing.category === 'AI 角色'
    ? `https://api.dicebear.com/9.x/open-peeps/svg?seed=${listing.id}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
    : `https://api.dicebear.com/9.x/${['shapes','icons','identicon','rings','bottts','pixel-art','fun-emoji'][listing.id % 7]}/svg?seed=${listing.id}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  return (
    <Link href={`/listings/${listing.slug}`} className="claw-card">
      <div className="claw-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <img
            src={avatarUrl}
            alt=""
            width={48}
            height={48}
            style={{ borderRadius: 10, background: '#F0E8E1', flexShrink: 0 }}
          />
          {hasDemo && onDemo ? (
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onDemo(listing.demo_messages!, displayName, avatarUrl); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 14px', borderRadius: 999,
                background: '#E65C46', color: '#fff',
                border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 700,
                fontFamily: "'Manrope', sans-serif",
                boxShadow: '0 2px 8px rgba(230,92,70,0.35)',
                whiteSpace: 'nowrap', marginLeft: 'auto',
              }}
            >
              ▶ {t('viewDemo')}
            </button>
          ) : null}
        </div>
        <div className="claw-card-title">{displayName}</div>
        <p className="claw-card-desc">{displayDesc}</p>
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
            <span className="claw-card-badge" style={{ position: 'static', display: 'inline-block', flexShrink: 0 }}>{listing.category}</span>
          </div>
          <span className={`claw-card-price${parseFloat(listing.price) === 0 ? ' free' : ''}`}>
            {parseFloat(listing.price) === 0 ? t('free') : `¥${listing.price}`}
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
  const t = useTranslations('home');

  const CATEGORIES_PERSONAS = [
    { label: t('categoryPersonas'), value: "AI 角色" },
  ];

  const CATEGORIES_SKILLS = [
    { label: t('skillCategoryMarketing'), value: "营销" },
    { label: t('skillCategoryEngineering'), value: "工程" },
    { label: t('skillCategoryDesign'), value: "设计" },
    { label: t('skillCategoryOther'), value: "其他" },
  ];

  const SORT_OPTIONS = [
    { label: t('sortPopular'), value: "popular" },
    { label: t('sortNewest'), value: "newest" },
    { label: t('sortPriceAsc'), value: "price_asc" },
    { label: t('sortPriceDesc'), value: "price_desc" },
  ];

  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [category, setCategory] = useState("all");
  const [skillSubCategory, setSkillSubCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [showDemo, setShowDemo] = useState(false);
  const [currentDemoMsgs, setCurrentDemoMsgs] = useState<DemoMessage[]>([]);
  const [currentDemoName, setCurrentDemoName] = useState('');
  const [currentDemoAvatar, setCurrentDemoAvatar] = useState('');
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const demoTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [visibleMsgs, showTyping]);

  const openDemo = useCallback((messages: DemoMessage[], name: string, avatarUrl: string) => {
    setCurrentDemoMsgs(messages);
    setCurrentDemoName(name);
    setCurrentDemoAvatar(avatarUrl);
    setShowDemo(true);
    setVisibleMsgs([]);
    setShowTyping(false);
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    let delay = 400;
    messages.forEach((msg, i) => {
      if (i > 0) {
        const t1 = setTimeout(() => setShowTyping(true), delay);
        demoTimers.current.push(t1);
        delay += msg.type === 'ai' ? 1400 : 700;
      }
      const t2 = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(prev => [...prev, i]);
      }, delay);
      demoTimers.current.push(t2);
      delay += msg.type === 'ai' ? 2200 : 1000;
    });
  }, []);

  const closeDemo = useCallback(() => {
    setShowDemo(false);
    demoTimers.current.forEach(clearTimeout);
  }, []);

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
  // isFiltered: use unified filtered view only for specific AI 角色 or search
  const isFiltered = (category !== 'all' && category !== 'skills') || !!search;

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
          font-weight: 500;
        }
        .claw-hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .claw-demo-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 2px solid #E65C46;
          background: transparent;
          color: #E65C46;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          font-family: 'Manrope', sans-serif;
        }
        .claw-demo-btn:hover {
          background: #E65C46;
          color: #fff;
        }
        /* Demo modal */
        .claw-demo-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .claw-phone {
          width: 310px;
          background: linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 100%);
          border-radius: 48px;
          padding: 14px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 40px 100px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.12);
          position: relative;
          animation: slideUp 0.35s cubic-bezier(.22,1,.36,1);
        }
        /* Side buttons */
        .claw-phone::before {
          content: '';
          position: absolute;
          left: -3px;
          top: 90px;
          width: 3px;
          height: 34px;
          background: #333;
          border-radius: 3px 0 0 3px;
          box-shadow: 0 44px 0 #333;
        }
        .claw-phone::after {
          content: '';
          position: absolute;
          right: -3px;
          top: 110px;
          width: 3px;
          height: 54px;
          background: #333;
          border-radius: 0 3px 3px 0;
        }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .claw-phone-inner {
          background: #000;
          border-radius: 36px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 580px;
        }
        /* Status bar */
        .claw-phone-statusbar {
          background: #000;
          padding: 10px 18px 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .claw-phone-time {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          font-family: -apple-system, sans-serif;
          letter-spacing: -0.3px;
        }
        .claw-phone-icons {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .claw-signal {
          display: flex;
          align-items: flex-end;
          gap: 1.5px;
          height: 11px;
        }
        .claw-signal span {
          display: block;
          width: 3px;
          background: #fff;
          border-radius: 1px;
        }
        .claw-signal span:nth-child(1) { height: 3px; }
        .claw-signal span:nth-child(2) { height: 5px; }
        .claw-signal span:nth-child(3) { height: 7px; }
        .claw-signal span:nth-child(4) { height: 11px; }
        /* wifi icon via svg-like borders */
        .claw-wifi {
          font-size: 11px;
          color: #fff;
          line-height: 1;
        }
        .claw-battery {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .claw-battery-body {
          width: 22px;
          height: 11px;
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: 2.5px;
          padding: 1.5px;
          position: relative;
        }
        .claw-battery-fill {
          background: #fff;
          border-radius: 1px;
          height: 100%;
          width: 75%;
        }
        .claw-battery-tip {
          width: 2px;
          height: 5px;
          background: rgba(255,255,255,0.5);
          border-radius: 0 1px 1px 0;
        }
        /* Dynamic island */
        .claw-phone-island {
          width: 100px;
          height: 30px;
          background: #000;
          border-radius: 20px;
          margin: 0 auto 6px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
        }
        .claw-phone-screen {
          background: #F8F2ED;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 0 0 34px 34px;
        }
        .claw-phone-topbar {
          background: #fff;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(42,31,25,0.08);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .claw-phone-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: #F0E8E1;
          box-shadow: 0 2px 8px rgba(230,92,70,0.2);
        }
        .claw-phone-name {
          font-size: 13px;
          font-weight: 700;
          color: #2A1F19;
          font-family: 'Manrope', sans-serif;
        }
        .claw-phone-status {
          font-size: 11px;
          color: #22c55e;
          font-family: 'Manrope', sans-serif;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .claw-phone-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
        }
        .claw-phone-msgs {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        .claw-msg {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 13px;
          line-height: 1.5;
          font-family: 'Manrope', sans-serif;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .claw-msg.visible { opacity: 1; transform: translateY(0); }
        .claw-msg.ai {
          background: #fff;
          color: #2A1F19;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .claw-msg.user {
          background: #E65C46;
          color: #fff;
          border-bottom-right-radius: 4px;
          align-self: flex-end;
        }
        .claw-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 10px 14px;
          background: #fff;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .claw-typing.visible { opacity: 1; }
        .claw-typing span {
          width: 6px; height: 6px;
          background: #9e8074;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }
        .claw-typing span:nth-child(2) { animation-delay: 0.2s; }
        .claw-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .claw-demo-close {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: none;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          color: #2A1F19;
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
        .claw-cat-nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(42,31,25,0.15);
          flex-shrink: 0;
          margin: 0 6px;
        }
        .claw-cat-nav-group-label {
          font-size: 11px;
          font-weight: 700;
          color: #9e8074;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
          padding: 0 4px;
        }
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

        /* Industry showcase section */
        .industry-section {
          background: linear-gradient(160deg, #1a1208 0%, #2A1F19 60%, #3d2a1e 100%);
          padding: 72px 24px;
        }
        .industry-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .industry-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(230,92,70,0.2);
          border: 1px solid rgba(230,92,70,0.35);
          color: #E65C46;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .industry-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .industry-title span { color: #E65C46; }
        .industry-lead {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin: 0 0 48px;
          max-width: 680px;
        }
        .industry-pain-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 56px;
        }
        @media (max-width: 768px) {
          .industry-pain-grid { grid-template-columns: 1fr; }
          .industry-title { font-size: 26px; }
          .industry-ai-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .industry-ai-grid { grid-template-columns: 1fr !important; }
        }
        .industry-pain-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 24px;
        }
        .industry-pain-icon {
          font-size: 26px;
          margin-bottom: 12px;
        }
        .industry-pain-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
        }
        .industry-pain-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin: 0;
        }
        .industry-flow {
          display: flex;
          align-items: center;
          gap: 0;
          justify-content: center;
          margin-bottom: 56px;
          flex-wrap: wrap;
          gap: 4px;
        }
        .industry-flow-step {
          background: rgba(230,92,70,0.15);
          border: 1px solid rgba(230,92,70,0.3);
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          color: #E65C46;
          white-space: nowrap;
        }
        .industry-flow-arrow {
          color: rgba(255,255,255,0.25);
          font-size: 18px;
          padding: 0 4px;
        }
        .industry-subtitle {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
        }
        .industry-subtitle-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin: 0 0 28px;
        }
        .industry-ai-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }
        .industry-ai-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 22px 20px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          cursor: default;
        }
        .industry-ai-card:hover {
          background: rgba(230,92,70,0.1);
          border-color: rgba(230,92,70,0.3);
          transform: translateY(-2px);
        }
        .industry-ai-emoji {
          font-size: 28px;
          margin-bottom: 12px;
          display: block;
        }
        .industry-ai-role {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
        }
        .industry-ai-duty {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin: 0 0 14px;
        }
        .industry-ai-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .industry-ai-tag {
          font-size: 11px;
          font-weight: 600;
          color: rgba(230,92,70,0.9);
          background: rgba(230,92,70,0.12);
          border-radius: 100px;
          padding: 2px 9px;
        }
        .industry-cta {
          text-align: center;
          padding-top: 8px;
        }
        .industry-cta-text {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin: 0 0 20px;
        }
        .industry-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 999px;
          background: #E65C46;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(230,92,70,0.4);
          transition: background 0.18s, transform 0.18s;
        }
        .industry-btn:hover {
          background: #d44d38;
          transform: translateY(-1px);
        }

      `}</style>

      <div className="claw-app">
        <ClawNav />

        {/* Hero */}
        <div className="claw-hero">
          <div>
            <h1 className="claw-hero-title">
              {t('heroTitle').split('，')[0]}，<span>{t('heroTitle').split('，')[1]}</span>
            </h1>
            <p className="claw-hero-subtitle">
              {t('heroSubtitle').split('\n').map((line, i, arr) => (
                i < arr.length - 1 ? <span key={i}>{line}<br /></span> : <span key={i}>{line}</span>
              ))}
            </p>
          </div>
        </div>

        {/* Demo modal */}
        {showDemo && (
          <div className="claw-demo-overlay" onClick={closeDemo}>
            <div className="claw-phone" onClick={e => e.stopPropagation()}>
              <button className="claw-demo-close" onClick={closeDemo}>×</button>
              <div className="claw-phone-inner">
                {/* Status bar */}
                <div className="claw-phone-statusbar">
                  <div className="claw-phone-time">9:41</div>
                  <div className="claw-phone-icons">
                    <div className="claw-signal">
                      <span /><span /><span /><span />
                    </div>
                    <div className="claw-wifi">▲</div>
                    <div className="claw-battery">
                      <div className="claw-battery-body"><div className="claw-battery-fill" /></div>
                      <div className="claw-battery-tip" />
                    </div>
                  </div>
                </div>
                {/* Dynamic island */}
                <div className="claw-phone-island" />
                {/* Chat screen */}
                <div className="claw-phone-screen">
                  <div className="claw-phone-topbar">
                    <div className="claw-phone-avatar">
                      <img src={currentDemoAvatar} alt="" width={36} height={36} style={{ borderRadius: '50%', display: 'block' }} />
                    </div>
                    <div>
                      <div className="claw-phone-name">{currentDemoName}</div>
                      <div className="claw-phone-status">{t('demoOnline')}</div>
                    </div>
                  </div>
                <div className="claw-phone-msgs" ref={msgsRef}>
                  {currentDemoMsgs.map((msg, i) => (
                    visibleMsgs.includes(i) && (
                      <div key={i} className={`claw-msg ${msg.type} visible`}
                        style={{ whiteSpace: 'pre-line' }}>
                        {msg.text}
                      </div>
                    )
                  ))}
                  {showTyping && (
                    <div className="claw-typing visible">
                      <span /><span /><span />
                    </div>
                  )}
                </div>
                </div>{/* end claw-phone-screen */}
              </div>{/* end claw-phone-inner */}
            </div>
          </div>
        )}

        {/* Category nav bar */}
        <div className="claw-cat-nav">
          <div className="claw-cat-nav-inner">
            <button
              className={`claw-cat-nav-pill${category === 'all' ? ' active' : ''}`}
              onClick={() => setCategory('all')}
            >
              {t('categoryAll')}
            </button>

            <div className="claw-cat-nav-divider" />

            {CATEGORIES_PERSONAS.map(cat => (
              <button
                key={cat.value}
                className={`claw-cat-nav-pill${category === cat.value ? ' active' : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}

            <div className="claw-cat-nav-divider" />

            <button
              className={`claw-cat-nav-pill${category === 'skills' ? ' active' : ''}`}
              onClick={() => setCategory('skills')}
            >
              {t('categorySkills')}
            </button>
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
                {search ? `"${search}" ${t('searchResultsTitle')}` : [...CATEGORIES_PERSONAS, ...CATEGORIES_SKILLS].find(c => c.value === category)?.label}
              </h2>
              <span className="claw-section-subtitle">{filtered.length} {t('resultsCount')}</span>
            </div>
            {filteredLoading ? (
              <SkeletonGrid />
            ) : (
              <>
                <div className="claw-grid">
                  {filtered.length > 0 ? filtered.map(l => <ListingCard key={l.id} listing={l} onDemo={openDemo} />) : (
                    <div className="claw-empty">
                      <div className="claw-empty-icon">🔍</div>
                      <p className="claw-empty-text">{t('emptySearch')}</p>
                    </div>
                  )}
                </div>
                {filteredHasMore && (
                  <div className="claw-load-more">
                    <button onClick={() => fetchFiltered(true)} disabled={filteredLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                      {filteredLoading ? <Loader2 size={16} /> : t('loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        ) : (
          <>
            {/* Section 1: Most Popular Personas */}
            {category !== 'skills' && (
            <section className="claw-section">
              <div className="claw-section-header">
                <h2 className="claw-section-title">{t('sectionPersonas')}</h2>
                <span className="claw-section-tag">Most Popular Personas</span>
              </div>
              {personasLoading ? (
                <SkeletonGrid />
              ) : (
                <>
                  <div className="claw-grid">
                    {personas.length > 0 ? personas.map(l => <ListingCard key={l.id} listing={l} onDemo={openDemo} />) : (
                      <div className="claw-empty">
                        <div className="claw-empty-icon">🤖</div>
                        <p className="claw-empty-text">{t('emptyPersonas')}</p>
                      </div>
                    )}
                  </div>
                  {personasHasMore && (
                    <div className="claw-load-more">
                      <button onClick={() => fetchPersonas(true)} disabled={personasLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                        {personasLoading ? <Loader2 size={16} /> : t('loadMorePersonas')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
            )}

            {category !== 'skills' && <hr className="claw-section-divider" />}

            {/* Section 2: Skills */}
            {(category === 'all' || category === 'skills') && (
            <section className="claw-section">
              <div className="claw-section-header">
                <h2 className="claw-section-title">{t('sectionSkills')}</h2>
                <span className="claw-section-tag">{t('sectionSkillsTag')}</span>
              </div>
              {/* Skills subcategory filter */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                {[{ label: t('skillsSubcategoryAll'), value: 'all' }, ...CATEGORIES_SKILLS].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSkillSubCategory(cat.value)}
                    style={{
                      padding: '4px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', border: '1px solid rgba(42,31,25,0.15)',
                      background: skillSubCategory === cat.value ? '#2A1F19' : 'transparent',
                      color: skillSubCategory === cat.value ? '#fff' : '#6B5549',
                      fontFamily: "'Manrope', sans-serif",
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              {skillsLoading ? (
                <SkeletonGrid />
              ) : (
                <>
                  <div className="claw-grid">
                    {(skillSubCategory === 'all' ? skills : skills.filter(l => l.category === skillSubCategory))
                      .map(l => <ListingCard key={l.id} listing={l} onDemo={openDemo} />)}
                    {(skillSubCategory === 'all' ? skills : skills.filter(l => l.category === skillSubCategory)).length === 0 && (
                      <div className="claw-empty">
                        <div className="claw-empty-icon">✨</div>
                        <p className="claw-empty-text">{t('emptySkills')}</p>
                      </div>
                    )}
                  </div>
                  {skillsHasMore && skillSubCategory === 'all' && (
                    <div className="claw-load-more">
                      <button onClick={() => fetchSkills(true)} disabled={skillsLoading} className="claw-btn-ghost" style={{ padding: '12px 36px', fontSize: '14px' }}>
                        {skillsLoading ? <Loader2 size={16} /> : t('loadMoreSkills')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
            )}
          </>
        )}

        <ClawFooter />
      </div>
    </>
  );
}
