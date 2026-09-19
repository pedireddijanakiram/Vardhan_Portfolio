'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, Activity, Eye, SplitSquareVertical } from 'lucide-react';

interface Props {
  videoSrc: string;
  camera: string;
  colorSpace: string;
  lut: string;
  lenses: string;
  isPlaying?: boolean;
}

export const ColorGradeSplitSlider: React.FC<Props> = ({
  videoSrc,
  camera,
  colorSpace,
  lut,
  lenses,
  isPlaying = true,
}) => {
  const [splitPos, setSplitPos] = useState(50); // percentage 0 - 100
  const [showScopes, setShowScopes] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const videoLeftRef = useRef<HTMLVideoElement>(null);
  const videoRightRef = useRef<HTMLVideoElement>(null);
  const scopeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Keep both videos in frame-accurate sync
  useEffect(() => {
    const vLeft = videoLeftRef.current;
    const vRight = videoRightRef.current;
    if (!vLeft || !vRight) return;

    const syncVideos = () => {
      if (Math.abs(vLeft.currentTime - vRight.currentTime) > 0.08) {
        vRight.currentTime = vLeft.currentTime;
      }
    };

    vLeft.addEventListener('timeupdate', syncVideos);
    return () => vLeft.removeEventListener('timeupdate', syncVideos);
  }, []);

  // Handle play/pause state
  useEffect(() => {
    const vLeft = videoLeftRef.current;
    const vRight = videoRightRef.current;
    if (!vLeft || !vRight) return;

    vLeft.muted = true;
    vRight.muted = true;

    if (isPlaying) {
      vLeft.play().catch(() => {});
      vRight.play().catch(() => {});
    } else {
      vLeft.pause();
      vRight.pause();
    }
  }, [isPlaying, videoSrc]);

  // Drag divider handling
  const updateSplit = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitPos(pct);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    updateSplit(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      updateSplit(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Real-time RGB Parade / Waveform Scope simulation on canvas
  useEffect(() => {
    if (!showScopes) return;
    const canvas = scopeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const drawScope = () => {
      phase += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw IRE Graticule lines (0, 50, 100 IRE)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      [0.1, 0.5, 0.9].forEach((frac) => {
        ctx.beginPath();
        ctx.moveTo(0, h * frac);
        ctx.lineTo(w, h * frac);
        ctx.stroke();
      });

      // Split scope: left is Log (compressed dynamic range), right is Rec709 (expanded contrast)
      const dividerX = (w * splitPos) / 100;

      // Left Channel: Log Waveform (Green/Cyan, tight middle cluster)
      ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
      for (let i = 0; i < dividerX; i += 3) {
        const val = Math.sin(phase + i * 0.1) * 0.2 + 0.5; // clustered around 50 IRE
        const y = val * (h * 0.5) + h * 0.25;
        ctx.fillRect(i, y, 1.5, Math.random() * 8 + 4);
      }

      // Right Channel: Rec.709 Waveform (Expanded Red/Green/Blue Parade, reaching from 0 to 100 IRE)
      ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
      for (let i = dividerX; i < w; i += 3) {
        const val = Math.sin(phase * 1.2 + i * 0.08) * 0.42 + 0.5; // reaches deep shadows and bright peaks
        const y = val * (h * 0.8) + h * 0.1;
        ctx.fillRect(i, y, 1.5, Math.random() * 12 + 6);
      }

      animId = requestAnimationFrame(drawScope);
    };

    drawScope();
    return () => cancelAnimationFrame(animId);
  }, [showScopes, splitPos]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-full min-h-[380px] bg-black rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10"
    >
      {/* Background Video: Rec.709 / Final Grade (Full frame, revealed on right) */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRightRef}
          src={videoSrc}
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter contrast-[1.2] saturate-[1.28] brightness-[0.98]"
        />
        {/* Badge for Rec.709 */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>REC.709 / FINAL FILM PRINT</span>
        </div>
      </div>

      {/* Foreground Video: Flat Camera RAW / LOG (Clipped by splitPos) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
        style={{ width: `${splitPos}%` }}
      >
        <div className="relative w-full h-full" style={{ width: '100%' }}>
          <video
            ref={videoLeftRef}
            src={videoSrc}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter saturate-[0.25] contrast-[0.65] brightness-[1.2]"
            style={{
              width: containerRef.current ? containerRef.current.clientWidth : '100%',
              maxWidth: 'none',
            }}
          />
        </div>

        {/* Badge for RAW / S-Log */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>CAMERA RAW / LOG PROFILE</span>
        </div>
      </div>

      {/* Split Divider Handle */}
      <div
        className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ left: `${splitPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        <div className="absolute w-8 h-8 rounded-full bg-black/90 border border-white/40 backdrop-blur-md flex items-center justify-center shadow-2xl text-white">
          <SplitSquareVertical className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      {/* Bottom Floating Telemetry & Scope Display */}
      <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-auto flex flex-wrap items-center justify-between gap-3 bg-black/80 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Sensor:</span>
            <span className="text-white font-bold">{camera}</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Color Space:</span>
            <span className="text-cyan-400">{colorSpace}</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Target LUT:</span>
            <span className="text-emerald-400">{lut}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScopes(!showScopes)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
              showScopes
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{showScopes ? 'Hide Scopes' : 'Show Scopes'}</span>
          </button>
        </div>
      </div>

      {/* Mini Scopes Overlay (Bottom Left) */}
      {showScopes && (
        <div className="absolute bottom-16 left-4 z-30 pointer-events-none p-2 rounded-lg bg-black/85 backdrop-blur-md border border-white/15">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-1">
            <span>RGB WAVEFORM SCOPE (100 IRE)</span>
            <span className="text-cyan-400">Live Telemetry</span>
          </div>
          <canvas ref={scopeCanvasRef} width={220} height={70} className="w-[220px] h-[70px] rounded" />
        </div>
      )}
    </div>
  );
};
