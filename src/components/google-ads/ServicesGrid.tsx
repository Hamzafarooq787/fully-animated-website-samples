"use client";

import { useRef } from "react";
import {
  Search,
  Image as ImageIcon,
  ShoppingBag,
  Rocket,
  RefreshCcw,
  MapPin,
  Target,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/data/google-ads-content";

const icons: Record<string, LucideIcon> = {
  Search,
  Image: ImageIcon,
  ShoppingBag,
  Rocket,
  RefreshCcw,
  MapPin,
  Target,
  SlidersHorizontal,
};

function TiltCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = icons[icon];

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    card.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <RevealItem>
      <div style={{ perspective: "900px" }}>
        <motion.div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform:
              "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transformStyle: "preserve-3d",
          }}
          className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-[border-color,background-color] duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.16), transparent 70%)",
            }}
          />
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent/12 text-accent-light transition-transform duration-300 group-hover:scale-110">
            <Icon className="size-5.5" aria-hidden="true" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </motion.div>
      </div>
    </RevealItem>
  );
}

export default function GoogleAdsServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="ads-services-heading"
      className="py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Campaign types
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="ads-services-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Every part of Google Ads, covered
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              We build the right mix of campaign types around your goals —
              not a one-size-fits-all package.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <TiltCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
