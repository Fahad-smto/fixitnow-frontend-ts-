import Link from 'next/link';

export default function TechnicianDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex gap-6 border-b border-[var(--border)] text-sm">
        <Link href="/dashboard/technician" className="pb-3 hover:text-[var(--primary)]">
          Profile & Services
        </Link>
        <Link href="/dashboard/technician/bookings" className="pb-3 hover:text-[var(--primary)]">
          Bookings
        </Link>
      </div>
      {children}
    </div>
  );
}
