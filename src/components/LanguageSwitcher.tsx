"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/content/site";

const languages: { id: Locale; label: string }[] = [
  { id: "ar", label: "عربي" },
  { id: "en", label: "EN" },
  { id: "ru", label: "Русский" },
];

export function LanguageSwitcher({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: () => void;
}) {
  const { locale, setLocale, copy } = useLanguage();

  function select(next: Locale) {
    setLocale(next);
    onChange?.();
  }

  return (
    <div
      role="group"
      aria-label={copy.languageLabel}
      className={`inline-flex max-w-full items-center rounded-full border border-white/15 bg-black/40 p-0.5 ${className}`}
    >
      {languages.map((language) => (
        <button
          key={language.id}
          type="button"
          onClick={() => select(language.id)}
          aria-pressed={locale === language.id}
          className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium sm:px-2.5 ${
            locale === language.id ? "bg-accent text-on-accent" : "text-muted hover:text-ink"
          }`}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
