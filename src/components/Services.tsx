"use client";

import { useCallback, useState } from "react";
import { BookingDialog } from "@/components/BookingDialog";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";
import { ServiceIcon } from "@/components/icons";
import type { WorkshopServiceId } from "@/content/site";

type BookingSelection = {
  categoryId: WorkshopServiceId;
  optionId: string;
};

export function Services() {
  const { copy } = useLanguage();
  const [expandedId, setExpandedId] = useState<WorkshopServiceId | null>(null);
  const [booking, setBooking] = useState<BookingSelection | null>(null);
  const closeBooking = useCallback(() => setBooking(null), []);

  const selectedCategory = copy.services.items.find((item) => item.id === booking?.categoryId) ?? null;
  const selectedOption =
    selectedCategory?.options.find((option) => option.id === booking?.optionId) ?? null;

  function toggleCategory(id: WorkshopServiceId) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <section id="services">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
        <Reveal>
          <SectionHeading title={copy.services.heading} intro={copy.services.intro} />
        </Reveal>
        <ul className="mt-5 space-y-2">
          {copy.services.items.map((item, index) => {
            const open = item.id === expandedId;
            const panelId = `service-panel-${item.id}`;
            const buttonId = `service-button-${item.id}`;
            const prominent = item.id === "checkup";
            return (
              <li key={item.id}>
                <Reveal delay={index * 50}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggleCategory(item.id)}
                      className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 py-2 text-start transition duration-200 active:translate-y-px motion-reduce:transition-none ${
                        prominent
                          ? "border-accent/75 bg-accent/10 shadow-[inset_0_0_0_1px_rgb(211_18_36_/_0.28)]"
                          : "border-white/14 bg-black/40"
                      } ${open ? "border-accent/80" : "hover:border-white/28"}`}
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-accent">
                        <ServiceIcon id={item.id} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1 text-base font-semibold text-ink">
                        {item.title}
                      </span>
                      <span aria-hidden="true" className="w-6 text-center text-lg leading-none text-accent">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`service-fold ${open ? "is-open" : ""}`}
                    inert={!open}
                  >
                    <div>
                      <ul className="space-y-1 px-1 py-1.5">
                        {item.options.map((option) => {
                          const selected =
                            booking?.categoryId === item.id && booking.optionId === option.id;
                          return (
                            <li key={option.id}>
                              <button
                                type="button"
                                aria-pressed={selected}
                                onClick={() =>
                                  setBooking({ categoryId: item.id, optionId: option.id })
                                }
                                className={`min-h-12 w-full rounded-xl px-4 text-start text-sm font-medium transition duration-200 active:translate-y-px motion-reduce:transition-none ${
                                  selected
                                    ? "bg-accent text-on-accent"
                                    : "text-ink hover:bg-white/10"
                                }`}
                              >
                                {option.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
      {selectedCategory && selectedOption ? (
        <BookingDialog
          categoryId={selectedCategory.id}
          category={selectedCategory.title}
          optionId={selectedOption.id}
          option={selectedOption.label}
          copy={copy.services.booking}
          onClose={closeBooking}
        />
      ) : null}
    </section>
  );
}
