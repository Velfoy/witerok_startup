import { Zap, DollarSign, HardHat, Calculator } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Zap,
      title: "Пошкодження енергетичної інфраструктури",
      items: [
        "Часті перебої з електропостачанням",
        "Зростання потреби у локальних джерелах енергії",
      ],
    },
    {
      icon: DollarSign,
      title: "Високий тариф для бізнесу",
      subtitle: "до 10 грн/кВт·год",
      items: [
        "Витрати на енергію перевищують 30% операційних",
        "Прогноз зростання на +20% у 2026 році",
      ],
    },
    {
      icon: HardHat,
      title: "Складна інфраструктура",
      items: [
        "Потрібна спецтехніка, фундамент, великі площі",
        "Неможливість встановлення поблизу малих громад",
      ],
    },
    {
      icon: Calculator,
      title: "Нерозуміння періоду окупності",
      items: [
        "Відсутність прозорих розрахунків",
        "Недовіра до малої вітроенергетики",
      ],
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">Проблема</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Бізнес і громади потребують доступного, автономного та зрозумілого
            рішення у сфері локальної генерації
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
                      {problem.title}
                    </h3>
                    {problem.subtitle && (
                      <p className="text-secondary">{problem.subtitle}</p>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {problem.items.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/80">
                      <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Solution teaser */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
            <h3 className="text-2xl mb-4">Наше рішення</h3>
            <p className="text-lg max-w-2xl">
              WITERoK пропонує компактні вітрогенератори, які легко встановити,
              прозоро розрахувати окупність та отримати енергонезалежність
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
