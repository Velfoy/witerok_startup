import { createContext } from "react";

export type Language = "uk" | "en";

export type LanguageContextValue = {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);
