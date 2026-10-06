"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: () => void;
}) {
  const { locale, setLocale, copy } = useLanguage();

  function select(next: "ar" | "en") {
    setLocale(next);
    onChange?.();
  }

  return (
    <div
      role="group"
      aria-label={copy.languageLabel}
      className={`inline-flex items-center rounded-full border border-white/15 bg-black/40 p-0.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => select("ar")}
        aria-pressed={locale === "ar"}
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          locale === "ar"
            ? "bg-accent text-on-accent"
            : "text-muted hover:text-ink"
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          locale === "en"
            ? "bg-accent text-on-accent"
            : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
