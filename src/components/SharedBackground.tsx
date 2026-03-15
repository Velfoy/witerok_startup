import { useEffect, useRef } from "react";

export function SharedBackground({ active }: { active: boolean }) {
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
