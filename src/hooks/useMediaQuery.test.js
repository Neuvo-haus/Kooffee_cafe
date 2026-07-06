import { describe, expect, it, vi } from "vitest";
import { createMediaQueryStore } from "./useMediaQuery";

describe("createMediaQueryStore", () => {
  it("reads viewport state and subscribes to media-query changes", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const mediaQueryList = {
      matches: false,
      addEventListener,
      removeEventListener,
    };
    const store = createMediaQueryStore(mediaQueryList);
    const listener = vi.fn();

    expect(store.getSnapshot()).toBe(false);
    const unsubscribe = store.subscribe(listener);
    expect(addEventListener).toHaveBeenCalledWith("change", listener);

    mediaQueryList.matches = true;
    expect(store.getSnapshot()).toBe(true);

    unsubscribe();
    expect(removeEventListener).toHaveBeenCalledWith("change", listener);
  });
});
