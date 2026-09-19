'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Volume2, Sparkles, RefreshCw, Maximize2 } from 'lucide-react';

interface Props {
  isExpanded?: boolean;
}

export const SpatialOsSandbox: React.FC<Props> = ({ isExpanded = false }) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'terminal'>('audio');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'aetheria --version', output: 'Aetheria OS v4.2.0 [Spatial Microkernel Initialized]' },
    { cmd: 'status', output: 'GPU Memory: 14.2MB | 60 FPS | Audio Engine: Active' },
  ]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Real-time Canvas Audio Spectrum Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = isExpanded ? 48 : 32;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / barCount - 2;

      phase += isPlayingAudio ? 0.05 : 0.005;

      for (let i = 0; i < barCount; i++) {
        // Multi-frequency harmonic wave
        const freq1 = Math.sin(phase + i * 0.25);
        const freq2 = Math.cos(phase * 0.8 + i * 0.15);
        const freq3 = Math.sin(phase * 1.5 + i * 0.08);

        const normalizedHeight = isPlayingAudio
          ? Math.max(0.12, (Math.abs(freq1 + freq2 + freq3) / 3) * 0.85 + 0.1)
          : 0.08;

        const barH = normalizedHeight * (height * 0.75);
        const x = i * (barWidth + 2);
        const y = height - barH - 8;

        // Gradient color for obsidian luxury
        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, '#00f0ff');
        grad.addColorStop(0.5, '#3b82f6');
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.2)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [3, 3, 0, 0]);
        ctx.fill();

        // Top glow cap
        if (isPlayingAudio && normalizedHeight > 0.4) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y - 2, barWidth, 1.5);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlayingAudio, isExpanded]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = 'Commands: help, status, bench, tech, clear, whoami';
        break;
      case 'status':
        output = 'Core: Stable | Latency: 0.9ms | Render: 60fps Native WebGL';
        break;
      case 'bench':
        output = 'Benchmark: 1,480,000 Ops/sec | 0 Frame Drops recorded';
        break;
      case 'tech':
        output = 'Stack: Next.js 15, WebAudio API, Custom Buffer Queues, Tailwind';
        break;
      case 'whoami':
        output = 'Vardhan Pedireddi — Creative Technologist & System Architect';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for instructions.`;
    }

    setTerminalHistory((prev) => [...prev.slice(-6), { cmd: terminalInput, output }]);
    setTerminalInput('');
  };

  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#07070a] rounded-xl overflow-hidden border border-white/10 flex flex-col font-mono text-xs select-none">
      {/* OS Top Navigation Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d0d12] border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[10px] text-zinc-400 font-sans tracking-wide">
            Aetheria v4.2 / Spatial Desktop
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors ${
              activeTab === 'audio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Activity className="w-3 h-3" />
            Audio FFT
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 transition-colors ${
              activeTab === 'terminal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Terminal className="w-3 h-3" />
            Terminal
          </button>
        </div>
      </div>

      {/* OS Viewport Content */}
      <div className="flex-1 relative flex flex-col p-3 overflow-hidden bg-radial from-[#12121c] via-[#08080c] to-[#050508]">
        {activeTab === 'audio' ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-zinc-300 font-sans">Synthesizer Harmonics: 44.1 kHz</span>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 border border-white/10"
              >
                {isPlayingAudio ? 'Mute Modulation' : 'Resume Waves'}
              </button>
            </div>

            {/* Visualizer Canvas */}
            <div className="my-auto h-28 relative flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={isExpanded ? 580 : 380}
                height={110}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottom telemetry line */}
            <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2">
              <span>Channel: Stereo Float32</span>
              <span className="text-cyan-400 font-mono">Decoupled VDOM Loop: 60.1 FPS</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px] text-zinc-300">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-cyan-400 flex items-center gap-1.5">
                    <span className="text-zinc-600">&gt;</span> {item.cmd}
                  </div>
                  <div className="text-zinc-400 pl-3 text-[10.5px] border-l border-white/10">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
              <span className="text-cyan-400">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'status', 'tech', 'whoami'..."
                className="flex-1 bg-transparent border-none text-zinc-200 text-[11px] focus:outline-none placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] rounded border border-cyan-500/30"
              >
                Run
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Floating OS Status Dock */}
      <div className="px-3 py-1.5 bg-[#0a0a0f] border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-400">Live Native Sandbox</span>
        </div>
        <span className="text-zinc-500">Interactive Canvas Engine</span>
      </div>
    </div>
  );
};
