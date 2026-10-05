"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ServiceIcon } from "@/components/icons";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import {
  CallLink,
  WhatsAppLink,
  primaryButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";

export function Hero() {
  const { copy } = useLanguage();

  return (
    <section className="bg-bg">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:py-16">
        <div className="min-w-0">
          <p className="text-sm font-medium text-accent">{copy.hero.eyebrow}</p>
          <h1 className="mt-3 max-w-xl text-[2rem] font-semibold text-ink sm:text-5xl">
            {copy.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {copy.hero.support}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
            <CallLink className={`${primaryButtonClass} inline-flex`} />
            <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.hero.chips.map((chip) => (
              <li key={chip.id}>
                <a
                  href={chip.href}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent/70"
                >
                  <ServiceIcon id={chip.id} className="h-4 w-4 text-accent" />
                  {chip.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <WorkshopVisual alt={copy.hero.imageAlt} />
        </div>
      </div>
    </section>
  );
}
