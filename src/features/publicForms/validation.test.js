import { describe, expect, it } from "vitest";
import {
  validateEditableReservation,
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

  it("rejects reservation submissions that trigger bot traps", () => {
    const result = validateReservation(
      {
        customerName: "Aarav Shah",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        partySize: "4",
        requestedDate: "2026-07-20",
        requestedTime: "10:30",
        website: "https://spam.example",
        submittedAt: "2026-07-07T10:00:00.000Z",
      },
      {
        today: "2026-07-07",
        now: new Date("2026-07-07T10:00:01.000Z"),
      },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.form).toBe("We could not accept this request. Please try again.");
  });

  it("normalizes customer reservation edits without identity fields", () => {
    const result = validateEditableReservation(
      {
        customerName: "Changed Name",
        email: "changed@example.com",
        phone: " +91 90000 00000 ",
        partySize: "3",
        requestedDate: "2026-07-21",
        requestedTime: "11:30",
        occasion: " Team coffee ",
        notes: " Please keep the corner table. ",
        status: "confirmed",
      },
      { today: "2026-07-07" },
    );

    expect(result.isValid).toBe(true);
    expect(result.values).toEqual({
      phone: "+91 90000 00000",
      party_size: 3,
      requested_date: "2026-07-21",
      requested_time: "11:30",
      occasion: "Team coffee",
      notes: "Please keep the corner table.",
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

  it("rejects testimonial submissions that trigger bot traps", () => {
    const result = validateTestimonial(
      {
        customerName: "Mira Patel",
        rating: "5",
        message: "The morning light and coffee made this my new reading spot.",
        consentToPublish: true,
        website: "https://spam.example",
        submittedAt: "2026-07-07T10:00:00.000Z",
      },
      { now: new Date("2026-07-07T10:00:01.000Z") },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.form).toBe("We could not accept this request. Please try again.");
  });
});
