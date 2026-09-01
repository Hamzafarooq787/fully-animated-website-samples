"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section
      id="work"
      className="border-t border-white/8 bg-background-alt/40 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-sm font-semibold text-accent-light">
                Featured work
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Case studies that speak in outcomes
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.client} delay={index * 0.05}>
              <Link
                href="#contact"
                className="group grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 transition-colors duration-300 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4 lg:grid-cols-2 lg:p-4"
              >
                <div className="relative aspect-16/11 overflow-hidden rounded-2xl lg:aspect-auto">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.client} project visual`}
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col justify-center px-4 py-6 lg:px-6 lg:py-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-sm font-semibold text-accent-light">
                    {project.client}
                  </p>
                  <h3 className="mt-2 flex items-start gap-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {project.title}
                    <ArrowUpRight
                      className="mt-1 size-6 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-light"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      {project.stat.value}
                    </span>
                    <span className="text-sm text-muted">
                      {project.stat.label}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
