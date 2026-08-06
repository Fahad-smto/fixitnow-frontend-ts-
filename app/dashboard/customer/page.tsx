'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Booking } from '@/types';
import BookingStatusBadge from '@/components/BookingStatusBadge';

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const loadBookings = () => {
    api
      .get('/bookings')
      .then((res) => setBookings(res.data.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const submitReview = async (bookingId: string) => {
    try {
      await api.post('/reviews', { bookingId, rating, comment });
      toast.success('Review submitted!');
      setReviewingId(null);
      setComment('');
      setRating(5);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    }
  };

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading your bookings...</p>;

  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
        <p className="mb-4 text-[var(--muted-foreground)]">You haven't booked a service yet.</p>
        <Link href="/services" className="text-[var(--primary)] hover:underline">
          Browse services →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{b.service?.title ?? 'Service'}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {new Date(b.timeSlot).toLocaleString()} · ${b.amount}
              </p>
              {b.address && <p className="text-sm text-[var(--muted-foreground)]">{b.address}</p>}
            </div>
            <BookingStatusBadge status={b.status} />
          </div>

          <div className="mt-4 flex gap-3">
            {b.status === 'ACCEPTED' && (
              <Link
                href={`/dashboard/customer/bookings/${b.id}/pay`}
                className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
              >
                Pay Now
              </Link>
            )}

            {b.status === 'COMPLETED' && reviewingId !== b.id && (
              <button
                onClick={() => setReviewingId(b.id)}
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
              >
                Leave a Review
              </button>
            )}
          </div>

          {reviewingId === b.id && (
            <div className="mt-4 rounded-md border border-[var(--border)] p-4">
              <label className="mb-1 block text-sm font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mb-3 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the service?"
                className="mb-3 w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
                rows={2}
              />
              <button
                onClick={() => submitReview(b.id)}
                className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
