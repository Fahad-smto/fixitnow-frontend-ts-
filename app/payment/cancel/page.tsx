import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <XCircle className="mx-auto mb-4 h-14 w-14 text-[var(--destructive)]" />
      <h1 className="mb-2 text-2xl font-semibold">Payment cancelled</h1>
      <p className="mb-8 text-[var(--muted-foreground)]">
        No charge was made. You can try again anytime from your bookings.
      </p>
      <Link
        href="/dashboard/customer"
        className="rounded-md border border-[var(--border)] px-6 py-2.5 font-medium hover:bg-[var(--muted)]"
      >
        Back to my bookings
      </Link>
    </div>
  );
}
