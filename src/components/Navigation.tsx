import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Головна", href: "#home" },
    { label: "Про проєкт", href: "#about" },
    { label: "Продукт", href: "#product" },
    { label: "Бізнес-модель", href: "#business" },
    { label: "Команда", href: "#team" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакти", href: "#contact" },
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
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-primary transition-colors"
            >
              Зв'язатися
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
                key={item.label}
                href={item.href}
                className="block py-2 text-foreground hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-2 px-6 py-2 bg-secondary text-white rounded-full text-center hover:bg-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Зв'язатися
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
