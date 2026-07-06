import { useMemo, useSyncExternalStore } from "react";

export const createMediaQueryStore = (mediaQueryList) => ({
  getSnapshot: () => mediaQueryList.matches,
  subscribe: (listener) => {
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  },
});

export const useMediaQuery = (query) => {
  const store = useMemo(
    () => createMediaQueryStore(window.matchMedia(query)),
    [query],
  );

  return useSyncExternalStore(store.subscribe, store.getSnapshot, () => false);
};
