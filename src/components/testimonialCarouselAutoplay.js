export const startTestimonialAutoplay = (emblaApi, { delayMs = 4500 } = {}) => {
  if (!emblaApi || typeof emblaApi.scrollNext !== "function") {
    return () => {};
  }

  const timerId = setInterval(() => {
    emblaApi.scrollNext();
  }, delayMs);

  return () => {
    clearInterval(timerId);
  };
};
