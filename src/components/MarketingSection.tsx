import { useLanguage } from "../contexts/LanguageContext";

export function MarketingSection() {
  const { lang } = useLanguage();

  const marketingItems = [
    {
      title: {
        uk: "Організація та проведення інтерв'ювань клієнтів, тестові рекламні кампанії",
        en: "Organization and conduct of client interviews, test advertising campaigns",
      },
      description: {
        uk: "Збір даних про потреби та очікування цільової аудиторії",
        en: "Gathering data on target audience needs and expectations",
      },
    },
    {
      title: {
        uk: "Участь у виставці (Agro / Energy)",
        en: "Participation in exhibitions (Agro / Energy)",
      },
      description: {
        uk: "Демонстрація продукту та встановлення контактів з потенційними клієнтами",
        en: "Product demonstration and networking with potential clients",
      },
    },
    {
      title: {
        uk: "Тестові рекламні кампанії на сайті WITERoK та сайтах партнерів",
        en: "Test advertising campaigns on WITERoK website and partner sites",
      },
      description: {
        uk: "Аналіз ефективності різних каналів залучення клієнтів",
        en: "Analysis of effectiveness of different customer acquisition channels",
      },
    },
  ];

  const growthData = [
    { period: "2010-2020", percentage: 23.1 },
    { period: "2021", percentage: 17.9 },
    { period: "2022", percentage: 12.8 },
    { period: "2023", percentage: 17.9 },
    { period: "2025", percentage: 2.8 },
  ];

  return (
    <section
      id="marketing"
      className="relative py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Стратегія Маркетингу" : "Marketing Strategy"}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Комплексний підхід до залучення та утримання клієнтів"
              : "Comprehensive approach to customer acquisition and retention"}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {marketingItems.map((item, index) => (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-md text-xl font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #144073, #1A6DCC)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-base text-slate-900 font-semibold leading-tight flex-1">
                        {lang === "uk" ? item.title.uk : item.title.en}
                      </h3>
                    </div>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
