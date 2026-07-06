import {
  validateReservation,
  validateTestimonial,
} from "../features/publicForms/validation";
import { supabaseRest } from "./supabaseRest";

const toServiceError = (error) => ({
  ok: false,
  type: "service",
  message:
    error instanceof Error
      ? error.message
      : "We could not send this request. Please try again or contact the café directly.",
});

export const submitReservationRequest = async (input, options = {}) => {
  const validation = validateReservation(input, { today: options.today });

  if (!validation.isValid) {
    return {
      ok: false,
      type: "validation",
      errors: validation.errors,
    };
  }

  try {
    const data = await (options.client ?? supabaseRest).insert(
      "reservations",
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

export const submitTestimonial = async (input, options = {}) => {
  const validation = validateTestimonial(input);

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
