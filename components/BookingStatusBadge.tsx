import { BookingStatus } from '@/types';

// Each status gets its own color so it's easy to scan a table of bookings at a glance.
const STATUS_STYLES: Record<BookingStatus, string> = {
  REQUESTED: 'bg-amber-100 text-amber-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  DECLINED: 'bg-red-100 text-red-800',
  PAID: 'bg-purple-100 text-purple-800',
  IN_PROGRESS: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-200 text-gray-800',
  CANCELLED: 'bg-red-200 text-red-900',
};

export default function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
