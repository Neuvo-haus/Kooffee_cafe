import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowRight } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fallbackTestimonials } from "../data/testimonials";
import {
  fetchApprovedTestimonials,
  submitTestimonial,
} from "../services/publicForms";
import { startTestimonialAutoplay } from "./testimonialCarouselAutoplay";

const testimonialFieldClass =
  "mt-2 w-full min-w-0 rounded-2xl border border-[rgba(226,221,213,0.9)] bg-white/70 px-4 py-3 font-dmsans text-sm font-medium leading-6 text-[rgba(28,28,26,0.9)] outline-none transition placeholder:text-[rgba(140,136,128,0.72)] focus:border-[#C4A882] focus:bg-white";
const testimonialLabelClass =
  "font-dmsans text-xs font-semibold uppercase tracking-[0.12em] text-[rgba(100,96,88,0.92)]";

const createInitialForm = () => ({
  customerName: "",
  rating: "5",
  message: "",
  consentToPublish: false,
  website: "",
  submittedAt: new Date().toISOString(),
});

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [form, setForm] = useState(createInitialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: testimonials.length > 1,
    slidesToScroll: 1,
  });

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

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    const updateState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateState();
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", updateState);

    return () => {
      emblaApi.off("select", updateState);
      emblaApi.off("reInit", updateState);
    };
  }, [emblaApi, testimonials.length]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.reInit();
  }, [emblaApi, testimonials]);

  useEffect(() => {
    if (!emblaApi || isCarouselPaused) {
      return undefined;
    }

    return startTestimonialAutoplay(emblaApi, { delayMs: 4500 });
  }, [emblaApi, isCarouselPaused]);

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
      setForm(createInitialForm());
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

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index) => emblaApi?.scrollTo(index);

  return (
    <section className="w-full min-w-0 border-y border-[rgba(226,221,213,0.65)] bg-[rgba(250,247,242,0.42)] px-4 py-16 sm:px-6 md:px-8 md:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h6 className="font-dmsans text-xs uppercase tracking-[0.24em] text-[#8C6D46]">
            What People Say
          </h6>
          <h1 className="font-['Cormorant_Garamond'] text-4xl italic leading-tight text-[rgba(28,28,26,1)] md:text-6xl">
            Words That Stayed
          </h1>
          <p className="mx-auto max-w-2xl font-dmsans text-sm leading-7 text-[rgba(100,96,88,1)] md:text-base">
            Notes from slow mornings, long conversations, and the tables people return to.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="font-dmsans text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C6D46] sm:tracking-[0.24em]">
              Testimonials carousel
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(196,168,130,0.32)] bg-[rgba(245,240,232,0.85)] text-[rgba(28,28,26,0.88)] transition hover:border-[rgba(196,168,130,0.6)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next testimonials"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(196,168,130,0.32)] bg-[rgba(245,240,232,0.85)] text-[rgba(28,28,26,0.88)] transition hover:border-[rgba(196,168,130,0.6)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={emblaRef}
            className="overflow-hidden"
            aria-label="Testimonials carousel"
            role="region"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocusCapture={() => setIsCarouselPaused(true)}
            onBlurCapture={() => setIsCarouselPaused(false)}
          >
            <div className="-ml-4 flex">
              {testimonials.map((review) => (
                <div key={review.id} className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <article
                    className="flex h-full min-h-72 min-w-0 flex-col justify-between rounded-lg border border-[rgba(196,168,130,0.32)] bg-[rgba(245,240,232,0.82)] p-5 shadow-[0_18px_60px_rgba(28,28,26,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(196,168,130,0.65)] hover:bg-[rgba(250,247,242,0.96)] sm:p-6 md:min-h-80 md:p-8"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex gap-1 text-sm text-[#C4A882]">
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <span key={index}>★</span>
                        ))}
                      </div>
                      <p className="font-['Cormorant_Garamond'] text-2xl italic leading-snug text-[rgba(28,28,26,0.88)] md:text-3xl">
                        “{review.message}”
                      </p>
                    </div>
                    <div className="mt-8">
                      <div className="mb-4 h-px w-full bg-[rgba(196,168,130,0.32)]" />
                      <div className="flex flex-col gap-1 font-dmsans text-xs text-[rgba(100,96,88,1)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <span className="min-w-0 break-words font-bold uppercase tracking-[0.12em] text-[rgba(28,28,26,0.82)] sm:tracking-[0.16em]">{review.customer_name}</span>
                        <span className="min-w-0 break-words uppercase tracking-[0.1em] text-[rgba(140,136,128,1)] sm:tracking-[0.14em]">{review.source}</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {testimonials.map((review, index) => (
              <button
                key={review.id}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-[#C4A882]"
                    : "w-2.5 bg-[rgba(196,168,130,0.35)] hover:bg-[rgba(196,168,130,0.55)]"
                }`}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid min-w-0 grid-cols-1 gap-6 rounded-lg border border-[rgba(196,168,130,0.38)] bg-[rgba(237,233,225,0.82)] p-4 shadow-[0_22px_80px_rgba(28,28,26,0.055)] sm:p-5 md:grid-cols-[0.78fr_1.22fr] md:p-8"
        >
          <div className="flex flex-col gap-4">
            <p className="font-dmsans text-xs uppercase tracking-[0.25em] text-[#8C6D46]">
              Share your visit
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl italic leading-tight text-[rgba(28,28,26,1)] md:text-4xl">
              Leave a note for the café.
            </h2>
            <p className="font-dmsans text-sm leading-relaxed text-[rgba(100,96,88,1)]">
              Testimonials are reviewed before they appear publicly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="sr-only" aria-hidden="true">
              Website
              <input
                value={form.website}
                onChange={updateField("website")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <label className={testimonialLabelClass}>
              Name
              <input
                value={form.customerName}
                onChange={updateField("customerName")}
                className={testimonialFieldClass}
              />
              {errors.customerName && (
                <p className="mt-2 text-xs normal-case tracking-normal text-red-700">
                  {errors.customerName}
                </p>
              )}
            </label>

            <label className={testimonialLabelClass}>
              Rating
              <select
                value={form.rating}
                onChange={updateField("rating")}
                className={testimonialFieldClass}
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

            <label className={`${testimonialLabelClass} md:col-span-2`}>
              Message
              <textarea
                value={form.message}
                onChange={updateField("message")}
                className={`${testimonialFieldClass} min-h-28 resize-none`}
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
              I allow Kooffee Cafe to publish this testimonial after review.
            </label>
            {errors.consentToPublish && (
              <p className="font-dmsans text-xs text-red-700 md:col-span-2">
                {errors.consentToPublish}
              </p>
            )}
            {errors.form && (
              <p className="font-dmsans text-xs text-red-700 md:col-span-2">
                {errors.form}
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
              <Motion.button
                type="submit"
                disabled={isSubmitting}
                initial="rest"
                whileHover={isSubmitting ? "rest" : "hover"}
                animate="rest"
                className="cursor-pointer relative inline-flex w-full select-none items-center justify-center gap-3 rounded-full border border-[rgba(28,28,26,0.25)] px-5 py-4 font-dmsans text-xs uppercase tracking-[0.16em] transition hover:border-[#C4A882] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:px-6 sm:tracking-[0.25em]"
              >
                <span className="flex items-center gap-3 pb-1">
                  {isSubmitting ? "Sending" : "Send Words"} <FaArrowRight />
                </span>
                <Motion.div
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute left-6 right-6 bottom-3 h-[1px] origin-left bg-[rgba(200,169,110,1)]"
                />
              </Motion.button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TestimonialSection;
