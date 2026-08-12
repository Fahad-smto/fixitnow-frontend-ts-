 

type Technician = {
  techId: string;
  name: string;
  trade: string;
  years: number;
  rating: number;
  jobs: number;
  quote: string;
  customer: string;
};

const TECHNICIANS: Technician[] = [
  {
    techId: "TC-1042",
    name: "Maria Ortiz",
    trade: "Plumbing",
    years: 9,
    rating: 4.9,
    jobs: 612,
    quote:
      "Showed up in 20 minutes, explained the problem before touching anything, and left the bathroom cleaner than she found it.",
    customer: "Devon R., verified booking",
  },
  {
    techId: "TC-0871",
    name: "James Whitfield",
    trade: "Electrical",
    years: 14,
    rating: 5.0,
    jobs: 940,
    quote:
      "Diagnosed a wiring fault two other electricians missed. Straightforward pricing, no upselling.",
    customer: "Priya K., verified booking",
  },
  {
    techId: "TC-1305",
    name: "Sam Delgado",
    trade: "HVAC",
    years: 6,
    rating: 4.8,
    jobs: 388,
    quote:
      "Our AC died on the hottest day of the year. Sam had it running again before dinner.",
    customer: "Marcus T., verified booking",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating) ? "fill-[#F2A93B]" : "fill-white/10"
          }`}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TechnicianTrust() {
  return (
    <section className="bg-[#14181A] px-6 py-24 text-[#EDEAE3]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-[#F2A93B]">
            VERIFIED TECHNICIANS
          </p>
          <h2 className="font-[Space_Grotesk,sans-serif] text-4xl font-bold tracking-tight text-[#F4EFE6] sm:text-5xl">
            Every badge, background-checked.
          </h2>
          <p className="mt-4 text-[#8B9290]">
            Before a technician joins the roster, we verify licensing,
            insurance, and job history. Here&rsquo;s what shows up at your
            door.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNICIANS.map((t) => (
            <div key={t.techId} className="flex flex-col">
              {/* ID badge */}
              <div className="relative rounded-lg bg-[#1F2624] p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
                {/* punch hole */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-0 h-3 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14181A]"
                />

                <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-4">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[#8B9290]">
                    TECH ID
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#8B9290]">
                    {t.techId}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#14181A] font-[Space_Grotesk,sans-serif] text-lg font-semibold text-[#F4EFE6]">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#F4EFE6]">
                      {t.name}
                    </p>
                    <p className="text-sm text-[#8B9290]">
                      {t.trade} · {t.years} yrs
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Stars rating={t.rating} />
                  <span className="font-mono text-[11px] text-[#8B9290]">
                    {t.jobs} jobs
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5 rounded border border-[#3FA796]/40 bg-[#3FA796]/10 px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-[#3FA796]">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3 w-3 fill-[#3FA796]"
                  >
                    <path d="M7.629 14.121 3.5 10l1.414-1.414 2.715 2.715 6.457-6.457L15.5 6.257l-7.871 7.864Z" />
                  </svg>
                  VERIFIED · LICENSED &amp; INSURED
                </div>
              </div>

              {/* field note / quote, clipped to badge */}
              <div className="mx-4 -mt-2 rounded-b-lg border border-t-0 border-white/10 bg-[#1a1f1d] p-5">
                <p className="text-sm italic leading-relaxed text-[#EDEAE3]/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-3 font-mono text-[11px] text-[#8B9290]">
                  — {t.customer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}