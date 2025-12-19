import { useLanguage } from "../contexts/LanguageContext";

export function AdvisorsSection() {
  const { lang } = useLanguage();

  const advisors = [
    {
      name: {
        uk: "Проф. Володимир Сидоренко",
        en: "Prof. Volodymyr Sydorenko",
      },
      role: { uk: "Технічний радник", en: "Technical Advisor" },
      expertise: {
        uk: "Професор кафедри відновлюваної енергетики КПІ",
        en: "Professor of Renewable Energy, KPI University",
      },
    },
    {
      name: { uk: "Ірина Мельник", en: "Iryna Melnyk" },
      role: { uk: "Бізнес-радник", en: "Business Advisor" },
      expertise: {
        uk: "Ex-директор ЄБРР, експерт з зеленого фінансування",
        en: "Former EBRD director, expert in green finance",
      },
    },
  ];

  const sponsors = [
    {
      name: { uk: "Green Energy Fund", en: "Green Energy Fund" },
      note: {
        uk: "Грант на R&D та перші пілоти",
        en: "Grant for R&D and first pilots",
      },
    },
    {
      name: { uk: "Tech Angels UA", en: "Tech Angels UA" },
      note: {
        uk: "Прісід-інвестиція та менторство",
        en: "Pre-seed investment and mentorship",
      },
    },
  ];

  return (
    <section id="advisors" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl text-primary mb-4">
            {lang === "uk" ? "Спонсори та радники" : "Sponsors & Advisors"}
          </h2>
          <p className="text-lg text-foreground/80">
            {lang === "uk"
              ? "Експерти та партнери, що допомагають масштабуванню"
              : "Experts and partners helping us scale"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
            <div
              key={advisor.name.uk}
              className="p-6 rounded-2xl bg-white shadow-sm border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                  {advisor.name.uk.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl text-primary">
                    {lang === "uk" ? advisor.name.uk : advisor.name.en}
                  </h3>
                  <p className="text-secondary text-sm mb-1">
                    {lang === "uk" ? advisor.role.uk : advisor.role.en}
                  </p>
                  <p className="text-foreground/80 text-sm">
                    {lang === "uk"
                      ? advisor.expertise.uk
                      : advisor.expertise.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-border p-6">
          <h3 className="text-2xl text-primary mb-4">
            {lang === "uk" ? "Спонсори" : "Sponsors"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name.uk} className="p-4 rounded-xl bg-muted">
                <p className="text-lg text-primary">{sponsor.name.en}</p>
                <p className="text-sm text-foreground/80">
                  {lang === "uk" ? sponsor.note.uk : sponsor.note.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
