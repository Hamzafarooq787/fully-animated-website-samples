"use client";

import { useEffect, useMemo, useRef } from "react";
import { useHeavyMotionEnabled } from "@/lib/useSafeReducedMotion";
import Reveal from "@/components/ui/Reveal";
import { journeyStages } from "@/data/google-ads-content";
import { ensureGsapPlugins, gsap } from "@/lib/gsapSetup";

const VIEW_W = 1200;
const VIEW_H = 520;

function stagePoint(index: number, total: number) {
  const x = ((index + 0.5) / total) * VIEW_W;
  const y = VIEW_H / 2 + Math.sin(index * 1.15) * 150;
  return { x, y };
}

export default function GoogleAdsJourney() {
  const pinnedStoryEnabled = useHeavyMotionEnabled();

  return (
    <section
      id="story"
      aria-labelledby="journey-heading"
      className="border-t border-white/8 bg-background-alt/40 py-28 lg:py-0"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-0 lg:pt-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent-light">
            The Google Ads journey
          </p>
          <h2
            id="journey-heading"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            From search to sale, mapped out
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Every campaign we run is built around this path — here&rsquo;s
            what happens between a search and a converted lead.
          </p>
        </div>
      </div>

      {pinnedStoryEnabled && <DesktopJourney />}
      <MobileJourney standalone={!pinnedStoryEnabled} />
    </section>
  );
}

function DesktopJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);

  const points = useMemo(
    () =>
      journeyStages.map((_, i) => stagePoint(i, journeyStages.length)),
    []
  );

  const pathD = useMemo(
    () =>
      points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" "),
    [points]
  );

  useEffect(() => {
    ensureGsapPlugins();
    const section = sectionRef.current;
    const path = pathRef.current;
    const particle = particleRef.current;
    if (!section || !path || !particle) return;

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(panelRefs.current, { opacity: 0, y: 16 });
      gsap.set(panelRefs.current[0], { opacity: 1, y: 0 });
      gsap.set(dotRefs.current, { scale: 0.6, opacity: 0.35 });
      gsap.set(dotRefs.current[0], { scale: 1, opacity: 1 });

      const total = journeyStages.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${total * 90}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: total - 1 }, 0);
      tl.to(
        particle,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          ease: "none",
          duration: total - 1,
        },
        0
      );

      journeyStages.forEach((_, i) => {
        if (i > 0) {
          tl.to(panelRefs.current[i - 1], { opacity: 0, y: -16, duration: 0.35 }, i - 0.35);
          tl.to(dotRefs.current[i - 1], { scale: 0.6, opacity: 0.35, duration: 0.35 }, i - 0.35);
        }
        tl.to(panelRefs.current[i], { opacity: 1, y: 0, duration: 0.4 }, i - 0.1);
        tl.to(dotRefs.current[i], { scale: 1, opacity: 1, duration: 0.4 }, i - 0.1);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative hidden h-screen w-full overflow-hidden lg:block"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(50%_60%_at_50%_40%,rgba(59,130,246,0.12),transparent_70%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="journey-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={2}
        />
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={2.5}
          strokeLinecap="round"
          filter="url(#journey-glow)"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            cx={p.x}
            cy={p.y}
            r={7}
            fill="#0a0e1a"
            stroke="#60a5fa"
            strokeWidth={2}
          />
        ))}
        <circle
          ref={particleRef}
          r={6}
          fill="#f4f6fb"
          filter="url(#journey-glow)"
        />
      </svg>

      {journeyStages.map((stage, i) => {
        const p = points[i];
        const leftPct = (p.x / VIEW_W) * 100;
        const topPct = (p.y / VIEW_H) * 100;
        const alignEnd = leftPct > 60;
        return (
          <div
            key={stage.number}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="glass absolute w-72 rounded-2xl px-6 py-5"
            style={{
              left: `${leftPct}%`,
              top: `${Math.min(Math.max(topPct, 18), 82)}%`,
              transform: `translate(${alignEnd ? "-100%" : "0%"}, -50%) translateX(${
                alignEnd ? "-2rem" : "2rem"
              })`,
            }}
          >
            <span className="text-xs font-semibold text-accent-light">
              Stage {stage.number}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              {stage.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {stage.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function MobileJourney({ standalone }: { standalone: boolean }) {
  return (
    <div
      className={`mx-auto max-w-2xl px-6 lg:px-8 ${
        standalone ? "block" : "lg:hidden"
      }`}
    >
      <ol className="relative flex flex-col gap-10 border-l border-white/10 pl-8">
        {journeyStages.map((stage, i) => (
          <li key={stage.number} className="relative">
            <Reveal delay={i * 0.04}>
              <span
                className="absolute -left-[2.55rem] top-1 flex size-6 items-center justify-center rounded-full border border-accent/40 bg-background text-[10px] font-semibold text-accent-light"
                aria-hidden="true"
              >
                {stage.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stage.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
