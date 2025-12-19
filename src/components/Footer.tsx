import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: { uk: "Про компанію", en: "About" }, href: "#about" },
      { label: { uk: "Команда", en: "Team" }, href: "#team" },
      { label: { uk: "Вакансії", en: "Careers" }, href: "#contact" },
      { label: { uk: "Блог", en: "Blog" }, href: "#" },
    ],
    product: [
      {
        label: { uk: "WITERoK Generator", en: "WITERoK Generator" },
        href: "#product",
      },
      {
        label: { uk: "Характеристики", en: "Specifications" },
        href: "#product",
      },
      { label: { uk: "Ціни", en: "Pricing" }, href: "#contact" },
      { label: { uk: "Документація", en: "Documentation" }, href: "#" },
    ],
    resources: [
      {
        label: { uk: "Калькулятор окупності", en: "Payback calculator" },
        href: "#",
      },
      { label: { uk: "Кейси", en: "Case studies" }, href: "#" },
      { label: { uk: "FAQ", en: "FAQ" }, href: "#faq" },
      { label: { uk: "Підтримка", en: "Support" }, href: "#contact" },
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
              {lang === "uk"
                ? "Вітроенергія нового покоління для бізнесу та громад України"
                : "Next-generation wind energy for businesses and communities"}
            </p>
            <div className="text-white/60 text-sm">
              <p>{lang === "uk" ? "вул. Хрещатик, 1" : "1 Khreshchatyk St."}</p>
              <p>
                {lang === "uk"
                  ? "Київ, 01001, Україна"
                  : "Kyiv, 01001, Ukraine"}
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4">{lang === "uk" ? "Компанія" : "Company"}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {lang === "uk" ? link.label.uk : link.label.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4">{lang === "uk" ? "Продукт" : "Product"}</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {lang === "uk" ? link.label.uk : link.label.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="mb-4">{lang === "uk" ? "Ресурси" : "Resources"}</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {lang === "uk" ? link.label.uk : link.label.en}
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
              {lang === "uk"
                ? `© ${currentYear} WITERoK. Всі права захищено.`
                : `© ${currentYear} WITERoK. All rights reserved.`}
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                {lang === "uk" ? "Політика конфіденційності" : "Privacy policy"}
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                {lang === "uk" ? "Умови використання" : "Terms of use"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
