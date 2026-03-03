'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { postsApi, Post } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, allPostsRes] = await Promise.all([
          postsApi.getOne(parseInt(id)),
          postsApi.getAll(1)
        ]);
        
        setPost(postRes || null);
        
        // Filter out current post and take first 3 for "More from the blog"
        const filtered = (allPostsRes?.data || [])
          .filter(p => p.id !== parseInt(id))
          .slice(0, 3);
        setRelatedPosts(filtered);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const calculateReadTime = (content: string | undefined) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyAsMarkdown = () => {
    if (!post) return;
    const markdown = `# ${post.title}\n\n${post.content}`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{clawStyles}</style>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <ClawNav />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12" style={{ maxWidth: 1200 }}>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-8" />
              <div className="h-4 bg-muted rounded w-1/2 mb-4" />
              <div className="h-12 bg-muted rounded w-full mb-6" />
              <div className="h-4 bg-muted rounded w-full mb-4" />
              <div className="h-4 bg-muted rounded w-full mb-4" />
            </div>
          ) : post ? (
            <article>
              {/* Breadcrumbs & Metadata */}
              <div className="mb-12">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-tight mb-8 hover:text-muted-foreground transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Blog
                </Link>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  <span>{formatDate(post.created_at)}</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span>{calculateReadTime(post.content)} min read</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span>Claw Mart Team</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6 leading-[1.1] uppercase">
                  {post.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                  How AI agents like OpenClaw can transform operations, automate distribution, and enhance customer engagement in your industry.
                </p>

                <button 
                  onClick={copyAsMarkdown}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border rounded-md hover:bg-muted transition-colors"
                >
                  {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy as Markdown for Your Agent"}
                </button>
              </div>

              {/* Body Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-extrabold 
                prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:text-xl
                prose-strong:text-foreground prose-strong:font-extrabold
                prose-ul:list-disc prose-ol:list-decimal">
                {post.content.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return null;
                  
                  // Simple heuristic for subheadings (short lines without trailing punctuation)
                  if (paragraph.length < 100 && !paragraph.endsWith('.') && !paragraph.endsWith('?') && !paragraph.endsWith('!')) {
                    return <h2 key={i} className="mt-12 mb-6">{paragraph}</h2>;
                  }
                  
                  return (
                    <p key={i} className="mb-8">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Next Steps / CTA */}
              <div className="mt-20 pt-12 border-t">
                <h2 className="text-2xl font-extrabold tracking-tighter uppercase mb-6">Next steps</h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Ready to deploy OpenClaw for your operations? Browse our available agents or reach out for a custom sourcing request.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/">
                    <Button className="font-bold uppercase tracking-tight rounded-none h-12 px-8">Browse Agents</Button>
                  </Link>
                  <Link href="/sourcing">
                    <Button variant="outline" className="font-bold uppercase tracking-tight rounded-none h-12 px-8">Custom Request</Button>
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Post not found</h2>
              <Link href="/blog">
                <Button variant="outline">Back to Blog</Button>
              </Link>
            </div>
          )}
        </div>

        {/* More from the blog */}
        {!loading && post && relatedPosts.length > 0 && (
          <div className="bg-muted/30 py-24 border-t mt-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-16 text-center">More from the blog</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {relatedPosts.map((rPost) => (
                  <Link key={rPost.id} href={`/blog/${rPost.id}`} className="group block">
                    <time className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
                      {formatDate(rPost.created_at)}
                    </time>
                    <h3 className="text-xl font-extrabold tracking-tighter uppercase mb-4 group-hover:text-muted-foreground transition-colors leading-tight">
                      {rPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {rPost.content}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

        <ClawFooter />
      </div>
    </>
  );
}
