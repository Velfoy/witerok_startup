import { Zap, DollarSign, HardHat, Calculator } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ProblemSection() {
  const { lang } = useLanguage();

  const problems = [
    {
      icon: Zap,
      title: {
        uk: "Пошкодження енергетичної інфраструктури",
        en: "Damaged energy infrastructure",
      },
      items: {
        uk: [
          "Часті перебої з електропостачанням",
          "Зростання потреби у локальних джерелах енергії",
        ],
        en: ["Frequent power outages", "Growing need for local generation"],
      },
    },
    {
      icon: DollarSign,
      title: {
        uk: "Високий тариф для бізнесу",
        en: "High tariffs for business",
      },
      subtitle: { uk: "до 10 грн/кВт·год", en: "up to 10 UAH/kWh" },
      items: {
        uk: [
          "Витрати на енергію перевищують 30% операційних",
          "Прогноз зростання на +20% у 2026 році",
        ],
        en: [
          "Energy costs exceed 30% of OPEX",
          "+20% tariff growth forecast in 2026",
        ],
      },
    },
    {
      icon: HardHat,
      title: { uk: "Складна інфраструктура", en: "Complex infrastructure" },
      items: {
        uk: [
          "Потрібна спецтехніка, фундамент, великі площі",
          "Неможливість встановлення поблизу малих громад",
        ],
        en: [
          "Needs heavy equipment, foundation, large areas",
          "Cannot be installed near small communities",
        ],
      },
    },
    {
      icon: Calculator,
      title: { uk: "Нерозуміння періоду окупності", en: "Unclear payback" },
      items: {
        uk: [
          "Відсутність прозорих розрахунків",
          "Недовіра до малої вітроенергетики",
        ],
        en: ["No transparent calculations", "Low trust in small wind"],
      },
    },
  ];

  return (
    <section id="problem" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Проблема" : "Problem"}
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Бізнес і громади потребують доступного, автономного та зрозумілого рішення у сфері локальної генерації"
              : "Businesses and communities need accessible, autonomous, and transparent local generation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-xl">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl text-primary mb-1">
                      {lang === "uk" ? problem.title.uk : problem.title.en}
                    </h3>
                    {problem.subtitle && (
                      <p className="text-secondary">
                        {lang === "uk"
                          ? problem.subtitle.uk
                          : problem.subtitle.en}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {(lang === "uk" ? problem.items.uk : problem.items.en).map(
                    (item, i) => (
                      <li
                        key={i}
                        className="flex items-start text-foreground/80"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Solution teaser */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl mb-4">
              {lang === "uk" ? "Наше рішення" : "Our solution"}
            </h3>
            <p className="text-lg max-w-2xl">
              {lang === "uk"
                ? "WITERoK пропонує компактні вітрогенератори, які легко встановити, прозоро розрахувати окупність та отримати енергонезалежність"
                : "WITERoK delivers compact turbines that install quickly, have transparent payback, and unlock energy independence."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
