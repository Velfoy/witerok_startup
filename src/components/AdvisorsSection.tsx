import { useLanguage } from "../hooks/useLanguage.js";
import ukrainianFutureLogo from "../assets/ukrainian_future.png";
import ventureWellLogo from "../assets/venturewell.png";
import ministryOfGoodMindLogo from "../assets/ministry.png";
import { Users } from "lucide-react";

export function AdvisorsSection() {
  const { lang } = useLanguage();

  const partners = [
    {
      name: "UKRAINIAN FUTURE",
      monogram: "UF",
      imageSrc: ukrainianFutureLogo,
      bg: "transparent",
    },
  ];

  const grantProviders = [
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
    <>
      {/* Partners Section */}
      <section
        id="partners"
        className="relative py-20 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mb-4">
              {lang === "uk" ? "Партнери" : "Partners"}
            </h2>
            <p className="text-l text-slate-600 max-w-3xl mx-auto">
              {lang === "uk"
                ? "Компанії та організації, які підтримують нашу місію"
                : "Companies and organizations supporting our mission"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, index) => (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-4 flex-1 flex items-center justify-center min-h-[150px]">
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
                          background: p.bg,
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
        </div>
      </section>

      {/* Grant Providers Section */}
      <section
        id="grant-providers"
        className="relative pb-20 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mb-4">
              {lang === "uk" ? "Грантодавці" : "Grant Providers"}
            </h2>
            <p className="text-l text-slate-600 max-w-3xl mx-auto">
              {lang === "uk"
                ? "Організації, які підтримують нас фінансово"
                : "Organizations providing financial support"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grantProviders.map((p, index) => (
              <div key={index} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition overflow-hidden">
                  <div className="p-4 flex-1 flex items-center justify-center min-h-[150px]">
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
        </div>
      </section>

      {/* Join Us Section */}
      <section
        id="join-us"
        className="relative pb-20 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_36%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.05),transparent_32%)]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mb-4">
              {lang === "uk" ? "Тут можете бути ви" : "You could be here"}
            </h2>
            <p className="text-l text-slate-600 max-w-3xl mx-auto">
              {lang === "uk"
                ? "Ставайте частиною інновацій! Разом ми створюємо майбутнє чистої енергії. Долучайтесь до WITERoK!"
                : "Be part of innovation! Together we build the future of clean energy. Join WITERoK!"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="group h-full flex flex-col rounded-2xl bg-white border-2 border-dashed border-slate-300 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] hover:border-[#1A6DCC] transition overflow-hidden">
              <div className="p-8 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                <Users className="w-16 h-16 text-slate-400 group-hover:text-[#1A6DCC] transition mb-4" />
                <p className="text-slate-500 text-center mb-6">
                  {lang === "uk"
                    ? "Приєднуйтесь до нашої команди партнерів"
                    : "Join our team of partners"}
                </p>
                <a
                  href="#contact"
                  className="inline-block px-8 py-3 rounded-xl text-white font-semibold hover:shadow-[0_14px_36px_rgba(26,109,204,0.28)] transition"
                  style={{
                    background: "linear-gradient(135deg, #144073, #1A6DCC)",
                  }}
                >
                  {lang === "uk" ? "Приєднатися" : "Join us"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
