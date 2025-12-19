import { Users2, TrendingUp, Globe, Handshake } from "lucide-react";

export function MarketingSection() {
  const strategies = [
    {
      icon: Globe,
      title: "Онлайн-маркетинг",
      tactics: [
        "SEO-оптимізація та контент-маркетинг",
        "Таргетована реклама на LinkedIn та Facebook",
        "Email-кампанії для B2B сегменту",
      ],
    },
    {
      icon: Handshake,
      title: "Партнерства",
      tactics: [
        "Співпраця з енергетичними консультантами",
        "Партнерство з будівельними компаніями",
        "Інтеграція з платформами зеленого фінансування",
      ],
    },
    {
      icon: Users2,
      title: "Освітні програми",
      tactics: [
        "Вебінари про енергонезалежність",
        "Кейс-стаді успішних впроваджень",
        "Участь у галузевих конференціях",
      ],
    },
    {
      icon: TrendingUp,
      title: "Прямі продажі",
      tactics: [
        "Команда B2B-менеджерів",
        "Персоналізовані пропозиції",
        "Демо-інсталяції для потенційних клієнтів",
      ],
    },
  ];

  const channels = [
    { name: "Онлайн-канали", budget: "35%", color: "bg-secondary" },
    { name: "Прямі продажі", budget: "30%", color: "bg-primary" },
    { name: "Партнерства", budget: "20%", color: "bg-chart-3" },
    { name: "Івенти та виставки", budget: "15%", color: "bg-chart-4" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            Стратегія маркетингу
          </h2>
          <p className="text-xl text-foreground/80">
            Комплексний підхід до залучення клієнтів
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
                  <h3 className="text-2xl text-primary">{strategy.title}</h3>
                </div>
                <ul className="space-y-3">
                  {strategy.tactics.map((tactic, i) => (
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
            Розподіл маркетингового бюджету
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
                <div className="text-white/80">{channel.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-white mb-2">500+</div>
              <div className="text-white/80">Цільових лідів щомісяця</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">15%</div>
              <div className="text-white/80">Конверсія ліда в клієнта</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">$200</div>
              <div className="text-white/80">Середня вартість залучення</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
