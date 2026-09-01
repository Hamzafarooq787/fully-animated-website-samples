"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  useSafeReducedMotion,
  useHeavyMotionEnabled,
} from "@/lib/useSafeReducedMotion";
import { useWebglSupport } from "@/lib/useWebglSupport";
import { useInView } from "@/lib/useInView";
import { trustIndicators } from "@/data/google-ads-content";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const HEADLINE = "Turn Google Searches Into Paying Customers";

export default function GoogleAdsHero() {
  const shouldReduceMotion = useSafeReducedMotion();
  const heavyMotionEnabled = useHeavyMotionEnabled();
  const webglSupported = useWebglSupport();
  const { ref: sceneRef, inView: sceneInView } = useInView<HTMLDivElement>({
    rootMargin: "0px",
    threshold: 0.05,
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = root.querySelectorAll<HTMLElement>("[data-word]");
    const fadeUps = root.querySelectorAll<HTMLElement>("[data-fade-up]");

    if (shouldReduceMotion) {
      gsap.set(words, { yPercent: 0 });
      gsap.set(fadeUps, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(words, { yPercent: 100 })
      .set(fadeUps, { opacity: 0, y: 22 })
      .to(words, { yPercent: 0, duration: 0.9, stagger: 0.05 }, 0.1)
      .to(fadeUps, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.5);

    return () => {
      tl.kill();
    };
  }, [shouldReduceMotion]);

  const showScene = webglSupported === true && heavyMotionEnabled && sceneInView;
  const showFallback = !showScene;

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative overflow-hidden bg-grid pt-14 pb-24 lg:pt-20 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.16),transparent_70%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <div
            data-fade-up
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted"
          >
            <ShieldCheck className="size-3.5 text-accent-light" aria-hidden="true" />
            Google Ads management, done properly
          </div>

          <h1 className="text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.75rem]">
            {HEADLINE.split(" ").map((word, i) => (
              <span key={i} className="mr-3 inline-block overflow-hidden pb-1 align-bottom">
                <span data-word className="inline-block">
                  {word === "Paying" || word === "Customers" ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-fade-up
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            We plan, build, and manage Google Ads campaigns that turn
            high-intent searches into calls, form submissions, and sales —
            with full visibility over what your budget is doing.
          </p>

          <div
            data-fade-up
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_0_rgba(59,130,246,0.5)] transition-all duration-300 ease-out hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.55)] focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4"
            >
              Get a Free Ads Audit
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#process"
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4"
            >
              View Our Process
            </Link>
          </div>

          <dl
            data-fade-up
            className="mt-14 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            {trustIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden="true" />
                <dd className="text-sm text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          ref={sceneRef}
          className="relative aspect-square w-full max-w-xl justify-self-center lg:aspect-4/5"
        >
          <div className="glass absolute inset-0 overflow-hidden rounded-3xl">
            {showScene && (
              <Scene reducedMotion={shouldReduceMotion} />
            )}
            {showFallback && <StaticDashboardFallback />}
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticDashboardFallback() {
  const bars = [40, 70, 55, 90, 75, 100, 92];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 p-8">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Campaign performance
        </p>
        <p className="text-xs text-accent-light">Conversions trending up</p>
      </div>
      <div className="flex h-40 items-end gap-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-glow to-accent-light"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs text-muted">
        <div className="glass rounded-xl px-4 py-3">
          <p className="text-foreground">Sponsored search ad</p>
          <p>High-intent keyword match</p>
        </div>
        <div className="glass rounded-xl px-4 py-3">
          <p className="text-foreground">Conversion recorded</p>
          <p>Tracked call &amp; form data</p>
        </div>
      </div>
    </div>
  );
}
