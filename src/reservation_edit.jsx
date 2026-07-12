import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import {
  cancelEditableReservation,
  fetchEditableReservation,
  updateEditableReservation,
} from "./services/publicForms";

const fieldClass =
  "w-full min-w-0 rounded-2xl border border-[rgba(226,221,213,0.9)] bg-[rgba(250,247,242,0.7)] px-4 py-3 font-dmsans text-sm font-medium leading-6 text-[rgba(28,28,26,0.9)] outline-none transition placeholder:text-[rgba(140,136,128,0.72)] focus:border-[#C4A882] focus:bg-white disabled:opacity-70";

const labelClass =
  "font-dmsans text-xs font-semibold uppercase tracking-[0.12em] text-[rgba(100,96,88,0.92)]";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 font-dmsans text-xs font-bold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-60";

const createFormValues = (reservation) => ({
  phone: reservation?.phone || "",
  partySize: String(reservation?.party_size ?? "2"),
  requestedDate: reservation?.requested_date || "",
  requestedTime: String(reservation?.requested_time || "").slice(0, 5),
  occasion: reservation?.occasion || "",
  notes: reservation?.notes || "",
});

const ErrorText = ({ children }) =>
  children ? <p className="mt-2 font-dmsans text-xs text-red-700">{children}</p> : null;

const ReservationEdit = () => {
  const { id = "" } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [reservation, setReservation] = useState(null);
  const [values, setValues] = useState(createFormValues());
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "loading", message: "Loading reservation..." });
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const isPending = reservation?.status === "pending";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!id || !token) {
        setStatus({
          type: "error",
          message: "This reservation link is missing required details.",
        });
        return;
      }

      try {
        const row = await fetchEditableReservation(id, token);

        if (cancelled) return;

        if (!row) {
          setStatus({
            type: "error",
            message: "This reservation link is invalid or has expired.",
          });
          return;
        }

        setReservation(row);
        setValues(createFormValues(row));
        setStatus({
          type: row.status === "pending" ? "idle" : "info",
          message:
            row.status === "pending"
              ? ""
              : "This reservation is no longer editable. Please contact the cafe for changes.",
        });
      } catch (error) {
        if (!cancelled) {
          setStatus({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Could not load this reservation.",
          });
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id, token]);

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const save = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus({ type: "idle", message: "" });

    const result = await updateEditableReservation(id, token, values);

    if (result.ok) {
      setReservation(result.data);
      setValues(createFormValues(result.data));
      setErrors({});
      setStatus({
        type: "success",
        message: "Reservation request updated. The cafe team has been notified.",
      });
    } else if (result.type === "validation") {
      setErrors(result.errors);
      setStatus({ type: "error", message: "Please check the highlighted fields." });
    } else {
      setStatus({
        type: "error",
        message: result.message || "Could not update this reservation.",
      });
    }

    setIsSaving(false);
  };

  const cancel = async () => {
    if (!window.confirm("Cancel this pending reservation request?")) {
      return;
    }

    setIsCancelling(true);
    setStatus({ type: "idle", message: "" });

    const result = await cancelEditableReservation(id, token);

    if (result.ok) {
      setReservation(result.data);
      setStatus({
        type: "success",
        message: "Reservation request cancelled. The cafe team has been notified.",
      });
    } else {
      setStatus({
        type: "error",
        message: result.message || "Could not cancel this reservation.",
      });
    }

    setIsCancelling(false);
  };

  return (
    <main className="min-h-screen w-full bg-[rgba(245,240,232,1)] px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <section className="mx-auto grid w-full max-w-4xl gap-8">
        <div>
          <p className="font-dmsans text-xs font-bold uppercase tracking-[0.28em] text-[#8C6D46]">
            Reservations
          </p>
          <h1 className="mt-3 font-['Cormorant_Garamond'] text-5xl italic leading-none text-[rgba(28,28,26,1)] md:text-7xl">
            Edit your request
          </h1>
          <p className="mt-5 max-w-2xl font-dmsans text-sm leading-7 text-[rgba(100,96,88,1)] md:text-base">
            You can update visit details or cancel while the request is still pending.
            Confirmed reservations are managed by the cafe team directly.
          </p>
        </div>

        <form
          onSubmit={save}
          className="rounded-3xl border border-[rgba(226,221,213,0.9)] bg-[rgba(250,247,242,0.78)] p-5 shadow-[0_20px_80px_rgba(28,28,26,0.05)] md:p-8"
        >
          {reservation && (
            <div className="mb-6 grid gap-2 border-b border-[rgba(226,221,213,0.72)] pb-5 font-dmsans text-sm text-[rgba(100,96,88,1)] sm:grid-cols-2">
              <p><strong className="text-[rgba(28,28,26,0.9)]">Name:</strong> {reservation.customer_name}</p>
              <p><strong className="text-[rgba(28,28,26,0.9)]">Email:</strong> {reservation.email}</p>
              <p><strong className="text-[rgba(28,28,26,0.9)]">Status:</strong> {reservation.status}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Phone
              <input value={values.phone} onChange={updateField("phone")} disabled={!isPending} className={`${fieldClass} mt-2`} />
              <ErrorText>{errors.phone}</ErrorText>
            </label>
            <label className={labelClass}>
              Guests
              <input value={values.partySize} onChange={updateField("partySize")} disabled={!isPending} min="1" max="12" type="number" className={`${fieldClass} mt-2`} />
              <ErrorText>{errors.partySize}</ErrorText>
            </label>
            <label className={labelClass}>
              Date
              <input value={values.requestedDate} onChange={updateField("requestedDate")} disabled={!isPending} type="date" className={`${fieldClass} mt-2`} />
              <ErrorText>{errors.requestedDate}</ErrorText>
            </label>
            <label className={labelClass}>
              Time
              <input value={values.requestedTime} onChange={updateField("requestedTime")} disabled={!isPending} type="time" className={`${fieldClass} mt-2`} />
              <ErrorText>{errors.requestedTime}</ErrorText>
            </label>
            <label className={labelClass}>
              Occasion
              <input value={values.occasion} onChange={updateField("occasion")} disabled={!isPending} className={`${fieldClass} mt-2`} />
            </label>
            <label className={`${labelClass} md:row-span-2`}>
              Notes
              <textarea value={values.notes} onChange={updateField("notes")} disabled={!isPending} className={`${fieldClass} mt-2 min-h-32 resize-none`} />
            </label>
          </div>

          {status.message && (
            <div className={`mt-5 rounded-2xl border px-4 py-3 font-dmsans text-sm ${
              status.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : status.type === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-[rgba(226,221,213,0.8)] bg-white text-[rgba(100,96,88,1)]"
            }`}>
              {status.message}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Motion.button
              type="submit"
              disabled={!isPending || isSaving || isCancelling}
              whileHover={isPending && !isSaving ? { y: -1 } : undefined}
              className={`${buttonBase} bg-[rgba(28,28,26,1)] text-white hover:bg-[#8C6D46]`}
            >
              {isSaving ? "Saving" : "Save Changes"} <FaArrowRight />
            </Motion.button>
            <button
              type="button"
              disabled={!isPending || isSaving || isCancelling}
              onClick={cancel}
              className={`${buttonBase} border border-red-200 text-red-700 hover:border-red-300 hover:text-red-900`}
            >
              {isCancelling ? "Cancelling" : "Cancel Request"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ReservationEdit;
