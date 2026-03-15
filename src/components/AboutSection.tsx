import { useLanguage } from "../hooks/useLanguage.js";

export function AboutSection() {
  const { lang } = useLanguage();

  const copy = {
    heading: {
      uk: "Про нас",
      en: "About Us",
    },
    tagline: {
      uk: "Команда інженерів, дизайнерів та експертів з енергетики, що працює над створенням чистого енергетичного майбутнього для України.",
      en: "A team of engineers, designers and energy experts working to create a clean energy future for Ukraine.",
    },
    pillars: [
      {
        title: { uk: "Місія", en: "Mission" },
        text: {
          uk: "Зробити кожен будинок та підприємство енергетично незалежним через доступ до чистої вітрової енергії.",
          en: "Make every home and business energy independent through access to clean wind energy.",
        },
      },
      {
        title: { uk: "Продукт", en: "Product" },
        text: {
          uk: "Безлопатеві вітрові установки для дахів, терас та віддалених місцевостей з простою інтеграцією.",
          en: "Bladeless wind turbines for roofs, terraces and remote areas with easy integration.",
        },
      },
      {
        title: { uk: "Цінність", en: "Value" },
        text: {
          uk: "Інноваційні технології для сталого розвитку та збереження планети для майбутніх поколінь.",
          en: "Innovative technologies for sustainable development and preserving the planet for future generations.",
        },
      },
    ],
  };

  return (
    <section id="about" className="relative py-20 md:py-24 min-h-[450px]">
      <div
        className="section-surface max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-white drop-shadow mb-4">
            {lang === "uk" ? copy.heading.uk : copy.heading.en}
          </h2>
          <p className="text-lg text-white/90 drop-shadow-sm max-w-3xl mx-auto">
            {lang === "uk" ? copy.tagline.uk : copy.tagline.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map((pillar) => (
            <div
              key={pillar.title.uk}
              className="p-6 rounded-2xl border border-white/20 bg-white/8 backdrop-blur-sm hover:bg-white/12 hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl text-white mb-2 drop-shadow">
                {lang === "uk" ? pillar.title.uk : pillar.title.en}
              </h3>
              <p className="text-white/90">
                {lang === "uk" ? pillar.text.uk : pillar.text.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
