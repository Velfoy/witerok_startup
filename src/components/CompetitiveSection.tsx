import { CheckCircle2, Target, Award, Rocket } from "lucide-react";

export function CompetitiveSection() {
  const advantages = [
    {
      icon: Target,
      title: "Компактність",
      description:
        "Вертикальна конструкція займає мінімум місця - можна встановити навіть на дахах комерційних будівель",
    },
    {
      icon: Award,
      title: "Ефективність",
      description:
        "Працює при низьких швидкостях вітру (від 3 м/с), що робить його ідеальним для України",
    },
    {
      icon: CheckCircle2,
      title: "Прозорість",
      description:
        "Відкритий онлайн калькулятор окупності та детальна звітність по кожній установці",
    },
    {
      icon: Rocket,
      title: "Швидкий запуск",
      description:
        "Від замовлення до запуску - 2-4 тижні (у конкурентів 3-6 місяців)",
    },
  ];

  const comparison = [
    {
      feature: "Вартість встановлення",
      witerok: "Низька",
      traditional: "Висока",
      highlight: true,
    },
    {
      feature: "Час встановлення",
      witerok: "2-4 тижні",
      traditional: "3-6 місяців",
      highlight: true,
    },
    {
      feature: "Мінімальна швидкість вітру",
      witerok: "3 м/с",
      traditional: "5-7 м/с",
      highlight: true,
    },
    {
      feature: "Площа для встановлення",
      witerok: "Мінімальна",
      traditional: "Велика",
      highlight: true,
    },
    {
      feature: "Обслуговування",
      witerok: "1 раз/рік",
      traditional: "3-4 рази/рік",
      highlight: false,
    },
    {
      feature: "Термін служби",
      witerok: "15-20 років",
      traditional: "15-20 років",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Competitive Advantages */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              Конкурентні переваги
            </h2>
            <p className="text-xl text-foreground/80">Чому обирають WITERoK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-border group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-xl text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-foreground/70">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <h3 className="text-2xl md:text-3xl text-white">
              Порівняння з традиційними рішеннями
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="px-6 py-4 text-left text-foreground">
                    Параметр
                  </th>
                  <th className="px-6 py-4 text-center text-secondary">
                    WITERoK
                  </th>
                  <th className="px-6 py-4 text-center text-foreground/60">
                    Традиційні вітряки
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t border-border ${
                      row.highlight ? "bg-secondary/5" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${
                          row.highlight
                            ? "bg-secondary text-white"
                            : "text-secondary"
                        }`}
                      >
                        {row.witerok}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-foreground/70">
                      {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
