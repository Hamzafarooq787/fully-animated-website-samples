"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * useReducedMotion() reads matchMedia synchronously on first client render,
 * which can differ from the server-rendered markup and trigger a hydration
 * mismatch. This mirrors the server's "false" default until after mount,
 * then swaps to the real value in a normal (non-hydrating) re-render.
 */
export function useSafeReducedMotion() {
  const raw = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional one-time mount flag to defer to the client value post-hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted ? !!raw : false;
}

/**
 * For gating a heavy, DOM-restructuring subtree (GSAP ScrollTrigger pins,
 * a WebGL canvas). Starts `false` on both server and first client render
 * (matching SSR — no hydration mismatch) and only ever flips false -> true
 * once, after the real reduced-motion preference is known. This avoids a
 * mount-then-immediate-unmount of the heavy subtree, which would otherwise
 * happen on a reduced-motion device (GSAP pin restructures the DOM outside
 * React's tracking, so unmounting it a tick later throws a removeChild error).
 */
export function useHeavyMotionEnabled() {
  const raw = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted && !raw;
}
