import { DollarSign, Package, Repeat, Users } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function BusinessModelSection() {
  const { lang } = useLanguage();

  const revenueStreams = [
    {
      icon: Package,
      title: { uk: "Прямі продажі", en: "Direct sales" },
      description: {
        uk: "Продаж вітрогенераторів з повним циклом встановлення та налаштування",
        en: "Turbine sales with full installation and commissioning",
      },
      revenue: "60%",
    },
    {
      icon: Repeat,
      title: { uk: "Сервісне обслуговування", en: "Service" },
      description: {
        uk: "Річні контракти на технічне обслуговування та моніторинг систем",
        en: "Annual maintenance and monitoring contracts",
      },
      revenue: "25%",
    },
    {
      icon: Users,
      title: { uk: "Консалтинг", en: "Consulting" },
      description: {
        uk: "Аудит енергоефективності та розробка стратегій переходу на відновлювану енергію",
        en: "Energy efficiency audits and transition strategy design",
      },
      revenue: "10%",
    },
    {
      icon: DollarSign,
      title: { uk: "Лізинг та фінансування", en: "Leasing & financing" },
      description: {
        uk: "Програми оренди та розстрочки для малого та середнього бізнесу",
        en: "Lease and installment programs for SMBs",
      },
      revenue: "5%",
    },
  ];

  const costs = [
    {
      category: { uk: "Виробництво", en: "Manufacturing" },
      percentage: 40,
      amount: "40%",
    },
    {
      category: { uk: "Маркетинг та продажі", en: "Marketing & Sales" },
      percentage: 25,
      amount: "25%",
    },
    { category: { uk: "R&D", en: "R&D" }, percentage: 15, amount: "15%" },
    {
      category: { uk: "Операційні витрати", en: "Operations" },
      percentage: 12,
      amount: "12%",
    },
    { category: { uk: "Інше", en: "Other" }, percentage: 8, amount: "8%" },
  ];

  return (
    <section id="business" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Бізнес-модель" : "Business model"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Диверсифіковані потоки доходів та оптимізована структура витрат"
              : "Diversified revenue streams and optimized cost structure"}
          </p>
        </div>

        {/* Revenue Streams */}
        <div className="mb-16">
          <h3 className="text-3xl text-primary mb-8 text-center">
            {lang === "uk" ? "Потоки доходів" : "Revenue streams"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStreams.map((stream, index) => {
              const Icon = stream.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-border relative overflow-hidden group hover:shadow-xl transition-all"
                >
                  <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 rounded-bl-xl">
                    {stream.revenue}
                  </div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="text-secondary" size={24} />
                  </div>
                  <h4 className="text-lg text-primary mb-2">
                    {lang === "uk" ? stream.title.uk : stream.title.en}
                  </h4>
                  <p className="text-sm text-foreground/70">
                    {lang === "uk"
                      ? stream.description.uk
                      : stream.description.en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Structure */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-3xl text-primary mb-8 text-center">
            {lang === "uk" ? "Структура витрат" : "Cost structure"}
          </h3>
          <div className="space-y-4">
            {costs.map((cost, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">
                    {lang === "uk" ? cost.category.uk : cost.category.en}
                  </span>
                  <span className="text-secondary">{cost.amount}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000"
                    style={{ width: `${cost.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-4xl text-secondary mb-2">45%</div>
              <div className="text-foreground/70">
                {lang === "uk" ? "Валова маржа" : "Gross margin"}
              </div>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-4xl text-secondary mb-2">3-5 років</div>
              <div className="text-foreground/70">
                {lang === "uk" ? "Окупність для клієнта" : "Payback for client"}
              </div>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-4xl text-secondary mb-2">18 міс</div>
              <div className="text-foreground/70">
                {lang === "uk" ? "Break-even point" : "Break-even point"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
