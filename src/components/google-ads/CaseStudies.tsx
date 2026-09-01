import { FileText } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { caseStudies } from "@/data/google-ads-content";

export default function CaseStudies() {
  return (
    <section
      id="results"
      aria-labelledby="case-studies-heading"
      className="py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent-light">
            Case studies
          </p>
          <h2
            id="case-studies-heading"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Results, once we&rsquo;ve run the numbers
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            This space is reserved for verified case studies. The cards
            below are placeholders — swap them for real client results in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
              src/data/google-ads-content.ts
            </code>
            .
          </p>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {caseStudies.map((study, i) => (
            <RevealItem key={i}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-7">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent-light">
                  <FileText className="size-5" aria-hidden="true" />
                </div>
                <span className="mt-6 inline-flex w-fit items-center rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-muted">
                  Placeholder — add real data
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {study.industry}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {study.summary}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
