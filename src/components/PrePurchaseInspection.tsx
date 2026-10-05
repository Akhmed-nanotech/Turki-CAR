"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ArrowIcon, InspectionIcon } from "@/components/icons";
import { primaryButtonClass } from "@/components/contact-links";

export function PrePurchaseInspection() {
  const { copy } = useLanguage();
  const section = copy.inspection;

  return (
    <section id="inspection" className="border-y border-line bg-surface">
      <div className="h-1 bg-accent" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <p className="text-sm font-medium text-accent">{section.kicker}</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold text-ink sm:text-4xl">
            {section.heading}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {section.body}
          </p>
          <p className="mt-3 max-w-xl text-base text-ink">{section.note}</p>
          <ul className="mt-8 space-y-3">
            {section.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`${primaryButtonClass} mt-8 inline-flex`}
          >
            {copy.cta.bookInspection}
            <ArrowIcon className="h-4 w-4" />
          </a>
          <p className="mt-3 text-sm text-faint">{section.ctaNote}</p>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-line bg-bg p-6 sm:p-8">
            <div className="absolute inset-y-0 start-0 w-1 bg-accent" />
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-line text-accent">
              <InspectionIcon className="h-6 w-6" />
            </span>
            <p className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">
              {section.panelTitle}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {section.panelText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
