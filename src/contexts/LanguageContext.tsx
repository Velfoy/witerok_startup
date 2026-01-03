import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LanguageContext, type Language } from "./LanguageContextType";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState<Language>("en");

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
