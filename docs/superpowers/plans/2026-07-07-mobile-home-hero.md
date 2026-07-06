# Mobile Home Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display the Morning Light café photograph on mobile without loading or playing the home hero video, while preserving desktop behavior and clearing existing lint errors.

**Architecture:** A focused `useMediaQuery` hook will expose the current Tailwind `md` breakpoint state through `useSyncExternalStore`. `Home` will conditionally mount exactly one hero branch, ensuring the desktop video does not exist in the mobile DOM. Existing Framer Motion imports will be aliased consistently to satisfy the current ESLint configuration without changing animations.

**Tech Stack:** React 19, Vite 7, Vitest, Tailwind CSS 4, Framer Motion, ESLint

---

### Task 1: Responsive media-query hook

**Files:**
- Create: `src/hooks/useMediaQuery.js`
- Create: `src/hooks/useMediaQuery.test.js`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install Vitest as a development dependency**

Run: `npm install --save-dev vitest`

Expected: `vitest` appears in `devDependencies` and the lockfile is updated.

- [ ] **Step 2: Add the test command**

Add to `package.json` scripts:

```json
"test": "vitest run"
```

- [ ] **Step 3: Write the failing hook test**

Create `src/hooks/useMediaQuery.test.js`:

```js
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
```

- [ ] **Step 4: Run the focused test and verify RED**

Run: `npm test -- src/hooks/useMediaQuery.test.js`

Expected: FAIL because `src/hooks/useMediaQuery.js` does not exist.

- [ ] **Step 5: Implement the hook minimally**

Create `src/hooks/useMediaQuery.js`:

```js
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
```

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `npm test -- src/hooks/useMediaQuery.test.js`

Expected: one passing test.

### Task 2: Conditional mobile and desktop hero rendering

**Files:**
- Modify: `src/home.jsx`

- [ ] **Step 1: Import the selected image and responsive hook**

Add:

```js
import cafeInteriorMorningLight from "./assets/the cafe/cafe-interior-morning-light.jpeg";
import { useMediaQuery } from "./hooks/useMediaQuery";
```

- [ ] **Step 2: Read the desktop breakpoint state**

Inside `Home`, add:

```js
const isDesktop = useMediaQuery("(min-width: 768px)");
```

- [ ] **Step 3: Mount only the correct hero branch**

Wrap the mobile hero in `!isDesktop` and replace its `<video>` with:

```jsx
<img
  src={cafeInteriorMorningLight}
  alt="Morning light inside Kooffee Cafe"
  className="absolute inset-0 h-full w-full object-cover"
/>
```

Wrap the existing desktop hero in `isDesktop`. Keep its video sources and animation values unchanged.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: all tests pass.

### Task 3: Existing ESLint cleanup

**Files:**
- Modify: `src/components/PageTransition.jsx`
- Modify: `src/components/navbar.jsx`
- Modify: `src/home.jsx`
- Modify: `src/the_cafe.jsx`
- Modify: `src/visits.jsx`

- [ ] **Step 1: Alias the Framer Motion namespace**

In each affected file, replace:

```js
import { motion } from "framer-motion";
```

with:

```js
import { motion as Motion } from "framer-motion";
```

Replace every corresponding `<motion.*>` and `</motion.*>` tag with `<Motion.*>` and `</Motion.*>`.

- [ ] **Step 2: Remove the unused home-page map index**

Change:

```jsx
{stayCards.map((card, i) => (
```

to:

```jsx
{stayCards.map((card) => (
```

- [ ] **Step 3: Verify the complete codebase**

Run: `npm test && npm run lint && npm run build`

Expected: tests pass, ESLint reports zero errors, and Vite completes a production build.

- [ ] **Step 4: Review the final diff**

Run: `git diff --check && git status --short && git diff --stat`

Expected: no whitespace errors; only the planned source, test, and dependency files are modified. The pre-existing untracked `src/assets/mobile.mp4` remains untouched.
