export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "Про компанію", href: "#about" },
      { label: "Команда", href: "#team" },
      { label: "Вакансії", href: "#contact" },
      { label: "Блог", href: "#" },
    ],
    product: [
      { label: "WITERoK Generator", href: "#product" },
      { label: "Характеристики", href: "#product" },
      { label: "Ціни", href: "#contact" },
      { label: "Документація", href: "#" },
    ],
    resources: [
      { label: "Калькулятор окупності", href: "#" },
      { label: "Кейси", href: "#" },
      { label: "FAQ", href: "#faq" },
      { label: "Підтримка", href: "#contact" },
    ],
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl mb-4">WITERoK</div>
            <p className="text-white/70 mb-4">
              Вітроенергія нового покоління для бізнесу та громад України
            </p>
            <div className="text-white/60 text-sm">
              <p>вул. Хрещатик, 1</p>
              <p>Київ, 01001, Україна</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4">Компанія</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4">Продукт</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4">Ресурси</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {currentYear} WITERoK. Всі права захищено.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Політика конфіденційності
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Умови використання
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
