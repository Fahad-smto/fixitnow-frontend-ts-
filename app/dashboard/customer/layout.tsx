import Link from 'next/link';

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex gap-6 border-b border-[var(--border)] text-sm">
        <Link href="/dashboard/customer" className="border-b-2 border-[var(--primary)] pb-3 font-medium">
          My Bookings
        </Link>
      </div>
      {children}
    </div>
  );
}
