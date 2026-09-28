'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface FeatureSectionProps {
  title?: string;
  description?: string;
  points?: string[];
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean; // true = image on the left, text on the right
}

export default function FeatureSection({
  title = 'Built for how home services actually work',
  description = 'Set your own prices, manage your own schedule, and get paid securely — no chasing customers for payment.',
  points = [
    'Create unlimited services under your profile',
    'Accept or decline bookings on your own terms',
    'Get paid directly through Stripe after every job',
  ],
  imageSrc = 'https://picsum.photos/id/1076/1600/700',
  imageAlt = 'Technician at work',
  ctaLabel = 'Get started',
  ctaHref = '/auth/register',
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section className="bg-[#14181a] py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${
            reverse ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Text side */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
            <p className="mt-4 text-white/70">{description}</p>

            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                  <span className="text-white/90">{point}</span>
                </li>
              ))}
            </ul>

            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-medium text-black hover:bg-white/90"
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          {/* Image side */}
          <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}