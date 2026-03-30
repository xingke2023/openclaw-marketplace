'use client';

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";
import { Link } from "@/lib/navigation";
import { useAuth } from "@/lib/auth-context";
import { listingsApi, Listing, ListingFormData, Purchase } from "@/lib/api";
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";
import { useTranslations, useLocale } from 'next-intl';
import { localName } from "@/lib/localize";
import {
  LayoutDashboard, ShoppingBag, Settings, Store,
  User, Globe, FileText, Camera, CheckCircle2, Loader2, ArrowRight,
  Plus, Pencil, Trash2, X, Tag, DollarSign, ImageIcon, Eye, EyeOff,
  Package
} from "lucide-react";

type Tab = 'overview' | 'purchases' | 'settings' | 'sell' | 'my-listings';

const CATEGORIES = ['AI 角色', '营销', '工程', '设计', '其他'];
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: '#2A1F19', margin: '0 0 20px' }}>
    {children}
  </h2>
);

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const t = useTranslations('dashboard');
  const { user, token, isAuthenticated, loading, updateProfile, becomeSeller } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as Tab | null;
  const [tab, setTab] = useState<Tab>(tabParam || 'overview');

  // Settings
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Seller onboarding
  const [becomingSellerLoading, setBecomingSellerLoading] = useState(false);
  const [sellerDone, setSellerDone] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login');
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAvatarUrl(user.avatar_url || '');
      setWebsiteUrl(user.website_url || '');
      setBio(user.bio || '');
    }
  }, [user]);

  useEffect(() => {
    if (tabParam) setTab(tabParam);
  }, [tabParam]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    try {
      await updateProfile({ name, avatar_url: avatarUrl || null, website_url: websiteUrl || null, bio: bio || null });
      setSaveMsg(t('settingsSaveSuccess'));
    } catch {
      setSaveMsg(t('settingsSaveError'));
    } finally {
      setSaving(false);
    }
  };

  const handleBecomeSeller = async () => {
    setBecomingSellerLoading(true);
    try {
      await becomeSeller();
      setSellerDone(true);
    } catch {
      // ignore
    } finally {
      setBecomingSellerLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <>
        <style>{clawStyles + dashStyles}</style>
        <div className="claw-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Loader2 size={28} style={{ color: '#E65C46', animation: 'spin 1s linear infinite' }} />
        </div>
      </>
    );
  }

  const isSeller = user.is_seller || sellerDone;

  const TABS: { key: Tab; label: string; icon: React.ReactNode; sellerOnly?: boolean }[] = [
    { key: 'overview' as Tab, label: t('tabOverview'), icon: <LayoutDashboard size={16} /> },
    { key: 'purchases' as Tab, label: t('tabPurchases'), icon: <ShoppingBag size={16} /> },
    { key: 'my-listings' as Tab, label: t('tabMySales'), icon: <Package size={16} />, sellerOnly: true },
    { key: 'settings' as Tab, label: t('tabSettings'), icon: <Settings size={16} /> },
    ...(!isSeller ? [{ key: 'sell' as Tab, label: t('tabStartSelling'), icon: <Store size={16} /> }] : []),
  ].filter(t => !t.sellerOnly || isSeller);

  return (
    <>
      <style>{clawStyles + dashStyles}</style>
      <div className="claw-page">
        <ClawNav />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
          <div style={{ marginBottom: 32 }}>
            <div className="claw-label">{t('userCenterLabel')}</div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 800, color: '#2A1F19', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
              {t('greeting')}，{user.name.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: 14, color: '#9e8074', margin: 0 }}>{user.email}</p>
          </div>

          <div className="dash-layout">
            <aside className="dash-sidebar">
              <div className="claw-card" style={{ padding: 8 }}>
                {TABS.map(t => (
                  <button
                    key={t.key}
                    className={`dash-tab-btn${tab === t.key ? ' active' : ''}${t.key === 'sell' ? ' sell' : ''}`}
                    onClick={() => setTab(t.key)}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="dash-content">
              {tab === 'overview' && <OverviewTab user={user} isSeller={isSeller} setTab={setTab} token={token!} />}
              {tab === 'purchases' && <PurchasesTab token={token!} />}
              {tab === 'my-listings' && isSeller && <MyListingsTab token={token!} />}
              {tab === 'settings' && (
                <SettingsTab
                  name={name} setName={setName}
                  avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl}
                  websiteUrl={websiteUrl} setWebsiteUrl={setWebsiteUrl}
                  bio={bio} setBio={setBio}
                  saving={saving} saveMsg={saveMsg}
                  onSave={handleSaveProfile}
                  user={user}
                />
              )}
              {tab === 'sell' && (
                <SellTab
                  isSeller={isSeller}
                  loading={becomingSellerLoading}
                  done={sellerDone}
                  onBecome={handleBecomeSeller}
                  onDone={() => setTab('my-listings')}
                />
              )}
            </div>
          </div>
        </main>
        <ClawFooter />
      </div>
    </>
  );
}

// ---- Overview ----
function OverviewTab({ user, isSeller, setTab, token }: { user: any; isSeller: boolean; setTab: (t: Tab) => void; token: string }) {
  const t = useTranslations('dashboard');
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [purchaseCount, setPurchaseCount] = useState<number | null>(null);

  useEffect(() => {
    listingsApi.getPurchases(token).then(r => setPurchaseCount(r.total)).catch(() => {});
    if (isSeller) {
      listingsApi.getMyListings(token).then(r => setListingCount(r.total)).catch(() => {});
    }
  }, [isSeller, token]);

  const stats = [
    { label: t('statPurchased'), value: purchaseCount === null ? '…' : String(purchaseCount), icon: <ShoppingBag size={18} style={{ color: '#E65C46' }} /> },
    ...(isSeller ? [{ label: t('statListings'), value: listingCount === null ? '…' : String(listingCount), icon: <Package size={18} style={{ color: '#E65C46' }} /> }] : []),
    { label: t('statAccountStatus'), value: isSeller ? t('statusSeller') : t('statusNormal'), icon: <User size={18} style={{ color: '#E65C46' }} /> },
    { label: t('statJoinedAt'), value: new Date(user.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' }), icon: <CheckCircle2 size={18} style={{ color: '#E65C46' }} /> },
  ];

  return (
    <div>
      <H2>{t('overviewTitle')}</H2>
      <div className="dash-stats-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${isSeller ? 4 : 3}, 1fr)`, gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} className="claw-card" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 20 }}>
            {s.icon}
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Bricolage Grotesque', sans-serif", color: '#2A1F19' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#9e8074', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="claw-btn-primary" onClick={() => setTab('purchases')}>
          <ShoppingBag size={15} /> {t('btnMyPurchases')}
        </button>
        {isSeller && (
          <button className="claw-btn-primary" onClick={() => setTab('my-listings')} style={{ background: '#2A1F19' }}>
            <Package size={15} /> {t('btnMySales')}
          </button>
        )}
        <button className="claw-btn-ghost" onClick={() => setTab('settings')}>
          <Settings size={15} /> {t('btnEditProfile')}
        </button>
        {!isSeller && (
          <button className="claw-btn-ghost" onClick={() => setTab('sell')} style={{ color: '#E65C46', borderColor: 'rgba(230,92,70,0.3)' }}>
            <Store size={15} /> {t('tabStartSelling')}
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Purchases ----
function PurchasesTab({ token }: { token: string }) {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listingsApi.getPurchases(token)
      .then(r => setPurchases(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <H2>{t('purchasesTitle')}</H2>
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(3)].map((_, i) => <div key={i} className="claw-skeleton" style={{ height: 72, borderRadius: 12 }} />)}
        </div>
      ) : purchases.length === 0 ? (
        <div className="claw-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🛍️</div>
          <p style={{ fontSize: 15, color: '#6B5549', margin: '0 0 20px' }}>{t('purchasesEmpty')}</p>
          <Link href="/" className="claw-btn-primary">{t('browsMarket')} <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {purchases.map(p => (
            <Link key={p.id} href={`/install/${p.listing.slug}`} style={{ textDecoration: 'none' }}>
              <div className="claw-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, transition: 'box-shadow 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(42,31,25,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>🤖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: '#2A1F19', marginBottom: 3 }}>
                    {localName(p.listing, locale)}
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#9e8074' }}>{p.listing.category}</span>
                    <span style={{ fontSize: 12, color: '#9e8074' }}>
                      {t('purchasedAt')} {new Date(p.created_at).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4a9e6b', background: 'rgba(74,158,107,0.1)', padding: '3px 10px', borderRadius: 100 }}>
                    {parseFloat(p.price_paid) === 0 ? t('purchaseFree') : `¥${p.price_paid}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- My Listings ----
function MyListingsTab({ token }: { token: string }) {
  const t = useTranslations('dashboard');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listingsApi.getMyListings(token);
      setListings(res.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await listingsApi.deleteListing(id, token);
      setDeleteId(null);
      fetchListings();
    } catch {
      // ignore
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <H2>{t('myListingsTitle')}</H2>
        <button className="claw-btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus size={15} /> {t('addNewListing')}
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="claw-skeleton" style={{ height: 72, borderRadius: 12 }} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="claw-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📦</div>
          <p style={{ fontSize: 15, color: '#6B5549', margin: '0 0 20px' }}>{t('listingsEmpty')}</p>
          <button className="claw-btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
            <Plus size={15} /> {t('addFirstListing')}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {listings.map(listing => (
            <div key={listing.id} className="claw-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>🤖</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: '#2A1F19', marginBottom: 2 }}>
                  {localName(listing, locale)}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#9e8074' }}>{listing.category}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: parseFloat(listing.price) === 0 ? '#4a9e6b' : '#2A1F19' }}>
                    {parseFloat(listing.price) === 0 ? tHome('free') : `¥${listing.price}`}
                  </span>
                  <span className={`listing-status-badge ${listing.status}`}>
                    {listing.status === 'available' ? t('statusAvailable') : listing.status === 'draft' ? t('statusDraft') : t('statusSold')}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link href={`/listings/${listing.slug}`} target="_blank" className="dash-icon-btn" title={t('previewTitle')}>
                  <Eye size={15} />
                </Link>
                <button className="dash-icon-btn" title={t('editTitle')} onClick={() => { setEditing(listing); setShowForm(true); }}>
                  <Pencil size={15} />
                </button>
                <button className="dash-icon-btn danger" title={t('deleteTitle')} onClick={() => setDeleteId(listing.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div className="dash-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="dash-modal" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, margin: '0 0 12px', color: '#2A1F19' }}>{t('deleteConfirmTitle')}</h3>
            <p style={{ fontSize: 14, color: '#6B5549', margin: '0 0 24px' }}>{t('deleteConfirmDesc')}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="claw-btn-ghost" onClick={() => setDeleteId(null)}>{t('deleteCancel')}</button>
              <button
                className="claw-btn-primary"
                style={{ background: '#bf3f30' }}
                disabled={deleting}
                onClick={() => handleDelete(deleteId)}
              >
                {deleting ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                {t('deleteConfirmBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit form modal */}
      {showForm && (
        <ListingFormModal
          token={token}
          editing={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchListings(); }}
        />
      )}
    </div>
  );
}

// ---- Listing Form Modal ----
function ListingFormModal({ token, editing, onClose, onSaved }: {
  token: string;
  editing: Listing | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const t = useTranslations('dashboard');
  const [name, setName] = useState(editing?.name || '');
  const [nameJa, setNameJa] = useState(editing?.name_ja || '');
  const [price, setPrice] = useState(editing ? String(parseFloat(editing.price)) : '');
  const [description, setDescription] = useState(editing?.description || '');
  const [descriptionJa, setDescriptionJa] = useState(editing?.description_ja || '');
  const [imageUrl, setImageUrl] = useState(editing?.image_url || '');
  const [category, setCategory] = useState(editing?.category || CATEGORIES[0]);
  const [status, setStatus] = useState<'available' | 'draft' | 'sold'>(
    (editing?.status as any) || 'available'
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const data: ListingFormData = {
      name,
      name_ja: nameJa || undefined,
      price: parseFloat(price) || 0,
      description: description || undefined,
      description_ja: descriptionJa || undefined,
      image_url: imageUrl || undefined,
      category,
      status,
    };
    try {
      if (editing) {
        await listingsApi.updateListing(editing.id, data, token);
      } else {
        await listingsApi.createListing(data, token);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || t('formSaveError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div className="dash-modal dash-modal-lg" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, margin: 0, color: '#2A1F19' }}>
            {editing ? t('formEditTitle') : t('formNewTitle')}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e8074', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="claw-form-label"><Package size={13} style={{ display: 'inline', marginRight: 5 }} />{t('formNameLabel')}</label>
            <input className="claw-input" value={name} onChange={e => setName(e.target.value)} placeholder={t('formNamePlaceholder')} required />
          </div>

          <div>
            <label className="claw-form-label"><Package size={13} style={{ display: 'inline', marginRight: 5 }} />日本語名称 <span style={{ fontSize: 11, color: '#9e8074', fontWeight: 400 }}>（任意）</span></label>
            <input className="claw-input" value={nameJa} onChange={e => setNameJa(e.target.value)} placeholder="日本語の名前を入力してください" />
          </div>

          <div className="dash-form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="claw-form-label"><DollarSign size={13} style={{ display: 'inline', marginRight: 5 }} />{t('formPriceLabel')}</label>
              <input className="claw-input" type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder={t('formPricePlaceholder')} required />
            </div>
            <div>
              <label className="claw-form-label"><Tag size={13} style={{ display: 'inline', marginRight: 5 }} />{t('formCategoryLabel')}</label>
              <select className="claw-input" value={category} onChange={e => setCategory(e.target.value)} style={{ cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="claw-form-label"><FileText size={13} style={{ display: 'inline', marginRight: 5 }} />{t('formDescLabel')}</label>
            <textarea className="claw-textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder={t('formDescPlaceholder')} />
          </div>

          <div>
            <label className="claw-form-label"><FileText size={13} style={{ display: 'inline', marginRight: 5 }} />日本語説明 <span style={{ fontSize: 11, color: '#9e8074', fontWeight: 400 }}>（任意）</span></label>
            <textarea className="claw-textarea" rows={4} value={descriptionJa} onChange={e => setDescriptionJa(e.target.value)} placeholder="日本語の説明を入力してください" />
          </div>

          <div>
            <label className="claw-form-label"><ImageIcon size={13} style={{ display: 'inline', marginRight: 5 }} />{t('formImageLabel')}</label>
            <input className="claw-input" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/cover.jpg" />
          </div>

          <div>
            <label className="claw-form-label">{t('formStatusLabel')}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['available', t('formStatusAvailable'), <Eye size={13} />], ['draft', t('formStatusDraft'), <EyeOff size={13} />]] as const).map(([val, label, icon]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setStatus(val)}
                  className={`claw-chip${status === val ? ' active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {icon}{label}
                </button>
              ))}
            </div>
          </div>

          {error && <div style={{ fontSize: 13, color: '#bf3f30', fontWeight: 600 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button type="button" className="claw-btn-ghost" onClick={onClose}>{t('formCancelBtn')}</button>
            <button type="submit" className="claw-btn-primary" disabled={saving}>
              {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : null}
              {editing ? t('formSaveBtn') : t('formPublishBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Settings ----
function SettingsTab({ name, setName, avatarUrl, setAvatarUrl, websiteUrl, setWebsiteUrl, bio, setBio, saving, saveMsg, onSave, user }: any) {
  const t = useTranslations('dashboard');
  return (
    <div>
      <H2>{t('settingsTitle')}</H2>
      <div className="claw-card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(42,31,25,0.08)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: avatarUrl ? 'transparent' : '#E65C46', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(42,31,25,0.1)' }}>
            {avatarUrl
              ? <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>{user.name[0]?.toUpperCase()}</span>
            }
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#2A1F19' }}>{name || user.name}</div>
            <div style={{ fontSize: 13, color: '#9e8074' }}>{user.email}</div>
          </div>
        </div>
        <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label className="claw-form-label"><User size={13} style={{ display: 'inline', marginRight: 5 }} />{t('settingsNicknameLabel')}</label>
            <input className="claw-input" value={name} onChange={e => setName(e.target.value)} placeholder={t('settingsNicknamePlaceholder')} />
          </div>
          <div>
            <label className="claw-form-label"><Camera size={13} style={{ display: 'inline', marginRight: 5 }} />{t('settingsAvatarLabel')}</label>
            <input className="claw-input" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" />
          </div>
          <div>
            <label className="claw-form-label"><Globe size={13} style={{ display: 'inline', marginRight: 5 }} />Website URL</label>
            <input className="claw-input" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://yoursite.com" />
          </div>
          <div>
            <label className="claw-form-label"><FileText size={13} style={{ display: 'inline', marginRight: 5 }} />{t('settingsBioLabel')}</label>
            <textarea className="claw-textarea" rows={4} value={bio} onChange={e => setBio(e.target.value)} placeholder={t('settingsBioPlaceholder')} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="submit" className="claw-btn-primary" disabled={saving}>
              {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : null}
              {t('settingsSaveBtn')}
            </button>
            {saveMsg && <span style={{ fontSize: 13, color: saveMsg === t('settingsSaveSuccess') ? '#4a9e6b' : '#bf3f30', fontWeight: 600 }}>{saveMsg}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Sell / Onboarding ----
function SellTab({ isSeller, loading, done, onBecome, onDone }: { isSeller: boolean; loading: boolean; done: boolean; onBecome: () => void; onDone: () => void }) {
  const t = useTranslations('dashboard');
  if (isSeller || done) {
    return (
      <div>
        <H2>{t('sellerStatusTitle')}</H2>
        <div className="claw-card" style={{ padding: 40, textAlign: 'center' }}>
          <CheckCircle2 size={40} style={{ color: '#4a9e6b', margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: '#2A1F19', margin: '0 0 8px' }}>{t('sellerAlready')}</h3>
          <p style={{ fontSize: 14, color: '#6B5549', margin: '0 0 24px' }}>{t('sellerAlreadyDesc')}</p>
          <button className="claw-btn-primary" onClick={onDone}><Package size={15} /> {t('sellerManageBtn')}</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <H2>{t('startSellingTitle')}</H2>
      <div className="claw-card" style={{ padding: 32, marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🚀</div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: '#2A1F19', margin: '0 0 12px' }}>{t('startSellingHeading')}</h3>
        <p style={{ fontSize: 14, color: '#6B5549', lineHeight: 1.7, margin: '0 0 24px' }}>{t('startSellingDesc')}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[t('startSellingBenefit1'), t('startSellingBenefit2'), t('startSellingBenefit3'), t('startSellingBenefit4')].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={15} style={{ color: '#4a9e6b', flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: '#2A1F19' }}>{item}</span>
            </div>
          ))}
        </div>
        <button className="claw-btn-primary" onClick={onBecome} disabled={loading} style={{ fontSize: 15, padding: '12px 28px' }}>
          {loading ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Store size={15} />}
          {t('startSellingBtn')}
        </button>
      </div>
      <div className="claw-highlight-box">
        <span style={{ fontSize: 13, color: '#6B5549' }}>{t('startSellingHelp')} <a href="#" style={{ color: '#E65C46', fontWeight: 600, textDecoration: 'none' }}>{t('startSellingGuide')}</a> {t('startSellingOrContact')}</span>
      </div>
    </div>
  );
}

const dashStyles = `
  .dash-layout {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 24px;
    align-items: start;
  }
  .dash-sidebar { position: sticky; top: 80px; }
  .dash-tab-btn {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 10px 14px; font-size: 14px; font-weight: 500; color: #6B5549;
    background: transparent; border: none; border-radius: 8px; cursor: pointer;
    font-family: 'Manrope', sans-serif; transition: background 0.12s, color 0.12s; text-align: left;
  }
  .dash-tab-btn:hover { background: rgba(240,232,225,0.8); color: #2A1F19; }
  .dash-tab-btn.active { background: rgba(230,92,70,0.1); color: #E65C46; font-weight: 600; }
  .dash-tab-btn.sell { color: #E65C46; }
  .dash-tab-btn.sell:hover { background: rgba(230,92,70,0.08); }

  .dash-icon-btn {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(42,31,25,0.12);
    background: white; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6B5549; transition: all 0.12s; text-decoration: none;
  }
  .dash-icon-btn:hover { background: rgba(240,232,225,0.8); color: #2A1F19; border-color: rgba(42,31,25,0.2); }
  .dash-icon-btn.danger:hover { background: rgba(191,63,48,0.08); color: #bf3f30; border-color: rgba(191,63,48,0.2); }

  .listing-status-badge {
    font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px;
  }
  .listing-status-badge.available { background: rgba(74,158,107,0.12); color: #2e7d52; }
  .listing-status-badge.draft { background: rgba(42,31,25,0.08); color: #6B5549; }
  .listing-status-badge.sold { background: rgba(230,92,70,0.12); color: #bf3f30; }

  .dash-modal-overlay {
    position: fixed; inset: 0; background: rgba(42,31,25,0.4); backdrop-filter: blur(4px);
    z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .dash-modal {
    background: white; border-radius: 16px; padding: 28px; width: 100%; max-width: 420px;
    box-shadow: 0 16px 48px rgba(42,31,25,0.18); max-height: 90vh; overflow-y: auto;
    animation: modalIn 0.15s ease;
  }
  .dash-modal-lg { max-width: 560px; }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 640px) {
    .dash-layout { grid-template-columns: 1fr; gap: 0; }
    .dash-sidebar {
      position: static;
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      gap: 4px;
      padding: 8px 0 12px;
      border-bottom: 1px solid rgba(42,31,25,0.08);
      scrollbar-width: none;
    }
    .dash-sidebar::-webkit-scrollbar { display: none; }
    .dash-tab-btn {
      white-space: nowrap;
      flex-shrink: 0;
      padding: 8px 14px;
      border-radius: 100px;
      font-size: 13px;
    }
    .dash-tab-btn.active {
      background: #2A1F19;
      color: white;
    }
  }
  @media (max-width: 480px) {
    .dash-stats-grid { grid-template-columns: 1fr 1fr !important; }
    .dash-form-two-col { grid-template-columns: 1fr !important; }
  }
`;
