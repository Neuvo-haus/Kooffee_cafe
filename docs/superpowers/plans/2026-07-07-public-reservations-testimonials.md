# Public Reservations and Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add public reservation requests, public testimonial submission, approved testimonial display, Supabase REST persistence, and future admin documentation.

**Architecture:** Keep React components focused on UI while pure validation and Supabase REST helpers handle behavior. Public forms work without credentials by showing a clear setup message instead of crashing.

**Tech Stack:** React 19, Vite, React Router, Tailwind utility classes, Vitest, Supabase REST API through browser `fetch`.

---

## File map

- Create `src/features/publicForms/validation.test.js`: red-green tests for reservation and testimonial validation.
- Create `src/features/publicForms/validation.js`: pure validation and normalization helpers.
- Create `src/services/supabaseRest.test.js`: red-green tests for missing Supabase credentials and REST request shape.
- Create `src/services/supabaseRest.js`: tiny Supabase REST client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Create `src/services/publicForms.js`: reservation/testimonial submit and approved testimonial fetch functions.
- Create `src/data/testimonials.js`: curated fallback approved testimonials.
- Create `src/components/ReservationForm.jsx`: reusable reservation form.
- Create `src/reservations.jsx`: full reservation route.
- Create `src/components/TestimonialSection.jsx`: public testimonials plus submission form.
- Modify `src/App.jsx`: add `/reservations` route.
- Modify `src/home.jsx`: replace inline reviews with `TestimonialSection` and add reservation CTA section.
- Modify `src/components/navbar.jsx`: add Reservations link.
- Modify `src/components/fotter.jsx`: add Reservations link.
- Create `supabase/migrations/20260707000000_public_reservations_testimonials.sql`: public data tables and RLS policies.

## Task 1: Validation

- [ ] Write failing tests in `src/features/publicForms/validation.test.js`:

```js
import { describe, expect, it } from "vitest";
import {
  validateReservation,
  validateTestimonial,
} from "./validation";

describe("validateReservation", () => {
  it("accepts a valid pending reservation request", () => {
    const result = validateReservation(
      {
        customerName: "Aarav Shah",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        partySize: "4",
        requestedDate: "2026-07-20",
        requestedTime: "10:30",
        occasion: "Birthday",
        notes: "Window table if possible",
      },
      { today: "2026-07-07" },
    );

    expect(result.isValid).toBe(true);
    expect(result.values).toMatchObject({
      customer_name: "Aarav Shah",
      email: "aarav@example.com",
      phone: "+91 98765 43210",
      party_size: 4,
      requested_date: "2026-07-20",
      requested_time: "10:30",
      occasion: "Birthday",
      notes: "Window table if possible",
      status: "pending",
    });
  });

  it("rejects reservation values outside cafe limits", () => {
    const result = validateReservation(
      {
        customerName: "",
        email: "bad-email",
        phone: "",
        partySize: "13",
        requestedDate: "2026-08-20",
        requestedTime: "22:15",
        occasion: "",
        notes: "",
      },
      { today: "2026-07-07" },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      customerName: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a phone number.",
      partySize: "Reservations can be requested for 1 to 12 guests.",
      requestedDate: "Please choose a date within the next 30 days.",
      requestedTime: "Please choose a time between 7:00 AM and 9:00 PM.",
    });
  });
});

describe("validateTestimonial", () => {
  it("accepts a valid customer testimonial submission", () => {
    const result = validateTestimonial({
      customerName: "Mira Patel",
      rating: "5",
      message: "The morning light and coffee made this my new reading spot.",
      consentToPublish: true,
    });

    expect(result.isValid).toBe(true);
    expect(result.values).toMatchObject({
      customer_name: "Mira Patel",
      rating: 5,
      message: "The morning light and coffee made this my new reading spot.",
      consent_to_publish: true,
      source: "Website submission",
      status: "pending",
    });
  });

  it("rejects invalid testimonial submissions", () => {
    const result = validateTestimonial({
      customerName: "",
      rating: "6",
      message: "Nice",
      consentToPublish: false,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      customerName: "Please enter your name.",
      rating: "Please choose a rating from 1 to 5.",
      message: "Please share at least 20 characters.",
      consentToPublish: "Please allow us to publish your words before submitting.",
    });
  });
});
```

- [ ] Run `npm test -- src/features/publicForms/validation.test.js`; expected failure is module not found for `./validation`.
- [ ] Create `src/features/publicForms/validation.js` with the exported validation helpers.
- [ ] Run `npm test -- src/features/publicForms/validation.test.js`; expected pass.

## Task 2: Supabase REST service

- [ ] Write failing tests in `src/services/supabaseRest.test.js`:

```js
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSupabaseRestClient } from "./supabaseRest";

describe("createSupabaseRestClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports missing credentials clearly", () => {
    const client = createSupabaseRestClient({ url: "", anonKey: "" });

    expect(client.isConfigured).toBe(false);
    expect(() => client.requireConfigured()).toThrow(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.",
    );
  });

  it("posts rows to a Supabase REST table", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "row-1" }],
    });

    const client = createSupabaseRestClient({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
      fetchImpl: fetchMock,
    });

    const rows = await client.insert("reservations", { customer_name: "Aarav" });

    expect(rows).toEqual([{ id: "row-1" }]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/reservations",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "anon-key",
          Authorization: "Bearer anon-key",
          Prefer: "return=representation",
        }),
        body: JSON.stringify({ customer_name: "Aarav" }),
      }),
    );
  });
});
```

- [ ] Run `npm test -- src/services/supabaseRest.test.js`; expected failure is module not found for `./supabaseRest`.
- [ ] Create `src/services/supabaseRest.js`.
- [ ] Run `npm test -- src/services/supabaseRest.test.js`; expected pass.

## Task 3: Public forms service

- [ ] Create `src/services/publicForms.js` using `validateReservation`, `validateTestimonial`, and the Supabase REST client.
- [ ] It must export `submitReservationRequest`, `submitTestimonial`, and `fetchApprovedTestimonials`.
- [ ] Run `npm test`; expected pass for validation and REST tests.

## Task 4: Public UI

- [ ] Create `src/data/testimonials.js` with three approved fallback testimonials.
- [ ] Create `src/components/ReservationForm.jsx` using the reservation service and inline validation messages.
- [ ] Create `src/reservations.jsx` with a full reservation page and warm morning-light copy.
- [ ] Create `src/components/TestimonialSection.jsx` using fallback approved testimonials and the testimonial submit form.
- [ ] Modify `src/App.jsx`, `src/home.jsx`, `src/components/navbar.jsx`, and `src/components/fotter.jsx`.
- [ ] Run `npm run lint`; expected pass.

## Task 5: Supabase migration

- [ ] Create `supabase/migrations/20260707000000_public_reservations_testimonials.sql` with reservation and testimonial tables, checks, RLS, public insert policies, and approved testimonial public read policy.
- [ ] Run `npm run build`; expected pass.

## Task 6: Final verification

- [ ] Run `npm test`; expected all tests pass.
- [ ] Run `npm run lint`; expected exit 0.
- [ ] Run `npm run build`; expected exit 0.
- [ ] Review `git diff --stat` and confirm the changes match this plan.
