# Future Admin Panel Implementation Plan

## Objective

Build a themed Kooffe admin panel later for managing website content, reservation requests, testimonial moderation, menu items, gallery/moments, café details, homepage content, and multiple admin accounts.

This file is a future-use implementation guide. No admin code is being added in the current public website pass.

## Recommended stack

- Frontend: existing React/Vite app with a protected `/admin` route group.
- Backend/data: Supabase Auth, Postgres, Storage, Row Level Security, and Edge Functions.
- Email: Resend through Supabase Edge Functions only.
- ORM: no Prisma unless a separate server/API layer is introduced later.

Reason: the current project is a browser-rendered Vite app. Prisma cannot safely run directly in the browser and would require a backend runtime. Supabase gives auth, database, storage, and permissions without adding a custom server.

## Credentials and setup

Public browser variables:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Server-only Supabase Edge Function secrets:

```bash
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=reservations@yourdomain.com
RESERVATIONS_TO_EMAIL=staff@yourdomain.com
SUPABASE_SERVICE_ROLE_KEY=server-only-service-role-key
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY` in Vite.

## Roles

Use Supabase Auth users and an `admin_profiles` table.

Roles:

- `owner`
  - Manage admin accounts.
  - Publish, unpublish, approve, reject, and delete content.
  - Manage café settings and notification recipients.
- `editor`
  - Create and edit content.
  - Moderate reservations and testimonials if granted by owner.
  - Cannot manage other admin accounts.

Suggested table:

```sql
create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);
```

## Admin modules

### 1. Authentication shell

- `/admin/login`
- `/admin`
- Protected layout with themed sidebar and top bar.
- Supabase email/password login or magic link login.
- Redirect non-admin users away from admin pages.

### 2. Dashboard

Show operational summary:

- Pending reservations.
- Pending testimonials.
- Recently edited content.
- Quick links to menu, gallery, café details, and homepage content.

### 3. Reservations

Admin capabilities:

- View reservation requests.
- Filter by pending, confirmed, declined, cancelled.
- Open a request detail drawer.
- Change status.
- Add staff notes.
- Send customer email on confirmation or decline.

Reservation statuses:

- `pending`
- `confirmed`
- `declined`
- `cancelled`

### 4. Testimonials

Admin capabilities:

- View pending submissions.
- Approve, reject, archive.
- Edit display name and message for minor formatting only.
- Mark selected approved testimonials as featured.

Public site should only read `status = 'approved'`.

### 5. Menu manager

Admin capabilities:

- Manage categories.
- Manage items.
- Upload item images to Supabase Storage.
- Set price, description, dietary tags, availability, and sort order.
- Draft, preview, publish.

### 6. Gallery and moments

Admin capabilities:

- Upload photos.
- Add alt text.
- Add captions.
- Assign section/category.
- Reorder.
- Draft, preview, publish.

### 7. Café details and hours

Admin capabilities:

- Edit address, phone, email, WhatsApp, Instagram, map links.
- Edit daily opening hours.
- Add temporary notices such as holiday hours.

### 8. Homepage content

Admin capabilities:

- Edit hero subtitle and CTAs.
- Edit daily ritual cards.
- Edit stay-longer cards.
- Choose featured menu items.
- Choose featured testimonials.

Use draft/preview/publish for these sections to avoid accidental public changes.

## Data model additions

Suggested future tables:

- `admin_profiles`
- `content_revisions`
- `menu_categories`
- `menu_items`
- `media_assets`
- `homepage_sections`
- `site_settings`
- `audit_log`

Every editable content table should have:

- `id`
- `status`
- `sort_order`
- `created_at`
- `updated_at`
- `created_by`
- `updated_by`

## Security model

- Enable RLS on every table.
- Public read policies only for published/approved content.
- Public insert policies only for reservation and testimonial forms.
- Admin read/write policies must check authenticated user membership in `admin_profiles`.
- Owner-only policies must check `role = 'owner'`.

## Email flow

Use Supabase Edge Functions:

- `reservation-created`
  - Sends staff notification.
  - Sends customer “request received” email.
- `reservation-status-changed`
  - Sends customer confirmation, decline, or cancellation email.

Resend API key stays in function secrets.

## Implementation phases

### Phase 1: Auth foundation

- Add Supabase client.
- Add admin auth routes.
- Add protected admin layout.
- Add `admin_profiles` and RLS policies.
- Create first owner manually from Supabase dashboard.

### Phase 2: Reservations admin

- Add reservation list, filters, detail drawer, and status update.
- Add staff notes.
- Add Edge Function email notifications.

### Phase 3: Testimonials admin

- Add moderation list.
- Add approve/reject/archive actions.
- Add featured testimonial selector.

### Phase 4: Content admin

- Add menu manager.
- Add gallery/moments manager.
- Add café settings editor.
- Add homepage content editor.

### Phase 5: Audit and polish

- Add audit log.
- Add empty states and loading states.
- Add role management UI.
- Add deployment checklist.

## Verification

Each phase should run:

```bash
npm test
npm run lint
npm run build
```

Admin flows should also be browser-tested:

- Login.
- Non-admin blocked.
- Owner access allowed.
- Editor restrictions enforced.
- Reservation status update works.
- Testimonial approval changes public visibility.
