"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/google-ads-content";
import { ensureGsapPlugins, gsap } from "@/lib/gsapSetup";

export default function ProcessRoute() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shouldReduceMotion = useSafeReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    ensureGsapPlugins();

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      }

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 30, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      ref={sectionRef}
      className="border-t border-white/8 bg-background-alt/40 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Our process
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="process-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              A structured route from audit to optimisation
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-px bg-white/10 lg:block"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-left bg-gradient-to-r from-accent-glow to-accent-light"
              style={{ transform: shouldReduceMotion ? "scaleX(1)" : undefined }}
            />
          </div>

          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: "1200px" }}
          >
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span
                  className="absolute -top-3 left-7 flex size-9 items-center justify-center rounded-full border border-accent/40 bg-background text-xs font-semibold text-accent-light lg:top-6 lg:-translate-y-1/2"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-foreground lg:mt-4">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
