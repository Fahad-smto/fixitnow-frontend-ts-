'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { CreditCard } from 'lucide-react';
import api from '@/lib/api';

export default function PayBookingPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await api.post('/payments/create', { bookingId: id });
      // The backend returns a Stripe Checkout URL — send the customer there to pay
      window.location.href = res.data.data.paymentUrl;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not start payment');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center">
      <CreditCard className="mx-auto mb-4 h-10 w-10 text-[var(--primary)]" />
      <h1 className="mb-2 text-xl font-semibold">Complete your payment</h1>
      <p className="mb-6 text-sm text-[var(--muted-foreground)]">
        You'll be redirected to Stripe's secure checkout to complete this payment.
      </p>
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full rounded-md bg-[var(--primary)] py-2.5 font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Redirecting...' : 'Proceed to Payment'}
      </button>
    </div>
  );
}
