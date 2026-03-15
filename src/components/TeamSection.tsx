import { useLanguage } from "../hooks/useLanguage.js";
import { useRef } from "react";
import leraZlydarImg from "../assets/lera_zlydar.jpg";
import stasKotlyarImg from "../assets/Stat_kotlar.jpg";
import yaroslavaPolikarpovaImg from "../assets/Jaroslava_Polikarpowa.jpg";

export function TeamSection() {
  const { lang } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
  };

  const team = [
    {
      name: { uk: "Ярослава Полікарпова", en: "Yaroslava Polikarpova" },
      position: { uk: "CEO, co-founders", en: "CEO, co-founders" },
      bio: {
        uk: "3+ роки досвіду в бізнес-аналітиці, фандрайзингу та інженерії",
        en: "3+ years of experience in business analytics, fundraising and engineering",
      },
      image: yaroslavaPolikarpovaImg,
    },
    {
      name: { uk: "Станіслав Котляр", en: "Stanislav Kotliar" },
      position: { uk: "CTO, co-founders", en: "CTO, co-founders" },
      bio: {
        uk: "3+ років в 3D моделюванні та розробці механізмів",
        en: "3+ years in 3D modeling and mechanism development",
      },
      image: stasKotlyarImg,
    },
    {
      name: { uk: "Валерія Злидар", en: "Valeriia Zlydar" },
      position: { uk: "Frontend розробник", en: "Frontend Developer" },
      bio: {
        uk: "1+ рік комерційного досвіду у розробці веб-сторінок та UI/UX дизайні",
        en: "1+ year of commercial experience in web development and UI/UX design",
      },
      image: leraZlydarImg,
    },
    {
      name: { uk: "Іван Петренко", en: "Ivan Petrenko" },
      position: { uk: "Backend розробник", en: "Backend Developer" },
      bio: {
        uk: "1+ рік комерційного досвіду у бекенд розробці ",
        en: "1+ year of commercial experience in backend development",
      },
      image: "https://randomuser.me/api/portraits",
    },
  ];

  const openRoles = [
    {
      title: {
        uk: "Електроінженер",
        en: "Electrical Engineer",
      },
      desc: {
        uk: "Розробка електронних систем керування та силових перетворювачів",
        en: "Development of electronic control systems and power converters",
      },
    },
    {
      title: {
        uk: "Інженер з матеріалів",
        en: "Materials Engineer",
      },
      desc: {
        uk: "Дослідження та підбір матеріалів для підвищення ефективності турбіни",
        en: "Research and selection of materials to improve turbine efficiency",
      },
    },
  ];

  const milestones = [
    {
      year: "By 2026",
      items: {
        uk: [
          "Створення 14 робочих місць з залученням врядливої молоді та населення - ВПО",
          "Успішно презентити етап початкових інвестицій",
          "Охопити 200 клієнтів та отримати валовий дохід від продажів у розмірі 3,5 млн євро у рік.",
        ],
        en: [
          "Create 14 jobs involving displaced youth and population - IDPs",
          "Successfully present the initial investment stage",
          "Reach 200 clients and obtain gross revenue from sales of 3.5 million euros per year.",
        ],
      },
    },
    {
      year: "By 2031",
      items: {
        uk: [
          "Зменшити викиди парникових газів на 1 700 000 тонн",
          "Продати 30 000 вітрогенераторів",
          "Валовий прибуток у розмірі 45 млн євро на рік",
        ],
        en: [
          "Reduce greenhouse gas emissions by 1,700,000 tons",
          "Sell 30,000 wind turbines",
          "Gross profit of 45 million euros per year",
        ],
      },
    },
  ];

  return (
    <section id="team" className="relative py-20 md:py-24 min-h-[600px]">
      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ zIndex: 10 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-4 drop-shadow-lg">
            {lang === "uk" ? "Команда" : "Team"}
          </h2>
          <p className="text-l text-white/90 drop-shadow-sm">
            {lang === "uk"
              ? "Досвідчені професіонали з різних галузей"
              : "Experienced professionals from multiple domains"}
          </p>
        </div>

        <div className="relative mb-16">
          <button
            aria-label={lang === "uk" ? "Попередні" : "Previous"}
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ‹
          </button>
          <button
            aria-label={lang === "uk" ? "Наступні" : "Next"}
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ›
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 px-10"
            style={{ scrollBehavior: "smooth" }}
          >
            {team.map((member, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-full md:w-1/2 lg:w-1/4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={lang === "uk" ? member.name.uk : member.name.en}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg text-white font-semibold mb-1">
                    {lang === "uk" ? member.name.uk : member.name.en}
                  </h3>
                  <p className="text-sm text-blue-200 mb-2">
                    {lang === "uk" ? member.position.uk : member.position.en}
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {lang === "uk" ? member.bio.uk : member.bio.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-white font-bold">
              {lang === "uk" ? "Вакансії" : "Open Roles"}
            </h3>
            <a
              href="#contact"
              className="inline-block px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              {lang === "uk" ? "Приєднатися" : "Join us"}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openRoles.map((role, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-[#144073] to-[#1A6DCC] text-white text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-white font-semibold">
                    {lang === "uk" ? role.title.uk : role.title.en}
                  </span>
                </div>
                <p className="text-white/80 text-sm">
                  {lang === "uk" ? role.desc.uk : role.desc.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute top-8 left-0 right-0 h-1 bg-white/30"
            style={{ zIndex: 1 }}
          ></div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative"
            style={{ zIndex: 2 }}
          >
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#144073] to-[#1A6DCC] flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                    {index === 0 ? "2026" : "2031"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-white font-bold mb-4">
                      {milestone.year}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3 ml-4">
                  {(lang === "uk"
                    ? milestone.items.uk
                    : milestone.items.en
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-white/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
