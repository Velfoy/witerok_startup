import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { useEffect, useRef } from "react";
import { useInViewport } from "../hooks/useInViewport";

function RoadmapBackground({ active }: { active: boolean }) {
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

export function RoadmapSection() {
  const { lang } = useLanguage();
  const { ref: viewportRef, inView } = useInViewport<HTMLElement>({
    threshold: 0.2,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const roadmapItems = [
    {
      phase: { uk: "TRL 4", en: "TRL 4" },
      title: { uk: "Підтвердження Концепції", en: "Concept Validation" },
      subtitle: {
        uk: "Включення до ТОП-10 найкращих климатичних стартапів світу за версією NFTE в рамках конкурсу інновацій WET 2024",
        en: "Inclusion in TOP-10 best climate startups in NFTE competition 2024",
      },
      status: "completed",
      date: "Q1 2024",
    },
    {
      phase: { uk: "TRL 5", en: "TRL 5" },
      title: { uk: "Розробка ідеї", en: "Idea Development" },
      subtitle: {
        uk: "Розробка ідеї на 3D-моделювання нової концепції вітрогенератора",
        en: "3D modeling of new wind turbine concept",
      },
      status: "completed",
      date: "Q2 2024",
    },
    {
      phase: { uk: "TRL 6", en: "TRL 6" },
      title: { uk: "Аналітика индустрії", en: "Industry Analytics" },
      subtitle: {
        uk: "Комплексна аналітика індустрії мобільних вітрових турбін та інших конкурентних рішень",
        en: "Comprehensive analysis of mobile wind turbine industry",
      },
      status: "completed",
      date: "Q2-Q3 2024",
    },
    {
      phase: { uk: "TRL 7", en: "TRL 7" },
      title: { uk: "Міжнародний обмін", en: "International Exchange" },
      subtitle: {
        uk: "Міжнародний молодіжний обмін «Рух до циркулярності» (M2C)",
        en: "International Youth Exchange 'Move to Circularity' (M2C)",
      },
      status: "in-progress",
      date: "Q3 2024",
    },
    {
      phase: { uk: "TRL 7.5", en: "TRL 7.5" },
      title: { uk: "Прототип 2", en: "Prototype 2" },
      subtitle: {
        uk: "Створення Прототипу № 2 (перехід на TRL 5)",
        en: "Prototype #2 creation (transition to TRL 5)",
      },
      status: "planned",
      date: "Q4 2024",
    },
    {
      phase: { uk: "TRL 8", en: "TRL 8" },
      title: { uk: "Закупівля обладнання", en: "Equipment Acquisition" },
      subtitle: {
        uk: "Закупівля необхідного обладнання та сировини",
        en: "Acquisition of necessary equipment and materials",
      },
      status: "planned",
      date: "Q4 2024",
    },
    {
      phase: { uk: "TRL 8.5", en: "TRL 8.5" },
      title: { uk: "Proof of Concept", en: "Proof of Concept" },
      subtitle: {
        uk: "Створення Proof-of-concept 15.06.2025 - 01.11.2025",
        en: "Proof-of-concept creation 15.06.2025 - 01.11.2025",
      },
      status: "planned",
      date: "Q2-Q3 2025",
    },
    {
      phase: { uk: "TRL 9", en: "TRL 9" },
      title: { uk: "Технологічні карти", en: "Technology Maps" },
      subtitle: {
        uk: "Створення технологічних карт виготовлення компонентів вітрогенератора WITERoK (перехід на TRL 8)",
        en: "Technology maps for WITERoK wind turbine component manufacturing",
      },
      status: "planned",
      date: "Q4 2025",
    },
  ];

  return (
    <section
      id="roadmap"
      ref={(el) => {
        viewportRef.current = el as HTMLElement | null;
      }}
      className="relative py-24 min-h-[600px] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <RoadmapBackground active={inView} />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ zIndex: 10 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">
            {lang === "uk" ? "Дорожна карта" : "Roadmap"}
          </h2>
          <p className="text-lg text-white/90 drop-shadow-md max-w-4xl mx-auto">
            {lang === "uk"
              ? "Поетапний розвиток від прототипу до серійного виробництва"
              : "Step-by-step progress from prototype to mass production"}
          </p>
        </div>

        <div className="relative mt-12">
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="relative overflow-x-auto pb-8 no-scrollbar z-20 cursor-grab active:cursor-grabbing px-16"
          >
            <div className="flex gap-8 min-w-min">
              {roadmapItems.map((item, index) => {
                let StatusIcon;
                let statusColor;
                let statusBg;

                if (item.status === "completed") {
                  StatusIcon = CheckCircle2;
                  statusColor = "text-green-400";
                  statusBg = "bg-green-500/20";
                } else if (item.status === "in-progress") {
                  StatusIcon = Clock;
                  statusColor = "text-amber-400";
                  statusBg = "bg-amber-500/20";
                } else {
                  StatusIcon = Circle;
                  statusColor = "text-white/40";
                  statusBg = "bg-white/10";
                }

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-shrink-0 w-64"
                  >
                    <div
                      className={`w-8 h-8 ${statusBg} rounded-full border-2 border-white/30 flex items-center justify-center mb-4 relative z-20`}
                    >
                      <StatusIcon size={16} className={`${statusColor}`} />
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white hover:bg-white/15 transition-all h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 ${statusBg} ${statusColor} text-xs font-semibold rounded-full`}
                        >
                          {lang === "uk" ? item.phase.uk : item.phase.en}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-2 leading-tight">
                        {lang === "uk" ? item.title.uk : item.title.en}
                      </h3>
                      <p className="text-xs text-white/70 mb-3 line-clamp-3">
                        {lang === "uk" ? item.subtitle.uk : item.subtitle.en}
                      </p>
                      <p className="text-xs text-white/60">{item.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all">
            <CheckCircle2 className="text-green-400 mx-auto mb-3" size={32} />
            <div className="text-3xl text-white mb-2">3</div>
            <div className="text-white/70">
              {lang === "uk" ? "Завершені етапи" : "Completed phases"}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all">
            <Clock className="text-amber-400 mx-auto mb-3" size={32} />
            <div className="text-3xl text-white mb-2">1</div>
            <div className="text-white/70">
              {lang === "uk" ? "Поточний етап" : "Current phase"}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all">
            <Circle className="text-white/40 mx-auto mb-3" size={32} />
            <div className="text-3xl text-white mb-2">4</div>
            <div className="text-white/70">
              {lang === "uk" ? "Заплановані етапи" : "Planned phases"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
