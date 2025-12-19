import { CheckCircle2, Circle, Clock } from "lucide-react";

export function RoadmapSection() {
  const roadmapItems = [
    {
      phase: "TRL 4",
      title: "Підтвердження Концепції",
      subtitle: "Лабораторні випробування Прототипу №1",
      status: "completed",
      date: "Q1 2024",
      achievements: [
        "Розробка базового прототипу",
        "Лабораторні тести ефективності",
        "Підтвердження технічної концепції",
      ],
    },
    {
      phase: "TRL 5",
      title: "Повнофункціональний Прототип",
      subtitle:
        "Створення Прототипу №2 та тестування в релевантному середовищі",
      status: "completed",
      date: "Q2-Q3 2024",
      achievements: [
        "Оптимізація конструкції",
        "Польові випробування",
        "Валідація в реальних умовах",
      ],
    },
    {
      phase: "TRL 6",
      title: "Демонстрація Системи",
      subtitle: "Демонстрація Прототипу №3 бенефіціару",
      status: "in-progress",
      date: "Q4 2024",
      achievements: [
        "Створення фінальної версії прототипу",
        "Демонстрація клієнтам",
        "Збір зворотного зв'язку",
      ],
    },
    {
      phase: "TRL 7",
      title: "Пілотна Партія та Експлуатація",
      subtitle: "Тривала експлуатація Прототипу №4 в операційному середовищі",
      status: "planned",
      date: "Q1-Q2 2025",
      achievements: [
        "Виробництво пілотної партії (10 од.)",
        "Встановлення у перших клієнтів",
        "Моніторинг та оптимізація",
      ],
    },
    {
      phase: "TRL 8",
      title: "Захист та Кваліфікація",
      subtitle: "Отримання захисту торгової марки та сертифікація",
      status: "planned",
      date: "Q3 2025",
      achievements: [
        "Реєстрація торгової марки",
        "Отримання сертифікатів якості",
        "Патентний захист технології",
      ],
    },
    {
      phase: "Масштабування",
      title: "Серійне виробництво",
      subtitle: "Запуск повномасштабного виробництва та продажів",
      status: "planned",
      date: "Q4 2025 - 2026",
      achievements: [
        "Налагодження серійного виробництва",
        "Розгортання каналів продажу",
        "Досягнення 100+ установок",
      ],
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            Дорожна карта
          </h2>
          <p className="text-xl text-foreground/80">
            Поетапний розвиток від прототипу до серійного виробництва
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
                          {item.phase}
                        </span>
                        <span className="text-sm text-foreground/60">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-2xl text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">{item.subtitle}</p>
                    </div>
                  </div>

                  {/* Achievements card */}
                  <div className={isEven ? "md:col-start-2" : "md:col-start-1"}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-border">
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, i) => (
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
            <div className="text-foreground/70">Завершені етапи</div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center">
            <Clock className="text-secondary mx-auto mb-3" size={32} />
            <div className="text-3xl text-secondary mb-2">1</div>
            <div className="text-foreground/70">Поточний етап</div>
          </div>
          <div className="bg-muted border border-border rounded-xl p-6 text-center">
            <Circle className="text-foreground/40 mx-auto mb-3" size={32} />
            <div className="text-3xl text-foreground/60 mb-2">3</div>
            <div className="text-foreground/70">Заплановані етапи</div>
          </div>
        </div>
      </div>
    </section>
  );
}
