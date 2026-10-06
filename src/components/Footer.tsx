"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import {
  MapLink,
  PhoneNumber,
  WhatsAppLink,
} from "@/components/contact-links";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { copy, locale } = useLanguage();
  const year = new Date().getFullYear();
  const brand = locale === "ar" ? "تركي كار" : "Turki Car";

  return (
    <footer className="border-t border-white/10 bg-black/55 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <a href="#top" className="inline-flex rounded-sm">
            <Logo />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {copy.footer.blurb}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">
            {copy.footer.servicesHeading}
          </p>
          <ul className="mt-4 space-y-2">
            {copy.services.items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">
            {copy.footer.contactHeading}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <span className="block text-faint">{copy.contact.phoneLabel}</span>
              <PhoneNumber className="mt-1 font-medium" />
            </li>
            <li>
              <WhatsAppLink className="inline-flex items-center gap-2 font-medium text-ink" />
            </li>
            <li>
              <MapLink className="font-medium text-ink underline-offset-4 hover:underline" />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-faint">
            © {year} {brand}. {copy.footer.rights}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
