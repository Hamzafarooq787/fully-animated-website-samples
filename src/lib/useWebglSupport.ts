"use client";

import { useEffect, useState } from "react";

function detectWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function useWebglSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // One-time browser feature detection; cannot run during SSR or render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(detectWebgl());
  }, []);

  return supported;
}
