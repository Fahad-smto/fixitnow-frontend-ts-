"use client";

import { useState } from "react";

/**
 * FixItNow hero banner.
 *
 * Design concept: a technician's work order / dispatch ticket, not a
 * generic "book now" hero. Left side is the dispatch counter — pick a
 * service, drop a zip, get matched. Right side is a live-looking ticket
 * card (the signature element): a torn-edge paper slip stamped
 * "CONFIRMED", with the kind of detail a real booking would carry.
 *
 * Fonts (add once, e.g. in app/layout.tsx via next/font):
 *   - Display/UI:  Space Grotesk  (sturdy, slightly mechanical)
 *   - Body:        Inter
 *   - Ticket/mono: IBM Plex Mono  (work-order numbers, timestamps)
 *
 * Tailwind: uses arbitrary hex values directly, no theme changes required.
 */

const SERVICES = [
  "Plumbing",
  "Electrical",
  "Appliance repair",
  "HVAC",
  "Locksmith",
  "Handyman",
] as const;

export default function HeroBanner() {
  const [service, setService] = useState<string>("Plumbing");
  const [zip, setZip] = useState("");

  return (
    <section className="relative overflow-hidden bg-[#14181A] text-[#EDEAE3]">
      {/* faint blueprint grid — subject-appropriate texture, kept quiet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#8B9290 1px, transparent 1px), linear-gradient(90deg, #8B9290 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-[1.05fr_0.95fr] md:py-32">
        {/* ---------- Left: dispatch counter ---------- */}
        <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-[#F2A93B]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F2A93B] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F2A93B]" />
            </span>
            DISPATCH OPEN &nbsp;•&nbsp; 24/7 HOME REPAIR
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-5xl font-bold leading-[1.05] tracking-tight text-[#F4EFE6] sm:text-6xl">
            Your fix is
            <br />
            one call away.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#A8A29B]">
            Tell us what&rsquo;s broken and where you are. We match you with
            a vetted technician nearby — most jobs get a confirmed arrival
            window in under two minutes.
          </p>

          {/* order form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm sm:flex-row sm:items-center"
          >
            <label className="flex-1">
              <span className="sr-only">Service needed</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg bg-transparent px-3 py-3 text-sm text-[#F4EFE6] outline-none [color-scheme:dark]"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-[#1F2624]">
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <span className="hidden h-6 w-px bg-white/10 sm:block" />

            <label className="flex-1">
              <span className="sr-only">ZIP code</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full rounded-lg bg-transparent px-3 py-3 text-sm text-[#F4EFE6] placeholder:text-[#8B9290] outline-none"
              />
            </label>

            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-[#F2A93B] px-6 py-3 text-sm font-semibold text-[#14181A] transition-colors hover:bg-[#ffbf5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
            >
              Find a technician →
            </button>
          </form>

          {/* trust row */}
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-[#8B9290]">
            <div className="flex items-baseline gap-1.5">
              <dt className="text-[#F4EFE6]">4.8★</dt>
              <dd>avg. rating</dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt className="text-[#F4EFE6]">2,300+</dt>
              <dd>jobs completed</dd>
            </div>
            <div className="flex items-baseline gap-1.5">
              <dt className="text-[#F4EFE6]">34 min</dt>
              <dd>avg. arrival</dd>
            </div>
          </dl>
        </div>

        {/* ---------- Right: signature element — the work order ticket ---------- */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[2rem] bg-[#3FA796]/10 blur-2xl" />

          <div className="relative rotate-[3deg] rounded-lg bg-[#F4EFE6] p-6 text-[#14181A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:rotate-0">
            {/* perforated top edge */}
            <div
              aria-hidden
              className="absolute -top-2 left-0 right-0 flex justify-between px-2"
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full bg-[#14181A]"
                />
              ))}
            </div>

            <div className="flex items-start justify-between border-b border-dashed border-[#14181A]/20 pb-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-[#8B9290]">
                  WORK ORDER
                </p>
                <p className="font-mono text-lg font-semibold">#FX-48213</p>
              </div>
              <div className="rotate-[-8deg] rounded border-2 border-[#3FA796] px-2 py-1 font-mono text-xs font-bold tracking-wider text-[#3FA796]">
                CONFIRMED
              </div>
            </div>

            <dl className="mt-4 space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="text-[#8B9290]">Service</dt>
                <dd className="font-semibold">Leaky faucet</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8B9290]">Technician</dt>
                <dd className="font-semibold">Maria O.</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8B9290]">ETA</dt>
                <dd className="font-semibold">34 min</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8B9290]">Rate</dt>
                <dd className="font-semibold">$65 est.</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-2 border-t border-dashed border-[#14181A]/20 pt-4 font-mono text-[10px] text-[#8B9290]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FA796] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3FA796]" />
              </span>
              LIVE — technician en route
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}