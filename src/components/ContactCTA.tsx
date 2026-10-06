"use client";

import { useLanguage } from "@/components/LanguageProvider";
import {
  CallLink,
  MapLink,
  PhoneNumber,
  WhatsAppLink,
  primaryButtonClass,
  quietButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";

export function ContactCTA() {
  const { copy } = useLanguage();

  return (
    <section id="contact">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="mb-4 h-0.5 w-10 bg-accent" />
        <h2 className="max-w-xl text-3xl font-semibold text-ink sm:text-4xl">{copy.contact.heading}</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{copy.contact.body}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <CallLink className={`${primaryButtonClass} inline-flex`} />
          <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
          <MapLink
            label={copy.contact.locationLabel}
            className={`${quietButtonClass} col-span-2 inline-flex sm:col-span-1`}
          />
        </div>
        <p className="mt-5 text-sm text-muted">
          {copy.contact.phoneLabel}{" "}
          <PhoneNumber className="font-medium" />
        </p>
      </div>
    </section>
  );
}
