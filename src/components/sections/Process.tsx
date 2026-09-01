import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

export default function Process() {
  return (
    <section id="process" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              How we work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              A process built for clarity, not surprises
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} className="relative">
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:min-h-[220px]">
                <span className="text-sm font-semibold text-accent-light">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
