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
      className="py-24 bg-gradient-to-br from-primary to-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            {lang === "uk" ? "ESG модель бізнесу" : "ESG business model"}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Ми дотримуємося ESG-підходу, орієнтованого на сталий розвиток"
              : "We follow an ESG-first approach focused on sustainable growth"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {esgItems.map((item, index) => {
            const Icon = item.icon;
            const points = lang === "uk" ? item.points.uk : item.points.en;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl text-white mb-2">
                  {lang === "uk" ? item.title.uk : item.title.en}
                </h3>
                <p className="text-white/80 mb-6">
                  {lang === "uk" ? item.subtitle.uk : item.subtitle.en}
                </p>
                <ul className="space-y-3">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start text-white/90">
                      <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
