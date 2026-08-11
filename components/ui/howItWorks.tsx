"use client";

import { useEffect, useRef, useState } from "react";

 

type Step = {
  code: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    code: "01",
    title: "Radio it in",
    body: "Tell us what's broken, add a photo if it helps, and drop your ZIP. Takes under a minute.",
  },
  {
    code: "02",
    title: "Get matched & dispatched",
    body: "We assign the nearest verified technician for the job and send you a live ETA — no bidding, no waiting for quotes.",
  },
  {
    code: "03",
    title: "Job closed, ticket stamped",
    body: "Your technician fixes it, walks you through what was done, and the ticket closes with a fixed-price receipt.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState<boolean[]>(STEPS.map(() => false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setActive(STEPS.map(() => true));
      return;
    }

    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const activeCount = active.filter(Boolean).length;

  return (
    <section className="bg-[#14181A] px-6 py-24 text-[#EDEAE3]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 max-w-lg">
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#F2A93B]">
            HOW IT WORKS
          </p>
          <h2 className="font-[Space_Grotesk,sans-serif] text-4xl font-bold tracking-tight text-[#F4EFE6] sm:text-5xl">
            From broken to fixed in three steps.
          </h2>
        </div>

        <div className="relative">
          {/* track (static, full height) */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-white/10"
          />
          {/* fill (animates down as steps activate) */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 w-px bg-gradient-to-b from-[#F2A93B] to-[#3FA796] transition-[height] duration-700 ease-out"
            style={{
              height:
                activeCount === 0
                  ? "0%"
                  : `${(activeCount / STEPS.length) * 100}%`,
            }}
          />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div
                key={step.code}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="relative flex gap-6"
              >
                {/* stamp / node */}
                <div
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-500 ease-out ${
                    active[i]
                      ? "scale-100 rotate-0 border-[#F2A93B] bg-[#14181A] text-[#F2A93B] opacity-100"
                      : "scale-75 rotate-[-12deg] border-white/15 bg-[#14181A] text-[#8B9290] opacity-60"
                  }`}
                >
                  {step.code}
                </div>

                {/* content */}
                <div
                  className={`flex-1 pt-2 transition-all duration-500 ease-out ${
                    active[i]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-[#F4EFE6]">
                      {step.title}
                    </h3>
                    {active[i] && (
                      <span className="rounded border border-[#3FA796]/40 bg-[#3FA796]/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#3FA796]">
                        STAMPED
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-md text-[#8B9290]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}