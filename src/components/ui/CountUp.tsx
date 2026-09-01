"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "motion/react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!isInView) return;

    if (shouldReduceMotion) {
      node.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, motionValue, value, duration, shouldReduceMotion, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {0}
      {suffix}
    </span>
  );
}
