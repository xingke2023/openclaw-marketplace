'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Store, ChevronDown, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "浏览", href: "/" },
  { label: "关于", href: "/about" },
  { label: "博客", href: "/blog" },
  { label: "众包需求", href: "/sourcing" },
];

export function ClawNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      router.push(`/?search=${encodeURIComponent(navSearch.trim())}`);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const avatarLetter = user?.name?.[0]?.toUpperCase() || '?';

  return (
    <>
      <style>{`
        .claw-nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid rgba(42,31,25,0.1);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(42,31,25,0.12);
          min-width: 200px;
          z-index: 100;
          overflow: hidden;
          animation: dropIn 0.12s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .claw-nav-drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #2A1F19;
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Manrope', sans-serif;
          transition: background 0.12s;
        }
        .claw-nav-drop-item:hover { background: rgba(240,232,225,0.7); }
        .claw-nav-drop-item.danger { color: #bf3f30; }
        .claw-nav-drop-divider { border: none; border-top: 1px solid rgba(42,31,25,0.08); margin: 4px 0; }
        .claw-nav-drop-header {
          padding: 12px 16px 8px;
          border-bottom: 1px solid rgba(42,31,25,0.08);
          margin-bottom: 4px;
        }
        .claw-nav-search-form {
          display: flex;
          align-items: center;
          background: rgba(42, 31, 25, 0.07);
          border-radius: 8px;
          padding: 0 10px;
          gap: 6px;
          height: 36px;
          width: 220px;
          transition: background 0.15s, width 0.2s;
        }
        .claw-nav-search-form:focus-within {
          background: white;
          box-shadow: 0 0 0 1.5px #E65C46;
          width: 280px;
        }
        .claw-nav-search-input {
          border: none;
          background: transparent;
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          color: #2A1F19;
          outline: none;
          flex: 1;
          width: 100%;
        }
        .claw-nav-search-input::placeholder { color: #9e8074; }
        .claw-nav-avatar-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #2A1F19;
          font-size: 14px;
          font-weight: 600;
          padding: 6px 12px 6px 6px;
          borderRadius: 8px;
          border: 1.5px solid rgba(42, 31, 25, 0.15);
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: border-color 0.15s;
        }
        .claw-nav-avatar-btn:hover { border-color: rgba(42,31,25,0.3); }
      `}</style>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(248, 242, 237, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(42, 31, 25, 0.08)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" style={{
            fontFamily: "'Bricolage Grotesque', 'Manrope', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#2A1F19',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <img src="/logo.png" alt="OpenClaw" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            CLAW MART
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pathname === link.href ? '#2A1F19' : '#6B5549',
                  textDecoration: 'none',
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {link.label}
              </Link>
            ))}

            <form onSubmit={handleNavSearch} className="claw-nav-search-form">
              <Search size={14} style={{ color: '#9e8074', flexShrink: 0 }} />
              <input
                type="text"
                className="claw-nav-search-input"
                placeholder="搜索技能..."
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
              />
            </form>

            {isAuthenticated ? (
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  className="claw-nav-avatar-btn"
                  onClick={() => setOpen(v => !v)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'white',
                    color: '#2A1F19',
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '6px 12px 6px 6px',
                    borderRadius: 8,
                    border: '1.5px solid rgba(42, 31, 25, 0.15)',
                    cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  <span style={{
                    width: 28, height: 28,
                    borderRadius: '50%',
                    background: user?.avatar_url ? 'transparent' : '#E65C46',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    {user?.avatar_url
                      ? <img src={user.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{avatarLetter}</span>
                    }
                  </span>
                  <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</span>
                  <ChevronDown size={14} style={{ color: '#9e8074', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </button>

                {open && (
                  <div className="claw-nav-dropdown">
                    <div className="claw-nav-drop-header">
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#2A1F19' }}>{user?.name}</div>
                      <div style={{ fontSize: 12, color: '#9e8074', marginTop: 2 }}>{user?.email}</div>
                    </div>
                    <Link href="/dashboard" className="claw-nav-drop-item" onClick={() => setOpen(false)}>
                      <LayoutDashboard size={15} style={{ color: '#6B5549' }} />
                      Dashboard
                    </Link>
                    <Link href="/dashboard?tab=purchases" className="claw-nav-drop-item" onClick={() => setOpen(false)}>
                      <ShoppingBag size={15} style={{ color: '#6B5549' }} />
                      我的购买
                    </Link>
                    <Link href="/dashboard?tab=settings" className="claw-nav-drop-item" onClick={() => setOpen(false)}>
                      <Settings size={15} style={{ color: '#6B5549' }} />
                      我的设置
                    </Link>
                    {!user?.is_seller && (
                      <>
                        <hr className="claw-nav-drop-divider" />
                        <Link href="/dashboard?tab=sell" className="claw-nav-drop-item" onClick={() => setOpen(false)}>
                          <Store size={15} style={{ color: '#E65C46' }} />
                          <span style={{ color: '#E65C46' }}>Start Selling</span>
                        </Link>
                      </>
                    )}
                    <hr className="claw-nav-drop-divider" />
                    <button className="claw-nav-drop-item danger" onClick={() => { setOpen(false); logout(); }}>
                      <LogOut size={15} />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#E65C46',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: 8,
                textDecoration: 'none',
                fontFamily: "'Manrope', sans-serif",
              }}>
                登录 / 注册
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export function ClawFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(42, 31, 25, 0.1)',
      marginTop: 64,
      background: '#F0E8E1',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 40,
        }}>
          <div>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#2A1F19',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <img src="/logo.png" alt="OpenClaw" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              CLAW MART
            </div>
            <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65, margin: 0 }}>
              您的专业 AI 智能体和机器人资产分发市场。通过专家调优的角色和技能，帮助您自动化并扩展业务。
            </p>
          </div>
          {[
            { title: '平台', links: [{ label: '浏览智能体', href: '/' }, { label: '定制众包', href: '/sourcing' }, { label: '技术博客', href: '/blog' }] },
            { title: '关于', links: [{ label: '关于我们', href: '/about' }, { label: '创作者计划', href: '#' }, { label: '帮助中心', href: '#' }] },
            { title: '法律', links: [{ label: '使用条款', href: '#' }, { label: '隐私政策', href: '#' }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#9e8074', marginBottom: 16 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ fontSize: 14, color: '#6B5549', textDecoration: 'none', fontWeight: 500 }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          borderTop: '1px solid rgba(42, 31, 25, 0.1)',
          fontSize: 13,
          color: '#9e8074',
          fontWeight: 500,
        }}>
          <span>© 2026 CLAW MART · An OpenClaw Project</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Twitter', 'Discord', 'GitHub'].map(s => (
              <a key={s} href="#" style={{ color: '#9e8074', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export const clawStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700&display=swap');

  .claw-page {
    font-family: 'Manrope', 'Bricolage Grotesque', sans-serif;
    background-color: #F8F2ED;
    color: #2A1F19;
    min-height: 100vh;
  }
  .claw-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .claw-section {
    padding: 56px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .claw-section-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #2A1F19;
    margin: 0 0 6px;
    letter-spacing: -0.01em;
  }
  .claw-section-sub {
    font-size: 14px;
    color: #6B5549;
    font-style: italic;
    margin: 0 0 28px;
  }
  .claw-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(230, 92, 70, 0.12);
    color: #bf3f30;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 20px;
  }
  .claw-h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 48px;
    font-weight: 800;
    line-height: 1.1;
    color: #2A1F19;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
  }
  .claw-h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #2A1F19;
    letter-spacing: -0.015em;
    margin: 0 0 12px;
  }
  .claw-lead {
    font-size: 17px;
    color: #6B5549;
    line-height: 1.65;
    margin: 0 0 28px;
  }
  .claw-body {
    font-size: 15px;
    color: #6B5549;
    line-height: 1.7;
    margin: 0 0 16px;
  }
  .claw-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #E65C46;
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Manrope', sans-serif;
    transition: background 0.15s, transform 0.1s;
  }
  .claw-btn-primary:hover { background: #d14f3a; transform: translateY(-1px); }
  .claw-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: white;
    color: #2A1F19;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 22px;
    border-radius: 8px;
    border: 1.5px solid rgba(42, 31, 25, 0.15);
    cursor: pointer;
    text-decoration: none;
    font-family: 'Manrope', sans-serif;
    transition: border-color 0.15s, transform 0.1s;
  }
  .claw-btn-ghost:hover { border-color: rgba(42, 31, 25, 0.35); transform: translateY(-1px); }
  .claw-card {
    background: white;
    border-radius: 14px;
    border: 1px solid rgba(42, 31, 25, 0.07);
    box-shadow: 0 2px 8px rgba(42, 31, 25, 0.05);
    padding: 24px;
  }
  .claw-card-hover {
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .claw-card-hover:hover {
    box-shadow: 0 8px 28px rgba(42, 31, 25, 0.12);
    transform: translateY(-2px);
  }
  .claw-divider {
    border: none;
    border-top: 1px solid rgba(42, 31, 25, 0.1);
    margin: 0;
  }
  .claw-muted-section {
    background: rgba(240, 232, 225, 0.5);
  }
  .claw-accent { color: #E65C46; }
  .claw-step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #E65C46;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }
  .claw-input {
    width: 100%;
    padding: 10px 14px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #2A1F19;
    background: #F8F2ED;
    border: 1.5px solid rgba(42, 31, 25, 0.15);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }
  .claw-input:focus {
    border-color: #E65C46;
    background: white;
  }
  .claw-input::placeholder { color: #9e8074; }
  .claw-textarea {
    width: 100%;
    padding: 10px 14px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #2A1F19;
    background: #F8F2ED;
    border: 1.5px solid rgba(42, 31, 25, 0.15);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
    resize: vertical;
  }
  .claw-textarea:focus {
    border-color: #E65C46;
    background: white;
  }
  .claw-form-label {
    font-size: 13px;
    font-weight: 600;
    color: #2A1F19;
    display: block;
    margin-bottom: 6px;
  }
  .claw-chip {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    border: 1.5px solid rgba(42, 31, 25, 0.15);
    background: white;
    color: #6B5549;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    transition: all 0.15s;
  }
  .claw-chip.active {
    background: #2A1F19;
    color: white;
    border-color: #2A1F19;
  }
  .claw-chip:hover:not(.active) {
    border-color: #E65C46;
    color: #E65C46;
  }
  .claw-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .claw-table th {
    text-align: left;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #9e8074;
    border-bottom: 1.5px solid rgba(42, 31, 25, 0.1);
    background: rgba(240, 232, 225, 0.4);
  }
  .claw-table td {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(42, 31, 25, 0.07);
    color: #2A1F19;
    vertical-align: top;
  }
  .claw-table tr:last-child td { border-bottom: none; }
  .claw-accordion {
    border: 1px solid rgba(42, 31, 25, 0.1);
    border-radius: 12px;
    overflow: hidden;
    background: white;
  }
  .claw-accordion-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2A1F19;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }
  .claw-accordion-btn:hover { background: rgba(240, 232, 225, 0.5); }
  .claw-accordion-body {
    padding: 0 20px 16px;
    font-size: 14px;
    color: #6B5549;
    line-height: 1.7;
    border-top: 1px solid rgba(42, 31, 25, 0.07);
    padding-top: 14px;
  }
  .claw-highlight-box {
    background: rgba(230, 92, 70, 0.06);
    border-left: 3px solid #E65C46;
    border-radius: 0 10px 10px 0;
    padding: 16px 20px;
  }
  .claw-skeleton {
    background: linear-gradient(90deg, rgba(42,31,25,0.06) 25%, rgba(42,31,25,0.10) 50%, rgba(42,31,25,0.06) 75%);
    background-size: 200% 100%;
    animation: claw-shimmer 1.5s infinite;
    border-radius: 8px;
  }
  @keyframes claw-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
