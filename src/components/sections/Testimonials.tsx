import { Quote } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Client voices
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              What our partners say
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <Quote
                  className="size-7 text-accent/50"
                  aria-hidden="true"
                />
                <blockquote className="mt-6 flex-1 text-base leading-relaxed text-foreground/90">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
