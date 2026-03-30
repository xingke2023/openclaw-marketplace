'use client';

import { useEffect, useState } from "react";
import { Link } from "@/lib/navigation";
import { postsApi, Post } from "@/lib/api";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useTranslations } from 'next-intl';

export default function BlogPage() {
  const t = useTranslations('blog');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAll();
        setPosts(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const calculateReadTime = (content: string | undefined) => {
    if (!content) return 0;
    return Math.ceil(content.trim().split(/\s+/).length / 200);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <>
      <style>{clawStyles}</style>
      <div className="claw-page">
        <ClawNav />

        <main>
          {/* Hero */}
          <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">{t('labelTag')}</div>
            <h1 className="claw-h1" style={{ maxWidth: 600 }}>
              {t('title')} <span className="claw-accent">{t('titleAccent')}</span>
            </h1>
            <p className="claw-lead" style={{ maxWidth: 560 }}>
              {t('lead')}
            </p>
          </section>

          <hr className="claw-divider" />

          {/* Posts Grid */}
          <section style={{ padding: '56px 24px', maxWidth: 1200, margin: '0 auto' }}>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="claw-skeleton" style={{ height: 28, width: '75%', marginBottom: 12 }} />
                    <div className="claw-skeleton" style={{ height: 14, width: '45%', marginBottom: 20 }} />
                    <div className="claw-skeleton" style={{ height: 14, marginBottom: 8 }} />
                    <div className="claw-skeleton" style={{ height: 14, marginBottom: 8 }} />
                    <div className="claw-skeleton" style={{ height: 14, width: '60%' }} />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 48px' }}>
                {posts.map((post) => (
                  <article key={post.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#2A1F19',
                        margin: '0 0 12px',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                        transition: 'color 0.15s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#E65C46')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#2A1F19')}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, fontWeight: 600, color: '#9e8074', marginBottom: 16, letterSpacing: '0.02em' }}>
                      <time>{formatDate(post.created_at)}</time>
                      <span>·</span>
                      <span>{calculateReadTime(post.content)} {t('readTime')}</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.65, marginBottom: 20, flex: 1,
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {post.excerpt || post.content}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#E65C46',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        transition: 'gap 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.gap = '8px')}
                      onMouseLeave={e => (e.currentTarget.style.gap = '4px')}
                    >
                      {t('readMore')}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                <p style={{ fontSize: 16, color: '#6B5549', fontStyle: 'italic' }}>
                  {t('empty')}
                </p>
              </div>
            )}
          </section>
        </main>

        <ClawFooter />
      </div>
    </>
  );
}
