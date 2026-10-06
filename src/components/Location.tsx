"use client";

import { business } from "@/content/business";
import { MapLink, primaryButtonClass } from "@/components/contact-links";
import { useLanguage } from "@/components/LanguageProvider";
import { PinIcon } from "@/components/icons";

export function Location() {
  const { copy } = useLanguage();

  return (
    <section id="location">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 sm:py-14">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-5">
            <div className="flex flex-col items-start justify-center gap-4 p-6 sm:p-8 lg:col-span-2">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                <PinIcon />
              </span>
              <div>
                <div className="mb-3 h-0.5 w-10 bg-accent" />
                <h2 className="text-3xl font-semibold text-ink">{copy.location.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{copy.location.intro}</p>
              </div>
              <MapLink className={`${primaryButtonClass} inline-flex`} />
            </div>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.location.mapsCta}
              className="map-plate relative block min-h-64 overflow-hidden border-t border-white/10 lg:col-span-3 lg:min-h-80 lg:border-s lg:border-t-0"
            >
              <svg
                viewBox="0 0 640 360"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full text-white/20"
                preserveAspectRatio="xMidYMid slice"
              >
                <path d="M-20 250 C 80 230, 140 290, 240 250 S 420 180, 660 220" fill="none" stroke="currentColor" strokeWidth="18" />
                <path d="M80 -20 C 120 80, 70 140, 150 220 S 210 320, 180 390" fill="none" stroke="currentColor" strokeWidth="14" />
                <path d="M300 -10 C 340 70, 420 90, 390 170 S 470 280, 560 390" fill="none" stroke="rgb(211 18 36 / 0.35)" strokeWidth="10" />
                <path d="M-10 120 H 660" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(7_9_13/0.45)_78%)]" />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-[#07090d]/80 text-accent shadow-[0_10px_30px_rgb(0_0_0_/_0.45)]">
                  <PinIcon className="h-7 w-7" />
                </span>
                <span className="mt-3 rounded-full bg-[#07090d]/80 px-3 py-1 text-xs font-medium text-ink">
                  {copy.location.heading}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
