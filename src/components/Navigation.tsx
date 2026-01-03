import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";

export function Navigation() {
  const { lang, toggleLanguage } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { key: "home", label: { uk: "Головна", en: "Home" }, href: "#home" },
    { key: "about", label: { uk: "Про нас", en: "About Us" }, href: "#about" },
    { key: "esg", label: { uk: "ESG", en: "ESG" }, href: "#esg" },
    {
      key: "problem",
      label: { uk: "Проблема", en: "Problem & Solution" },
      href: "#problem",
    },
    {
      key: "product",
      label: { uk: "Продукт", en: "Product" },
      href: "#product",
    },
    {
      key: "competitive",
      label: { uk: "Конкурентні переваги", en: "Competitive Advantages" },
      href: "#advantages",
    },
    {
      key: "comparison",
      label: { uk: "Порівняння", en: "Comparison" },
      href: "#comparison",
    },
    {
      key: "audience",
      label: { uk: "Цільова аудиторія", en: "Target Audience" },
      href: "#audience",
    },
    {
      key: "business",
      label: { uk: "Бізнес-модель", en: "Business Model" },
      href: "#business",
    },
    {
      key: "marketing",
      label: { uk: "Маркетингова стратегія", en: "Marketing Strategy" },
      href: "#marketing",
    },
    { key: "team", label: { uk: "Команда", en: "Team" }, href: "#team" },
    {
      key: "partners",
      label: { uk: "Партнери", en: "Partners" },
      href: "#partnership",
    },
    {
      key: "financial",
      label: { uk: "Фінансова модель", en: "Financial Model" },
      href: "#financial",
    },
    {
      key: "roadmap",
      label: { uk: "Дорожна карта", en: "Roadmap" },
      href: "#roadmap",
    },
    {
      key: "calculator",
      label: { uk: "Калькулятор", en: "Efficiency Calculator" },
      href: "#calculator",
    },
    { key: "faq", label: { uk: "Запитання", en: "FAQ" }, href: "#faq" },
    {
      key: "contact",
      label: { uk: "Контакти", en: "Contact" },
      href: "#contact",
    },
  ];

  const navLinks = navItems.filter((item) => item.key !== "contact");
  const contactLink = navItems.find((item) => item.key === "contact");
  const [centerCount, setCenterCount] = useState(6);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const xl = window.matchMedia("(min-width: 1280px)");

    const update = () => {
      if (xl.matches) setCenterCount(6);
      else if (lg.matches) setCenterCount(5);
      else if (md.matches) setCenterCount(3);
      else setCenterCount(0);
    };

    update();

    const add = (m: MediaQueryList, fn: () => void) => {
      const mq = m as unknown as {
        addEventListener?: (event: string, fn: () => void) => void;
        addListener?: (fn: () => void) => void;
      };
      if (mq.addEventListener) mq.addEventListener("change", fn);
      else mq.addListener?.(fn);
    };
    const remove = (m: MediaQueryList, fn: () => void) => {
      const mq = m as unknown as {
        removeEventListener?: (event: string, fn: () => void) => void;
        removeListener?: (fn: () => void) => void;
      };
      if (mq.removeEventListener) mq.removeEventListener("change", fn);
      else mq.removeListener?.(fn);
    };

    add(md, update);
    add(lg, update);
    add(xl, update);

    return () => {
      remove(md, update);
      remove(lg, update);
      remove(xl, update);
    };
  }, []);

  const centerVisibleKeys = new Set(
    navLinks.slice(0, centerCount).map((i) => i.key)
  );
  let dropdownItems = navItems.filter(
    (item) => !centerVisibleKeys.has(item.key)
  );
  if (dropdownItems.length === 0) dropdownItems = navItems;

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;

      // Close desktop dropdown if clicking outside its container
      if (
        isDesktopMenuOpen &&
        desktopMenuRef.current &&
        target &&
        !desktopMenuRef.current.contains(target)
      ) {
        setIsDesktopMenuOpen(false);
      }

      // Close mobile menu if clicking outside the entire nav
      if (
        isMobileOpen &&
        navRef.current &&
        target &&
        !navRef.current.contains(target)
      ) {
        setIsMobileOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isDesktopMenuOpen) setIsDesktopMenuOpen(false);
        if (isMobileOpen) setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleGlobalClick);
    document.addEventListener("touchstart", handleGlobalClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleGlobalClick);
      document.removeEventListener("touchstart", handleGlobalClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktopMenuOpen, isMobileOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl text-primary font-medium">
              WITERoK
            </a>
          </div>

          <div className="hidden md:flex items-center flex-1 justify-center gap-8">
            <div className="relative" ref={desktopMenuRef}>
              <button
                onClick={() => setIsDesktopMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-primary hover:bg-white/20 transition-colors"
                aria-haspopup="true"
                aria-expanded={isDesktopMenuOpen}
              >
                <Menu size={18} />
              </button>
              {isDesktopMenuOpen && (
                <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border border-white/20">
                  <div className="max-h-64 overflow-y-auto">
                    {dropdownItems.map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        className="block px-4 py-3 text-foreground hover:bg-muted transition-colors text-sm whitespace-nowrap"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        {lang === "uk" ? item.label.uk : item.label.en}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(0, centerCount).map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm"
              >
                {lang === "uk" ? item.label.uk : item.label.en}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full bg-white/10 text-primary text-sm hover:bg-white/20 transition-colors"
              aria-label="Switch language"
            >
              {lang === "uk" ? "EN" : "UA"}
            </button>
            <a
              href={contactLink?.href}
              className="px-5 py-2 bg-[#1A6DCC] text-white rounded-full hover:opacity-95 transition-opacity text-sm font-medium"
            >
              {lang === "uk" ? "Зв'язатися" : "Contact"}
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-md text-foreground hover:bg-muted"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block py-2 text-foreground hover:text-secondary transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {lang === "uk" ? item.label.uk : item.label.en}
              </a>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileOpen(false);
              }}
              className="mt-2 block w-full px-6 py-2 border border-border rounded-full text-center text-foreground hover:bg-muted transition-colors"
            >
              {lang === "uk" ? "English" : "Українська"}
            </button>
            <a
              href={contactLink?.href}
              className="block mt-2 px-6 py-2 bg-secondary text-white rounded-full text-center hover:bg-primary transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              {lang === "uk" ? "Зв'язатися" : "Contact"}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
