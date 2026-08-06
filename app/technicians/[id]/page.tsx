'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { TechnicianProfile, Service } from '@/types';
import { useAuthStore } from '@/lib/auth-store';

export default function TechnicianProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();

  const [technician, setTechnician] = useState<TechnicianProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking form state
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get(`/technicians/${id}`)
      .then((res) => setTechnician(res.data.data))
      .catch(() => setTechnician(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please log in as a customer to book a service');
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'customer') {
      toast.error('Only customers can book services');
      return;
    }
    if (!selectedServiceId || !timeSlot) {
      toast.error('Please select a service and a time slot');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/bookings', {
        technicianId: id,
        serviceId: selectedServiceId,
        timeSlot: new Date(timeSlot).toISOString(),
        address,
        notes,
      });
      toast.success('Booking request sent!');
      router.push('/dashboard/customer');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="mx-auto max-w-3xl px-6 py-10 text-[var(--muted-foreground)]">Loading...</p>;
  }

  if (!technician) {
    return (
      <p className="mx-auto max-w-3xl px-6 py-10 text-[var(--muted-foreground)]">
        Technician not found.
      </p>
    );
  }

  const services: Service[] = (technician as any).services ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Profile header */}
      <div className="mb-8 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h1 className="text-2xl font-semibold">{technician.user?.name}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
            {technician.rating.toFixed(1)} rating
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            {technician.experience ?? 0} years experience
          </span>
        </div>
        {technician.bio && <p className="mt-4">{technician.bio}</p>}
        {technician.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technician.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs text-[var(--muted-foreground)]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Booking form */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Book this technician</h2>

        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Service</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} — ${s.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Date & time</label>
            <input
              type="datetime-local"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House 12, Road 5, Dhaka"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--primary)] py-2.5 font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Sending request...' : 'Request Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
