"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";

export function Process() {
  const { copy } = useLanguage();

  return (
    <section id="process">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <SectionHeading title={copy.process.heading} intro={copy.process.intro} />
        </Reveal>
        <ol className="relative mt-10 grid gap-4 md:grid-cols-3">
          {copy.process.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 80} className="h-full">
                <article className="glass-card h-full rounded-2xl p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 text-sm font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
