import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef } from "react";
import { useInViewport } from "../hooks/useInViewport";

function WindEnergyBackground({ active }: { active: boolean }) {
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
      gradient.addColorStop(0, "#0a4275");
      gradient.addColorStop(0.5, "#2d6fa6");
      gradient.addColorStop(1, "#6aa8d4");
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
      gradient.addColorStop(0, "#0a4275");
      gradient.addColorStop(0.5, "#2d6fa6");
      gradient.addColorStop(1, "#6aa8d4");
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

export function AboutSection() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const { ref: viewportRef, inView } = useInViewport<HTMLElement>({
    threshold: 0.2,
  });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect || !bgRef.current) {
          ticking = false;
          return;
        }
        const viewportH = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const delta = sectionCenter - viewportCenter;
        const offset = -delta * 0.15;
        bgRef.current.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const copy = {
    heading: {
      uk: "Про нас",
      en: "About Us",
    },
    tagline: {
      uk: "Команда інженерів, дизайнерів та експертів з енергетики, що працює над створенням чистого енергетичного майбутнього для України.",
      en: "A team of engineers, designers and energy experts working to create a clean energy future for Ukraine.",
    },
    pillars: [
      {
        title: { uk: "Місія", en: "Mission" },
        text: {
          uk: "Зробити кожен будинок та підприємство енергетично незалежним через доступ до чистої вітрової енергії.",
          en: "Make every home and business energy independent through access to clean wind energy.",
        },
      },
      {
        title: { uk: "Продукт", en: "Product" },
        text: {
          uk: "Безлопатеві вітрові установки для дахів, терас та віддалених місцевостей з простою інтеграцією.",
          en: "Bladeless wind turbines for roofs, terraces and remote areas with easy integration.",
        },
      },
      {
        title: { uk: "Цінність", en: "Value" },
        text: {
          uk: "Інноваційні технології для сталого розвитку та збереження планети для майбутніх поколінь.",
          en: "Innovative technologies for sustainable development and preserving the planet for future generations.",
        },
      },
    ],
  };

  return (
    <section
      id="about"
      ref={(el) => {
        sectionRef.current = el;
        viewportRef.current = el as HTMLElement | null;
      }}
      className="relative py-16 min-h-[450px] my-20"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden"
        style={{ willChange: "transform", zIndex: 0 }}
      >
        <WindEnergyBackground active={inView} />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/8 to-black/15"
        style={{ zIndex: 1 }}
      />

      <div
        className="section-surface max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-white drop-shadow mb-4">
            {lang === "uk" ? copy.heading.uk : copy.heading.en}
          </h2>
          <p className="text-lg text-white/90 drop-shadow-sm max-w-3xl mx-auto">
            {lang === "uk" ? copy.tagline.uk : copy.tagline.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map((pillar) => (
            <div
              key={pillar.title.uk}
              className="p-6 rounded-2xl border border-white/20 bg-white/8 backdrop-blur-sm hover:bg-white/12 hover:shadow-lg transition"
            >
              <h3 className="text-xl text-white mb-2 drop-shadow">
                {lang === "uk" ? pillar.title.uk : pillar.title.en}
              </h3>
              <p className="text-white/90">
                {lang === "uk" ? pillar.text.uk : pillar.text.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
