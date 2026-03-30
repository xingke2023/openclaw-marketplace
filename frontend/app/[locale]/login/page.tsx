'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import { useAuth } from '@/lib/auth-context';
import { clawStyles } from "@/components/claw-layout";
import { Loader2 } from 'lucide-react';

export function AuthCard({ defaultTab }: { defaultTab: 'login' | 'register' }) {
  const t = useTranslations('login');
  const router = useRouter();
  const { login, register } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      router.push('/');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : t('loginError'));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);
    try {
      await register({ name, email: regEmail, password: regPassword, password_confirmation: regPassword });
      router.push('/');
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('registerError'));
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <>
      <style>{clawStyles}</style>
      <style>{`
        .auth-tab {
          flex: 1;
          padding: 12px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #9e8074;
          border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
        }
        .auth-tab.active {
          color: #E65C46;
          border-bottom-color: #E65C46;
        }
        .auth-tab:hover:not(.active) {
          color: #2A1F19;
        }
      `}</style>
      <div className="claw-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(42,31,25,0.08)' }}>
          <Link href="/" style={{
            fontFamily: "'Bricolage Grotesque', 'Manrope', sans-serif",
            fontSize: 18, fontWeight: 700, color: '#2A1F19', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 28, height: 28, background: '#E65C46', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 800 }}>C</span>
            CLAW MART
          </Link>
        </div>

        {/* Card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
          <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 18, border: '1px solid rgba(42,31,25,0.08)', boxShadow: '0 4px 32px rgba(42,31,25,0.07)', overflow: 'hidden' }}>
            {/* Tab switcher */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(42,31,25,0.09)', padding: '0 32px' }}>
              <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>
                {t('tabLogin')}
              </button>
              <button className={`auth-tab${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')}>
                {t('tabRegister')}
              </button>
            </div>

            <div style={{ padding: '32px 32px 36px' }}>
              {tab === 'login' ? (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 800, color: '#2A1F19', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                      {t('loginTitle')}
                    </h1>
                    <p style={{ fontSize: 14, color: '#6B5549', margin: 0 }}>{t('loginSubtitle')}</p>
                  </div>

                  {loginError && (
                    <div style={{ background: 'rgba(230,92,70,0.1)', border: '1px solid rgba(230,92,70,0.3)', borderRadius: 8, padding: '11px 14px', fontSize: 13, color: '#bf3f30', marginBottom: 18 }}>
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label className="claw-form-label">{t('emailLabel')}</label>
                      <input type="email" placeholder="your@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="claw-input" />
                    </div>
                    <div>
                      <label className="claw-form-label">{t('passwordLabel')}</label>
                      <input type="password" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="claw-input" />
                    </div>
                    <button type="submit" disabled={loginLoading} className="claw-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, fontWeight: 700, marginTop: 4 }}>
                      {loginLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : t('loginBtn')}
                    </button>
                  </form>

                  <div style={{ marginTop: 20, padding: '13px 14px', background: 'rgba(42,31,25,0.04)', borderRadius: 10 }}>
                    <p style={{ fontSize: 12, color: '#9e8074', margin: '0 0 6px', fontWeight: 600 }}>{t('demoAccountLabel')}</p>
                    <p style={{ fontSize: 13, color: '#6B5549', margin: 0 }}>📧 demo@example.com &nbsp; 🔑 password</p>
                  </div>

                  <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6B5549' }}>
                    {t('noAccount')}{' '}
                    <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: '#E65C46', fontWeight: 600, cursor: 'pointer', fontSize: 13, padding: 0 }}>
                      {t('registerFree')}
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 800, color: '#2A1F19', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                      {t('registerTitle')}
                    </h1>
                    <p style={{ fontSize: 14, color: '#6B5549', margin: 0 }}>{t('registerSubtitle')}</p>
                  </div>

                  {regError && (
                    <div style={{ background: 'rgba(230,92,70,0.1)', border: '1px solid rgba(230,92,70,0.3)', borderRadius: 8, padding: '11px 14px', fontSize: 13, color: '#bf3f30', marginBottom: 18 }}>
                      {regError}
                    </div>
                  )}

                  <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <label className="claw-form-label">{t('nameLabel')}</label>
                      <input type="text" placeholder={t('namePlaceholder')} value={name} onChange={e => setName(e.target.value)} required className="claw-input" />
                    </div>
                    <div>
                      <label className="claw-form-label">{t('emailLabel')}</label>
                      <input type="email" placeholder="your@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="claw-input" />
                    </div>
                    <div>
                      <label className="claw-form-label">{t('passwordLabel')}</label>
                      <input type="password" placeholder={t('passwordPlaceholder')} value={regPassword} onChange={e => setRegPassword(e.target.value)} required minLength={8} className="claw-input" />
                    </div>
                    <button type="submit" disabled={regLoading} className="claw-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, fontWeight: 700, marginTop: 4 }}>
                      {regLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : t('registerBtn')}
                    </button>
                  </form>

                  <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6B5549' }}>
                    {t('hasAccount')}{' '}
                    <button onClick={() => setTab('login')} style={{ background: 'none', border: 'none', color: '#E65C46', fontWeight: 600, cursor: 'pointer', fontSize: 13, padding: 0 }}>
                      {t('loginNow')}
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return <AuthCard defaultTab="login" />;
}
