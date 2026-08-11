'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

// Placeholder photos representing different home services.
// Swap these `src` values for your own photos whenever you have real ones —
// nothing else in this component needs to change.
const SLIDES: Slide[] = [
  { src: 'https://picsum.photos/id/1076/1600/700', alt: 'Plumber fixing a pipe', caption: 'Trusted plumbers, ready when you need them' },
  { src: 'https://picsum.photos/id/1082/1600/700', alt: 'Electrician at work', caption: 'Licensed electricians for any job, big or small' },
  { src: 'https://picsum.photos/id/1029/1600/700', alt: 'Home cleaning', caption: 'Spotless homes, every single time' },
  { src: 'https://picsum.photos/id/1050/1600/700', alt: 'Painter at work', caption: 'Fresh coats of paint from vetted professionals' },
  { src: 'https://picsum.photos/id/1074/1600/700', alt: 'Technician repairing appliance', caption: 'Fast repairs from technicians who show up on time' },
];

// How long each slide stays on screen before auto-advancing (in ms)
const SLIDE_DURATION = 3000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    // Wrap around so it loops forever in either direction
    setCurrent((index + SLIDES.length) % SLIDES.length);
  };

  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  // Auto-advance on a timer. Pauses while the mouse is hovering the slider
  // so people can actually read a caption they're interested in.
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    // Always clear the previous timer before starting a new one —
    // otherwise multiple timers stack up and the slider speeds up over time.
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, current]);

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden   sm:h-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides — all rendered, only the current one is visible.
          This keeps images preloaded so transitions never show a blank flash. */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-6 right-6 sm:left-10">
            <p className="max-w-lg text-2xl font-semibold text-white sm:text-3xl">
              {slide.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Prev / next arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--foreground)] hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--foreground)] hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}