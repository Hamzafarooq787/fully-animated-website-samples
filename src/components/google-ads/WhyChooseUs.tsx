"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/data/google-ads-content";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 60%"],
  });
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      ref={sectionRef}
      className="py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Why work with us
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="why-us-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              The detail that separates good accounts from wasted budget
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-white/10 sm:block"
          >
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-accent-light to-accent-glow"
              style={{
                scaleY: shouldReduceMotion ? 1 : pathProgress,
                height: "100%",
              }}
            />
          </div>

          <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 sm:pl-12">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.title}>
                <div className="relative flex gap-4 sm:block">
                  <span
                    className="absolute top-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background text-accent-light sm:-left-12"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="size-4" />
                  </span>
                  <div className="sm:pl-0">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
