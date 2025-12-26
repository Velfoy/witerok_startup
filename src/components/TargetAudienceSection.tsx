import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef } from "react";
import { useInViewport } from "../hooks/useInViewport";

function AudienceBackground({ active }: { active: boolean }) {
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

export function TargetAudienceSection() {
  const { lang } = useLanguage();
  const { ref: viewportRef, inView } = useInViewport<HTMLElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="audience"
      ref={(el) => {
        viewportRef.current = el as HTMLElement | null;
      }}
      className="relative py-24 min-h-[500px] overflow-hidden"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <AudienceBackground active={inView} />
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
            {lang === "uk" ? "Цільова аудиторія" : "Target audience"}
          </h2>
          <p className="text-l text-white/90 max-w-3xl mx-auto drop-shadow-sm">
            {lang === "uk"
              ? "WITERoK створює цінність для різних сегментів ринку"
              : "WITERoK creates value across diverse market segments"}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full border-8 border-[#144073] flex items-center justify-center bg-white/5">
                <span
                  className="text-5xl font-bold text-[#144073] drop-shadow-lg"
                  style={{ color: "#144073" }}
                >
                  TAM
                </span>
              </div>
              <div className="text-4xl font-bold mb-2 drop-shadow-lg">
                ≈13 mil
              </div>
              <div className="text-lg font-semibold mb-4 text-white/90">
                {lang === "uk" ? "Потенційні клієнти" : "Potential clients"}
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#144073] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Приватний сектор (невеликі домогосподарства, еко-будинки з пласким дахом)"
                      : "Private sector (small households, eco-homes with flat roofs)"}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#144073] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Багатоповерхові будівлі (дахи будівель)"
                      : "Multi-story buildings (building roofs)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full border-8 border-[#1A6DCC] flex items-center justify-center bg-white/5">
                <span
                  className="text-5xl font-bold text-[#1A6DCC] drop-shadow-lg"
                  style={{ color: "#1A6DCC" }}
                >
                  SAM
                </span>
              </div>
              <div className="text-4xl font-bold mb-2 drop-shadow-lg">
                ≈1.1 mil
              </div>
              <div className="text-lg font-semibold mb-4 text-white/90">
                {lang === "uk" ? "Доступні клієнти" : "Serviceable clients"}
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#1A6DCC] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Сільськогосподарські поля (системи електричного керування)"
                      : "Agricultural fields (electrical control systems)"}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#1A6DCC] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Офісний простір (дах/тераса)"
                      : "Office space (roof/terrace)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full border-8 border-[#5BA3E8] flex items-center justify-center bg-white/5">
                <span
                  className="text-5xl font-bold text-[#5BA3E8] drop-shadow-lg"
                  style={{ color: "#5BA3E8" }}
                >
                  SOM
                </span>
              </div>
              <div className="text-4xl font-bold mb-2 drop-shadow-lg">
                ≈20500
              </div>
              <div className="text-lg font-semibold mb-4 text-white/90">
                {lang === "uk"
                  ? "Реальні клієнти на початку"
                  : "Initial obtainable market"}
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#5BA3E8] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Громадські місця (парки, сквери, місця для прогулянок на свіжому повітрі)"
                      : "Public spaces (parks, squares, outdoor recreation areas)"}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[#5BA3E8] mt-1.5 flex-shrink-0"></div>
                  <span className="ml-3 text-white/80 text-sm">
                    {lang === "uk"
                      ? "Вітрові електростанції та електростанції"
                      : "Wind power and power stations"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
