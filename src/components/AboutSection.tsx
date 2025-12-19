import { useLanguage } from "../contexts/LanguageContext";

export function AboutSection() {
  const { lang } = useLanguage();

  const copy = {
    heading: {
      uk: "Про нас",
      en: "About Us",
    },
    tagline: {
      uk: "WITERoK — український стартап, що створює компактні вітрогенератори для енергонезалежності бізнесу та громад.",
      en: "WITERoK is a Ukrainian startup building compact wind turbines to unlock energy independence for businesses and communities.",
    },
    pillars: [
      {
        title: { uk: "Місія", en: "Mission" },
        text: {
          uk: "Доступна чиста енергія для кожного бізнесу та громади.",
          en: "Make clean energy accessible to every business and community.",
        },
      },
      {
        title: { uk: "Фокус", en: "Focus" },
        text: {
          uk: "Вертикальні вітрогенератори, що працюють при вітрі від 3 м/с і встановлюються за 2–4 тижні.",
          en: "Vertical turbines that work from 3 m/s wind and install in 2–4 weeks.",
        },
      },
      {
        title: { uk: "Цінність", en: "Value" },
        text: {
          uk: "Прозора економіка, онлайн-калькулятор окупності та відкритий сервісний супровід.",
          en: "Transparent economics, an online payback calculator, and open service support.",
        },
      },
    ],
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? copy.heading.uk : copy.heading.en}
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            {lang === "uk" ? copy.tagline.uk : copy.tagline.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map((pillar) => (
            <div
              key={pillar.title.uk}
              className="p-6 rounded-2xl border border-border bg-muted hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl text-primary mb-2">
                {lang === "uk" ? pillar.title.uk : pillar.title.en}
              </h3>
              <p className="text-foreground/80">
                {lang === "uk" ? pillar.text.uk : pillar.text.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
