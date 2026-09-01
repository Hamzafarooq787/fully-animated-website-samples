"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkle } from "lucide-react";
import Button from "@/components/ui/Button";
import { trustIndicators } from "@/data/content";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid pt-40 pb-24 lg:pt-52 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.16),transparent_70%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <motion.div
            {...fadeUp(0)}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted"
          >
            <Sparkle className="size-3.5 text-accent-light" aria-hidden="true" />
            UK digital agency for ambitious brands
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            We build brands and{" "}
            <span className="text-gradient">digital products</span> people
            trust.
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            Northstar Digital is a London-based studio partnering with
            fintech, retail, and SaaS teams to design, build, and grow
            products that hold their own in competitive markets.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href="#contact" showArrow>
              Start a Project
            </Button>
            <Button href="#work" variant="secondary">
              View Our Work
            </Button>
          </motion.div>

          <motion.dl
            {...fadeUp(0.32)}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {trustIndicators.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {item.value}
                </dd>
                <dd className="mt-1 text-xs text-muted sm:text-sm">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
              alt="Designers reviewing an interface on a large monitor in a studio"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass absolute -left-6 bottom-8 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl sm:-left-10"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent-light">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Project shipped
              </p>
              <p className="text-xs text-muted">Coastal Finance — 4 weeks</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="glass absolute -right-4 top-8 hidden items-center gap-2 rounded-2xl px-4 py-3 shadow-2xl sm:flex"
          >
            <ArrowRight className="size-4 -rotate-45 text-accent-light" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground">+41% conversion</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
