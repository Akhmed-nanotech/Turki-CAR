"use client";

import { business, callHref, isExternal, whatsappHref } from "@/content/business";
import { useLanguage } from "@/components/LanguageProvider";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const primaryButtonClass =
  "min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent shadow-[0_8px_24px_rgb(211_18_36_/_0.28)] transition duration-200 hover:-translate-y-px hover:bg-accent-strong active:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none";

export const quietButtonClass =
  "min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-px hover:border-white/40 active:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none";

export const whatsappButtonClass =
  "min-h-12 items-center justify-center gap-2 rounded-full border border-wa-line bg-wa px-5 text-sm font-semibold text-wa-text transition duration-200 hover:-translate-y-px hover:bg-wa-hover active:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none";

function externalProps(href: string) {
  if (!isExternal(href)) {
    return {};
  }
  return { target: "_blank", rel: "noopener noreferrer" } as const;
}

export function CallLink({
  className,
  showNumber = false,
}: {
  className?: string;
  showNumber?: boolean;
}) {
  const { copy } = useLanguage();
  const href = callHref();

  return (
    <a href={href} className={className}>
      <PhoneIcon className="h-4 w-4" />
      {showNumber ? (
        <span dir="ltr">{business.phoneDisplay}</span>
      ) : (
        copy.cta.call
      )}
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

export function MapLink({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { copy } = useLanguage();

  return (
    <a
      href={business.mapsUrl}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label ?? copy.location.mapsCta}
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
