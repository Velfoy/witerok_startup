import { Zap, TrendingUp, Calculator } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function EfficiencyCalculator() {
  const { lang } = useLanguage();

  return (
    <section
      id="calculator"
      className="relative pt-4 pb-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">
            {lang === "uk"
              ? "Калькулятор ефективності"
              : "Efficiency Calculator"}
          </h2>
          <p className="text-l text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Розрахуйте коефіцієнт ефективності та отримайте персоналізовані рекомендації"
              : "Calculate efficiency coefficient and get personalized recommendations"}
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-12 md:p-16 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#144073] mb-3">
              {lang === "uk" ? "Скоро" : "Coming Soon"}
            </h3>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              {lang === "uk"
                ? "Інтерактивний калькулятор ефективності буде доступний вже дуже скоро. Ви зможете в реальному часі розраховувати всі показники вашої установки."
                : "The interactive efficiency calculator will be available very soon. You'll be able to calculate all your installation's metrics in real time."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
