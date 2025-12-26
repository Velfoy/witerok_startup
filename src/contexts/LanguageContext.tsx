import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
export type Language = "uk" | "en";

type LanguageContextValue = {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState<Language>("uk");

  const value = useMemo(
    () => ({
      lang,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((prev) => (prev === "uk" ? "en" : "uk")),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
