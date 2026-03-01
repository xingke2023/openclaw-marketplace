'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { clawStyles } from "@/components/claw-layout";
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('两次输入的密码不一致');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{clawStyles}</style>
      <div className="claw-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(42,31,25,0.08)' }}>
          <Link href="/" style={{
            fontFamily: "'Bricolage Grotesque', 'Manrope', sans-serif",
            fontSize: 18, fontWeight: 700, color: '#2A1F19', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 28, height: 28, background: '#E65C46', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 800 }}>C</span>
            CLAW MART
          </Link>
          <Link href="/login" style={{ fontSize: 13, color: '#6B5549', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
            已有账号？<span style={{ color: '#E65C46', fontWeight: 600 }}>立即登录</span>
          </Link>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 800, color: '#2A1F19', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                创建账号
              </h1>
              <p style={{ fontSize: 15, color: '#6B5549', margin: 0 }}>加入 Claw Mart，开始发现优质 AI 技能</p>
            </div>

            {error && (
              <div style={{
                background: 'rgba(230, 92, 70, 0.1)', border: '1px solid rgba(230, 92, 70, 0.3)',
                borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#bf3f30', marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="claw-form-label">用户名</label>
                <input type="text" placeholder="张三" value={name} onChange={e => setName(e.target.value)} required className="claw-input" />
              </div>
              <div>
                <label className="claw-form-label">邮箱地址</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="claw-input" />
              </div>
              <div>
                <label className="claw-form-label">密码</label>
                <input type="password" placeholder="至少 8 位字符" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} className="claw-input" />
              </div>
              <div>
                <label className="claw-form-label">确认密码</label>
                <input type="password" placeholder="再次输入密码" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required minLength={8} className="claw-input" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="claw-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, fontWeight: 700, marginTop: 4 }}
              >
                {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : '免费注册'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#6B5549' }}>
              已有账号？{' '}
              <Link href="/login" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
