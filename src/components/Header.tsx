"use client";

import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";
import { CloseIcon, MenuIcon } from "@/components/icons";
import {
  CallLink,
  WhatsAppLink,
  primaryButtonClass,
  whatsappButtonClass,
} from "@/components/contact-links";

export function Header() {
  const { copy } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="h-1 bg-accent" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-6">
        <a href="#top" className="shrink-0 rounded-sm">
          <Logo />
        </a>
        <nav className="ms-6 hidden items-center gap-6 lg:flex" aria-label={copy.navLabel}>
          {copy.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitcher onChange={() => setOpen(false)} />
          <CallLink className={`${primaryButtonClass} hidden lg:inline-flex`} />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="sr-only">{open ? copy.menuClose : copy.menuOpen}</span>
          </button>
        </div>
      </div>
      <div className="border-t border-line px-5 py-3 lg:hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3">
          <CallLink className={`${primaryButtonClass} inline-flex`} />
          <WhatsAppLink className={`${whatsappButtonClass} inline-flex`} />
        </div>
      </div>
      {open ? (
        <div id="site-menu" className="border-t border-line bg-bg lg:hidden">
          <nav
            className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3 sm:px-6"
            aria-label={copy.navLabel}
          >
            {copy.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-base text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
