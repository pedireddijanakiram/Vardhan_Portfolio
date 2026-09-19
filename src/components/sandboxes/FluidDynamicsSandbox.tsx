'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Waves, Sparkles, RefreshCw, Disc } from 'lucide-react';

interface Props {
  isExpanded?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const FluidDynamicsSandbox: React.FC<Props> = ({ isExpanded = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'cyan' | 'amber' | 'emerald'>('cyan');
  const [flowMode, setFlowMode] = useState<'vortex' | 'ripple'>('vortex');
  const mousePosRef = useRef<{ x: number; y: number; isDown: boolean; prevX: number; prevY: number }>({
    x: 0,
    y: 0,
    isDown: false,
    prevX: 0,
    prevY: 0,
  });

  const getThemePalette = (t: 'cyan' | 'amber' | 'emerald') => {
    switch (t) {
      case 'amber':
        return ['#f59e0b', '#fbbf24', '#f97316', '#ef4444'];
      case 'emerald':
        return ['#10b981', '#34d399', '#059669', '#06b6d4'];
      case 'cyan':
      default:
        return ['#00f0ff', '#38bdf8', '#818cf8', '#c084fc'];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const maxParticles = isExpanded ? 350 : 200;
    const palette = getThemePalette(theme);

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 80,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: Math.random() * 2 + 1,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      // Subtle trail persistence
      ctx.fillStyle = 'rgba(7, 7, 10, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const m = mousePosRef.current;
      const mouseDx = m.x - m.prevX;
      const mouseDy = m.y - m.prevY;
      m.prevX = m.x;
      m.prevY = m.y;

      particles.forEach((p) => {
        p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.vx = (Math.random() - 0.5) * 1.5;
          p.vy = (Math.random() - 0.5) * 1.5;
          p.life = 0;
        }

        // Fluid swirl force around center or mouse
        const targetX = m.x > 0 ? m.x : canvas.width / 2;
        const targetY = m.y > 0 ? m.y : canvas.height / 2;
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < 180) {
          const force = (180 - dist) / 180;
          if (flowMode === 'vortex') {
            // Tangential rotational force
            p.vx += (-dy / dist) * force * 1.2;
            p.vy += (dx / dist) * force * 1.2;
          } else {
            // Repulsion wave
            p.vx -= (dx / dist) * force * 2.5;
            p.vy -= (dy / dist) * force * 2.5;
          }

          // Direct velocity drag if mouse moving fast
          if (Math.abs(mouseDx) > 1 || Math.abs(mouseDy) > 1) {
            p.vx += mouseDx * 0.08;
            p.vy += mouseDy * 0.08;
          }
        }

        // Natural turbulent noise
        p.vx += Math.sin(frame * 0.02 + p.y * 0.05) * 0.1;
        p.vy += Math.cos(frame * 0.02 + p.x * 0.05) * 0.1;

        // Friction dampening
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with glow
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, alpha * 0.85);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [theme, flowMode, isExpanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    mousePosRef.current.x = (e.clientX - rect.left) * scaleX;
    mousePosRef.current.y = (e.clientY - rect.top) * scaleY;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.x = -100;
    mousePosRef.current.y = -100;
  };

  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#07070a] rounded-xl overflow-hidden border border-white/10 flex flex-col font-mono text-xs select-none">
      {/* Top Controls Header */}
      <div className="relative z-10 flex items-center justify-between px-3 py-2 bg-[#0c0c12]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-zinc-200">Fluid Navier-Stokes Field</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowMode(flowMode === 'vortex' ? 'ripple' : 'vortex')}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-zinc-300 transition-colors"
          >
            {flowMode === 'vortex' ? 'Mode: Swirl' : 'Mode: Ripple'}
          </button>
          <div className="flex items-center gap-1">
            {(['cyan', 'amber', 'emerald'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  theme === t ? 'scale-125 border-white' : 'border-transparent opacity-60'
                } ${
                  t === 'cyan' ? 'bg-cyan-400' : t === 'amber' ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
                title={`Theme ${t}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Fluid Canvas */}
      <div className="flex-1 relative flex items-center justify-center cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={isExpanded ? 580 : 380}
          height={isExpanded ? 240 : 170}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Telemetry */}
      <div className="relative z-10 px-3 py-1.5 bg-[#09090d]/90 backdrop-blur-md border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
        <span>Hover or drag cursor to create velocity vortices</span>
        <span className="text-cyan-400 font-mono">60 FPS · 350 Particles</span>
      </div>
    </div>
  );
};
