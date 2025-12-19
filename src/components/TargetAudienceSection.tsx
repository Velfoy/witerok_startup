import { Building2, Factory, Home, Sprout } from "lucide-react";

export function TargetAudienceSection() {
  const audiences = [
    {
      icon: Building2,
      title: "Малий та середній бізнес",
      description:
        "Виробничі підприємства, логістичні центри, готелі, торгові центри",
      benefits: [
        "Зниження операційних витрат на 30-70%",
        "Енергонезалежність під час блекаутів",
        "Покращення ESG-показників компанії",
      ],
      color: "secondary",
    },
    {
      icon: Factory,
      title: "Промислові підприємства",
      description: "Виробництва з високим споживанням електроенергії",
      benefits: [
        "Стабільне електропостачання виробництва",
        "Зниження собівартості продукції",
        "Резервне живлення критичних систем",
      ],
      color: "primary",
    },
    {
      icon: Sprout,
      title: "Аграрний сектор",
      description: "Фермерські господарства, тепличні комплекси",
      benefits: [
        "Автономне живлення в польових умовах",
        "Забезпечення роботи систем зрошення",
        "Економія на енергозабезпеченні",
      ],
      color: "secondary",
    },
    {
      icon: Home,
      title: "Громади та кооперативи",
      description: "ОСББ, сільські громади, енергетичні кооперативи",
      benefits: [
        "Колективна енергонезалежність",
        "Зниження комунальних платежів",
        "Створення локальних енергомереж",
      ],
      color: "primary",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            Цільова аудиторія
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            WITERoK створює цінність для різних сегментів ринку
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const bgColor =
              audience.color === "secondary" ? "bg-secondary" : "bg-primary";
            const bgLightColor =
              audience.color === "secondary"
                ? "bg-secondary/10"
                : "bg-primary/10";
            const textColor =
              audience.color === "secondary"
                ? "text-secondary"
                : "text-primary";

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border group"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${bgLightColor} rounded-xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={textColor} size={32} />
                </div>
                <h3 className="text-2xl text-primary mb-2">{audience.title}</h3>
                <p className="text-foreground/70 mb-6">
                  {audience.description}
                </p>
                <div className="space-y-3">
                  {audience.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <div
                        className={`flex-shrink-0 w-6 h-6 ${bgColor} rounded-full flex items-center justify-center mt-0.5`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="ml-3 text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Size */}
        <div className="mt-16 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl mb-6">Розмір ринку в Україні</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl mb-2">50 000+</div>
              <div className="text-white/80">
                Підприємств малого та середнього бізнесу
              </div>
            </div>
            <div>
              <div className="text-5xl mb-2">$2.5 млрд</div>
              <div className="text-white/80">
                Потенційний обсяг ринку до 2030
              </div>
            </div>
            <div>
              <div className="text-5xl mb-2">25%</div>
              <div className="text-white/80">
                Річне зростання попиту на автономну енергію
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
