import { useLanguage } from "../contexts/LanguageContext";
import ukrainianFutureLogo from "../assets/ukrainian_future.png";
import ventureWellLogo from "../assets/venturewell.png";
import ministryOfGoodMindLogo from "../assets/ministry.png";

export function AdvisorsSection() {
  const { lang } = useLanguage();

  const partners = [
    {
      name: "UKRAINIAN FUTURE",
      monogram: "UF",
      imageSrc: ukrainianFutureLogo,
      bg: "transparent",
    },
    {
      name: "VentureWell",
      monogram: "VW",
      imageSrc: ventureWellLogo,
      bg: "#004d9bff",
    },
    {
      name: lang === "uk" ? "Hyvän mielen ministeriö" : "Ministry of Good Mind",
      monogram: "HM",
      imageSrc: ministryOfGoodMindLogo,
      bg: "#004d9bff",
    },
  ];

  return (
    <section
      id="partnership"
      className="relative py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-slate-900 font-semibold mt-4 mb-3">
            {lang === "uk" ? "Партнерства" : "Partnerships"}
          </h2>
          <p className="text-l text-slate-600 max-w-3xl mx-auto">
            {lang === "uk"
              ? "Ставайте частиною інновацій! Тут може бути і ваша компанія — разом ми створюємо майбутнє чистої енергії. Долучайтесь до WITERoK!"
              : "Be part of innovation! Your company can join — together we build the future of clean energy. Join WITERoK!"}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((p, index) => (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-8 flex-1 flex items-center justify-center">
                    {p.imageSrc ? (
                      <div
                        className="rounded-xl w-full flex items-center justify-center"
                        style={{ background: p.bg ?? "transparent" }}
                      >
                        <img
                          src={p.imageSrc}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="h-16 w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-20 h-20 rounded-xl text-white flex items-center justify-center shadow-md"
                        style={{
                          background:
                            "linear-gradient(135deg, #144073, #1A6DCC)",
                        }}
                      >
                        <span className="font-bold text-xl">{p.monogram}</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="h-1 mt-auto opacity-70 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(90deg, #144073, #1A6DCC, #144073)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, #144073, #1A6DCC)",
              }}
            >
              {lang === "uk" ? "Join us" : "Join us"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
