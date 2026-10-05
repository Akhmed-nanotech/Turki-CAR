"use client";

import { MapLink, primaryButtonClass } from "@/components/contact-links";
import { useLanguage } from "@/components/LanguageProvider";
import { PinIcon } from "@/components/icons";

export function Location() {
  const { copy } = useLanguage();

  return (
    <section id="location" className="border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start gap-6 rounded-lg border border-line bg-surface px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-line text-accent">
              <PinIcon />
            </span>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              {copy.location.heading}
            </h2>
          </div>
          <MapLink className={`${primaryButtonClass} inline-flex`} />
        </div>
      </div>
    </section>
  );
}
