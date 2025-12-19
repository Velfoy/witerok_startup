import { Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function TeamSection() {
  const { lang } = useLanguage();

  const team = [
    {
      name: { uk: "Олександр Коваленко", en: "Oleksandr Kovalenko" },
      position: { uk: "CEO & Co-Founder", en: "CEO & Co-Founder" },
      bio: {
        uk: "15 років у відновлюваній енергетиці. Раніше - Head of Business Development у провідній енергетичній компанії",
        en: "15 years in renewable energy. Former Head of Business Development at a leading energy company.",
      },
      skills: {
        uk: ["Стратегія", "Продажі", "Енергетика"],
        en: ["Strategy", "Sales", "Energy"],
      },
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      name: { uk: "Марія Петренко", en: "Maria Petrenko" },
      position: { uk: "CTO & Co-Founder", en: "CTO & Co-Founder" },
      bio: {
        uk: "PhD в галузі інженерії. 10 років досвіду розробки вітрових технологій у міжнародних компаніях",
        en: "PhD in engineering. 10 years building wind tech in international companies.",
      },
      skills: {
        uk: ["R&D", "Інженерія", "Інновації"],
        en: ["R&D", "Engineering", "Innovation"],
      },
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      name: { uk: "Дмитро Шевченко", en: "Dmytro Shevchenko" },
      position: { uk: "Head of Operations", en: "Head of Operations" },
      bio: {
        uk: "Експерт у виробництві та логістиці. Досвід масштабування виробничих процесів у стартапах",
        en: "Manufacturing and logistics expert. Scaled production in multiple startups.",
      },
      skills: {
        uk: ["Виробництво", "Логістика", "Оптимізація"],
        en: ["Manufacturing", "Logistics", "Optimization"],
      },
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      name: { uk: "Анна Іваненко", en: "Anna Ivanenko" },
      position: { uk: "Head of Marketing", en: "Head of Marketing" },
      bio: {
        uk: "10 років у B2B маркетингу. Успішний досвід виведення технологічних продуктів на ринок",
        en: "10 years in B2B marketing. Led multiple tech product launches.",
      },
      skills: {
        uk: ["Маркетинг", "Брендинг", "B2B"],
        en: ["Marketing", "Branding", "B2B"],
      },
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    },
  ];

  return (
    <section id="team" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Команда" : "Team"}
          </h2>
          <p className="text-xl text-foreground/80">
            {lang === "uk"
              ? "Досвідчені професіонали з різних галузей"
              : "Experienced professionals from multiple domains"}
          </p>
        </div>

        {/* Core Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={lang === "uk" ? member.name.uk : member.name.en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-primary mb-1">
                  {lang === "uk" ? member.name.uk : member.name.en}
                </h3>
                <p className="text-secondary mb-4">
                  {lang === "uk" ? member.position.uk : member.position.en}
                </p>
                <p className="text-sm text-foreground/70 mb-4">
                  {lang === "uk" ? member.bio.uk : member.bio.en}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(lang === "uk" ? member.skills.uk : member.skills.en).map(
                    (skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
                <div className="flex gap-3">
                  <button className="p-2 bg-muted rounded-full hover:bg-secondary/10 transition-colors">
                    <Linkedin size={18} className="text-secondary" />
                  </button>
                  <button className="p-2 bg-muted rounded-full hover:bg-secondary/10 transition-colors">
                    <Mail size={18} className="text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        {/* We're Hiring */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl mb-4">
            {lang === "uk" ? "Приєднуйся до команди!" : "Join the team!"}
          </h3>
          <p className="mb-6 text-white/90">
            {lang === "uk"
              ? "Ми шукаємо талановитих людей для спільної роботи над енергетичним майбутнім України"
              : "We are hiring talented people to build the energy future together."}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
          >
            {lang === "uk" ? "Дивитися вакансії" : "View openings"}
          </a>
        </div>
      </div>
    </section>
  );
}
