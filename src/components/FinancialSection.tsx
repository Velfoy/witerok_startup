import { useLanguage } from "../contexts/LanguageContext";

export function FinancialSection() {
  const { lang } = useLanguage();

  const metrics = [
    {
      label: { uk: "Маржинальність", en: "Margin" },
      value: "17,5 %",
    },
    {
      label: { uk: "Рентабельність", en: "Profitability" },
      value: "38,97 %",
    },
    {
      label: { uk: "Період окупності", en: "Payback" },
      value: "3 місяці / 3 months",
    },
  ];

  const financialBreakdown = [
    {
      label: { uk: "Прибуток до сплати податків", en: "Pre-tax profit" },
      value: "28,058,000 ₴",
    },
    {
      label: { uk: "Податки", en: "Taxes" },
      value: "7,853,000 ₴",
    },
    {
      label: { uk: "Чистий прибуток", en: "Net profit" },
      value: "20,205,000 ₴",
    },
  ];

  return (
    <section
      id="financial"
      className="relative py-6 pb-20 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Фінансова модель" : "Financial Model"}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "*Прогнозовані результати діяльності за перші 6 місяців з моменту запуску бізнесу"
              : "*Forecasted results for the first 6 months after business launch"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => {
            return (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md font-bold text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #144073, #1A6DCC)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex flex-col">
                        <p
                          className="text-xs uppercase tracking-[0.2em]"
                          style={{ color: "#1A6DCC" }}
                        >
                          {lang === "uk" ? metric.label.uk : metric.label.en}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-l text-slate-900 font-semibold">
                      {metric.value}
                    </h3>
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

        <div className="rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-8">
          <h3 className="text-2xl text-slate-900 font-semibold mb-6">
            {lang === "uk" ? "Розбивка прибутку" : "Profit breakdown"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialBreakdown.map((item, index) => (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md font-bold text-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #144073, #1A6DCC)",
                        }}
                      >
                        {index + 1}
                      </div>
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: "#1A6DCC" }}
                      >
                        {lang === "uk" ? item.label.uk : item.label.en}
                      </p>
                    </div>
                    <p className="text-l text-slate-900 font-semibold">
                      {item.value}
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
