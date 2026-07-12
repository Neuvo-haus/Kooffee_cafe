import { describe, expect, it, vi } from "vitest";
import {
  cancelEditableReservation,
  fetchApprovedTestimonials,
  fetchEditableReservation,
  submitReservationRequest,
  submitTestimonial,
  updateEditableReservation,
} from "./publicForms";

describe("public form services", () => {
  it("returns validation errors before submitting an invalid reservation", async () => {
    const client = {
      insert: vi.fn(),
    };
    const emailClient = {
      sendReservationEmails: vi.fn(),
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
      { client, emailClient, today: "2026-07-07" },
    );

    expect(result.ok).toBe(false);
    expect(result.type).toBe("validation");
    expect(client.insert).not.toHaveBeenCalled();
    expect(emailClient.sendReservationEmails).not.toHaveBeenCalled();
  });

  it("submits a valid reservation with an edit link and sends reservation emails", async () => {
    const client = {
      insert: vi.fn().mockResolvedValue([]),
    };
    const emailClient = {
      sendReservationEmails: vi.fn().mockResolvedValue({ skipped: false }),
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
      {
        client,
        emailClient,
        today: "2026-07-07",
        idGenerator: () => "reservation-1",
        tokenGenerator: () => "private-token",
        hashToken: async () => "hashed-private-token",
        siteUrl: "https://kooffee.example",
      },
    );

    expect(result.ok).toBe(true);
    expect(result.data).toEqual({
      reservation: [],
      email: { skipped: false },
      editUrl: "https://kooffee.example/reservations/edit/reservation-1?token=private-token",
    });
    expect(client.insert).toHaveBeenCalledWith(
      "reservations",
      expect.objectContaining({
        id: "reservation-1",
        status: "pending",
        party_size: 2,
        edit_token_hash: "hashed-private-token",
      }),
      { returnRepresentation: false },
    );
    expect(emailClient.sendReservationEmails).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "reservation-1",
        customer_name: "Aarav Shah",
        email: "aarav@example.com",
        party_size: 2,
        edit_url: "https://kooffee.example/reservations/edit/reservation-1?token=private-token",
      }),
    );
  });

  it("fetches an editable reservation with the private edit token", async () => {
    const client = {
      select: vi.fn().mockResolvedValue([{ id: "reservation-1", status: "pending" }]),
    };

    const result = await fetchEditableReservation("reservation-1", "private-token", { client });

    expect(result).toEqual({ id: "reservation-1", status: "pending" });
    expect(client.select).toHaveBeenCalledWith(
      "reservations",
      expect.stringContaining("id=eq.reservation-1"),
      { headers: { "x-reservation-edit-token": "private-token" } },
    );
  });

  it("updates only customer-editable reservation fields and notifies staff", async () => {
    const client = {
      update: vi.fn().mockResolvedValue([{ id: "reservation-1", status: "pending" }]),
    };
    const emailClient = {
      sendReservationAdminNotification: vi.fn().mockResolvedValue({ skipped: false }),
    };

    const result = await updateEditableReservation(
      "reservation-1",
      "private-token",
      {
        customerName: "Changed Name",
        email: "changed@example.com",
        phone: "+91 90000 00000",
        partySize: "3",
        requestedDate: "2026-07-20",
        requestedTime: "10:30",
        occasion: "Coffee",
        notes: "Corner table",
        status: "confirmed",
      },
      { client, emailClient, today: "2026-07-07" },
    );

    expect(result.ok).toBe(true);
    expect(client.update).toHaveBeenCalledWith(
      "reservations",
      "id=eq.reservation-1",
      {
        phone: "+91 90000 00000",
        party_size: 3,
        requested_date: "2026-07-20",
        requested_time: "10:30",
        occasion: "Coffee",
        notes: "Corner table",
      },
      { headers: { "x-reservation-edit-token": "private-token" } },
    );
    expect(emailClient.sendReservationAdminNotification).toHaveBeenCalledWith(
      expect.objectContaining({ id: "reservation-1", status: "pending" }),
      expect.objectContaining({ type: "Customer edit" }),
    );
  });

  it("cancels a pending editable reservation and notifies staff", async () => {
    const client = {
      update: vi.fn().mockResolvedValue([{ id: "reservation-1", status: "cancelled" }]),
    };
    const emailClient = {
      sendReservationAdminNotification: vi.fn().mockResolvedValue({ skipped: false }),
    };

    const result = await cancelEditableReservation(
      "reservation-1",
      "private-token",
      { client, emailClient },
    );

    expect(result.ok).toBe(true);
    expect(client.update).toHaveBeenCalledWith(
      "reservations",
      "id=eq.reservation-1",
      { status: "cancelled" },
      { headers: { "x-reservation-edit-token": "private-token" } },
    );
    expect(emailClient.sendReservationAdminNotification).toHaveBeenCalledWith(
      expect.objectContaining({ id: "reservation-1", status: "cancelled" }),
      expect.objectContaining({ type: "Customer cancellation" }),
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
      { returnRepresentation: false },
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
