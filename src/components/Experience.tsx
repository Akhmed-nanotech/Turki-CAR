"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { business } from "@/content/business";

export function Experience() {
  const { copy } = useLanguage();
  const section = copy.experience;

  return (
    <section id="experience">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="min-w-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_36px_rgb(0_0_0_/_0.32)]">
                <Image
                  src={business.mechanicImage}
                  alt={section.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090d]/35 via-transparent to-transparent" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="mb-4 h-0.5 w-10 bg-accent" />
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{section.heading}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {section.body}
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink">{section.support}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
