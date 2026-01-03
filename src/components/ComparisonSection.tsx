import { useLanguage } from "../hooks/useLanguage.js";

export function ComparisonSection() {
  const { lang } = useLanguage();

  const metrics = [
    {
      label: { uk: "Термін служби, роки", en: "Lifetime, years" },
      solar: "25-30",
      verticalWind: "15-25",
      capacity: "10",
      dizell: "<5",
    },
    {
      label: { uk: "Початкові інвестиції, $", en: "Initial Investment, $" },
      solar: "1200",
      verticalWind: "16800",
      capacity: "6500",
      dizell: "900+7500*",
    },
    {
      label: { uk: "Вартість 1 KW, $", en: "Cost per 1 KW, $" },
      solar: "350",
      verticalWind: "8400",
      capacity: "700",
      dizell: "325",
    },
    {
      label: { uk: "Вартість обслуговування, $", en: "Maintenance Cost, $" },
      solar: "25",
      verticalWind: "50",
      capacity: "0",
      dizell: "50",
    },
    {
      label: { uk: "ROI, роки", en: "ROI, years" },
      solar: "1,3",
      verticalWind: "4,3",
      capacity: "-",
      dizell: "-",
    },
    {
      label: {
        uk: "Вартість додаткового обладнання, $",
        en: "Additional Equipment Cost, $",
      },
      solar: "1050",
      verticalWind: "1050",
      capacity: "3200",
      dizell: "0",
    },
    {
      label: { uk: "Площа, м²", en: "Area, m²" },
      solar: "25",
      verticalWind: "2,5",
      capacity: "0,5",
      dizell: "0,55",
    },
    {
      label: { uk: "Ефективність, %", en: "Efficiency, %" },
      solar: "20-25",
      verticalWind: "15-20",
      capacity: "90-95",
      dizell: "35",
    },
  ];

  return (
    <section
      id="comparison"
      className="relative py-16 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "Конкурентний аналіз" : "Competitive Analysis"}
          </h2>
          <p className="text-base text-slate-500 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Порівняння різних енергетичних рішень за ключовими показниками"
              : "Comparison of different energy solutions by key metrics"}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#144073] to-[#1A6DCC]">
                  <th className="px-6 py-4 text-left text-white font-semibold"></th>
                  <th className="px-6 py-4 text-center text-white font-semibold">
                    Solar
                  </th>
                  <th className="px-6 py-4 text-center text-white font-semibold">
                    {lang === "uk" ? "Вертикальний вітер" : "Vertical Wind"}
                  </th>
                  <th className="px-6 py-4 text-center text-white font-semibold">
                    Capacity
                  </th>
                  <th className="px-6 py-4 text-center text-white font-semibold">
                    Dizell
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, index) => (
                  <tr
                    key={index}
                    className={`border-t border-slate-200 ${
                      index % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                    } hover:bg-blue-50/30 transition`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#144073]">
                      {lang === "uk" ? metric.label.uk : metric.label.en}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-700 font-medium">
                      {metric.solar}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-700 font-medium">
                      {metric.verticalWind}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-700 font-medium">
                      {metric.capacity}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-700 font-medium">
                      {metric.dizell}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
