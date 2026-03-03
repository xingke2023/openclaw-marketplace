'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { listingsApi, Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import {
  ChevronLeft, Download, CheckCircle2, Terminal,
  Package, Zap, ArrowRight, Copy, Check, ExternalLink, Loader2
} from "lucide-react";

export default function InstallPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
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

  return (
    <>
      <style>{clawStyles + installStyles}</style>
      <div className="claw-page">
        <ClawNav />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
          {/* Back */}
          <Link href="/dashboard?tab=purchases" className="install-back">
            <ChevronLeft size={15} /> 返回我的购买
          </Link>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 40 }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>🤖</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span className="claw-card-badge" style={{ position: 'static', display: 'inline-block' }}>{listing.category}</span>
                <span style={{ fontSize: 12, color: '#4a9e6b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={12} /> 已拥有
                </span>
              </div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 800, color: '#2A1F19', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {listing.name}
              </h1>
              <p style={{ fontSize: 14, color: '#6B5549', margin: 0, lineHeight: 1.6 }}>
                {listing.description}
              </p>
            </div>
          </div>

          {/* Download ZIP */}
          <div className="claw-card" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 6 }}>
                  技能包下载
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: '#2A1F19', marginBottom: 4 }}>
                  {zipFileName}
                </div>
                <div style={{ fontSize: 13, color: '#9e8074' }}>
                  包含 Prompt 文件、工作流配置和使用说明
                </div>
              </div>
              <a
                href={`/api/placeholder-zip/${listing.slug}`}
                download={zipFileName}
                className="install-dl-btn"
                onClick={e => {
                  // Simulate download with a real zip blob
                  e.preventDefault();
                  const content = generateZipReadme(listing);
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
                下载技能包
              </a>
            </div>
          </div>

          {/* Mode toggle */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2A1F19', marginBottom: 12 }}>选择你的安装方式：</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className={`install-mode-btn${mode === 'openclaw' ? ' active' : ''}`}
                onClick={() => setMode('openclaw')}
              >
                <Zap size={15} />
                已有 OpenClaw
              </button>
              <button
                className={`install-mode-btn${mode === 'service' ? ' active' : ''}`}
                onClick={() => setMode('service')}
              >
                <Package size={15} />
                没有 OpenClaw，帮我安装
              </button>
            </div>
          </div>

          {/* Mode: has OpenClaw */}
          {mode === 'openclaw' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="claw-highlight-box" style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 13, color: '#6B5549' }}>
                  🎉 太好了！你已经有 OpenClaw，只需几步即可安装此技能。
                </div>
              </div>

              {[
                {
                  step: 1,
                  title: '打开 OpenClaw 技能管理器',
                  desc: '在你的 OpenClaw 客户端中，点击左侧栏的「技能」图标，或使用快捷键。',
                  code: null,
                  lang: null,
                },
                {
                  step: 2,
                  title: '使用 Skill ID 安装',
                  desc: '在技能搜索框中输入以下 Skill ID，点击「安装」即可一键完成：',
                  code: skillId,
                  lang: 'skill-id',
                },
                {
                  step: 3,
                  title: '或手动导入 ZIP',
                  desc: '下载上方的技能包，在技能管理器中选择「从文件导入」，选中 ZIP 文件完成导入。',
                  code: null,
                  lang: null,
                },
                {
                  step: 4,
                  title: '激活并测试',
                  desc: '安装后在对话框中输入触发指令，即可开始使用：',
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
                            {copied === `step-${item.step}` ? '已复制' : '复制'}
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
                  没关系！我们提供一站式安装服务，帮你完成 OpenClaw 平台安装和本技能的部署配置。
                </div>
              </div>

              {/* What's included */}
              <div className="claw-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9e8074', marginBottom: 16 }}>
                  一站式安装服务包含
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { icon: '🖥️', title: 'OpenClaw 平台安装', desc: '在你的设备上部署 OpenClaw 客户端' },
                    { icon: '🤖', title: '技能机器人配置', desc: `安装并配置「${listing.name}」` },
                    { icon: '🔑', title: 'API 密钥接入', desc: '帮助配置 Claude / GPT 等 AI 接口' },
                    { icon: '✅', title: '功能测试验收', desc: '确保一切正常运行后交付' },
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
                  title: '提交安装需求',
                  desc: '点击下方按钮，填写你的设备信息和联系方式，我们的技术团队将在 24 小时内与你联系。',
                  action: (
                    <Link href={`/sourcing?skill=${listing.slug}&service=install`} className="claw-btn-primary" style={{ display: 'inline-flex', marginTop: 14 }}>
                      提交安装需求 <ArrowRight size={15} />
                    </Link>
                  ),
                },
                {
                  step: 2,
                  title: '技术工程师远程协助',
                  desc: '通过屏幕共享，工程师将在 30 分钟内完成 OpenClaw 平台安装和技能部署，全程由你监督。',
                  action: null,
                },
                {
                  step: 3,
                  title: '交付与培训',
                  desc: '安装完成后，工程师将演示此技能的完整使用方法，并提供操作手册供后续参考。',
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
                  什么是 OpenClaw？
                </div>
                <p style={{ fontSize: 14, color: 'rgba(248,242,237,0.85)', lineHeight: 1.7, margin: '0 0 16px' }}>
                  OpenClaw 是一个本地运行的 AI 智能体平台，让你能够在自己的设备上安全地使用和管理专业 AI 技能，数据不上云、隐私有保障。
                </p>
                <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#E65C46', textDecoration: 'none' }}>
                  了解更多 OpenClaw <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#9e8074', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              常见问题
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { q: '这个技能支持哪些 AI 模型？', a: '支持 Claude 3.5/3.7、GPT-4o、DeepSeek 等主流模型，在 OpenClaw 中可自由切换。' },
                { q: '安装后是否可以修改 Prompt？', a: '可以，下载的 ZIP 包含可编辑的 Prompt 文件，支持个性化定制。' },
                { q: '技能更新时需要重新购买吗？', a: '不需要。购买后永久拥有，后续更新可免费获取。' },
                { q: '遇到问题如何获得支持？', a: '可通过「众包需求」提交技术支持请求，或联系我们的服务团队。' },
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

function generateZipReadme(listing: Listing): string {
  return `
================================================================
  ${listing.name}
  来自 CLAW MART — AI 技能市场
================================================================

技能 ID: ${listing.slug}
分类: ${listing.category}

【技能描述】
${listing.description || '暂无描述'}

【安装方法 - 已有 OpenClaw】
1. 打开 OpenClaw 技能管理器
2. 在搜索框输入 Skill ID: ${listing.slug}
3. 点击「安装」完成一键安装
4. 或选择「从文件导入」，选中此 ZIP 文件

【使用方法】
在 OpenClaw 对话框中输入：
@${listing.slug} [你的指令]

例如：
@${listing.slug} 你好，请介绍你的功能

【安装服务】
如果你还没有安装 OpenClaw，可以访问：
https://clawmart.ai/sourcing?skill=${listing.slug}&service=install
提交一站式安装需求，我们的工程师将远程协助你完成配置。

【支持与反馈】
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
