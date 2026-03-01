# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack application with **separate backend and frontend** in a monorepo structure:

- **Backend**: Laravel 12 API (PHP 8.4) in `backend/` directory
- **Frontend**: Next.js 16 (React 19.2, TypeScript) in `frontend/` directory

### Authentication Flow
Laravel Sanctum provides token-based authentication. The flow is:
1. Frontend sends credentials to `/api/login` or `/api/register`
2. Backend returns Sanctum token + user object
3. Frontend stores token in localStorage
4. Frontend sends token via `Authorization: Bearer {token}` header for protected routes

**Key Implementation**:
- `AuthProvider` (frontend/lib/auth-context.tsx) manages global auth state
- `useAuth` hook provides auth methods to components
- API client (frontend/lib/api/client.ts) auto-injects tokens

### CORS & Cross-Origin Setup
Backend is configured to accept requests from frontend via:
- `backend/.env`: `SANCTUM_STATEFUL_DOMAINS` specifies allowed origins
- `backend/bootstrap/app.php`: Sanctum middleware prepended to API routes
- Current ports: Backend 8068, Frontend 3111 (both bound to 0.0.0.0 for remote access)

### API Architecture
- Routes defined in `backend/routes/api.php`
- All routes prefixed with `/api`
- Controllers in `backend/app/Http/Controllers/Api/`
- PostController uses route model binding and authorization checks (owner-only operations)

## Development Commands

### Backend (Laravel)
```bash
cd backend

# Start server (remote access)
php artisan serve --host=0.0.0.0 --port=8068

# Database
php artisan migrate              # Run migrations
php artisan migrate:fresh        # Reset database
php artisan db:seed              # Seed data (demo user: demo@example.com / password)

# Testing
php artisan test                 # Run all tests (Pest)
php artisan test --filter=testName  # Run specific test

# Cache
php artisan cache:clear
php artisan config:cache         # Cache config for production
php artisan route:cache          # Cache routes for production

# Utilities
php artisan route:list           # List all routes
php artisan make:controller Api/ExampleController  # New controller
php artisan make:model Example -mf  # Model + migration + factory
```

### Frontend (Next.js)
```bash
cd frontend

# Start dev server (configured for port 3111, remote access)
npm run dev

# Build
npm run build
npm start                        # Production server

# Linting
npm run lint

# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

## File Structure Patterns

### Backend
- **Controllers**: `app/Http/Controllers/Api/` - API endpoints
- **Models**: `app/Models/` - Eloquent models with relationships
- **Routes**: `routes/api.php` - API route definitions
- **Migrations**: `database/migrations/` - Database schema
- **Factories**: `database/factories/` - Test data generation
- **Config**: `bootstrap/app.php` - Middleware, routing, exceptions

### Frontend
- **Pages**: `app/*/page.tsx` - Next.js App Router pages
- **API Layer**: `lib/api/` - HTTP client, type definitions, service methods
- **Auth**: `lib/auth-context.tsx` - Global authentication state
- **UI Components**: `components/ui/` - shadcn/ui components
- **Layout**: `app/layout.tsx` - Root layout with AuthProvider wrapper

## Key Configuration Files

### Backend Environment (backend/.env)
```
APP_URL=http://0.0.0.0:8068
FRONTEND_URL=http://0.0.0.0:3111
SANCTUM_STATEFUL_DOMAINS=localhost:3111,localhost,0.0.0.0:3111,0.0.0.0
DB_CONNECTION=sqlite
```

### Frontend Environment (frontend/.env.local)
```
NEXT_PUBLIC_API_URL=http://0.0.0.0:8068/api
```

## Common Development Tasks

### Adding a New API Endpoint
1. Create controller method in `backend/app/Http/Controllers/Api/`
2. Add route in `backend/routes/api.php`
3. Add TypeScript types in `frontend/lib/api/types.ts`
4. Add API method in `frontend/lib/api/` service file
5. Use in components via API client

### Adding a New Model with CRUD
```bash
cd backend
php artisan make:model Example -mfc  # Model + migration + factory + controller
# Edit migration, model relationships, factory
php artisan migrate
# Add routes to routes/api.php
# Create corresponding TypeScript types and API methods in frontend
```

### Adding a New Page
1. Create `frontend/app/[pagename]/page.tsx`
2. Use `'use client'` directive if using hooks or interactivity
3. Import `useAuth` from `@/lib/auth-context` for auth state
4. Import `ClawNav`, `ClawFooter`, `clawStyles` from `@/components/claw-layout` for consistent UI
5. Wrap page with `<style>{clawStyles}</style>` and `<div className="claw-page">` as root
6. **Never write a custom navbar or footer** — always use `<ClawNav />` and `<ClawFooter />`
7. For protected pages, redirect to `/login` if `!isAuthenticated` after loading

### Working with Database
```bash
# Reset and seed (development only)
cd backend
php artisan migrate:fresh --seed

# Interactive testing
php artisan tinker
# >>> User::factory(5)->create();
# >>> Post::factory(10)->create();
```

## Testing Approach

### Backend (Pest)
- Tests in `backend/tests/Feature/` and `backend/tests/Unit/`
- Use factories for model creation
- Test structure: `it('description', function() { ... })`
- Run specific file: `php artisan test tests/Feature/ExampleTest.php`

### API Testing with cURL
```bash
# Login
curl -X POST http://0.0.0.0:8068/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password"}'

# Create post (replace TOKEN)
curl -X POST http://0.0.0.0:8068/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test","content":"Content","published":true}'
```

## Important Laravel 12 Patterns

### Middleware Registration
Use `bootstrap/app.php` instead of `app/Http/Kernel.php` (removed in Laravel 11+):
```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
})
```

### Model Casts
Prefer `casts()` method over `$casts` property:
```php
protected function casts(): array {
    return ['published' => 'boolean'];
}
```

### Authorization
PostController implements owner-only operations by checking `$post->user_id !== $request->user()->id`

### Seller-only endpoints
Use a private `requireSeller(Request $request)` helper that calls `abort(403)` if `!$request->user()->is_seller`. See `ListingController` for reference pattern.

### Slug generation
`ListingController` has a private `uniqueSlug(string $name, ?int $excludeId)` helper using `Str::slug()` with a numeric suffix loop to ensure uniqueness. Reuse this pattern for any model needing unique slugs.

## Frontend Design System (ClawHub Style)

The frontend follows the **clawhub.ai** design aesthetic — warm, organic, modern. All pages must adhere to this system.

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F8F2ED` | Page background (warm cream) |
| Text primary | `#2A1F19` | Headings, body text |
| Text secondary | `#6B5549` | Subtitles, descriptions |
| Text muted | `#9e8074` | Meta info, labels, placeholders |
| Accent / CTA | `#E65C46` | Buttons, links, highlights, accent spans |
| Card background | `#FFFFFF` | Cards, modals, inputs |
| Muted section bg | `rgba(240, 232, 225, 0.5)` | Alternating sections |
| Footer background | `#F0E8E1` | Footer area |
| Border | `rgba(42, 31, 25, 0.1)` | Dividers, card borders, input borders |

### Typography
- **Display/Heading font**: `Bricolage Grotesque` (weights 600–800)
- **Body font**: `Manrope` (weights 400–700)
- Loaded via Google Fonts in `clawStyles` string
- `font-family: 'Manrope', 'Bricolage Grotesque', sans-serif` on `.claw-page`

### Shared Layout Components (`frontend/components/claw-layout.tsx`)
- `<ClawNav />` — sticky navbar with logo, nav links, and **user dropdown** (Dashboard / 我的购买 / 我的设置 / Start Selling / 退出登录). Always use this, never write a custom navbar.
- `<ClawFooter />` — 4-column footer with links and social links
- `clawStyles` — CSS string containing all shared utility classes (import with `<style>{clawStyles}</style>`)

**ClawNav dropdown behaviour**: when logged in, shows avatar + name button. Dropdown includes Dashboard link, purchases, settings, "Start Selling" (hidden once user is a seller), and logout.

### Utility CSS Classes (from `clawStyles`)
| Class | Purpose |
|-------|---------|
| `.claw-page` | Root page wrapper (sets font, bg, min-height) |
| `.claw-container` | Max-width 1200px centered container |
| `.claw-section` | Section with padding 56px 24px, max-width 1200px |
| `.claw-label` | Coral pill label for section tags |
| `.claw-h1` | Display heading (52px, 800 weight, Bricolage) |
| `.claw-h2` | Section heading (32px, 700 weight, Bricolage) |
| `.claw-lead` | Lead paragraph (17px, secondary color) |
| `.claw-body` | Body paragraph (15px, secondary color) |
| `.claw-btn-primary` | Coral filled button (`#E65C46`) |
| `.claw-btn-ghost` | White outlined button |
| `.claw-card` | White rounded card with border and shadow |
| `.claw-card-hover` | Adds hover lift animation to cards |
| `.claw-divider` | `<hr>` section divider |
| `.claw-step-num` | Numbered circle for step lists |
| `.claw-input` | Styled form input |
| `.claw-textarea` | Styled form textarea |
| `.claw-form-label` | Form field label |
| `.claw-chip` | Pill-shaped selectable tag |
| `.claw-skeleton` | Loading shimmer animation |
| `.claw-accordion` | Accordion container |
| `.claw-accordion-btn` | Accordion toggle button |
| `.claw-accordion-body` | Accordion content area |
| `.claw-highlight-box` | Left-bordered callout box (coral accent) |
| `.claw-accent` | Inline coral color span |

### Page Template
```tsx
'use client';
import { ClawNav, ClawFooter, clawStyles } from "@/components/claw-layout";

export default function MyPage() {
  return (
    <>
      <style>{clawStyles}</style>
      <div className="claw-page">
        <ClawNav />
        <main>
          <section style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
            <div className="claw-label">Section Label</div>
            <h1 className="claw-h1">Page <span className="claw-accent">Title</span></h1>
            <p className="claw-lead">Lead description text.</p>
          </section>
          <hr className="claw-divider" />
          {/* More sections... */}
        </main>
        <ClawFooter />
      </div>
    </>
  );
}
```

### Design Rules
- **Never** use Tailwind `bg-background`, `text-foreground`, `text-muted-foreground` etc. on new pages — use inline styles or claw classes instead
- Alternate sections: white bg vs `.claw-muted-section` (rgba warm tint)
- Always use `<hr className="claw-divider" />` between major sections
- Headings use `fontFamily: "'Bricolage Grotesque', sans-serif"` when set inline
- Cards have `borderRadius: 14px`, white background, `border: 1px solid rgba(42,31,25,0.07)`
- CTA buttons always use `#E65C46` coral red as primary color

## Business Domain: CLAW MART

This is an **AI skill marketplace** (AI 技能集市). Key concepts:

- **Listing** — an AI agent/skill/prompt pack sold on the platform. Has name, slug, price, description, category, status, user_id (seller).
- **Purchase** — a user acquiring a listing. Free listings (price=0) are acquired immediately on click. Paid listings need a payment flow (not yet implemented).
- **Seller** — a user with `is_seller=true`. Can create/edit/delete their own listings via Dashboard → 我的销售.
- **Install page** — after purchasing, users go to `/install/[slug]` which shows two modes: "已有 OpenClaw" (Skill ID + ZIP download) and "帮我安装" (managed install service via sourcing request).

### Core User Flows
1. Browse listings (`/`) → click listing (`/listings/[slug]`) → free acquire → dashboard purchases
2. Purchased items in Dashboard → click → `/install/[slug]` (install instructions)
3. Register → Dashboard → Start Selling → become seller → upload listings → 我的销售 manage
4. Settings: avatar URL, nickname, website URL, bio

### Key Models & Relationships
- `User` hasMany `Purchase`, hasMany `Listing` (as seller)
- `Listing` belongsTo `User` (seller), hasMany `Purchase`
- `Purchase` belongsTo `User`, belongsTo `Listing`; unique on (user_id, listing_id)

### User Fields (beyond standard)
`avatar_url`, `website_url`, `bio`, `is_seller` (boolean, default false)

### Listing Fields
`user_id` (nullable, seller), `name`, `slug` (unique), `price` (decimal), `description`, `image_url`, `status` (available/draft/sold), `category`

### All listings default to price = 0 (free)
When creating new listings via seed or seller dashboard, default price is 0.

### Seeder note
`ListingSeeder` uses `Listing::query()->delete()` (not `truncate()`) to avoid FK constraint errors with the purchases table.

### Protected API routes (auth:sanctum)
- `GET /api/purchases` — user's purchase list (with listing)
- `POST /api/purchases` — acquire free listing (`listing_id`)
- `GET /api/purchases/check/{listingId}` — check ownership
- `GET /api/my-listings` — seller's own listings
- `POST /api/listings` — create listing (seller only)
- `PUT /api/listings/{id}` — update own listing
- `DELETE /api/listings/{id}` — delete own listing
- `PUT /api/profile` — update profile fields
- `POST /api/become-seller` — set is_seller=true

## Technology Versions

- Laravel 12.10.1, PHP 8.4.1, Sanctum 4.2.1, Pest 4.1.6
- Next.js 16.0.5, React 19.2.0, TypeScript 5.x, Tailwind CSS 4.x
- Database: SQLite (development), migrate to MySQL/PostgreSQL for production

## Troubleshooting

### CORS Issues
- Verify both servers are running on correct ports
- Check `SANCTUM_STATEFUL_DOMAINS` in backend/.env includes frontend URL
- Clear browser cache and localStorage

### Authentication Issues
- Clear localStorage: `localStorage.clear()` in browser console
- Verify `NEXT_PUBLIC_API_URL` in frontend/.env.local matches backend
- Check token is being sent: inspect Network tab in DevTools

### Port Conflicts
Current setup uses non-standard ports (8068, 3111) to avoid conflicts. Modify:
- Backend: `backend/.env` APP_URL and serve command
- Frontend: `frontend/package.json` dev script and `.env.local`
