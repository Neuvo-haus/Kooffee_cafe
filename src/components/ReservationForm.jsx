import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { submitReservationRequest } from "../services/publicForms";

const initialValues = {
  customerName: "",
  email: "",
  phone: "",
  partySize: "2",
  requestedDate: "",
  requestedTime: "09:00",
  occasion: "",
  notes: "",
};

const fieldClass =
  "w-full rounded-2xl border border-[rgba(226,221,213,0.9)] bg-[rgba(250,247,242,0.7)] px-4 py-3 font-dmsans text-sm text-[rgba(28,28,26,0.9)] outline-none transition focus:border-[#C4A882] focus:bg-white";

const ErrorText = ({ children }) =>
  children ? (
    <p className="mt-2 font-dmsans text-xs text-red-700">{children}</p>
  ) : null;

const ReservationForm = ({ compact = false }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const result = await submitReservationRequest(values);

    if (result.ok) {
      setValues(initialValues);
      setErrors({});
      setStatus({
        type: "success",
        message:
          "Reservation request received. We will confirm availability by phone, WhatsApp, or email.",
      });
    } else if (result.type === "validation") {
      setErrors(result.errors);
      setStatus({
        type: "error",
        message: "Please check the highlighted fields.",
      });
    } else {
      setStatus({
        type: "error",
        message:
          result.message ||
          "We could not send the request. Please call or WhatsApp the café.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-3xl border border-[rgba(226,221,213,0.9)] bg-[rgba(245,240,232,0.75)] p-5 shadow-[0_20px_80px_rgba(28,28,26,0.05)] backdrop-blur md:p-8 ${
        compact ? "max-w-4xl" : ""
      }`}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Name
          <input
            value={values.customerName}
            onChange={updateField("customerName")}
            className={`${fieldClass} mt-2`}
            placeholder="Your name"
          />
          <ErrorText>{errors.customerName}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Email
          <input
            value={values.email}
            onChange={updateField("email")}
            className={`${fieldClass} mt-2`}
            placeholder="you@example.com"
            type="email"
          />
          <ErrorText>{errors.email}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Phone
          <input
            value={values.phone}
            onChange={updateField("phone")}
            className={`${fieldClass} mt-2`}
            placeholder="+91 98765 43210"
          />
          <ErrorText>{errors.phone}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Guests
          <input
            value={values.partySize}
            onChange={updateField("partySize")}
            className={`${fieldClass} mt-2`}
            max="12"
            min="1"
            type="number"
          />
          <ErrorText>{errors.partySize}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Date
          <input
            value={values.requestedDate}
            onChange={updateField("requestedDate")}
            className={`${fieldClass} mt-2`}
            type="date"
          />
          <ErrorText>{errors.requestedDate}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Time
          <input
            value={values.requestedTime}
            onChange={updateField("requestedTime")}
            className={`${fieldClass} mt-2`}
            type="time"
          />
          <ErrorText>{errors.requestedTime}</ErrorText>
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
          Occasion
          <input
            value={values.occasion}
            onChange={updateField("occasion")}
            className={`${fieldClass} mt-2`}
            placeholder="Birthday, work meet, quiet coffee"
          />
        </label>

        <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)] md:row-span-2">
          Notes
          <textarea
            value={values.notes}
            onChange={updateField("notes")}
            className={`${fieldClass} mt-2 min-h-32 resize-none`}
            placeholder="Tell us what would make the visit easier."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-dmsans text-xs leading-relaxed text-[rgba(100,96,88,1)] md:max-w-md">
          Requests are not instant confirmations. We confirm after checking table
          availability.
        </p>
        <Motion.button
          type="submit"
          disabled={isSubmitting}
          initial="rest"
          whileHover={isSubmitting ? "rest" : "hover"}
          animate="rest"
          className="relative inline-flex w-fit select-none items-center gap-3 rounded-full border border-[rgba(28,28,26,0.25)] px-6 py-4 font-dmsans text-xs uppercase tracking-[0.25em] transition hover:border-[#C4A882] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex items-center gap-3 pb-1">
            {isSubmitting ? "Sending" : "Request Table"} <FaArrowRight />
          </span>
          <Motion.div
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-6 right-6 bottom-3 h-[1px] origin-left bg-[rgba(200,169,110,1)]"
          />
        </Motion.button>
      </div>

      {status.message && (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 font-dmsans text-sm ${
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
};

export default ReservationForm;
