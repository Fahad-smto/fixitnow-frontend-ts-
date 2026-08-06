import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Service } from '@/types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/technicians/${service.technicianId}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 transition hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
          {service.category?.name ?? 'Service'}
        </span>
        {service.technician?.rating ? (
          <span className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
            <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
            {service.technician.rating.toFixed(1)}
          </span>
        ) : null}
      </div>

      <h3 className="mb-1 font-semibold">{service.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-[var(--muted-foreground)]">
        {service.description}
      </p>

      <div className="flex items-center justify-between text-sm">
        {service.location ? (
          <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
            <MapPin className="h-3.5 w-3.5" />
            {service.location}
          </span>
        ) : (
          <span />
        )}
        <span className="font-semibold text-[var(--primary)]">${service.price}</span>
      </div>
    </Link>
  );
}
