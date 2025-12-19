import { Users2, TrendingUp, Globe, Handshake } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function MarketingSection() {
  const { lang } = useLanguage();

  const strategies = [
    {
      icon: Globe,
      title: { uk: "Онлайн-маркетинг", en: "Online marketing" },
      tactics: {
        uk: [
          "SEO-оптимізація та контент-маркетинг",
          "Таргетована реклама на LinkedIn та Facebook",
          "Email-кампанії для B2B сегменту",
        ],
        en: [
          "SEO and content marketing",
          "Targeted ads on LinkedIn and Facebook",
          "Email campaigns for B2B",
        ],
      },
    },
    {
      icon: Handshake,
      title: { uk: "Партнерства", en: "Partnerships" },
      tactics: {
        uk: [
          "Співпраця з енергетичними консультантами",
          "Партнерство з будівельними компаніями",
          "Інтеграція з платформами зеленого фінансування",
        ],
        en: [
          "Work with energy consultants",
          "Partnerships with construction firms",
          "Integrations with green finance platforms",
        ],
      },
    },
    {
      icon: Users2,
      title: { uk: "Освітні програми", en: "Education" },
      tactics: {
        uk: [
          "Вебінари про енергонезалежність",
          "Кейс-стаді успішних впроваджень",
          "Участь у галузевих конференціях",
        ],
        en: [
          "Webinars on energy independence",
          "Case studies of deployments",
          "Industry conference talks",
        ],
      },
    },
    {
      icon: TrendingUp,
      title: { uk: "Прямі продажі", en: "Direct sales" },
      tactics: {
        uk: [
          "Команда B2B-менеджерів",
          "Персоналізовані пропозиції",
          "Демо-інсталяції для потенційних клієнтів",
        ],
        en: [
          "B2B sales team",
          "Personalized offers",
          "Demo installations for prospects",
        ],
      },
    },
  ];

  const channels = [
    {
      name: { uk: "Онлайн-канали", en: "Online" },
      budget: "35%",
      color: "bg-secondary",
    },
    {
      name: { uk: "Прямі продажі", en: "Direct sales" },
      budget: "30%",
      color: "bg-primary",
    },
    {
      name: { uk: "Партнерства", en: "Partnerships" },
      budget: "20%",
      color: "bg-chart-3",
    },
    {
      name: { uk: "Івенти та виставки", en: "Events & expos" },
      budget: "15%",
      color: "bg-chart-4",
    },
  ];

  return (
    <section id="marketing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Стратегія маркетингу" : "Marketing strategy"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Комплексний підхід до залучення клієнтів"
              : "A comprehensive approach to customer acquisition"}
          </p>
        </div>

        {/* Marketing Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div
                key={index}
                className="bg-muted rounded-xl p-8 hover:shadow-lg transition-all border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-lg">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <h3 className="text-2xl text-primary">
                    {lang === "uk" ? strategy.title.uk : strategy.title.en}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(lang === "uk"
                    ? strategy.tactics.uk
                    : strategy.tactics.en
                  ).map((tactic, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-foreground/80">{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Marketing Budget Distribution */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl text-white mb-8 text-center">
            {lang === "uk"
              ? "Розподіл маркетингового бюджету"
              : "Marketing budget split"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div
                  className={`w-full h-2 ${channel.color} rounded-full mb-4`}
                />
                <div className="text-3xl text-white mb-2">{channel.budget}</div>
                <div className="text-white/80">
                  {lang === "uk" ? channel.name.uk : channel.name.en}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-white mb-2">500+</div>
              <div className="text-white/80">
                {lang === "uk"
                  ? "Цільових лідів щомісяця"
                  : "Qualified leads monthly"}
              </div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">15%</div>
              <div className="text-white/80">
                {lang === "uk"
                  ? "Конверсія ліда в клієнта"
                  : "Lead-to-customer conversion"}
              </div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">$200</div>
              <div className="text-white/80">
                {lang === "uk" ? "Середня вартість залучення" : "Average CAC"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
