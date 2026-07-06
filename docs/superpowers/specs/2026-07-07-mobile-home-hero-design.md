# Mobile Home Hero Design

## Goal

Stop the home-page hero video from loading or playing on mobile devices. Show the existing `cafe-interior-morning-light.jpeg` photograph instead while preserving the desktop hero video and scroll animation.

## Design

- Treat Tailwind's `md` breakpoint, 768 pixels, as the boundary between mobile and desktop behavior.
- Add a small responsive media-query hook that tracks whether the viewport matches the desktop breakpoint.
- Render the mobile hero with a semantic image using the Morning Light asset.
- Render the desktop video hero only when the desktop media query matches. CSS-only hiding is insufficient because a hidden autoplay video may still load and play.
- Preserve the current hero copy, controls, styling, and desktop scroll-driven animation.

## Error Cleanup

The baseline production build succeeds. ESLint currently reports six errors: five `motion` imports are not recognized as used through lowercase JSX member expressions, and one unused map index exists in `home.jsx`. Alias the Framer Motion namespace as `Motion`, update its JSX references, and remove the unused index without changing behavior.

## Testing and Verification

- Add automated tests for responsive media-query state and listener cleanup.
- Verify the mobile render contains the Morning Light image and no video element.
- Verify the desktop render contains the video hero and not the mobile image.
- Run the focused test first in a failing state, then after implementation.
- Run the complete test suite, ESLint, and the Vite production build.

## Scope

No redesign, copy changes, routing changes, or desktop animation changes are included. The untracked `src/assets/mobile.mp4` file is unrelated and will remain untouched.
