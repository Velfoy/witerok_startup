import { ArrowRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.js";
import turbineImg from "../assets/turbine.jpg";
import { useEffect, useRef, useState } from "react";

function WindParticles({ blurAmount = 0 }: { blurAmount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000, radius: 200 };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const particleCount = 190;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      density: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.density = Math.random() * 3 + 1;
        this.size = Math.random() * 3 + 2;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.vx -= Math.cos(angle) * force * this.density * 2;
          this.vy -= Math.sin(angle) * force * this.density * 2;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.85;
        this.vy *= 0.85;
        const returnForceX = (this.baseX - this.x) * 0.05;
        const returnForceY = (this.baseY - this.y) * 0.05;
        this.vx += returnForceX;
        this.vy += returnForceY;
      }

      draw() {
        if (!ctx) return;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const glowIntensity = Math.min(speed * 0.2, 1);

        ctx.fillStyle = `rgba(255, 255, 255, ${0.65 + glowIntensity * 0.35})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        if (speed > 1.4) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 1.4, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    const windTrails: Array<{ x: number; y: number; life: number }> = [];
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;
    let gustTick = 0;

    function connect() {
      if (!ctx) return;
      const maxDistance = 150;
      const cellSize = maxDistance;

      const grid = new Map<string, number[]>();
      const keyFor = (x: number, y: number) =>
        `${Math.floor(x / cellSize)},${Math.floor(y / cellSize)}`;

      for (let i = 0; i < particles.length; i++) {
        const k = keyFor(particles[i].x, particles[i].y);
        const bucket = grid.get(k);
        if (bucket) bucket.push(i);
        else grid.set(k, [i]);
      }

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        const cx = Math.floor(pi.x / cellSize);
        const cy = Math.floor(pi.y / cellSize);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const k = `${cx + dx},${cy + dy}`;
            const bucket = grid.get(k);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const pj = particles[j];
              const ddx = pi.x - pj.x;
              const ddy = pi.y - pj.y;
              const dist = Math.sqrt(ddx * ddx + ddy * ddy);
              if (dist < maxDistance) {
                const opacity = 1 - dist / maxDistance;
                ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.4})`;
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.moveTo(pi.x, pi.y);
                ctx.lineTo(pj.x, pj.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      if (gustTick++ % 6 === 0) {
        const gusts = 3;
        for (let g = 0; g < gusts; g++) {
          const y =
            canvas.height * (0.2 + 0.2 * g) + Math.sin(time + g * 1.7) * 18;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + g * 0.02})`;
          ctx.lineWidth = 6 - g;
          ctx.beginPath();
          ctx.moveTo(0, y);
          for (let x = 0; x <= canvas.width; x += 90) {
            const offset = Math.sin(time * 0.6 + x * 0.01 + g) * 14;
            ctx.lineTo(x, y + offset);
          }
          ctx.stroke();
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const mouseDx = mouse.x - lastMouseX;
        const mouseDy = mouse.y - lastMouseY;
        const mouseSpeed = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseSpeed > 2) {
          windTrails.push({
            x: mouse.x,
            y: mouse.y,
            life: 30,
          });
        }
      }

      windTrails.forEach((trail, index) => {
        trail.life--;
        const alpha = trail.life / 30;

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 15 * (1 - alpha), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.25})`;
        ctx.fill();

        if (trail.life <= 0) {
          windTrails.splice(index, 1);
        }
      });

      lastMouseX = mouse.x;
      lastMouseY = mouse.y;

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.9,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        transition: "filter 200ms ease",
      }}
    />
  );
}

export function HeroSection() {
  const { lang } = useLanguage();
  const [bgBlur, setBgBlur] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const rect = heroRef.current?.getBoundingClientRect();
      const height = rect?.height ?? window.innerHeight;
      const top = rect?.top ?? 0;
      const scrolled = Math.max(0, -top);
      const threshold = Math.max(180, height * 0.45);
      const progress = Math.min(1, scrolled / threshold);
      setBgBlur(progress * 6);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copy = {
    title: {
      uk: "Вітроенергія нового покоління",
      en: "Next-generation wind energy",
    },
    subtitle: {
      uk: "Witerok - український стартап, що створює інноваційні безлопатеві вітрові установки для енергонезалежності.",
      en: "Witerok - ukrainian startup creating innovative bladeless wind turbines for energy independence.",
    },
    ctas: {
      primary: { uk: "Дізнатися більше", en: "Learn more" },
      secondary: { uk: "Зв'язатися з нами", en: "Contact us" },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="section-shell relative overflow-hidden"
    >
      <WindParticles blurAmount={bgBlur} />
      <div className="section-surface max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-transparent rounded-2xl p-12 pl-0 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-foreground mb-6">
              {lang === "uk" ? copy.title.uk : copy.title.en}
            </h1>

            <p className="text-lg text-foreground/70 max-w-2xl mb-8">
              {lang === "uk" ? copy.subtitle.uk : copy.subtitle.en}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#product"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  e.currentTarget.style.setProperty("--x", `${x}px`);
                }}
                className="group wind-cta inline-flex items-center gap-3 glass-pill bg-white text-[#004799] px-6 py-3 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(0,71,153,0.35)]"
              >
                {lang === "uk" ? copy.ctas.primary.uk : copy.ctas.primary.en}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/startup-witerok-682429266/"
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
                href="https://www.facebook.com/profile.php?id=61574850533708"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WITERoK on Facebook"
                title="Facebook"
                className="p-3 rounded-lg bg-muted inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                <svg
                  className="w-5 h-5 text-foreground/60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

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
