import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Navigation() {
  const { lang, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "home", label: { uk: "Головна", en: "Home" }, href: "#home" },
    { key: "about", label: { uk: "Про нас", en: "About Us" }, href: "#about" },
    { key: "esg", label: { uk: "ESG", en: "ESG" }, href: "#esg" },
    {
      key: "problem",
      label: { uk: "Проблема", en: "Problem" },
      href: "#problem",
    },
    {
      key: "product",
      label: { uk: "Продукт", en: "Product" },
      href: "#product",
    },
    {
      key: "advantages",
      label: { uk: "Переваги", en: "Advantages" },
      href: "#advantages",
    },
    {
      key: "comparison",
      label: { uk: "Порівняння", en: "Comparison" },
      href: "#comparison",
    },
    { key: "audience", label: { uk: "ЦА", en: "Audience" }, href: "#audience" },
    {
      key: "business",
      label: { uk: "Бізнес", en: "Business" },
      href: "#business",
    },
    {
      key: "marketing",
      label: { uk: "Маркетинг", en: "Marketing" },
      href: "#marketing",
    },
    { key: "team", label: { uk: "Команда", en: "Team" }, href: "#team" },
    {
      key: "advisors",
      label: { uk: "Радники", en: "Advisors" },
      href: "#advisors",
    },
    {
      key: "financial",
      label: { uk: "Фінанси", en: "Financial" },
      href: "#financial",
    },
    {
      key: "roadmap",
      label: { uk: "Дорожня карта", en: "Roadmap" },
      href: "#roadmap",
    },
    { key: "faq", label: { uk: "FAQ", en: "FAQ" }, href: "#faq" },
    {
      key: "contact",
      label: { uk: "Контакти", en: "Contact" },
      href: "#contact",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl text-primary">
              WITERoK
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-secondary transition-colors"
              >
                {lang === "uk" ? item.label.uk : item.label.en}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
              aria-label="Switch language"
            >
              {lang === "uk" ? "EN" : "UA"}
            </button>
            <a
              href="#contact"
              className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-primary transition-colors"
            >
              {lang === "uk" ? "Зв'язатися" : "Contact"}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:bg-muted"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block py-2 text-foreground hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {lang === "uk" ? item.label.uk : item.label.en}
              </a>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="mt-2 block w-full px-6 py-2 border border-border rounded-full text-center text-foreground hover:bg-muted transition-colors"
            >
              {lang === "uk" ? "English" : "Українська"}
            </button>
            <a
              href="#contact"
              className="block mt-2 px-6 py-2 bg-secondary text-white rounded-full text-center hover:bg-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {lang === "uk" ? "Зв'язатися" : "Contact"}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
