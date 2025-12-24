import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import turbineImg from "../assets/turbine.jpg";

export function HeroSection() {
  const { lang } = useLanguage();

  const copy = {
    title: {
      uk: "Вітроенергія нового покоління",
      en: "Next-generation wind energy",
    },
    subtitle: {
      uk: "WITERoK — компактні вітрогенератори для локальної енергонезалежності бізнесу та громад",
      en: "WITERoK builds compact wind turbines for local energy independence of businesses and communities",
    },
    ctas: {
      primary: { uk: "Дізнатися більше", en: "Learn more" },
      secondary: { uk: "Зв'язатися з нами", en: "Contact us" },
    },
  };

  return (
    <section id="home" className="section-shell relative overflow-hidden">
      <div className="section-surface max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left panel: white content */}
          <div className="bg-white rounded-2xl p-12 pl-0 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-foreground mb-6">
              {lang === "uk" ? copy.title.uk : copy.title.en}
            </h1>

            <p className="text-lg text-foreground/70 max-w-2xl mb-8">
              {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#product"
                className="inline-flex items-center gap-3 glass-pill bg-white text-[#004799] px-6 py-3 shadow-md"
              >
                {lang === "uk" ? copy.ctas.primary.uk : copy.ctas.primary.en}
                <ArrowRight size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/witerok"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WITERoK on LinkedIn"
                title="LinkedIn"
                className="p-3 rounded-lg bg-muted inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                <svg
                  className="w-5 h-5 text-foreground/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z"
                  />
                </svg>
              </a>

              <a
                href="https://twitter.com/witerok"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WITERoK on Twitter"
                title="Twitter"
                className="p-3 rounded-lg bg-muted inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                <svg
                  className="w-5 h-5 text-foreground/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3c-2.5 0-4.5 2.24-4.5 4.99 0 .39.05.77.13 1.14A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-8 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right panel: image card with contact form */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 border border-white/6">
                <img
                  src={turbineImg}
                  alt="Wind turbine"
                  className="w-full h-[520px] object-cover"
                />
              </div>

              <div className="glass-panel glass-hover-strong absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-12 md:-bottom-8 w-64 p-3 flex items-center gap-3 flex-nowrap">
                <div className="flex-none w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <a href="#contact" className="block">
                    <h4 className="text-primary text-sm font-semibold leading-tight truncate">
                      {lang === "uk" ? "Зв'язатися з нами" : "Contact us"}
                    </h4>
                    <p className="hidden md:block text-foreground/60 text-xs mt-0.5">
                      {lang === "uk" ? "Перейти до форми" : "Go to contact"}
                    </p>
                  </a>
                </div>

                <a
                  href="#contact"
                  className="flex-none inline-flex items-center justify-center w-9 h-9 bg-white/10 rounded-full text-secondary cta-circle transition"
                >
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
