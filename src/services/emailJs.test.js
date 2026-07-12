import { describe, expect, it, vi } from "vitest";
import { createEmailJsClient } from "./emailJs";

const reservation = {
  id: "reservation-1",
  customer_name: "Aarav Shah",
  email: "aarav@example.com",
  phone: "+91 98765 43210",
  party_size: 2,
  requested_date: "2026-07-10",
  requested_time: "09:30",
  occasion: "Birthday",
  notes: "Window table if possible",
  status: "pending",
  edit_url: "https://kooffee.example/reservations/edit/reservation-1?token=private-token",
};

describe("createEmailJsClient", () => {
  it("skips email delivery when EmailJS is not configured", async () => {
    const fetchMock = vi.fn();
    const client = createEmailJsClient({ fetchImpl: fetchMock });

    const result = await client.sendReservationEmails(reservation);

    expect(result).toEqual({ skipped: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends admin and customer reservation templates", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "OK",
    });
    const client = createEmailJsClient({
      serviceId: "service_kooffee",
      publicKey: "public_key",
      adminTemplateId: "template_admin",
      customerTemplateId: "template_customer",
      fetchImpl: fetchMock,
    });

    const result = await client.sendReservationEmails(reservation);
    const adminRequest = JSON.parse(fetchMock.mock.calls[0][1].body);
    const customerRequest = JSON.parse(fetchMock.mock.calls[1][1].body);

    expect(result).toEqual({ skipped: false });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.emailjs.com/api/v1.0/email/send",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.emailjs.com/api/v1.0/email/send",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(adminRequest).toMatchObject({
      service_id: "service_kooffee",
      template_id: "template_admin",
      user_id: "public_key",
      template_params: {
        to_email: "hey.neuvo@gmail.com",
        notification_type: "New request",
        customer_name: "Aarav Shah",
        customer_email: "aarav@example.com",
      },
    });
    expect(customerRequest).toMatchObject({
      service_id: "service_kooffee",
      template_id: "template_customer",
      user_id: "public_key",
      template_params: {
        to_email: "aarav@example.com",
        customer_name: "Aarav Shah",
        customer_email: "aarav@example.com",
        edit_url: "https://kooffee.example/reservations/edit/reservation-1?token=private-token",
      },
    });
  });

  it("uses the configured reservation admin email", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "OK",
    });
    const client = createEmailJsClient({
      serviceId: "service_kooffee",
      publicKey: "public_key",
      adminTemplateId: "template_admin",
      customerTemplateId: "template_customer",
      reservationAdminEmail: "bookings@kooffee.test",
      fetchImpl: fetchMock,
    });

    await client.sendReservationEmails(reservation);

    const adminRequest = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(adminRequest.template_params.to_email).toBe("bookings@kooffee.test");
  });

  it("reuses the admin template for edit and cancellation notifications", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "OK",
    });
    const client = createEmailJsClient({
      serviceId: "service_kooffee",
      publicKey: "public_key",
      adminTemplateId: "template_admin",
      customerTemplateId: "template_customer",
      fetchImpl: fetchMock,
    });

    await client.sendReservationAdminNotification(reservation, {
      type: "Customer cancellation",
      message: "A customer cancelled their pending reservation.",
    });

    const request = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(request).toMatchObject({
      service_id: "service_kooffee",
      template_id: "template_admin",
      template_params: {
        to_email: "hey.neuvo@gmail.com",
        notification_type: "Customer cancellation",
        notification_message: "A customer cancelled their pending reservation.",
        reservation_status: "pending",
        customer_email: "aarav@example.com",
      },
    });
  });
});
