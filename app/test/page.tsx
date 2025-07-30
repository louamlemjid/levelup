'use client';

import { useEffect, useRef } from 'react';

export default function CanvasFlowLinePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previousScrollRef = useRef<number>(0);
  const drawProgressRef = useRef<number>(0); // how much of the line is drawn (0 to 1)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#009FE3';

    const points: { x: number; y: number }[] = [];

    // Create a smooth flowing path from left going down then looping around middle
    const createInitialPath = () => {
      points.length = 0;
      const steps = 50;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * Math.PI * 2;
        const x = width * 0.2 + Math.sin(angle * 1.2) * width * 0.3 * t;
        const y = height * 0.1 + t * height * 0.8 + Math.cos(angle) * 80;
        points.push({ x, y });
      }
    };

    const draw = (progress = 1) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      const total = Math.floor(points.length * progress);
      if (total < 2) return;

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < total - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.stroke();
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const prevScroll = previousScrollRef.current;
      const delta = currentScroll - prevScroll;

      // Update drawing progress based on scroll direction
      const direction = delta > 0 ? 1 : -1;
      drawProgressRef.current += direction * 0.02;

      // Clamp between 0 and 1
      drawProgressRef.current = Math.max(0, Math.min(1, drawProgressRef.current));

      previousScrollRef.current = currentScroll;
      draw(drawProgressRef.current);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createInitialPath();
      draw(drawProgressRef.current);
    };

    createInitialPath();
    draw();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      {/* Scrollable content for demo */}
      <div className="h-[2000px] bg-transparent"/>
    </>
  );
}
