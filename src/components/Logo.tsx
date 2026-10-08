"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      className={`text-accent ${className}`}
    >
      <rect
        x="1.25"
        y="1.25"
        width="33.5"
        height="33.5"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 24.5h22"
        stroke="#f3efe6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9.2 24.5 12 18h12l2.8 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="24.5" r="1.7" fill="currentColor" />
      <circle cx="23" cy="24.5" r="1.7" fill="currentColor" />
    </svg>
  );
}

export function Logo({ animate = false }: { animate?: boolean }) {
  const { locale } = useLanguage();
  const name = locale === "ar" ? "تركي كار" : "Turki Car";

  return (
    <span className={`inline-flex items-center gap-2.5 ${animate ? "brand-enter" : ""}`}>
      <LogoMark />
      <span className="text-[1.15rem] font-semibold leading-none text-ink">{name}</span>
    </span>
  );
}
