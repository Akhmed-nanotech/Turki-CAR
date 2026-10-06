"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowIcon, ServiceIcon } from "@/components/icons";
import {
  CallLink,
  WhatsAppLink,
  primaryButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";
import type { ServiceId } from "@/content/site";

function scrollToServiceDetail(detail: HTMLElement) {
  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  document.documentElement.style.scrollPaddingTop = `${headerHeight + 16}px`;
  const heading = detail.querySelector("h3");
  const target = heading instanceof HTMLElement ? heading : detail;
  target.style.scrollMarginTop = "0px";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

export function Services() {
  const { copy } = useLanguage();
  const detailRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(false);
  const [selectedId, setSelectedId] = useState<ServiceId | null>(null);
  const selected = copy.services.items.find((item) => item.id === selectedId) ?? null;

  useLayoutEffect(() => {
    if (!shouldScroll.current || !detailRef.current) {
      return;
    }
    shouldScroll.current = false;
    scrollToServiceDetail(detailRef.current);
  }, [selectedId]);

  function openService(id: ServiceId) {
    if (id === selectedId && detailRef.current) {
      scrollToServiceDetail(detailRef.current);
      return;
    }
    shouldScroll.current = true;
    setSelectedId(id);
  }

  return (
    <section id="services">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <Reveal>
          <SectionHeading title={copy.services.heading} intro={copy.services.intro} />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {copy.services.items.map((item, index) => {
            const isSelected = item.id === selectedId;
            return (
              <li key={item.id} className="min-w-0">
                <Reveal delay={index * 70} className="h-full">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="service-detail"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => openService(item.id)}
                    className={`glass-card flex h-full w-full cursor-pointer flex-col rounded-2xl p-5 text-start ${
                      isSelected ? "is-selected" : item.id === "inspection" ? "border-accent/45" : ""
                    }`}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-accent">
                      <ServiceIcon id={item.id} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {copy.cta.learnMore}
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-3xl border-s-2 border-accent/80 ps-4 text-sm leading-relaxed text-muted sm:text-base">
          {copy.services.note}
        </p>
        <div id="service-detail" ref={detailRef} aria-live="polite" className="mt-4 min-w-0">
          {selected ? (
            <div key={selected.id} className="service-panel glass rounded-2xl p-5 sm:p-6">
              <h3 className="text-xl font-semibold text-ink">{selected.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                {selected.detail}
              </p>
              <p className="mt-4 text-sm font-medium text-ink">{copy.services.examplesLabel}</p>
              <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {selected.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:flex">
                <CallLink className={`${primaryButtonClass} inline-flex`} />
                <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
