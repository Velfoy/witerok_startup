import { Zap, MapPin, Calculator, Wind, Car } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function CompetitiveSection() {
  const { lang } = useLanguage();

  const advantages = [
    {
      icon: Zap,
      title: { uk: "Унікальна ефективність", en: "Unique Efficiency" },
      description: {
        uk: "Завдяки лопатям у формі золотої спіралі з системою жалюзів.",
        en: "Thanks to golden spiral blades with a louver system.",
      },
    },
    {
      icon: MapPin,
      title: {
        uk: "Доступність і мобільність",
        en: "Accessibility & Mobility",
      },
      description: {
        uk: "Сегментована конструкція, ціна $2000 та простий монтаж.",
        en: "Segmented design, $2000 price, and simple installation.",
      },
    },
    {
      icon: Calculator,
      title: { uk: "Розумний вибір місця", en: "Smart Location Choice" },
      description: {
        uk: "Калькулятор вітрового потенціалу за вашою геолокацією: окупність, генерація.",
        en: "Wind potential calculator for your location: payback, generation.",
      },
    },
  ];

  const impact = [
    {
      icon: Wind,
      title: {
        uk: "Очікуване вироблення енергії 2026-2031",
        en: "Expected Energy Production 2026-2031",
      },
      value: { uk: "11,500 ГВт·год/рік", en: "11,500 GWh/year" },
      subtitle: {
        uk: "(еквівалент понад 1250 турбінам)",
        en: "(equivalent to over 1250 turbines)",
      },
    },
    {
      icon: Car,
      title: {
        uk: "Зменшення викидів CO₂ 2026-2031",
        en: "CO₂ Emissions Reduction 2026-2031",
      },
      value: { uk: "1,7 млн тон", en: "1.7 million tons" },
      subtitle: {
        uk: "(наприклад, на 370,000+ менше автомобілів на дорогах)",
        en: "(e.g., 370,000+ fewer cars on the roads)",
      },
    },
  ];

  return (
    <section
      id="advantages"
      className="relative py-16 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Конкурентні переваги" : "Competitive Advantages"}
          </h2>

          <p className="text-base text-slate-500 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Мобільна вітроенергія нового покоління — просто, тихо, надійно."
              : "New generation mobile wind energy — simple, quiet, reliable."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Advantages Column */}
          <div className="space-y-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden"
                >
                  <div className="p-6 flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #144073, #1A6DCC)",
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-slate-900 font-semibold mb-2">
                        {lang === "uk"
                          ? advantage.title.uk
                          : advantage.title.en}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {lang === "uk"
                          ? advantage.description.uk
                          : advantage.description.en}
                      </p>
                    </div>
                  </div>
                  <div
                    className="h-1 mt-auto opacity-70 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(90deg, #144073, #1A6DCC, #144073)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Impact Column */}
          <div className="space-y-6">
            {impact.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl bg-gradient-to-br from-[#1A6DCC] to-[#144073] border border-white/20 shadow-[0_12px_32px_rgba(26,109,204,0.25)] hover:shadow-[0_16px_40px_rgba(26,109,204,0.35)] transition text-white p-10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={28} className="text-white/90" />
                    <h3 className="text-base font-medium text-white/90">
                      {lang === "uk" ? item.title.uk : item.title.en}
                    </h3>
                  </div>
                  <div className="text-4xl font-bold mb-2 drop-shadow-lg">
                    {lang === "uk" ? item.value.uk : item.value.en}
                  </div>
                  <p className="text-white/80 text-sm">
                    {lang === "uk" ? item.subtitle.uk : item.subtitle.en}
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
