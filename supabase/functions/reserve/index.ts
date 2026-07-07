const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: unknown, init: ResponseInit = {}) =>
  Response.json(body, {
    ...init,
    headers: {
      ...corsHeaders,
      ...init.headers,
    },
  });

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getRequiredSecret = (name: string) => {
  const value = Deno.env.get(name)?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const supabaseUrl = getRequiredSecret("SUPABASE_URL");
    const serviceRoleKey = getRequiredSecret("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = getRequiredSecret("RESEND_API_KEY");
    const resendFromEmail = getRequiredSecret("RESEND_FROM_EMAIL");
    const reservationToEmail = getRequiredSecret("RESERVATION_TO_EMAIL");
    const reservation = await request.json();

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/reservations`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        customer_name: reservation.customer_name,
        email: reservation.email,
        phone: reservation.phone,
        party_size: reservation.party_size,
        requested_date: reservation.requested_date,
        requested_time: reservation.requested_time,
        occasion: reservation.occasion ?? "",
        notes: reservation.notes ?? "",
        status: "pending",
      }),
    });

    const savedReservation = await insertResponse.json().catch(() => null);

    if (!insertResponse.ok) {
      return jsonResponse(
        {
          error: "Could not save reservation.",
          details: savedReservation,
        },
        { status: 500 },
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [reservationToEmail],
        reply_to: reservation.email,
        subject: `New reservation request from ${reservation.customer_name}`,
        html: `
          <h2>New reservation request</h2>
          <p><strong>Name:</strong> ${escapeHtml(reservation.customer_name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(reservation.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(reservation.phone)}</p>
          <p><strong>Guests:</strong> ${escapeHtml(reservation.party_size)}</p>
          <p><strong>Date:</strong> ${escapeHtml(reservation.requested_date)}</p>
          <p><strong>Time:</strong> ${escapeHtml(reservation.requested_time)}</p>
          <p><strong>Occasion:</strong> ${escapeHtml(reservation.occasion || "-")}</p>
          <p><strong>Notes:</strong> ${escapeHtml(reservation.notes || "-")}</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const resendError = await emailResponse.text();
      console.error("Resend email failed:", resendError);
    }

    return jsonResponse({
      ok: true,
      reservation: Array.isArray(savedReservation)
        ? savedReservation[0]
        : savedReservation,
    });
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Unknown reservation error.",
      },
      { status: 500 },
    );
  }
});
