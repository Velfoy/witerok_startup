import { Leaf, Users, FileCheck } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ESGSection() {
  const { lang } = useLanguage();

  const esgItems = [
    {
      icon: Leaf,
      title: { uk: "E (Environmental)", en: "E (Environmental)" },
      subtitle: {
        uk: "Екологічна відповідальність",
        en: "Environmental responsibility",
      },
      points: {
        uk: [
          "Зменшення викидів CO₂ на 1,5 т/рік з одного вітрогенератора",
          "Генерація чистої енергії без шкідливих викидів",
          "Використання локальних і вторинних матеріалів",
        ],
        en: [
          "Cuts CO₂ emissions by 1.5 t/year per turbine",
          "Generates clean energy with zero harmful emissions",
          "Uses local and recycled materials",
        ],
      },
    },
    {
      icon: Users,
      title: { uk: "S (Social)", en: "S (Social)" },
      subtitle: { uk: "Соціальний вплив", en: "Social impact" },
      points: {
        uk: [
          "Підвищення енергонезалежності громад і бізнесу",
          "Освітні кампанії з енергонезалежності",
          "Створення нових робочих місць",
        ],
        en: [
          "Boosts energy independence for communities and businesses",
          "Educational campaigns on energy autonomy",
          "Creates new jobs",
        ],
      },
    },
    {
      icon: FileCheck,
      title: { uk: "G (Governance)", en: "G (Governance)" },
      subtitle: { uk: "Корпоративне управління", en: "Governance" },
      points: {
        uk: [
          "Прозора звітність і відкриті технічні метрики",
          "Впровадження публічного аудиту впливу",
          "Впровадження відкритого калькулятора вітрової ефективності",
        ],
        en: [
          "Transparent reporting and open technical metrics",
          "Public impact audits",
          "Open wind efficiency calculator",
        ],
      },
    },
  ];

  return (
    <section
      id="esg"
      className="relative py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk" ? "ESG модель бізнесу" : "ESG business model"}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Стійкість, прозорість та позитивний вплив закладені в продукті"
              : "Sustainability, transparency, and positive impact are built into the product"}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esgItems.map((item, index) => {
              const Icon = item.icon;
              const points = lang === "uk" ? item.points.uk : item.points.en;
              return (
                <div key={index} className="h-full">
                  <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-col gap-3 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #144073, #1A6DCC)",
                          }}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex flex-col">
                          <p
                            className="text-xs uppercase tracking-[0.2em]"
                            style={{ color: "#1A6DCC" }}
                          >
                            {lang === "uk"
                              ? item.subtitle.uk
                              : item.subtitle.en}
                          </p>
                          <h3 className="text-xl text-slate-900 font-semibold">
                            {lang === "uk" ? item.title.uk : item.title.en}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {points.map((point, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 rounded-md text-sm"
                            style={{
                              background: "#F1F5F9",
                              color: "#144073",
                              border: "1px solid rgba(20,64,115,0.2)",
                            }}
                          >
                            {point}
                          </span>
                        ))}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
