"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawStars = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    drawStars();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      const canvas = canvasRef.current;
      if (canvas && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-300 mb-8">
          Oops! The page you&#39;re looking for could not be found.
        </p>
        <Link href="/">
          <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
