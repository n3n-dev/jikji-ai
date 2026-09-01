import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  colorEnd?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  flowScale?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [255, 255, 255];
}

interface ParticleState {
  width: number;
  height: number;
  mouse: { x: number; y: number };
  speed: number;
  color: string;
  startRgb: [number, number, number];
  endRgb: [number, number, number] | null;
  flowScale: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;

  constructor(private state: ParticleState) {
    this.x = Math.random() * state.width;
    this.y = Math.random() * state.height;
    this.vx = 0;
    this.vy = 0;
    this.age = 0;
    this.life = Math.random() * 400 + 200;
  }

  update() {
    const { width, height, mouse, speed, flowScale } = this.state;
    const angle =
      (Math.cos(this.x * flowScale + this.y * flowScale * 1.3) +
        Math.sin(this.y * flowScale * 0.9 - this.x * flowScale * 0.7)) *
      Math.PI;
    this.vx += Math.cos(angle) * 0.2 * speed;
    this.vy += Math.sin(angle) * 0.2 * speed;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 150;

    if (distance < interactionRadius) {
      const force = (interactionRadius - distance) / interactionRadius;
      this.vx -= dx * force * 0.05;
      this.vy -= dy * force * 0.05;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.95;
    this.vy *= 0.95;

    this.age++;
    if (this.age > this.life) {
      this.reset();
    }

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  reset() {
    const { width, height } = this.state;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = 0;
    this.vy = 0;
    this.age = 0;
    this.life = Math.random() * 400 + 200;
  }

  draw(context: CanvasRenderingContext2D) {
    const { color, endRgb, startRgb, width } = this.state;
    let fillColor = color;
    if (endRgb) {
      const t = this.x / width;
      const breakpoint = 0.85;
      let r, g, b;
      if (t <= breakpoint) {
        [r, g, b] = startRgb;
      } else {
        const localT = (t - breakpoint) / (1 - breakpoint);
        r = Math.round(startRgb[0] + (endRgb[0] - startRgb[0]) * localT);
        g = Math.round(startRgb[1] + (endRgb[1] - startRgb[1]) * localT);
        b = Math.round(startRgb[2] + (endRgb[2] - startRgb[2]) * localT);
      }
      fillColor = `rgb(${r}, ${g}, ${b})`;
    }
    context.fillStyle = fillColor;
    const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
    context.globalAlpha = alpha;
    context.fillRect(this.x, this.y, 2, 2);
  }
}

export default function NeuralBackground({
  className,
  color = '#6366f1',
  colorEnd,
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
  flowScale = 0.003,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state: ParticleState = {
      width: container.clientWidth,
      height: container.clientHeight,
      mouse: { x: -1000, y: -1000 },
      speed,
      color,
      startRgb: hexToRgb(color),
      endRgb: colorEnd ? hexToRgb(colorEnd) : null,
      flowScale,
    };

    let particles: Particle[] = [];
    let animationFrameId: number;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(state));
      }
    };

    const animate = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, state.width, state.height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      state.width = container.clientWidth;
      state.height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      state.mouse.x = -1000;
      state.mouse.y = -1000;
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, colorEnd, trailOpacity, particleCount, speed, flowScale]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full bg-black overflow-hidden',
        className,
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
