"use client";

import { business, callHref, isExternal, whatsappHref } from "@/content/business";
import { useLanguage } from "@/components/LanguageProvider";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const primaryButtonClass =
  "min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong";

export const whatsappButtonClass =
  "min-h-12 items-center justify-center gap-2 rounded-md border border-wa-line bg-wa px-5 text-sm font-semibold text-wa-text transition-colors hover:bg-wa-hover";

function externalProps(href: string) {
  if (!isExternal(href)) {
    return {};
  }
  return { target: "_blank", rel: "noopener noreferrer" } as const;
}

export function CallLink({ className }: { className?: string }) {
  const { copy } = useLanguage();
  const href = callHref();

  return (
    <a href={href} className={className}>
      <PhoneIcon className="h-4 w-4" />
      {copy.cta.call}
    </a>
  );
}

export function WhatsAppLink({ className }: { className?: string }) {
  const { copy } = useLanguage();
  const href = whatsappHref();

  return (
    <a href={href} className={className} {...externalProps(href)}>
      <WhatsAppIcon className="h-4 w-4" />
      {copy.cta.whatsapp}
    </a>
  );
}

export function MapLink({ className }: { className?: string }) {
  const { copy } = useLanguage();

  return (
    <a
      href={business.mapsUrl}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {copy.location.mapsCta}
    </a>
  );
}

export function PhoneNumber({ className }: { className?: string }) {
  return (
    <a
      href={callHref()}
      dir="ltr"
      className={`inline-block text-ink ${className ?? ""}`}
    >
      {business.phoneDisplay}
    </a>
  );
}
