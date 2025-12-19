import { useLanguage } from "../contexts/LanguageContext";

export function ComparisonSection() {
  const { lang } = useLanguage();

  const copy = {
    heading: {
      uk: "Порівняння з традиційними рішеннями",
      en: "Comparison with Traditional Solutions",
    },
    parameters: [
      {
        feature: { uk: "Вартість встановлення", en: "Installation cost" },
        witerok: { uk: "Низька", en: "Low" },
        traditional: { uk: "Висока", en: "High" },
        highlight: true,
      },
      {
        feature: { uk: "Час встановлення", en: "Time to install" },
        witerok: { uk: "2-4 тижні", en: "2-4 weeks" },
        traditional: { uk: "3-6 місяців", en: "3-6 months" },
        highlight: true,
      },
      {
        feature: { uk: "Мінімальна швидкість вітру", en: "Min wind speed" },
        witerok: { uk: "3 м/с", en: "3 m/s" },
        traditional: { uk: "5-7 м/с", en: "5-7 m/s" },
        highlight: true,
      },
      {
        feature: { uk: "Площа для встановлення", en: "Space required" },
        witerok: { uk: "Мінімальна", en: "Minimal" },
        traditional: { uk: "Велика", en: "Large" },
        highlight: true,
      },
      {
        feature: { uk: "Обслуговування", en: "Maintenance" },
        witerok: { uk: "1 раз/рік", en: "Once per year" },
        traditional: { uk: "3-4 рази/рік", en: "3-4 times per year" },
        highlight: false,
      },
      {
        feature: { uk: "Термін служби", en: "Lifetime" },
        witerok: { uk: "15-20 років", en: "15-20 years" },
        traditional: { uk: "15-20 років", en: "15-20 years" },
        highlight: false,
      },
    ],
  };

  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-primary">
            {lang === "uk" ? copy.heading.uk : copy.heading.en}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-4 text-left text-foreground/80">
                  {lang === "uk" ? "Параметр" : "Parameter"}
                </th>
                <th className="px-6 py-4 text-center text-secondary">
                  WITERoK
                </th>
                <th className="px-6 py-4 text-center text-foreground/60">
                  {lang === "uk"
                    ? "Традиційні вітряки"
                    : "Traditional turbines"}
                </th>
              </tr>
            </thead>
            <tbody>
              {copy.parameters.map((row) => (
                <tr
                  key={row.feature.uk}
                  className={`border-t border-border ${
                    row.highlight ? "bg-secondary/5" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-foreground">
                    {lang === "uk" ? row.feature.uk : row.feature.en}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row.highlight
                          ? "bg-secondary text-white"
                          : "text-secondary"
                      }`}
                    >
                      {lang === "uk" ? row.witerok.uk : row.witerok.en}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-foreground/70">
                    {lang === "uk" ? row.traditional.uk : row.traditional.en}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
