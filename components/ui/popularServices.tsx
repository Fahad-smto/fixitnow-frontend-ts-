/**
 * FixItNow — Popular Services section.
 *
 * Continues the hero's dispatch/work-order language: each service is
 * framed as a catalog entry with a service code (SVC-01, SVC-02...)
 * rather than a plain icon tile, so the numbering actually means
 * something (it's the same code a real work order would carry).
 *
 * Same token system as HeroBanner — drop both in the same page and
 * they read as one continuous surface, not two stitched-together
 * sections.
 */

import { JSX } from "react/jsx-runtime";

type Service = {
  code: string;
  name: string;
  blurb: string;
  avgEta: string;
  icon: JSX.Element;
};

const iconProps = {
  className: "h-6 w-6",
  strokeWidth: 1.6,
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 24 24",
};

const SERVICES: Service[] = [
  {
    code: "SVC-01",
    name: "Plumbing",
    blurb: "Leaks, clogs, water heaters, fixture installs.",
    avgEta: "34 min",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3h6l1 4h3l-1 4h-2l-1 10H9L8 11H6l-1-4h3l1-4Z"
        />
      </svg>
    ),
  },
  {
    code: "SVC-02",
    name: "Electrical",
    blurb: "Outlets, panels, wiring, lighting repairs.",
    avgEta: "29 min",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        />
      </svg>
    ),
  },
  {
    code: "SVC-03",
    name: "Appliance repair",
    blurb: "Fridges, washers, dryers, ovens, dishwashers.",
    avgEta: "41 min",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path strokeLinecap="round" d="M8 7h.01M8 13a4 4 0 0 0 8 0" />
      </svg>
    ),
  },
  {
    code: "SVC-04",
    name: "HVAC",
    blurb: "Heating, cooling, thermostats, duct issues.",
    avgEta: "52 min",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"
        />
      </svg>
    ),
  },
  {
    code: "SVC-05",
    name: "Locksmith",
    blurb: "Lockouts, rekeys, smart lock installs.",
    avgEta: "22 min",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path strokeLinecap="round" d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    code: "SVC-06",
    name: "Handyman",
    blurb: "Drywall, mounting, doors, general fixes.",
    avgEta: "38 min",
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.5 6.5 3 3L7 20H4v-3L14.5 6.5Z"
        />
        <path strokeLinecap="round" d="m13 8 3-3 3 3-3 3" />
      </svg>
    ),
  },
];

export default function PopularServices() {
  return (
    <section className="bg-[#14181A] px-6 py-24 text-[#EDEAE3]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#F2A93B]">
              SERVICE CATALOG
            </p>
            <h2 className="font-[Space_Grotesk,sans-serif] text-4xl font-bold tracking-tight text-[#F4EFE6] sm:text-5xl">
              Popular fixes, ready for dispatch.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#8B9290]">
            Every category below is staffed around the clock. Pick one to
            see technicians near you and their live availability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <a
              key={s.code}
              href="#"
              className="group relative rounded-lg border border-white/10 bg-[#1F2624] p-6 transition-colors hover:border-[#F2A93B]/50 hover:bg-[#242B28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F2A93B]/40 text-[#F2A93B]">
                  {s.icon}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#8B9290]">
                  {s.code}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#F4EFE6]">
                {s.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#8B9290]">
                {s.blurb}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-dashed border-white/10 pt-4 font-mono text-xs">
                <span className="text-[#8B9290]">Avg. arrival</span>
                <span className="font-semibold text-[#3FA796]">
                  {s.avgEta}
                </span>
              </div>

              <span
                aria-hidden
                className="absolute right-6 top-6 translate-x-1 text-[#8B9290] opacity-0 transition-all group-hover:translate-x-0 group-hover:text-[#F2A93B] group-hover:opacity-100"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}