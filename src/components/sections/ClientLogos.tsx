import Reveal from "@/components/ui/Reveal";
import { clientLogos } from "@/data/content";

export default function ClientLogos() {
  return (
    <section
      aria-label="Trusted by leading companies"
      className="border-y border-white/8 bg-background-alt/40 py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Trusted by ambitious teams across the UK
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clientLogos.map((name) => (
              <li
                key={name}
                className="text-lg font-semibold tracking-tight text-muted/70 transition-colors duration-300 hover:text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
