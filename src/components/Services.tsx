"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowIcon, ServiceIcon } from "@/components/icons";

export function Services() {
  const { copy } = useLanguage();

  return (
    <section id="services" className="border-t border-line bg-raised">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        <SectionHeading title={copy.services.heading} intro={copy.services.intro} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {copy.services.items.map((item) => (
            <li
              key={item.id}
              className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-[inset_0_2px_0_0_var(--accent)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-bg text-accent">
                <ServiceIcon id={item.id} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              <a
                href={item.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
                aria-label={`${copy.cta.learnMore}: ${item.title}`}
              >
                {copy.cta.learnMore}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
