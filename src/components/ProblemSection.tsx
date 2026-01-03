import { Zap, DollarSign, HardHat, Calculator } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";

export function ProblemSection() {
  const { lang } = useLanguage();

  const problems = [
    {
      icon: Zap,
      title: {
        uk: "Пошкодження енергетичної інфраструктури",
        en: "Damaged energy infrastructure",
      },
      items: {
        uk: [
          "Часті перебої з електропостачанням",
          "Зростання потреби у локальних джерелах енергії",
        ],
        en: ["Frequent power outages", "Growing need for local generation"],
      },
    },
    {
      icon: DollarSign,
      title: {
        uk: "Високий тариф для бізнесу",
        en: "High tariffs for business",
      },
      subtitle: { uk: "до 10 грн/кВт·год", en: "up to 10 UAH/kWh" },
      items: {
        uk: [
          "Витрати на енергію перевищують 30% операційних",
          "Прогноз зростання на +20% у 2026 році",
        ],
        en: [
          "Energy costs exceed 30% of OPEX",
          "+20% tariff growth forecast in 2026",
        ],
      },
    },
    {
      icon: HardHat,
      title: { uk: "Складна інфраструктура", en: "Complex infrastructure" },
      items: {
        uk: [
          "Потрібна спецтехніка, фундамент, великі площі",
          "Неможливість встановлення поблизу малих громад",
        ],
        en: [
          "Needs heavy equipment, foundation, large areas",
          "Cannot be installed near small communities",
        ],
      },
    },
    {
      icon: Calculator,
      title: { uk: "Нерозуміння періоду окупності", en: "Unclear payback" },
      items: {
        uk: [
          "Відсутність прозорих розрахунків",
          "Недовіра до малої вітроенергетики",
        ],
        en: ["No transparent calculations", "Low trust in small wind"],
      },
    },
  ];

  const problemStyles = `
    @keyframes problemRibbon {
      0% { transform: translateX(-8%) rotate(-1deg); opacity: 0.65; }
      50% { transform: translateX(8%) rotate(1deg); opacity: 0.9; }
      100% { transform: translateX(-6%) rotate(0deg); opacity: 0.65; }
    }
    @keyframes problemIconPulse {
      0%, 100% { box-shadow: 0 10px 30px rgba(26,109,204,0.18), 0 0 0 0 rgba(26,109,204,0.12); }
      50% { box-shadow: 0 16px 42px rgba(20,64,115,0.2), 0 0 0 10px rgba(26,109,204,0.08); }
    }
    .problem-ribbon-anim { animation: problemRibbon 14s ease-in-out infinite alternate; }
    .problem-icon-pulse { animation: problemIconPulse 6s ease-in-out infinite; }
  `;

  return (
    <section
      id="problem"
      className="relative py-12 bg-gradient-to-b from-white via-[#eef3ff] to-[#f7fbff] overflow-hidden"
    >
      <style>{problemStyles}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(26,109,204,0.08),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(20,64,115,0.08),transparent_32%),radial-gradient(circle_at_50%_84%,rgba(56,189,248,0.07),transparent_34%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/75 via-white/40 to-white/80" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="problem-ribbon-anim absolute -left-1/3 top-1/4 w-[150%] h-48 blur-[64px]"
          style={{
            background:
              "linear-gradient(120deg, rgba(26,109,204,0.16), rgba(20,64,115,0.07), rgba(26,109,204,0.18))",
          }}
        />
        <div
          className="problem-ribbon-anim absolute left-0 bottom-[-10%] w-full h-40 blur-[72px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,64,115,0.12), rgba(26,109,204,0.18), rgba(20,64,115,0.12))",
            animationDuration: "18s",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-3 mb-4">
            {lang === "uk" ? "Проблема" : "Problem"}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Ключові барʼєри для швидкого розгортання локальної вітрогенерації"
              : "Key blockers that slow down rapid rollout of local wind power"}
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8 items-start">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const items = lang === "uk" ? problem.items.uk : problem.items.en;
            const isOffset = index % 2 === 1;
            return (
              <div
                key={index}
                className={`relative ${isOffset ? "lg:translate-y-8" : ""}`}
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-white/30 blur-2xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 backdrop-blur-md shadow-[0_14px_42px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_54px_rgba(26,109,204,0.16)] transition">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#144073] via-[#1A6DCC] to-[#144073] opacity-80" />
                  <div className="p-6 sm:p-7 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md problem-icon-pulse"
                        style={{
                          background:
                            "linear-gradient(135deg, #144073, #1A6DCC)",
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#1A6DCC]">
                          {lang === "uk" ? "Проблема" : "Problem"} #{index + 1}
                        </p>
                        <h3 className="text-xl text-slate-900 font-semibold">
                          {lang === "uk" ? problem.title.uk : problem.title.en}
                        </h3>
                        {problem.subtitle && (
                          <p className="text-sm text-slate-600">
                            {lang === "uk"
                              ? problem.subtitle.uk
                              : problem.subtitle.en}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map((text, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 rounded-xl bg-[#edf2fb] border border-[#d8e4f7] px-3 py-2.5"
                        >
                          <span className="mt-1 inline-block w-2 h-2 rounded-full bg-[#1A6DCC] shadow-[0_0_0_4px_rgba(26,109,204,0.08)]" />
                          <span className="text-sm text-[#144073] leading-relaxed">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-18 sm:mt-20 text-center">
          <div
            className="inline-block rounded-2xl text-white shadow-[0_12px_32px_rgba(26,109,204,0.28)]"
            style={{ background: "linear-gradient(135deg, #144073, #1A6DCC)" }}
          >
            <div className="p-8">
              <h3 className="text-2xl mb-4">
                {lang === "uk" ? "Наше рішення" : "Our solution"}
              </h3>
              <p className="text-lg max-w-2xl">
                {lang === "uk"
                  ? "WITERoK пропонує компактні вітрогенератори, які легко встановити, прозоро розрахувати окупність та отримати енергонезалежність"
                  : "WITERoK delivers compact turbines that install quickly, have transparent payback, and unlock energy independence."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
