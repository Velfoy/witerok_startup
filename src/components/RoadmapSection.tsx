import { CheckCircle2, Circle, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function RoadmapSection() {
  const { lang } = useLanguage();

  const roadmapItems = [
    {
      phase: { uk: "TRL 4", en: "TRL 4" },
      title: { uk: "Підтвердження Концепції", en: "Concept validation" },
      subtitle: {
        uk: "Лабораторні випробування Прототипу №1",
        en: "Lab testing of Prototype #1",
      },
      status: "completed",
      date: "Q1 2024",
      achievements: {
        uk: [
          "Розробка базового прототипу",
          "Лабораторні тести ефективності",
          "Підтвердження технічної концепції",
        ],
        en: [
          "Built baseline prototype",
          "Lab efficiency tests",
          "Technical concept validated",
        ],
      },
    },
    {
      phase: { uk: "TRL 5", en: "TRL 5" },
      title: { uk: "Повнофункціональний Прототип", en: "Full prototype" },
      subtitle: {
        uk: "Створення Прототипу №2 та тестування в релевантному середовищі",
        en: "Prototype #2 and testing in relevant environment",
      },
      status: "completed",
      date: "Q2-Q3 2024",
      achievements: {
        uk: [
          "Оптимізація конструкції",
          "Польові випробування",
          "Валідація в реальних умовах",
        ],
        en: [
          "Optimized design",
          "Field trials",
          "Validation in real conditions",
        ],
      },
    },
    {
      phase: { uk: "TRL 6", en: "TRL 6" },
      title: { uk: "Демонстрація Системи", en: "System demonstration" },
      subtitle: {
        uk: "Демонстрація Прототипу №3 бенефіціару",
        en: "Prototype #3 demo to beneficiary",
      },
      status: "in-progress",
      date: "Q4 2024",
      achievements: {
        uk: [
          "Створення фінальної версії прототипу",
          "Демонстрація клієнтам",
          "Збір зворотного зв'язку",
        ],
        en: [
          "Final prototype built",
          "Client demonstrations",
          "Feedback collection",
        ],
      },
    },
    {
      phase: { uk: "TRL 7", en: "TRL 7" },
      title: {
        uk: "Пілотна Партія та Експлуатація",
        en: "Pilot batch and operation",
      },
      subtitle: {
        uk: "Тривала експлуатація Прототипу №4 в операційному середовищі",
        en: "Long-run operation of Prototype #4",
      },
      status: "planned",
      date: "Q1-Q2 2025",
      achievements: {
        uk: [
          "Виробництво пілотної партії (10 од.)",
          "Встановлення у перших клієнтів",
          "Моніторинг та оптимізація",
        ],
        en: [
          "Produce pilot batch (10 units)",
          "Deploy to first customers",
          "Monitor and optimize",
        ],
      },
    },
    {
      phase: { uk: "TRL 8", en: "TRL 8" },
      title: {
        uk: "Захист та Кваліфікація",
        en: "Protection and qualification",
      },
      subtitle: {
        uk: "Отримання захисту торгової марки та сертифікація",
        en: "Trademark protection and certification",
      },
      status: "planned",
      date: "Q3 2025",
      achievements: {
        uk: [
          "Реєстрація торгової марки",
          "Отримання сертифікатів якості",
          "Патентний захист технології",
        ],
        en: [
          "Trademark registration",
          "Quality certifications",
          "Patent protection",
        ],
      },
    },
    {
      phase: { uk: "Масштабування", en: "Scaling" },
      title: { uk: "Серійне виробництво", en: "Serial production" },
      subtitle: {
        uk: "Запуск повномасштабного виробництва та продажів",
        en: "Launch full-scale production and sales",
      },
      status: "planned",
      date: "Q4 2025 - 2026",
      achievements: {
        uk: [
          "Налагодження серійного виробництва",
          "Розгортання каналів продажу",
          "Досягнення 100+ установок",
        ],
        en: [
          "Ramp serial production",
          "Roll out sales channels",
          "Achieve 100+ installs",
        ],
      },
    },
  ];

  return (
    <section id="roadmap" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Дорожна карта" : "Roadmap"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Поетапний розвиток від прототипу до серійного виробництва"
              : "Step-by-step progress from prototype to mass production"}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary/20 transform -translate-x-1/2" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => {
              const isEven = index % 2 === 0;
              let StatusIcon;
              let statusColor;
              let statusBg;

              if (item.status === "completed") {
                StatusIcon = CheckCircle2;
                statusColor = "text-green-600";
                statusBg = "bg-green-100";
              } else if (item.status === "in-progress") {
                StatusIcon = Clock;
                statusColor = "text-secondary";
                statusBg = "bg-secondary/10";
              } else {
                StatusIcon = Circle;
                statusColor = "text-foreground/30";
                statusBg = "bg-muted";
              }

              return (
                <div
                  key={index}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className={`w-6 h-6 ${statusBg} rounded-full border-4 border-white flex items-center justify-center`}
                    >
                      <StatusIcon size={14} className={statusColor} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? "md:text-right" : "md:col-start-2"}>
                    <div
                      className={`inline-block ${
                        isEven ? "md:mr-0 md:ml-auto" : ""
                      }`}
                    >
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 ${statusBg} ${statusColor} text-sm rounded-full`}
                        >
                          {lang === "uk" ? item.phase.uk : item.phase.en}
                        </span>
                        <span className="text-sm text-foreground/60">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-2xl text-primary mb-2">
                        {lang === "uk" ? item.title.uk : item.title.en}
                      </h3>
                      <p className="text-foreground/70 mb-4">
                        {lang === "uk" ? item.subtitle.uk : item.subtitle.en}
                      </p>
                    </div>
                  </div>

                  {/* Achievements card */}
                  <div className={isEven ? "md:col-start-2" : "md:col-start-1"}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                      <ul className="space-y-2">
                        {(lang === "uk"
                          ? item.achievements.uk
                          : item.achievements.en
                        ).map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-foreground/80">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle2 className="text-green-600 mx-auto mb-3" size={32} />
            <div className="text-3xl text-green-600 mb-2">2</div>
            <div className="text-foreground/70">
              {lang === "uk" ? "Завершені етапи" : "Completed phases"}
            </div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center">
            <Clock className="text-secondary mx-auto mb-3" size={32} />
            <div className="text-3xl text-secondary mb-2">1</div>
            <div className="text-foreground/70">
              {lang === "uk" ? "Поточний етап" : "Current phase"}
            </div>
          </div>
          <div className="bg-muted border border-border rounded-xl p-6 text-center">
            <Circle className="text-foreground/40 mx-auto mb-3" size={32} />
            <div className="text-3xl text-foreground/60 mb-2">3</div>
            <div className="text-foreground/70">
              {lang === "uk" ? "Заплановані етапи" : "Planned phases"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
