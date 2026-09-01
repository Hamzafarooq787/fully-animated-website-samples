"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { faqs } from "@/data/google-ads-content";
import { cn } from "@/lib/utils";

export default function GoogleAdsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="ads-faq-heading"
      className="py-28 lg:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">FAQ</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="ads-faq-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Google Ads questions, answered
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`ads-faq-panel-${index}`}
                    id={`ads-faq-trigger-${index}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4"
                  >
                    <span className="text-base font-medium text-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-300">
                      <Plus
                        className={cn(
                          "size-4 transition-transform duration-300",
                          isOpen && "rotate-45 text-accent-light"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`ads-faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`ads-faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
