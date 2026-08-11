/**
 * FixItNow — Footer.
 *
 * Closes the dispatch metaphor rather than dropping it: a "system
 * status" strip along the top (the kind of line a real dispatch board
 * would show) instead of a generic newsletter signup, and a
 * transmission-log-style sign-off in the base row.
 */

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Services",
    links: [
      "Plumbing",
      "Electrical",
      "Appliance repair",
      "HVAC",
      "Locksmith",
      "Handyman",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Become a technician"],
  },
  {
    title: "Support",
    links: ["Help center", "Book a repair", "Track a job", "Contact us"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Licensing", "Insurance"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F1213] text-[#EDEAE3]">
      {/* status strip */}
      <div className="border-b border-white/10 bg-[#14181A]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-4 font-mono text-xs tracking-wide text-[#8B9290] sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FA796] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FA796]" />
            </span>
            SYSTEM STATUS — ALL DISPATCH ONLINE
          </div>
          <span> technicians active right now</span>
        </div>
      </div>

      {/* main grid */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <p className="font-[Space_Grotesk,sans-serif] text-xl font-bold tracking-tight text-[#F4EFE6]">
              FixItNow
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8B9290]">
              On-demand home repair. Vetted technicians, transparent
              pricing, dispatched in minutes.
            </p>

            <div className="mt-6 flex gap-3">
              {["Instagram", "X", "LinkedIn"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8B9290] transition-colors hover:border-[#F2A93B]/50 hover:text-[#F2A93B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
                >
                  <span className="font-mono text-[10px]">
                    {label[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] tracking-[0.15em] text-[#F2A93B]">
                {col.title.toUpperCase()}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8B9290] transition-colors hover:text-[#F4EFE6]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* base row */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[11px] text-[#8B9290] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} FixItNow, Inc. — end of transmission.</span>
          <span>Made for people who&rsquo;d rather not fix it themselves.</span>
        </div>
      </div>
    </footer>
  );
}