"use client";

import { useLanguage } from "@/components/LanguageProvider";
import {
  CallLink,
  WhatsAppLink,
  primaryButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";

export function Hero() {
  const { copy } = useLanguage();

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-6xl px-5 pb-6 pt-8 sm:px-6 sm:pb-10 sm:pt-14 lg:pt-20">
        <p className="text-sm font-medium text-accent">{copy.hero.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl whitespace-pre-line text-[1.7rem] font-semibold text-ink sm:text-5xl">
          {copy.hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {copy.hero.support}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
          <CallLink className={`${primaryButtonClass} inline-flex`} />
          <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
        </div>
      </div>
    </section>
  );
}
