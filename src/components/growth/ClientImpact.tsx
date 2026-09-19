'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Eye,
  Clock,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const ClientImpact: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Concept & Media Capture',
      desc: 'You send raw video files, or we coordinate an on-location shoot. We outline the hook, narrative pacing, and platform target.',
      tag: 'Shoot / Pre-Production',
    },
    {
      num: '02',
      title: 'Editing, Motion & Sound Magic',
      desc: 'Removing dead-space, crafting snappy jump cuts, animating kinetic subtitles, and layering punchy audio sound effects.',
      tag: 'Post-Production',
    },
    {
      num: '03',
      title: 'Export, SEO & Business Reach',
      desc: 'Delivered in pristine 9:16 mobile masters with thumbnail artwork and SEO tags calibrated for maximum algorithmic reach.',
      tag: 'Growth & ROI',
    },
  ];

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <section id="impact" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0c14] border border-black/10 dark:border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4 shadow-md">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Growth Formula</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          How Great Edits Drive Real Reach
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mt-4 leading-relaxed">
          In a world where audiences swipe in 1.5 seconds, passive videos get ignored.
          Every cut, caption, and sound effect is engineered to keep eyes glued to your brand.
        </p>
      </div>

      {/* 3-Step Simple Collaboration Journey (Dark luxury boxes on light/dark canvas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-black/10 dark:border-white/10 hover:border-cyan-400/40 shadow-2xl transition-all duration-300 flex flex-col justify-between text-white"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-black font-mono text-white/25 group-hover:text-cyan-400/50 transition-colors">
                  {step.num}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-cyan-300">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Collaboration &amp; Rapid Revisions</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Before & After Transformation Demo (Dark high-contrast box) */}
      <div className="relative rounded-3xl bg-[#0c0c14] border border-black/10 dark:border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Visual Transformation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Raw Footage vs. Retention Edit
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Drag the interactive slider to see how raw clips are transformed into dynamic, polished deliverables with punchy kinetic text, vibrant color correction, and audio emphasis.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-zinc-400">Before:</span> Flat audio, dialogue pauses, low engagement.
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-zinc-400">After:</span> Tight cuts, kinetic titles, high watch-time.
              </div>
            </div>
          </div>

          {/* Right Interactive Visual Split Demonstration */}
          <div className="lg:col-span-7">
            <div
              onMouseMove={isDragging ? handleDrag : undefined}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchMove={handleDrag}
              onClick={handleDrag}
              className="relative aspect-[16/9] w-full max-w-xl mx-auto rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl bg-black"
            >
              {/* After Layer (Full Polished) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0e1628] via-[#090e1c] to-[#04060c] flex flex-col items-center justify-center p-6 text-center">
                <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-mono uppercase mb-3 animate-pulse">
                  ✦ Retention-Engineered Edit
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                  &ldquo;Hook them in 2 seconds.&rdquo;
                </div>
                <div className="text-xs text-zinc-300 mt-2 font-mono flex items-center gap-2">
                  <span className="text-emerald-400">● Kinetic Captions</span>
                  <span className="text-cyan-400">● Color Pop</span>
                  <span className="text-purple-400">● Sound FX</span>
                </div>
              </div>

              {/* Before Layer (Clipped via sliderPos) */}
              <div
                className="absolute inset-0 bg-[#121214] flex flex-col items-center justify-center p-6 text-center border-r border-white/50"
                style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
              >
                <div className="w-[500px] flex flex-col items-center justify-center">
                  <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-400 text-xs font-mono uppercase mb-3">
                    Raw Unedited Recording
                  </div>
                  <div className="text-xl sm:text-2xl font-normal text-zinc-500 tracking-tight">
                    &ldquo;Um, so basically today...&rdquo;
                  </div>
                  <div className="text-xs text-zinc-600 mt-2 font-mono">
                    No Captions · Flat Color · Low Retention
                  </div>
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_white] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/90 border border-white/50 flex items-center justify-center text-white shadow-xl">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between text-[10px] font-mono text-zinc-400 pointer-events-none">
                <span>&larr; Raw File</span>
                <span>Final Polish &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
