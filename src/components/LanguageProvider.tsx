"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, translate, type DictionaryKey } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("laos-alert-language");
    if (stored === "en" || stored === "lo") setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("laos-alert-language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key) => translate(language, key)
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as Language,
      setLanguage: () => undefined,
      t: (key: DictionaryKey) => dictionary.en[key]
    };
  }
  return context;
}
