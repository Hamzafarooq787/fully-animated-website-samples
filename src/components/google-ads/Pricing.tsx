import { PoundSterling, Settings2, Gauge } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { pricingPoints } from "@/data/google-ads-content";

const icons = [PoundSterling, Settings2, Gauge];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-t border-white/8 bg-background-alt/40 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              How pricing works
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="pricing-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Two separate costs, no surprises
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Google Ads involves two distinct costs. Here&rsquo;s how they
              work.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pricingPoints.map((point, i) => {
            const Icon = icons[i];
            return (
              <RevealItem key={point.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent/12 text-accent-light">
                    <Icon className="size-5.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
