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
    <header className="border-b border-white/10 bg-[#14181A] text-[#EDEAE3]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F2A93B]/40 text-[#F2A93B]">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="font-[Space_Grotesk,sans-serif] text-lg font-bold tracking-tight text-[#F4EFE6]">
            FixItNow
          </span>
        </Link>

        <div className="flex items-center gap-7 font-mono text-xs tracking-wide">
          <div className="hidden items-center gap-2 text-[#8B9290] sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FA796] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3FA796]" />
            </span>
            DISPATCH OPEN
          </div>

          <span className="hidden h-4 w-px bg-white/10 sm:block" />

          <Link
            href="/home"
            className="uppercase text-[#8B9290] transition-colors hover:text-[#F4EFE6]"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="uppercase text-[#8B9290] transition-colors hover:text-[#F4EFE6]"
          >
            Browse services
          </Link>

          {user ? (
            <>
              <Link
                href={dashboardLink}
                className="uppercase text-[#8B9290] transition-colors hover:text-[#F4EFE6]"
              >
                Dashboard
              </Link>

              <span className="hidden items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] normal-case tracking-normal text-[#8B9290] md:flex">
                <span className="text-[#F4EFE6]">{user.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="rounded-md border border-white/15 px-3 py-1.5 uppercase text-[#EDEAE3] transition-colors hover:border-[#F2A93B]/50 hover:text-[#F2A93B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="uppercase text-[#8B9290] transition-colors hover:text-[#F4EFE6]"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-[#F2A93B] px-4 py-1.5 uppercase font-semibold text-[#14181A] transition-colors hover:bg-[#ffbf5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A93B]"
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