"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, Target } from "lucide-react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import Reveal from "@/components/ui/Reveal";

const PARTICLES = [
  { top: "18%", left: "12%", delay: 0 },
  { top: "70%", left: "18%", delay: 0.6 },
  { top: "30%", left: "82%", delay: 1.1 },
  { top: "78%", left: "78%", delay: 1.7 },
  { top: "12%", left: "55%", delay: 2.2 },
  { top: "85%", left: "48%", delay: 0.3 },
];

export default function GoogleAdsFinalCta() {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="final-cta-heading"
      className="py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_50%_10%,rgba(59,130,246,0.22),transparent_70%)]"
          />

          {!shouldReduceMotion && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute size-1.5 rounded-full bg-accent-light"
                  style={{ top: p.top, left: p.left }}
                  animate={{
                    top: "50%",
                    left: "50%",
                    opacity: [0, 0.9, 0],
                    scale: [0.6, 1, 0.4],
                  }}
                  transition={{
                    duration: 3.4,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 text-accent-light">
                <Target className="size-4" />
              </span>
            </div>
          )}

          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Let&rsquo;s get started
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="final-cta-heading"
              className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Ready to Get More Customers From Google?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Request a free, no-obligation audit of your Google Ads account
              — or your market, if you&rsquo;re starting from scratch — and
              we&rsquo;ll tell you exactly what we&rsquo;d change.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="mailto:hello@northstardigital.co.uk"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.55)] focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4"
              >
                Request Your Free Google Ads Audit
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-muted sm:flex-row sm:gap-6">
              <a
                href="tel:+442071234567"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                +44 20 7123 4567
              </a>
              <a
                href="mailto:hello@northstardigital.co.uk"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                hello@northstardigital.co.uk
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
