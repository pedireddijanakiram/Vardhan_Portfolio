'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ArrowUpRight, CheckCircle2, Play } from 'lucide-react';
import { VideoProject } from '@/data/projects';
import { NativeVideoPlayer } from '../video/NativeVideoPlayer';

interface Props {
  project: VideoProject;
  onInspect: (project: VideoProject) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onInspect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-3xl bg-[#0c0c14] border border-black/10 dark:border-white/10 hover:border-cyan-400/40 overflow-hidden shadow-2xl transition-all duration-500"
    >
      {/* Top Card Header */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/15 px-3 py-0.5 rounded-full border border-cyan-500/30 font-bold tracking-wider">
            {project.formatBadge}
          </span>
          <span className="text-xs font-mono text-zinc-400">/ {project.client}</span>
        </div>

        {/* Action Button to Expand Cinema Stage */}
        <button
          onClick={() => onInspect(project)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-cyan-500/20 text-zinc-200 hover:text-cyan-300 border border-white/15 hover:border-cyan-400/50 text-xs font-medium transition-all shadow-sm"
          aria-label={`Open Cinema Stage for ${project.title}`}
        >
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Cinema View</span>
        </button>
      </div>

      {/* Integrated Native Video Viewport with Exact Frame Fitting */}
      <div className="relative w-full p-4 sm:p-6 bg-gradient-to-b from-[#08080e] via-[#050508] to-[#07070b] flex items-center justify-center overflow-hidden">
        <div className="w-full flex items-center justify-center">
          <NativeVideoPlayer project={project} onInspect={() => onInspect(project)} />
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 border-t border-white/10 bg-[#0c0c14]">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3
              onClick={() => onInspect(project)}
              className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-medium">{project.runtime}</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Focus & Deliverables */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {project.toolchain.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] text-zinc-200 font-mono"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {project.role}
            </span>
            <button
              onClick={() => onInspect(project)}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1"
            >
              Details &rarr;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
