"use client";

import {
  Sparkles,
  LayoutTemplate,
  Code2,
  PenTool,
  TrendingUp,
  Target,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/data/content";

const icons: Record<string, LucideIcon> = {
  Sparkles,
  LayoutTemplate,
  Code2,
  PenTool,
  TrendingUp,
  Target,
};

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              What we do
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Full-service capability, without the agency bloat
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Six disciplines, one accountable team — from first concept to
              measurable, ongoing growth.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <RevealItem key={service.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/15"
                  />
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/12 text-accent-light">
                    <Icon className="size-5.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
