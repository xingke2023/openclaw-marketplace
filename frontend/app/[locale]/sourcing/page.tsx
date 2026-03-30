'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { useAuth } from "@/lib/auth-context";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

export default function SourcingPage() {
  const t = useTranslations('sourcing');
  const { isAuthenticated, logout } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", website: "", role: "", tools: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const comparison = [
    { label: t('compRow1Label'), human: t('compRow1Human'), claw: t('compRow1Claw') },
    { label: t('compRow2Label'), human: t('compRow2Human'), claw: t('compRow2Claw') },
    { label: t('compRow3Label'), human: t('compRow3Human'), claw: t('compRow3Claw') },
    { label: t('compRow4Label'), human: t('compRow4Human'), claw: t('compRow4Claw') },
    { label: t('compRow5Label'), human: t('compRow5Human'), claw: t('compRow5Claw') },
    { label: t('compRow6Label'), human: t('compRow6Human'), claw: t('compRow6Claw') },
    { label: t('compRow7Label'), human: t('compRow7Human'), claw: t('compRow7Claw') },
    { label: t('compRow8Label'), human: t('compRow8Human'), claw: t('compRow8Claw') },
    { label: t('compRow9Label'), human: t('compRow9Human'), claw: t('compRow9Claw') },
  ];

  const options = [
    {
      title: t('opt1Title'),
      name: t('opt1Name'),
      pros: [t('opt1Pro1')],
      cons: [t('opt1Con1'), t('opt1Con2'), t('opt1Con3'), t('opt1Con4'), t('opt1Con5')],
      note: t('opt1Note'),
      highlight: false,
    },
    {
      title: t('opt2Title'),
      name: t('opt2Name'),
      pros: [t('opt2Pro1'), t('opt2Pro2')],
      cons: [t('opt2Con1'), t('opt2Con2'), t('opt2Con3'), t('opt2Con4')],
      note: t('opt2Note'),
      highlight: false,
    },
    {
      title: t('opt3Title'),
      name: t('opt3Name'),
      pros: [t('opt3Pro1'), t('opt3Pro2'), t('opt3Pro3'), t('opt3Pro4'), t('opt3Pro5'), t('opt3Pro6')],
      cons: [],
      note: t('opt3Note'),
      highlight: true,
    },
  ];

  const features = [
    {
      emoji: "🧠",
      title: t('feature1Title'),
      desc: t('feature1Desc'),
    },
    {
      emoji: "🔧",
      title: t('feature2Title'),
      desc: t('feature2Desc'),
    },
    {
      emoji: "👤",
      title: t('feature3Title'),
      desc: t('feature3Desc'),
    },
    {
      emoji: "🤝",
      title: t('feature4Title'),
      desc: t('feature4Desc'),
    },
  ];

  const security = [
    { emoji: "🔒", title: t('sec1Title'), desc: t('sec1Desc') },
    { emoji: "🔐", title: t('sec2Title'), desc: t('sec2Desc') },
    { emoji: "🛡️", title: t('sec3Title'), desc: t('sec3Desc') },
    { emoji: "💾", title: t('sec4Title'), desc: t('sec4Desc') },
    { emoji: "🔑", title: t('sec5Title'), desc: t('sec5Desc') },
    { emoji: "📡", title: t('sec6Title'), desc: t('sec6Desc') },
  ];

  const clawTypes = [
    { emoji: "⚡", title: t('clawType1Title'), subtitle: t('clawType1Subtitle'), desc: t('clawType1Desc'), popular: true },
    { emoji: "✍️", title: t('clawType2Title'), subtitle: t('clawType2Subtitle'), desc: t('clawType2Desc'), popular: false },
    { emoji: "📬", title: t('clawType3Title'), subtitle: t('clawType3Subtitle'), desc: t('clawType3Desc'), popular: false },
    { emoji: "📈", title: t('clawType4Title'), subtitle: t('clawType4Subtitle'), desc: t('clawType4Desc'), popular: false },
    { emoji: "🛠️", title: t('clawType5Title'), subtitle: t('clawType5Subtitle'), desc: t('clawType5Desc'), popular: false },
    { emoji: "🧾", title: t('clawType6Title'), subtitle: t('clawType6Subtitle'), desc: t('clawType6Desc'), popular: false },
    { emoji: "🧠", title: t('clawType7Title'), subtitle: t('clawType7Subtitle'), desc: t('clawType7Desc'), popular: false },
  ];

  const steps = [
    { num: "1", title: t('step1Title'), desc: t('step1Desc') },
    { num: "2", title: t('step2Title'), desc: t('step2Desc') },
    { num: "3", title: t('step3Title'), desc: t('step3Desc') },
    { num: "4", title: t('step4Title'), desc: t('step4Desc') },
    { num: "5", title: t('step5Title'), desc: t('step5Desc') },
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') },
    { q: t('faq.q9'), a: t('faq.a9') },
  ];

  const toggleType = (title: string) => {
    setSelectedTypes(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
    <style>{clawStyles}</style>
    <div className="claw-page">
      <ClawNav />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{ padding: '72px 24px 56px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="claw-label">{t('labelTag')}</div>
          <h1 className="claw-h1" style={{ fontSize: 52 }}>
            {t('heroTitle')}
          </h1>
          <p className="claw-lead" style={{ margin: '0 0 16px' }}>
            {t('heroLead')}
          </p>
          <p className="claw-body" style={{ margin: '0 0 32px' }}>
            {t('heroBody')}
          </p>
          <button className="claw-btn-primary" style={{ fontSize: 16, padding: '12px 32px' }} onClick={() => document.getElementById('consult-form')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('heroBtn')}
          </button>
          <p style={{ fontSize: 13, color: '#9e8074', marginTop: 12 }}>{t('heroPricing')}</p>
        </section>

        <hr className="claw-divider" />

        {/* Why hasn't it */}
        <section style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 20, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('whyNotYetTitle')}</h2>
            <p style={{ color: '#6B5549', lineHeight: 1.7, marginBottom: 16 }}>
              {t('whyNotYetDesc1')}
            </p>
            <p style={{ color: '#6B5549', lineHeight: 1.7, marginBottom: 16 }}>
              {t('whyNotYetDesc2')}
            </p>
            <div style={{ margin: '24px 0', padding: '20px', borderLeft: '4px solid #E65C46', background: 'rgba(230, 92, 70, 0.06)', borderRadius: '0 12px 12px 0' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t('weDoAll')}</p>
            </div>
            <p style={{ color: '#6B5549', lineHeight: 1.7 }}>
              {t('weDoAllDesc')}
            </p>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Comparison table */}
        <section style={{ padding: '48px 24px', background: 'rgba(240, 232, 225, 0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('comparisonTitle')}</h2>
            <p style={{ color: '#6B5549', marginBottom: 24 }}>{t('comparisonSubtitle')}</p>
            <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(42, 31, 25, 0.1)' }}>
              <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(42, 31, 25, 0.1)', background: 'rgba(240, 232, 225, 0.5)' }}>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: 600, color: '#2A1F19' }}></th>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: 600, color: '#6B5549' }}>{t('comparisonHuman')}</th>
                    <th style={{ textAlign: 'left', padding: 12, fontWeight: 600, color: '#E65C46' }}>{t('comparisonClaw')}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < comparison.length - 1 ? '1px solid rgba(42, 31, 25, 0.1)' : 'none' }}>
                      <td style={{ padding: 12, fontWeight: 500, color: '#2A1F19' }}>{row.label}</td>
                      <td style={{ padding: 12, color: '#6B5549' }}>{row.human}</td>
                      <td style={{ padding: 12, fontWeight: 500, color: '#E65C46' }}>{row.claw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Unfair part */}
        <section style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 20, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('unfairTitle')}</h2>
            <p style={{ color: '#6B5549', lineHeight: 1.7, marginBottom: 16 }}>
              {t('unfairDesc1')}
            </p>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 16, color: '#2A1F19' }}>{t('unfairTeam')}</p>
            <p style={{ color: '#6B5549', lineHeight: 1.7, marginBottom: 16 }}>
              {t('unfairDesc2')}
            </p>
            <p style={{ color: '#6B5549', lineHeight: 1.7, marginBottom: 16 }}>
              {t('unfairDesc3')}
            </p>
            <p style={{ fontWeight: 600, color: '#2A1F19' }}>{t('unfairChallenge')}</p>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Three options */}
        <section style={{ padding: '48px 24px', background: 'rgba(240, 232, 225, 0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('threeOptionsTitle')}</h2>
            <p style={{ textAlign: 'center', color: '#6B5549', marginBottom: 32 }}>{t('threeOptionsSubtitle')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {options.map((opt, i) => (
                <div
                  key={i}
                  style={
                    opt.highlight
                      ? { border: '1.5px solid #E65C46', background: 'rgba(230, 92, 70, 0.05)', boxShadow: '0 4px 20px rgba(230,92,70,0.15)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' }
                      : { border: '1px solid rgba(42, 31, 25, 0.1)', background: 'white', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' }
                  }
                >
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e8074', marginBottom: 4 }}>{opt.title}</p>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 16, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{opt.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                    {opt.pros.map((p, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#2A1F19' }}>
                        <Check style={{ width: 16, height: 16, color: '#22c55e', marginTop: 2, flexShrink: 0 }} />{p}
                      </li>
                    ))}
                    {opt.cons.map((c, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#6B5549' }}>
                        <X style={{ width: 16, height: 16, color: '#f87171', marginTop: 2, flexShrink: 0 }} />{c}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 12, color: '#9e8074', fontStyle: 'italic', marginTop: 'auto' }}>{opt.note}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#6B5549', marginTop: 32, fontSize: 14, maxWidth: 672, margin: '32px auto 0' }}>
              {t('optionsSummary')}
            </p>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* What you get */}
        <section style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('whatYouGetTitle')}</h2>
            <p style={{ color: '#6B5549', marginBottom: 32 }}>{t('whatYouGetDesc')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontSize: '1.5rem' }}>{f.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.7 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Security */}
        <section style={{ padding: '48px 24px', background: 'rgba(240, 232, 225, 0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('securityTitle')}</h2>
            <p style={{ color: '#6B5549', marginBottom: 32 }}>{t('securityDesc')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {security.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: '1.25rem' }}>{s.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: '#2A1F19' }}>{s.title}</h3>
                    <p style={{ fontSize: 12, color: '#6B5549', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 32, fontSize: 14, color: '#6B5549' }}>
              <strong style={{ color: '#2A1F19' }}>{t('securityOwnership')}</strong>{t('securityOwnershipDesc')}
            </p>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Claw types */}
        <section style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 32, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('whoToHireTitle')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {clawTypes.map((c, i) => (
                <div
                  key={i}
                  style={
                    c.popular
                      ? { border: '1.5px solid #E65C46', background: 'rgba(230, 92, 70, 0.05)', borderRadius: 16, padding: 20, position: 'relative' }
                      : { border: '1px solid rgba(42, 31, 25, 0.1)', background: 'white', borderRadius: 16, padding: 20, position: 'relative' }
                  }
                >
                  {c.popular && (
                    <span style={{ position: 'absolute', top: -10, left: 16, fontSize: 11, background: '#E65C46', color: 'white', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>{t('popularBadge')}</span>
                  )}
                  <span style={{ fontSize: '1.5rem' }}>{c.emoji}</span>
                  <h3 style={{ fontWeight: 700, marginTop: 8, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{c.title}</h3>
                  <p style={{ fontSize: 12, color: '#E65C46', fontWeight: 600, marginBottom: 8 }}>{c.subtitle}</p>
                  <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Steps */}
        <section style={{ padding: '48px 24px', background: 'rgba(240, 232, 225, 0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 32, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('stepsTitle')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div className="claw-step-num">{s.num}</div>
                  <div>
                    <h3 style={{ fontWeight: 700, marginBottom: 4, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="claw-divider" />

        {/* Form */}
        <section id="consult-form" style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e8074', textAlign: 'center', marginBottom: 8 }}>{t('formStart')}</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 8, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('formTitle')}</h2>
            <p style={{ color: '#6B5549', textAlign: 'center', fontSize: 14, marginBottom: 32 }}>{t('formDesc')}</p>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: '3rem' }}>✅</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2A1F19', fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t('submittedTitle')}</h3>
                <p style={{ color: '#6B5549', fontSize: 14 }}>{t('submittedDesc')}</p>
                <button className="claw-btn-ghost" onClick={() => setSubmitted(false)}>{t('submittedBack')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="name" className="claw-form-label">{t('formNameLabel')}</label>
                    <input id="name" required value={formData.name} onChange={handleChange} className="claw-input" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="email" className="claw-form-label">{t('formEmailLabel')}</label>
                    <input id="email" type="email" required value={formData.email} onChange={handleChange} className="claw-input" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="company" className="claw-form-label">{t('formCompanyLabel')}</label>
                    <input id="company" required value={formData.company} onChange={handleChange} className="claw-input" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="website" className="claw-form-label">{t('formWebsiteLabel')}</label>
                    <input id="website" value={formData.website} onChange={handleChange} className="claw-input" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="role" className="claw-form-label">{t('formRoleLabel')}</label>
                  <input id="role" required value={formData.role} onChange={handleChange} className="claw-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="tools" className="claw-form-label">{t('formToolsLabel')}</label>
                  <input id="tools" value={formData.tools} onChange={handleChange} className="claw-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p className="claw-form-label">{t('formClawTypeLabel')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {clawTypes.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleType(c.title)}
                        className="claw-chip"
                        style={
                          selectedTypes.includes(c.title)
                            ? { background: '#E65C46', color: 'white', borderColor: '#E65C46' }
                            : {}
                        }
                      >
                        {c.emoji} {c.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="notes" className="claw-form-label">{t('formNotesLabel')}</label>
                  <textarea id="notes" rows={3} value={formData.notes} onChange={handleChange} className="claw-textarea" />
                </div>
                <button type="submit" className="claw-btn-primary" style={{ width: '100%', height: 44, fontWeight: 700, fontSize: 15 }}>{t('formSubmitBtn')}</button>
                <p style={{ textAlign: 'center', fontSize: 12, color: '#9e8074' }}>{t('formNote')}</p>
              </form>
            )}
          </div>
        </section>

        <hr className="claw-divider" />

        {/* FAQ */}
        <section style={{ padding: '48px 24px', background: 'rgba(240, 232, 225, 0.5)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{t('faqTitle')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, i) => (
                <div key={i} className="claw-accordion">
                  <button
                    className="claw-accordion-btn"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    {openFaq === i ? <ChevronUp style={{ width: 16, height: 16, flexShrink: 0, marginLeft: 8 }} /> : <ChevronDown style={{ width: 16, height: 16, flexShrink: 0, marginLeft: 8 }} />}
                  </button>
                  {openFaq === i && (
                    <div className="claw-accordion-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <ClawFooter />
    </div>
    </>
  );
}
