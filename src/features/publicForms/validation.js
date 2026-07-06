const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESERVATION_LIMITS = {
  minPartySize: 1,
  maxPartySize: 12,
  minMinutes: 7 * 60,
  maxMinutes: 21 * 60,
  maxDaysAhead: 30,
};

const trimValue = (value) => String(value ?? "").trim();

const toIsoDate = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addUtcDays = (isoDate, days) => {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
};

const getTodayIso = () => toIsoDate(new Date());

const timeToMinutes = (time) => {
  const [hours, minutes] = trimValue(time).split(":").map(Number);

  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
};

export const validateReservation = (input, options = {}) => {
  const today = options.today ?? getTodayIso();
  const maxDate = addUtcDays(today, RESERVATION_LIMITS.maxDaysAhead);
  const partySize = Number.parseInt(input.partySize, 10);
  const requestedDate = trimValue(input.requestedDate);
  const requestedTime = trimValue(input.requestedTime);
  const requestedMinutes = timeToMinutes(requestedTime);

  const values = {
    customer_name: trimValue(input.customerName),
    email: trimValue(input.email).toLowerCase(),
    phone: trimValue(input.phone),
    party_size: partySize,
    requested_date: requestedDate,
    requested_time: requestedTime,
    occasion: trimValue(input.occasion),
    notes: trimValue(input.notes),
    status: "pending",
  };

  const errors = {};

  if (!values.customer_name) {
    errors.customerName = "Please enter your name.";
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone) {
    errors.phone = "Please enter a phone number.";
  }

  if (
    !Number.isInteger(partySize) ||
    partySize < RESERVATION_LIMITS.minPartySize ||
    partySize > RESERVATION_LIMITS.maxPartySize
  ) {
    errors.partySize = "Reservations can be requested for 1 to 12 guests.";
  }

  if (!requestedDate || requestedDate < today || requestedDate > maxDate) {
    errors.requestedDate = "Please choose a date within the next 30 days.";
  }

  if (
    !requestedTime ||
    Number.isNaN(requestedMinutes) ||
    requestedMinutes < RESERVATION_LIMITS.minMinutes ||
    requestedMinutes > RESERVATION_LIMITS.maxMinutes
  ) {
    errors.requestedTime = "Please choose a time between 7:00 AM and 9:00 PM.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values,
  };
};

export const validateTestimonial = (input) => {
  const rating = Number.parseInt(input.rating, 10);
  const values = {
    customer_name: trimValue(input.customerName),
    rating,
    message: trimValue(input.message),
    consent_to_publish: Boolean(input.consentToPublish),
    source: "Website submission",
    status: "pending",
  };

  const errors = {};

  if (!values.customer_name) {
    errors.customerName = "Please enter your name.";
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Please choose a rating from 1 to 5.";
  }

  if (values.message.length < 20) {
    errors.message = "Please share at least 20 characters.";
  }

  if (!values.consent_to_publish) {
    errors.consentToPublish = "Please allow us to publish your words before submitting.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values,
  };
};
