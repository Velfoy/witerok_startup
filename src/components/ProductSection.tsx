import {
  Wind,
  Gauge,
  Shield,
  Wrench,
  TrendingUp,
  Calendar,
  Zap,
  Clock,
  DollarSign,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import { useEffect, useRef } from "react";
import { useInViewport } from "../hooks/useInViewport";
import turbineVideo from "../assets/turbine.mp4";

function ProductBackground({ active }: { active: boolean }) {
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
        canvas.height,
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
        canvas.height,
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

export function ProductSection() {
  const { lang } = useLanguage();
  const { ref: viewportRef, inView } = useInViewport<HTMLElement>({
    threshold: 0.2,
  });

  const specs = [
    {
      icon: Calendar,
      label: { uk: "Стартова швидкість", en: "Startup speed" },
      value: { uk: "4 м/с", en: "4 m/s" },
    },
    {
      icon: Gauge,
      label: { uk: "Шум", en: "Noise" },
      value: { uk: "30 - 40 дБ", en: "30 - 40 dB" },
    },
    {
      icon: Wind,
      label: { uk: "Номінальна швидкість вітру", en: "Nominal wind speed" },
      value: { uk: "~8,0 м/с", en: "~8.0 m/s" },
    },
    {
      icon: Wrench,
      label: { uk: "Вага", en: "Weight" },
      value: { uk: "~150 кг", en: "~150 kg" },
    },
    {
      icon: TrendingUp,
      label: { uk: "Висота", en: "Height" },
      value: { uk: "~2,5 м", en: "~2.5 m" },
    },
    {
      icon: Shield,
      label: { uk: "Площа основи", en: "Base area" },
      value: { uk: "~ 1 м²", en: "~ 1 m²" },
    },
    {
      icon: DollarSign,
      label: { uk: "Ціна", en: "Price" },
      value: { uk: "2500$", en: "2500$" },
    },
    {
      icon: Zap,
      label: { uk: "Потужність", en: "Energy per year" },
      value: { uk: "~2-4 МВт·год/рік", en: "~2-4 MWh/year" },
    },
    {
      icon: Clock,
      label: { uk: "Період окупності", en: "Payback period" },
      value: { uk: "~3-5 років", en: "~3-5 years" },
    },
  ];

  return (
    <section
      id="product"
      ref={(el) => {
        viewportRef.current = el as HTMLElement | null;
      }}
      className="relative py-20 min-h-[500px] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ProductBackground active={inView} />
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
          <h2 className="text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">
            {lang === "uk" ? "Вітрогенератор WITERoK" : "WITERoK Wind Turbine"}
          </h2>

          <p className="text-l text-white/90 drop-shadow-md max-w-4xl mx-auto">
            {lang === "uk"
              ? " П’ятироторний вітрогенератор, що генерує 3-5 МВт*год на рік. Працює при швидкості від 4 м/с, не потребує регулярного обслуговування з терміном служби 10-15 років."
              : "A five-rotor wind turbine that generates 3-5 MWh per year. Operates at wind speeds starting from 4 m/s, requires no regular maintenance, and has a lifespan of 10-15 years."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative max-w-xl mx-auto lg:mx-0">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <video
                src={turbineVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#21457d]/60 backdrop-blur-md border border-white/30 text-white p-6 rounded-xl shadow-2xl">
              <div className="text-sm mb-1 text-white/90">
                {lang === "uk" ? "Термін служби" : "Lifetime"}
              </div>
              <div className="text-3xl font-semibold">
                10 {lang === "uk" ? " років" : " years"}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-3xl text-white mb-4 drop-shadow-lg">
              {lang === "uk" ? "Характеристики" : "Specifications"}
            </h3>
            {/* <p className="text-white/90 mb-6 drop-shadow-sm leading-relaxed">
              {lang === "uk"
                ? "WITERoK поєднує інноваційний дизайн без лопатей з практичною функціональністю. Це безпечне, тихе рішення для енергонезалежності, яке легко встановлюється та вимагає мінімального обслуговування."
                : "WITERoK combines innovative bladeless design with practical functionality. It's a safe, quiet solution for energy independence that installs easily and requires minimal maintenance."}
            </p> */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all"
                  >
                    <Icon className="text-white mb-2" size={24} />
                    <div className="text-sm text-white/70 mb-1">
                      {lang === "uk" ? spec.label.uk : spec.label.en}
                    </div>
                    <div className="text-lg text-white font-semibold">
                      {typeof spec.value === "string"
                        ? spec.value
                        : lang === "uk"
                          ? spec.value.uk
                          : spec.value.en}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-16 ">
          <h3 className="text-xl md:text-2xl text-white font-bold drop-shadow-lg">
            {lang === "uk" ? "Зроблено в Україні" : "Made in Ukraine"}
          </h3>
        </div>
      </div>
    </section>
  );
}
