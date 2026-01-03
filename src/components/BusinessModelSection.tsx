import { Settings, ShoppingBag, Hammer, Award } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";

export function BusinessModelSection() {
  const { lang } = useLanguage();

  const modelItems = [
    {
      icon: Settings,
      title: { uk: "Аналітика місцевості", en: "Location Analytics" },
      description: {
        uk: "Ми проводимо аналіз вітрового потенціалу місцевості, щоб на 100% підтвердити окупність інвестиції клієнта.",
        en: "We analyze the wind potential of a location to 100% confirm the client's investment payback.",
      },
    },
    {
      icon: ShoppingBag,
      title: { uk: "Продаж", en: "Sales" },
      description: {
        uk: "Ми надаємо професійну допомогу та пропонуємо найкраще рішення для ваших потреб.",
        en: "We provide professional assistance and offer the best solution for your needs.",
      },
    },
    {
      icon: Hammer,
      title: { uk: "Встановлення", en: "Installation" },
      description: {
        uk: "Ми виконуємо монтаж швидко, точно та відповідно до всіх технічних вимог.",
        en: "We perform installation quickly, accurately, and according to all technical requirements.",
      },
    },
    {
      icon: Award,
      title: { uk: "Сервіс", en: "Service" },
      description: {
        uk: "Ми гарантуємо довгострокову підтримку та регулярне технічне обслуговування.",
        en: "We guarantee long-term support and regular maintenance.",
      },
    },
  ];

  const channels = [
    {
      title: {
        uk: "Прямі продажі через сайт з формою заявки",
        en: "Direct sales through website with application form",
      },
      description: {
        uk: "– основний канал, низькі витрати.",
        en: "– main channel, low costs.",
      },
    },
    {
      title: {
        uk: "B2B-партнерства (агрокомпанії, малі бізнеси)",
        en: "B2B partnerships (agricultural companies, small businesses)",
      },
      description: {
        uk: "– великі обсяги продажів, середні витрати.",
        en: "– large sales volumes, medium costs.",
      },
    },
    {
      title: {
        uk: "Дистриб'ютори обладнання в ВДЕ",
        en: "Renewable energy equipment distributors",
      },
      description: {
        uk: "– вхід на готову мережу клієнтів (комісія партнерам).",
        en: "– access to ready-made client network (partner commission).",
      },
    },
    {
      title: {
        uk: "Маркетплейси (Prom.ua, OLX Pro, Rozetka Business)",
        en: "Marketplaces (Prom.ua, OLX Pro, Rozetka Business)",
      },
      description: {
        uk: "– додатковий канал.",
        en: "– additional channel.",
      },
    },
  ];

  return (
    <section
      id="business"
      className="relative py-16 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Бізнес-модель" : "Business Model"}
          </h2>
          <p className="text-l text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Комплексний підхід від аналітики до сервісу"
              : "Comprehensive approach from analytics to service"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modelItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-6 flex-1 flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 rounded-xl text-white flex items-center justify-center shadow-md mb-4"
                      style={{
                        background: "linear-gradient(135deg, #144073, #1A6DCC)",
                      }}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="text-lg text-slate-900 font-semibold mb-3">
                      {lang === "uk" ? item.title.uk : item.title.en}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lang === "uk"
                        ? item.description.uk
                        : item.description.en}
                    </p>
                  </div>
                  <div
                    className="h-1 mt-auto opacity-70 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(90deg, #144073, #1A6DCC, #144073)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((channel, index) => (
              <div key={index} className="relative">
                <div className="h-full rounded-xl bg-gradient-to-br from-[#144073] to-[#1A6DCC] p-6 text-white shadow-lg">
                  <p className="font-semibold mb-2 text-sm leading-tight">
                    {lang === "uk" ? channel.title.uk : channel.title.en}
                  </p>
                  <p className="text-xs text-white/90">
                    {lang === "uk"
                      ? channel.description.uk
                      : channel.description.en}
                  </p>
                </div>
                {index < channels.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="#1A6DCC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
