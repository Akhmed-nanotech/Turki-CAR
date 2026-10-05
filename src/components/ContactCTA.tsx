"use client";

import { useLanguage } from "@/components/LanguageProvider";
import {
  CallLink,
  PhoneNumber,
  WhatsAppLink,
  primaryButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";

export function ContactCTA() {
  const { copy } = useLanguage();

  return (
    <section id="contact" className="border-t border-line bg-bg">
      <div className="h-1 bg-accent" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <h2 className="max-w-xl whitespace-pre-line text-3xl font-semibold text-ink sm:text-4xl">
            {copy.contact.heading}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {copy.contact.body}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
            <CallLink className={`${primaryButtonClass} inline-flex`} />
            <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
          </div>
        </div>
        <div
          id="contact-details"
          className="rounded-lg border border-line bg-surface px-5 py-6"
        >
          <p className="text-sm text-muted">{copy.contact.phoneLabel}</p>
          <PhoneNumber className="mt-2 text-2xl font-semibold" />
        </div>
      </div>
    </section>
  );
}
