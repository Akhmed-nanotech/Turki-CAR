"use client";

import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export function Trust() {
  const { copy } = useLanguage();

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-6 sm:py-8">
        <Reveal>
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{copy.trust.heading}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {copy.trust.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span className="text-ink">{point}</span>
            </li>
          ))}
        </ul>
        </Reveal>
      </div>
    </section>
  );
}
