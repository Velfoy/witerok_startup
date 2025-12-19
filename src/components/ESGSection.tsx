import { Leaf, Users, FileCheck } from "lucide-react";

export function ESGSection() {
  const esgItems = [
    {
      icon: Leaf,
      title: "E (Environmental)",
      subtitle: "Екологічна відповідальність",
      points: [
        "Зменшення викидів CO₂ на 1,5 т/рік з одного вітрогенератора",
        "Генерація чистої енергії без шкідливих викидів",
        "Використання локальних і вторинних матеріалів",
      ],
    },
    {
      icon: Users,
      title: "S (Social)",
      subtitle: "Соціальний вплив",
      points: [
        "Підвищення енергонезалежності громад і бізнесу",
        "Освітні кампанії з енергонезалежності",
        "Створення нових робочих місць",
      ],
    },
    {
      icon: FileCheck,
      title: "G (Governance)",
      subtitle: "Корпоративне управління",
      points: [
        "Прозора звітність і відкриті технічні метрики",
        "Впровадження публічного аудиту впливу",
        "Впровадження відкритого калькулятора вітрової ефективності",
      ],
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-primary to-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            ESG модель бізнесу
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ми дотримуємося ESG-підходу, орієнтованого на сталий розвиток
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {esgItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl text-white mb-2">{item.title}</h3>
                <p className="text-white/80 mb-6">{item.subtitle}</p>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
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
