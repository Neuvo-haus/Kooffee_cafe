import { describe, expect, it, vi } from "vitest";
import {
  fetchApprovedTestimonials,
  submitReservationRequest,
  submitTestimonial,
} from "./publicForms";

describe("public form services", () => {
  it("returns validation errors before submitting an invalid reservation", async () => {
    const client = {
      insert: vi.fn(),
    };

    const result = await submitReservationRequest(
      {
        customerName: "",
        email: "bad",
        phone: "",
        partySize: "20",
        requestedDate: "2026-08-20",
        requestedTime: "22:00",
      },
      { client, today: "2026-07-07" },
    );

    expect(result.ok).toBe(false);
    expect(result.type).toBe("validation");
    expect(client.insert).not.toHaveBeenCalled();
  });

  it("submits a valid reservation as pending", async () => {
    const client = {
      insert: vi.fn().mockResolvedValue([{ id: "reservation-1" }]),
    };

    const result = await submitReservationRequest(
      {
        customerName: "Aarav Shah",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        partySize: "2",
        requestedDate: "2026-07-10",
        requestedTime: "09:30",
      },
      { client, today: "2026-07-07" },
    );

    expect(result.ok).toBe(true);
    expect(result.data).toEqual([{ id: "reservation-1" }]);
    expect(client.insert).toHaveBeenCalledWith(
      "reservations",
      expect.objectContaining({ status: "pending", party_size: 2 }),
      { returnRepresentation: false },
    );
  });

  it("submits a valid testimonial as pending", async () => {
    const client = {
      insert: vi.fn().mockResolvedValue([{ id: "testimonial-1" }]),
    };

    const result = await submitTestimonial(
      {
        customerName: "Mira Patel",
        rating: "5",
        message: "The morning light and coffee made this my new reading spot.",
        consentToPublish: true,
      },
      { client },
    );

    expect(result.ok).toBe(true);
    expect(client.insert).toHaveBeenCalledWith(
      "testimonials",
      expect.objectContaining({ status: "pending", consent_to_publish: true }),
    );
  });

  it("fetches approved featured testimonials ordered by newest first", async () => {
    const client = {
      select: vi.fn().mockResolvedValue([{ id: "approved-1" }]),
    };

    const rows = await fetchApprovedTestimonials({ client });

    expect(rows).toEqual([{ id: "approved-1" }]);
    expect(client.select).toHaveBeenCalledWith(
      "testimonials",
      "select=id,customer_name,rating,message,source,created_at&status=eq.approved&order=is_featured.desc,created_at.desc&limit=6",
    );
  });
});
