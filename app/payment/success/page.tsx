import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />
      <h1 className="mb-2 text-2xl font-semibold">Payment successful</h1>
      <p className="mb-8 text-[var(--muted-foreground)]">
        Your payment went through. Your booking status will update shortly.
      </p>
      <Link
        href="/dashboard/customer"
        className="rounded-md bg-[var(--primary)] px-6 py-2.5 font-medium text-[var(--primary-foreground)] hover:opacity-90"
      >
        View my bookings
      </Link>
    </div>
  );
}
