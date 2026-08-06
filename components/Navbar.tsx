'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wrench } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

export default function Navbar() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  // Where "Dashboard" should point, depending on who's logged in
  const dashboardLink =
    user?.role === 'admin'
      ? '/dashboard/admin'
      : user?.role === 'technician'
      ? '/dashboard/technician'
      : '/dashboard/customer';

  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Wrench className="h-5 w-5 text-[var(--primary)]" />
          FixItNow
        </Link>

        <div className="flex items-center gap-6 text-sm">
           <Link href="/home" className="hover:text-[var(--primary)]">
            Home
          </Link>
          <Link href="/services" className="hover:text-[var(--primary)]">
            Browse Services
          </Link>
         

          {user ? (
            <>
              <Link href={dashboardLink} className="hover:text-[var(--primary)]">
                Dashboard
              </Link>
              <span className="text-[var(--muted-foreground)]">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--muted)]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-[var(--primary)]">
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-[var(--primary)] px-4 py-1.5 text-[var(--primary-foreground)] hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
