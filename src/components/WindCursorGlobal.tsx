import { useEffect, useRef } from "react";

export default function WindCursorGlobal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const trail: Array<{ x: number; y: number; life: number }> = [];
    const maxTrail = 56;
    const TRAIL_LIFE = 40;
    let windPhase = 0;
    const windSpeed = 0.15;
    const cursor = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      trail.push({ x: cursor.x, y: cursor.y, life: TRAIL_LIFE });
      if (trail.length > maxTrail) trail.shift();
    };
    const onLeave = () => {
      cursor.x = -1000;
      cursor.y = -1000;
      trail.length = 0;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (cursor.x < 0 || cursor.y < 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      for (let i = 0; i < trail.length; i++) {
        trail[i].life -= 1;
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      const orbRadius = 12;
      const gradient = ctx.createRadialGradient(
        cursor.x,
        cursor.y,
        0,
        cursor.x,
        cursor.y,
        orbRadius * 2.5
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(0.5, "rgba(148, 163, 184, 0.35)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, orbRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.globalCompositeOperation = "lighter";
      for (let i = 1; i < trail.length; i++) {
        const p1 = trail[i - 1];
        const p2 = trail[i];
        const t = i / Math.max(1, trail.length);
        const width = (1 - t) * 10 + 1;
        const baseAlpha = (1 - t) * 0.5;
        const lifeAlpha = Math.min(1, Math.max(0, p2.life / TRAIL_LIFE));
        const alpha = baseAlpha * lifeAlpha;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.max(0.0001, Math.sqrt(dx * dx + dy * dy));
        const nx = -dy / len;
        const ny = dx / len;

        const amplitude = (1 - t) * 12;
        const phase = windPhase + i * 0.3;
        const offsetX = nx * Math.sin(phase) * amplitude;
        const offsetY = ny * Math.sin(phase) * amplitude;

        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
        ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
        ctx.stroke();

        const offsetX2 = nx * Math.sin(phase + 0.8) * (amplitude * 0.6);
        const offsetY2 = ny * Math.sin(phase + 0.8) * (amplitude * 0.6);
        ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.7})`;
        ctx.lineWidth = width * 0.7;
        ctx.beginPath();
        ctx.moveTo(p1.x + offsetX2, p1.y + offsetY2);
        ctx.lineTo(p2.x + offsetX2, p2.y + offsetY2);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      for (let i = 2; i < trail.length; i += 3) {
        const p = trail[i];
        const t = i / Math.max(1, trail.length);
        const lifeAlpha = Math.min(1, Math.max(0, p.life / TRAIL_LIFE));
        const alpha = (1 - t) * 0.25 * lifeAlpha;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x - 12, p.y - 5);
        ctx.lineTo(p.x + 12, p.y + 5);
        ctx.stroke();
      }

      windPhase += windSpeed;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]"
    />
  );
}
