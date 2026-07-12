import {
  validateEditableReservation,
  validateReservation,
  validateTestimonial,
} from "../features/publicForms/validation";
import { emailJs } from "./emailJs";
import { supabaseRest } from "./supabaseRest";

const toServiceError = (error) => ({
  ok: false,
  type: "service",
  message:
    error instanceof Error
      ? error.message
      : "We could not send this request. Please try again or contact the café directly.",
});

const bytesToHex = (bytes) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const generateToken = () => {
  const cryptoApi = globalThis.crypto;

  if (cryptoApi?.getRandomValues) {
    const bytes = new Uint8Array(24);
    cryptoApi.getRandomValues(bytes);
    return bytesToHex(bytes);
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
};

const generateId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const hashToken = async (token) => {
  const cryptoApi = globalThis.crypto;

  if (!cryptoApi?.subtle) {
    throw new Error("Secure token hashing is not available in this browser.");
  }

  const digest = await cryptoApi.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );

  return bytesToHex(new Uint8Array(digest));
};

const getSiteUrl = (siteUrl) => {
  const configured =
    siteUrl ??
    (typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_SITE_URL
      : "");
  const fromWindow =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "";

  return String(configured || fromWindow).replace(/\/+$/, "");
};

const buildEditUrl = ({ siteUrl, id, token }) => {
  const cleanSiteUrl = getSiteUrl(siteUrl);

  if (!cleanSiteUrl) {
    throw new Error("VITE_SITE_URL is required to create reservation edit links.");
  }

  return `${cleanSiteUrl}/reservations/edit/${encodeURIComponent(id)}?token=${encodeURIComponent(token)}`;
};

const editableHeaders = (token) => ({
  "x-reservation-edit-token": token,
});

export const submitReservationRequest = async (input, options = {}) => {
  const validation = validateReservation(input, {
    today: options.today,
    now: options.now,
  });

  if (!validation.isValid) {
    return {
      ok: false,
      type: "validation",
      errors: validation.errors,
    };
  }

  try {
    const id = (options.idGenerator ?? generateId)();
    const editToken = (options.tokenGenerator ?? generateToken)();
    const editTokenHash = await (options.hashToken ?? hashToken)(editToken);
    const editUrl = buildEditUrl({
      siteUrl: options.siteUrl,
      id,
      token: editToken,
    });
    const reservation = {
      ...validation.values,
      id,
      edit_token_hash: editTokenHash,
    };
    const data = await (options.client ?? supabaseRest).insert(
      "reservations",
      reservation,
      { returnRepresentation: false },
    );
    const emailResult = await (options.emailClient ?? emailJs)
      .sendReservationEmails({
        ...reservation,
        edit_url: editUrl,
      });

    return {
      ok: true,
      data: {
        reservation: data,
        email: emailResult,
        editUrl,
      },
    };
  } catch (error) {
    return toServiceError(error);
  }
};

export const fetchEditableReservation = async (
  id,
  token,
  { client = supabaseRest } = {},
) => {
  const rows = await client.select(
    "reservations",
    `select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { headers: editableHeaders(token) },
  );

  return Array.isArray(rows) ? rows[0] ?? null : null;
};

export const updateEditableReservation = async (
  id,
  token,
  input,
  { client = supabaseRest, emailClient = emailJs, today, now } = {},
) => {
  const validation = validateEditableReservation(input, { today, now });

  if (!validation.isValid) {
    return {
      ok: false,
      type: "validation",
      errors: validation.errors,
    };
  }

  try {
    const rows = await client.update(
      "reservations",
      `id=eq.${encodeURIComponent(id)}`,
      validation.values,
      { headers: editableHeaders(token) },
    );
    const updated = Array.isArray(rows) ? rows[0] ?? null : rows;

    await emailClient.sendReservationAdminNotification?.(
      updated ?? { id, ...validation.values, status: "pending" },
      {
        type: "Customer edit",
        title: "Reservation edited",
        message: "A customer edited their pending reservation request.",
      },
    );

    return {
      ok: true,
      data: updated,
    };
  } catch (error) {
    return toServiceError(error);
  }
};

export const cancelEditableReservation = async (
  id,
  token,
  { client = supabaseRest, emailClient = emailJs } = {},
) => {
  try {
    const rows = await client.update(
      "reservations",
      `id=eq.${encodeURIComponent(id)}`,
      { status: "cancelled" },
      { headers: editableHeaders(token) },
    );
    const updated = Array.isArray(rows) ? rows[0] ?? null : rows;

    await emailClient.sendReservationAdminNotification?.(
      updated ?? { id, status: "cancelled" },
      {
        type: "Customer cancellation",
        title: "Reservation cancelled",
        message: "A customer cancelled their pending reservation request.",
      },
    );

    return {
      ok: true,
      data: updated,
    };
  } catch (error) {
    return toServiceError(error);
  }
};

export const submitTestimonial = async (input, options = {}) => {
  const validation = validateTestimonial(input, { now: options.now });

  if (!validation.isValid) {
    return {
      ok: false,
      type: "validation",
      errors: validation.errors,
    };
  }

  try {
    const data = await (options.client ?? supabaseRest).insert(
      "testimonials",
      validation.values,
      { returnRepresentation: false },
    );

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return toServiceError(error);
  }
};

export const fetchApprovedTestimonials = async (options = {}) => {
  return (options.client ?? supabaseRest).select(
    "testimonials",
    "select=id,customer_name,rating,message,source,created_at&status=eq.approved&order=is_featured.desc,created_at.desc&limit=6",
  );
};
