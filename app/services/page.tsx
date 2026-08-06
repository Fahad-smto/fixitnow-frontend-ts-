'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Service, Category } from '@/types';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter form state — kept simple with plain useState (no form library needed here)
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  // Load categories once, for the filter dropdown
  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data.data))
      .catch(() => setCategories([]));
  }, []);

  // Re-fetch services whenever a filter changes
  useEffect(() => {
    setLoading(true);
    api
      .get('/services', { params: { type: type || undefined, location: location || undefined } })
      .then((res) => setServices(res.data.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [type, location]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Browse services</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by location (e.g. Dhaka)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <p className="text-[var(--muted-foreground)]">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-[var(--muted-foreground)]">
          No services match your filters. Try clearing them.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
