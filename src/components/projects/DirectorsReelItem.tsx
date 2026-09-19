'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, SplitSquareVertical, Sliders, Film, ArrowUpRight } from 'lucide-react';
import { VideoProject } from '@/data/projects';
import { NativeVideoPlayer } from '../video/NativeVideoPlayer';

interface Props {
  project: VideoProject;
  onInspect: (project: VideoProject) => void;
}

export const DirectorsReelItem: React.FC<Props> = ({ project, onInspect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-3xl bg-[#0c0c14] overflow-hidden border border-black/10 dark:border-white/15 p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl text-white transition-all"
    >
      {/* Top Reel Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
            {project.formatBadge}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-mono text-zinc-400">
            {project.client}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">Runtime: {project.runtime}</span>
          <button
            onClick={() => onInspect(project)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 text-cyan-300 hover:bg-cyan-500/20 border border-white/15 text-xs font-medium transition-all shadow-sm"
          >
            <span>Launch Cinema Stage</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full-Width Cinema Video Player (Plays on Viewport Intersection) */}
      <div className={`relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 ${
        project.aspectRatio === '9:16'
          ? 'py-6 flex items-center justify-center bg-radial from-[#12121e] via-[#09090e] to-[#040406]'
          : ''
      }`}>
        <div className={project.aspectRatio === '9:16' ? 'w-full max-w-sm mx-auto' : 'w-full'}>
          <NativeVideoPlayer
            project={project}
            isReelMode={true}
            onInspect={() => onInspect(project)}
          />
        </div>
      </div>

      {/* Metadata & Creative Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-baseline gap-3">
            <h3
              onClick={() => onInspect(project)}
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-2"
            >
              {project.title}
              <ArrowUpRight className="w-5 h-5 text-cyan-400" />
            </h3>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#12121c] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                Editorial Pacing
              </span>
              <p className="text-xs text-zinc-300 line-clamp-3">{project.editorialApproach}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#12121c] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-semibold">
                Color Grade Science
              </span>
              <p className="text-xs text-zinc-300 line-clamp-3">{project.colorApproach}</p>
            </div>
          </div>
        </div>

        {/* Technical Delivery Specifications */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#08080d] border border-white/10 font-mono text-xs space-y-3 flex flex-col justify-between shadow-xl">
          <div className="space-y-2">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider pb-1 border-b border-white/10 font-bold">
              Production &amp; Specs Pipeline
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-zinc-400">Toolchain:</span>
              <span className="text-cyan-300 text-right truncate max-w-[200px]">
                {project.toolchain.join(', ')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-zinc-400">Aspect Ratio:</span>
              <span className="text-emerald-400 text-right truncate max-w-[200px]">
                {project.aspectRatio}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-zinc-400">Resolution:</span>
              <span className="text-white font-bold">{project.metrics.resolution}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Master Codec:</span>
              <span className="text-cyan-400 font-bold">{project.metrics.codec}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            {project.toolchain.map((tool, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
