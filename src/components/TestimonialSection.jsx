import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { fallbackTestimonials } from "../data/testimonials";
import {
  fetchApprovedTestimonials,
  submitTestimonial,
} from "../services/publicForms";

const initialForm = {
  customerName: "",
  rating: "5",
  message: "",
  consentToPublish: false,
};

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    fetchApprovedTestimonials()
      .then((rows) => {
        if (active && Array.isArray(rows) && rows.length > 0) {
          setTestimonials(rows);
        }
      })
      .catch(() => {
        if (active) {
          setTestimonials(fallbackTestimonials);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const updateField = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setForm((current) => ({
      ...current,
      [field]: value,
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

    const result = await submitTestimonial(form);

    if (result.ok) {
      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message:
          "Thank you. Your words were received and will appear after review.",
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
          "We could not send your testimonial. Please try again later.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="w-full px-6 md:px-0">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h6 className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(140,136,128,1)]">
            What People Say
          </h6>
          <h1 className="font-['Cormorant_Garamond'] text-3xl text-[rgba(28,28,26,1)] md:text-5xl">
            Words That Stayed
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl border border-[rgba(226,221,213,0.8)] p-6 md:p-8"
            >
              <div className="flex flex-col gap-5">
                <div className="flex gap-1 text-sm text-[rgba(200,169,110,1)]">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
                <p className="font-dmsans text-sm italic leading-relaxed text-[rgba(28,28,26,0.8)] md:text-[15px]">
                  “{review.message}”
                </p>
              </div>
              <div className="mt-8">
                <div className="mb-4 h-px w-full bg-[rgba(226,221,213,0.8)]" />
                <div className="flex justify-between gap-4 font-dmsans text-xs text-[rgba(140,136,128,1)]">
                  <span>{review.customer_name}</span>
                  <span>{review.source}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 rounded-3xl border border-[rgba(226,221,213,0.9)] bg-[#ede9e1] p-5 md:grid-cols-[0.8fr_1.2fr] md:p-8"
        >
          <div className="flex flex-col gap-4">
            <p className="font-dmsans text-xs uppercase tracking-[0.25em] text-[rgba(140,136,128,1)]">
              Share your visit
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl italic text-[rgba(28,28,26,1)]">
              Leave a note for the café.
            </h2>
            <p className="font-dmsans text-sm leading-relaxed text-[rgba(100,96,88,1)]">
              Testimonials are reviewed before they appear publicly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
              Name
              <input
                value={form.customerName}
                onChange={updateField("customerName")}
                className="mt-2 w-full rounded-2xl border border-[rgba(226,221,213,0.9)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C4A882]"
              />
              {errors.customerName && (
                <p className="mt-2 text-xs normal-case tracking-normal text-red-700">
                  {errors.customerName}
                </p>
              )}
            </label>

            <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
              Rating
              <select
                value={form.rating}
                onChange={updateField("rating")}
                className="mt-2 w-full rounded-2xl border border-[rgba(226,221,213,0.9)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C4A882]"
              >
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
              {errors.rating && (
                <p className="mt-2 text-xs normal-case tracking-normal text-red-700">
                  {errors.rating}
                </p>
              )}
            </label>

            <label className="font-dmsans text-xs uppercase tracking-[0.2em] text-[rgba(100,96,88,1)] md:col-span-2">
              Message
              <textarea
                value={form.message}
                onChange={updateField("message")}
                className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-[rgba(226,221,213,0.9)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#C4A882]"
              />
              {errors.message && (
                <p className="mt-2 text-xs normal-case tracking-normal text-red-700">
                  {errors.message}
                </p>
              )}
            </label>

            <label className="flex items-start gap-3 font-dmsans text-sm leading-relaxed text-[rgba(100,96,88,1)] md:col-span-2">
              <input
                type="checkbox"
                checked={form.consentToPublish}
                onChange={updateField("consentToPublish")}
                className="mt-1"
              />
              I allow Kooffe Cafe to publish this testimonial after review.
            </label>
            {errors.consentToPublish && (
              <p className="font-dmsans text-xs text-red-700 md:col-span-2">
                {errors.consentToPublish}
              </p>
            )}

            <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
              {status.message && (
                <p
                  className={`font-dmsans text-sm ${
                    status.type === "success" ? "text-green-800" : "text-red-700"
                  }`}
                >
                  {status.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(28,28,26,0.25)] px-6 py-4 font-dmsans text-xs uppercase tracking-[0.25em] transition hover:border-[#C4A882] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending" : "Send Words"} <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TestimonialSection;
