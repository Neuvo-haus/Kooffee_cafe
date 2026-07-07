import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import TestimonialSection from "./TestimonialSection";

describe("TestimonialSection", () => {
  it("renders a carousel container for testimonial cards", () => {
    const markup = renderToStaticMarkup(<TestimonialSection />);

    expect(markup).toContain("Testimonials carousel");
  });
});
