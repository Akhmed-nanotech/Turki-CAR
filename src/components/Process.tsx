"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

export function Process() {
  const { copy } = useLanguage();

  return (
    <section id="process" className="border-t border-line bg-raised">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.process.heading} intro={copy.process.intro} />
        <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-5 hidden h-px bg-line md:block start-8 end-8"
          />
          {copy.process.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-accent/60 bg-raised text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
