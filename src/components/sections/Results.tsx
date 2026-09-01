import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/data/content";

export default function Results() {
  return (
    <section
      id="results"
      className="relative overflow-hidden border-y border-white/8 bg-background-alt/40 py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_50%_100%,rgba(59,130,246,0.1),transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Results
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Numbers that back up the work
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="border-t border-white/10 pt-6">
                <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
