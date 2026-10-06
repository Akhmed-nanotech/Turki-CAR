"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { content, type Locale, type SiteCopy } from "@/content/site";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: SiteCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "turki-car-locale";

let current: Locale = "ar";
let hydrated = false;
const listeners = new Set<() => void>();

function readStored(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") {
      return stored;
    }
  } catch {
    // Keep Arabic when storage is unavailable.
  }
  return "ar";
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Locale {
  return current;
}

function getServerSnapshot(): Locale {
  return "ar";
}

function setStoredLocale(next: Locale) {
  current = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The language still changes for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!hydrated) {
      hydrated = true;
      const stored = readStored();
      if (stored !== current) {
        current = stored;
        emit();
      }
    }
  }, []);

  useEffect(() => {
    const apply = () => {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
      if (document.title !== content[locale].metaTitle) {
        document.title = content[locale].metaTitle;
      }
    };

    apply();
    const titleEl = document.querySelector("title");
    if (!titleEl) {
      return;
    }

    const observer = new MutationObserver(apply);
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setStoredLocale,
      copy: content[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return value;
}
