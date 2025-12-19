import { CheckCircle2, Target, Award, Rocket } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function CompetitiveSection() {
  const { lang } = useLanguage();

  const advantages = [
    {
      icon: Target,
      title: { uk: "Компактність", en: "Compact" },
      description: {
        uk: "Вертикальна конструкція займає мінімум місця - можна встановити навіть на дахах комерційних будівель",
        en: "Vertical design needs minimal footprint — even rooftops are viable.",
      },
    },
    {
      icon: Award,
      title: { uk: "Ефективність", en: "Efficiency" },
      description: {
        uk: "Працює при низьких швидкостях вітру (від 3 м/с), що робить його ідеальним для України",
        en: "Operates from 3 m/s wind — ideal for typical Ukrainian wind patterns.",
      },
    },
    {
      icon: CheckCircle2,
      title: { uk: "Прозорість", en: "Transparency" },
      description: {
        uk: "Відкритий онлайн калькулятор окупності та детальна звітність по кожній установці",
        en: "Open payback calculator and detailed reporting for every installation.",
      },
    },
    {
      icon: Rocket,
      title: { uk: "Швидкий запуск", en: "Fast deployment" },
      description: {
        uk: "Від замовлення до запуску - 2-4 тижні (у конкурентів 3-6 місяців)",
        en: "From order to launch in 2–4 weeks (vs 3–6 months for incumbents).",
      },
    },
  ];

  return (
    <section id="advantages" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Competitive Advantages */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-primary mb-4">
              {lang === "uk"
                ? "Конкурентні переваги"
                : "Competitive Advantages"}
            </h2>
            <p className="text-xl text-foreground/80">
              {lang === "uk"
                ? "Чому обирають WITERoK"
                : "Why teams choose WITERoK"}
            </p>
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
                    {lang === "uk" ? advantage.title.uk : advantage.title.en}
                  </h3>
                  <p className="text-foreground/70">
                    {lang === "uk"
                      ? advantage.description.uk
                      : advantage.description.en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
