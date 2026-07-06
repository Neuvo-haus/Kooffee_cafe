# Public Reservations and Testimonials Design

## Goal

Add two public website features before building the admin panel:

- Reservation requests for café visitors.
- Customer testimonial submission and public approved testimonials.

The public site should match the current Kooffe theme: warm neutrals, editorial typography, soft borders, slow-morning language, and mobile-first layouts.

## Credential setup

The browser website needs only public Supabase credentials:

1. Create a Supabase project at `https://supabase.com`.
2. Open the project dashboard.
3. Go to Project Settings, then API, or API Keys if the dashboard UI has changed.
4. Copy:
   - Project URL
   - anon public key
5. Create `.env.local` from `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

For future reservation/customer emails, create a Resend account and get a Resend API key. That key must be stored only in Supabase Edge Function secrets, not in `.env.local` and not in React code.

Server-only future secrets:

```bash
RESEND_API_KEY=your-resend-server-key
RESEND_FROM_EMAIL=reservations@yourdomain.com
RESERVATIONS_TO_EMAIL=owner-or-staff@yourdomain.com
```

The Supabase service-role key is also server-only. It must never be used in Vite because Vite variables are shipped to the browser.

## Public reservation behavior

Visitors can request a reservation from:

- A new `/reservations` route.
- A homepage reservation teaser section.
- Navbar and footer links.

The form collects:

- Name
- Email
- Phone
- Party size from 1 to 12
- Date, from today through 30 days ahead
- Time from 7:00 AM through 9:00 PM
- Occasion, optional
- Notes, optional

Submission creates a `pending` reservation request in Supabase. It is not an instant booking. Copy must clearly say the café will confirm availability by phone, WhatsApp, or email.

If Supabase credentials are missing, the form must not crash. It should show a clear setup message and keep the design intact.

## Public testimonial behavior

The homepage gets a testimonial section with:

- Approved testimonial cards from Supabase when configured.
- A curated static fallback when Supabase is not configured or the request fails.
- A customer submission form.

The form collects:

- Name
- Rating from 1 to 5
- Message
- Consent to publish

Submissions go to `pending` status. Pending testimonials are not shown publicly until approved in the future admin panel.

## Data model

Create Supabase migration tables:

- `public.reservations`
  - `id uuid`
  - `customer_name text`
  - `email text`
  - `phone text`
  - `party_size integer`
  - `requested_date date`
  - `requested_time time`
  - `occasion text`
  - `notes text`
  - `status text default 'pending'`
  - `created_at timestamptz`

- `public.testimonials`
  - `id uuid`
  - `customer_name text`
  - `rating integer`
  - `message text`
  - `source text default 'Website submission'`
  - `status text default 'pending'`
  - `is_featured boolean default false`
  - `consent_to_publish boolean`
  - `created_at timestamptz`

Row-level security:

- Public anonymous users can insert pending reservation requests.
- Public anonymous users cannot read reservations.
- Public anonymous users can insert pending testimonials only when consent is true.
- Public anonymous users can read approved testimonials only.

## Architecture

Keep validation and persistence separate from React components:

- `src/features/publicForms/validation.js`
  - Pure reservation and testimonial validation.
- `src/services/supabaseRest.js`
  - Small fetch wrapper for Supabase REST calls using Vite env vars.
- `src/services/publicForms.js`
  - Public submit and fetch functions.
- `src/components/ReservationForm.jsx`
  - Reusable reservation form.
- `src/reservations.jsx`
  - Full reservation page.
- `src/components/TestimonialSection.jsx`
  - Homepage testimonials and testimonial submission.
- `src/data/testimonials.js`
  - Static approved fallback testimonials.

## Error handling

- Show inline validation messages before submit.
- Show a setup message if Supabase credentials are missing.
- Show a generic friendly error if the network or Supabase insert fails.
- Keep submitted pending copy explicit: requests are received, not confirmed.

## Testing

Use TDD for validation and service behavior:

- Reservation validation rejects invalid name, email, phone, party size, date, and time.
- Reservation validation accepts a valid request within configured limits.
- Testimonial validation rejects invalid rating, short message, and missing consent.
- Testimonial validation accepts a valid pending customer submission.
- Supabase service reports missing credentials without throwing unclear errors.

Run:

```bash
npm test
npm run lint
npm run build
```

## Scope exclusions

- No admin panel code in this pass.
- No Prisma in this pass.
- No instant reservation confirmation.
- No browser-side Resend integration.
- No service-role key in frontend code.
