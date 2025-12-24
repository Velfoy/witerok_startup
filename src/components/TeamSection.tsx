import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef } from "react";
import { useInViewport } from "../hooks/useInViewport";

function TeamBackground({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 1.5 + 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const waves: Array<{ y: number; speed: number; amplitude: number }> = [];
    for (let i = 0; i < 5; i++) {
      waves.push({
        y: (canvas.height / 6) * (i + 1),
        speed: 0.02 + i * 0.005,
        amplitude: 20 + i * 8,
      });
    }

    let frame = 0;
    let animationId: number | null = null;

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#0a2540");
      gradient.addColorStop(0.5, "#144073");
      gradient.addColorStop(1, "#1A6DCC");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#0a2540");
      gradient.addColorStop(0.5, "#144073");
      gradient.addColorStop(1, "#1A6DCC");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let x = 0; x <= canvas.width; x += 20) {
          const y =
            wave.y +
            Math.sin((x + frame * wave.speed * 50) * 0.01) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - idx * 0.02})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      particles.forEach((p) => {
        p.x += p.vx;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      frame++;
      animationId = requestAnimationFrame(animate);
    };

    if (active) {
      animate();
    } else {
      drawStatic();
    }

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function TeamSection() {
  const { lang } = useLanguage();
  const { ref: viewportRef, inView } = useInViewport<HTMLElement>({
    threshold: 0.2,
  });
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
      name: { uk: "Валерія Злидар", en: "Valeriia Zlydar" },
      position: { uk: "Frontend розробник", en: "Frontend Developer" },
      bio: {
        uk: "Фронтенд-розробниця, відповідальна за сайт та UI продукту",
        en: "Frontend developer responsible for the website and product UI",
      },
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
    {
      name: { uk: "Ярослав Кутовенко", en: "Yaroslav Kutovenko" },
      position: { uk: "Frontend розробник", en: "Frontend Developer" },
      bio: {
        uk: "1+ рік досвіду в програмуванні та розробці веб-сайтів",
        en: "1+ year of experience in programming and web development",
      },
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      name: { uk: "Артем Деденок", en: "Artem Dedenok" },
      position: {
        uk: "Data Analyst, co-founders",
        en: "Data Analyst, co-founders",
      },
      bio: {
        uk: "2+ роки досвіду роботи в галузі альтернативної енергетики",
        en: "2+ years of experience in the renewable energy sector",
      },
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      name: { uk: "Ярослава Полікарпова", en: "Yaroslava Polikarpova" },
      position: { uk: "CEO, co-founders", en: "CEO, co-founders" },
      bio: {
        uk: "3+ роки досвіду в бізнес-аналітиці, фандрайзингу та інженерії",
        en: "3+ years of experience in business analytics, fundraising and engineering",
      },
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      name: { uk: "Станіслав Котляр", en: "Stanislav Kotliar" },
      position: { uk: "CTO, co-founders", en: "CTO, co-founders" },
      bio: {
        uk: "3+ років в 3D моделюванні та розробці механізмів",
        en: "3+ years in 3D modeling and mechanism development",
      },
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: { uk: "Наталія Ярошенко", en: "Natalia Yaroshenko" },
      position: { uk: "Sales Representative", en: "Sales Representative" },
      bio: {
        uk: "0,5+ рік досвіду активної комунікації з потенційними клієнтами",
        en: "0.5+ year of experience in active communication with potential clients",
      },
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    },
  ];

  const openRoles = [
    {
      title: {
        uk: "Механічний інженер (R&D)",
        en: "Mechanical Engineer (R&D)",
      },
      desc: {
        uk: "Проектування вузлів турбіни, прототипування та тестування",
        en: "Design turbine assemblies, rapid prototyping and testing",
      },
    },
    {
      title: {
        uk: "Електроінженер (Силові системи)",
        en: "Electrical Engineer (Power Systems)",
      },
      desc: {
        uk: "Електроніка керування, перетворювачі та безпека",
        en: "Control electronics, converters and safety",
      },
    },
    {
      title: {
        uk: "Backend розробник (Node.js)",
        en: "Backend Developer (Node.js)",
      },
      desc: {
        uk: "API, інтеграції, аналітика даних",
        en: "APIs, integrations and data analytics",
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
    <section
      id="team"
      ref={(el) => {
        viewportRef.current = el as HTMLElement | null;
      }}
      className="relative py-24 min-h-[600px] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <TeamBackground active={inView} />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"
        style={{ zIndex: 1 }}
      />

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

        {/* Team Slider (shows 4 cards on large screens) */}
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

        {/* Open Roles */}
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

        {/* Milestones Timeline */}
        <div className="relative">
          {/* Timeline line */}
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
                  {/* Timeline dot */}
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
