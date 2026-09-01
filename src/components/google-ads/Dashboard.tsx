"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { dashboardMetrics, dashboardChart } from "@/data/google-ads-content";

const CHART_W = 560;
const CHART_H = 180;

function chartPoints() {
  const max = Math.max(...dashboardChart);
  const min = Math.min(...dashboardChart);
  const range = max - min || 1;
  return dashboardChart.map((v, i) => {
    const x = (i / (dashboardChart.length - 1)) * CHART_W;
    const y = CHART_H - ((v - min) / range) * (CHART_H - 24) - 12;
    return { x, y };
  });
}

function linePath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function AnimatedMetric({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (shouldReduceMotion) {
      node.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function GoogleAdsDashboard() {
  const points = chartPoints();
  const path = linePath(points);
  const areaPath = `${path} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="border-t border-white/8 bg-background-alt/40 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold text-accent-light">
              Reporting
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="dashboard-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Clear reporting, not a black box
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A sample of the kind of dashboard view you&rsquo;ll get access
              to — real numbers from your own account, reported clearly.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Example campaign dashboard
                </p>
                <p className="text-xs text-muted">
                  Illustrative sample data — not client results
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-muted">
                Example data
              </span>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-5">
              {dashboardMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-xs text-muted">{metric.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    <AnimatedMetric
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.format === "decimal" ? 1 : 0}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <p className="mb-4 text-xs text-muted">
                Conversions over time (example data)
              </p>
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                className="h-44 w-full"
                role="img"
                aria-label="Example line chart showing an upward conversions trend over twelve weeks"
              >
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={areaPath}
                  fill="url(#chart-fill)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
