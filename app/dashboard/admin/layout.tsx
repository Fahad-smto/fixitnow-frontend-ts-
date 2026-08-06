import Link from 'next/link';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex gap-6 border-b border-[var(--border)] text-sm">
        <Link href="/dashboard/admin" className="pb-3 hover:text-[var(--primary)]">
          Users
        </Link>
        <Link href="/dashboard/admin/categories" className="pb-3 hover:text-[var(--primary)]">
          Categories
        </Link>
      </div>
      {children}
    </div>
  );
}
