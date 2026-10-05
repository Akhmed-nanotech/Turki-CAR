"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

export function Experience() {
  const { copy } = useLanguage();

  return (
    <section id="experience" className="bg-bg">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-6xl font-semibold leading-none text-accent sm:text-7xl">
            {copy.experience.years}
          </p>
          <p className="mt-3 text-sm text-muted">{copy.experience.yearsLabel}</p>
        </div>
        <div className="border-s-2 border-accent ps-5 lg:col-span-8">
          <SectionHeading
            title={copy.experience.heading}
            intro={copy.experience.body}
            rule={false}
          />
        </div>
      </div>
    </section>
  );
}
