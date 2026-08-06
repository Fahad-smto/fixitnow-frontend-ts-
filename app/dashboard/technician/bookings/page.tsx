'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Booking, BookingStatus } from '@/types';
import BookingStatusBadge from '@/components/BookingStatusBadge';

// Which action buttons make sense for each current status
const NEXT_ACTIONS: Partial<Record<BookingStatus, { label: string; next: BookingStatus }[]>> = {
  REQUESTED: [
    { label: 'Accept', next: 'ACCEPTED' },
    { label: 'Decline', next: 'DECLINED' },
  ],
  PAID: [{ label: 'Start Job', next: 'IN_PROGRESS' }],
  IN_PROGRESS: [{ label: 'Mark Completed', next: 'COMPLETED' }],
};

export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadBookings = () => {
    api
      .get('/technician/bookings')
      .then((res) => setBookings(res.data.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (bookingId: string, status: BookingStatus) => {
    setUpdatingId(bookingId);
    try {
      await api.patch(`/technician/bookings/${bookingId}`, { status });
      toast.success(`Booking marked as ${status.replace('_', ' ').toLowerCase()}`);
      loadBookings();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not update booking');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading bookings...</p>;

  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center text-[var(--muted-foreground)]">
        No booking requests yet.
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
                Customer: {b.customer?.name} · {new Date(b.timeSlot).toLocaleString()}
              </p>
              {b.address && <p className="text-sm text-[var(--muted-foreground)]">{b.address}</p>}
              {b.notes && <p className="mt-1 text-sm italic text-[var(--muted-foreground)]">"{b.notes}"</p>}
            </div>
            <BookingStatusBadge status={b.status} />
          </div>

          {NEXT_ACTIONS[b.status] && (
            <div className="mt-4 flex gap-3">
              {NEXT_ACTIONS[b.status]!.map((action) => (
                <button
                  key={action.next}
                  onClick={() => updateStatus(b.id, action.next)}
                  disabled={updatingId === b.id}
                  className={`rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 ${
                    action.next === 'DECLINED'
                      ? 'border border-[var(--destructive)] text-[var(--destructive)]'
                      : 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
