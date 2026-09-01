import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section id="contact" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_50%_10%,rgba(59,130,246,0.22),transparent_70%)]"
          />
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Let&rsquo;s work together
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Ready to build something your customers remember?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Tell us about your project and we&rsquo;ll reply within one
              business day with next steps and a rough scope.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="mailto:hello@northstardigital.co.uk" showArrow>
                Start a Project
              </Button>
              <Button href="tel:+442071234567" variant="secondary">
                Book a Call
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
