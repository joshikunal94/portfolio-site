'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface BadgeItem {
  name: string;
  file: string;
  verifyUrl: string;
}

export function BadgeCarousel({ badges }: { badges: BadgeItem[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    reducedMotion ? [] : [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous badge"
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white hover:bg-slate-50 text-accent-bright motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div className="overflow-hidden flex-1" ref={emblaRef}>
        <div className="flex">
          {badges.map((badge) => (
            <div key={badge.name} className="flex-[0_0_100%] min-w-0 px-2">
              <a
                href={badge.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={badge.name}
                className="flex flex-col items-center"
              >
                <img
                  src={`/badges/${badge.file}`}
                  alt={badge.name}
                  className="h-24 w-auto mx-auto"
                />
                <span className="mt-2 text-xs text-[#5A6B80] text-center">{badge.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next badge"
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white hover:bg-slate-50 text-accent-bright motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
