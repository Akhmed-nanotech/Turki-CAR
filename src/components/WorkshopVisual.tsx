"use client";

import Image from "next/image";
import { business } from "@/content/business";
import { useLanguage } from "@/components/LanguageProvider";

export function WorkshopVisual() {
  const { copy } = useLanguage();

  return (
    <section aria-label={copy.hero.imageAlt} className="relative h-48 overflow-hidden sm:h-64 md:h-80">
      <Image
        src={business.workshopImage}
        alt={copy.hero.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090d] via-[#07090d]/25 to-[#07090d]" />
    </section>
  );
}
