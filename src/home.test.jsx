import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { STICKY_HERO_MEDIA_QUERY } from "./home";

describe("homepage responsive hero", () => {
  it("uses the sticky hero for tablet and desktop viewports", () => {
    expect(STICKY_HERO_MEDIA_QUERY).toBe("(min-width: 640px)");
  });

  it("does not hide overflow on sticky scroll ancestors above mobile", () => {
    const css = readFileSync(new URL("./index.css", import.meta.url), "utf8");

    const rootRule = css.match(/html,\s*body,\s*#root\s*{(?<body>[^}]*)}/)?.groups?.body || "";

    expect(rootRule).not.toContain("overflow-x: hidden");
    expect(css).toContain("@media (max-width: 639px)");
  });

  it("keeps tablet sticky hero copy and controls compact before desktop sizing", () => {
    const source = readFileSync(new URL("./home.jsx", import.meta.url), "utf8");

    expect(source).toContain("w-[48%] xl:w-1/2");
    expect(source).toContain("lg:flex-row");
    expect(source).toContain("xl:text-7xl");
  });

  it("centers the stay-longer card row under its heading", () => {
    const source = readFileSync(new URL("./home.jsx", import.meta.url), "utf8");

    expect(source).toContain("md:justify-center");
  });
});
