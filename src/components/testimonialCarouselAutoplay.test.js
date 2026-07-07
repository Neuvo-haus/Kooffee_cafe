import { describe, expect, it, vi } from "vitest";
import { startTestimonialAutoplay } from "./testimonialCarouselAutoplay";

describe("startTestimonialAutoplay", () => {
  it("scrolls the carousel on a timer", () => {
    vi.useFakeTimers();

    const emblaApi = {
      scrollNext: vi.fn(),
    };

    const cleanup = startTestimonialAutoplay(emblaApi, { delayMs: 4000 });

    expect(emblaApi.scrollNext).not.toHaveBeenCalled();

    vi.advanceTimersByTime(4000);
    expect(emblaApi.scrollNext).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(4000);
    expect(emblaApi.scrollNext).toHaveBeenCalledTimes(2);

    cleanup();
    vi.advanceTimersByTime(4000);
    expect(emblaApi.scrollNext).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
