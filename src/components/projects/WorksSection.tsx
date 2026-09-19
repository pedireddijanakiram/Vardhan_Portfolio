'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Clapperboard, Film, Sparkles, Play } from 'lucide-react';
import { VIDEO_PROJECTS, VideoProject } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { DirectorsReelItem } from './DirectorsReelItem';
import { CinemaStageModal } from '../video/CinemaStageModal';

export const WorksSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'reel'>('grid');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [inspectingProject, setInspectingProject] = useState<VideoProject | null>(null);

  const filterTabs = [
    { label: 'All Projects', value: 'All' },
    { label: '9:16 Vertical Reels', value: '9:16 Vertical' },
    { label: 'Commercials & Ads', value: 'Commercial' },
    { label: 'Social / Shorts', value: 'Social / Shorts' },
    { label: 'Cinematic / Narrative', value: 'Narrative' },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return VIDEO_PROJECTS;
    return VIDEO_PROJECTS.filter((p) => {
      if (p.formatBadge === activeFilter) return true;
      if (p.category === activeFilter) return true;
      return false;
    });
  }, [activeFilter]);

  return (
    <section id="works" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0c14] border border-black/10 dark:border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3 shadow-md">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Portfolio &amp; Client Cuts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Selected Work &amp; Viral Reels
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Hover over any project to preview frames instantly without buffering.
            Click any reel to enter the full cinema lightbox with frame-by-frame jog and sound controls.
          </p>
        </div>

        {/* View Mode Switcher + Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Reel Mode Switcher: Grid View vs Director's Reel */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#0c0c14] border border-black/10 dark:border-white/10 shadow-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Compact Card Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => setViewMode('reel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'reel'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Full-Width Cinematic Stack"
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Reel View</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0c0c14] border border-black/10 dark:border-white/10 overflow-x-auto max-w-full shadow-xl">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === tab.value
                    ? 'bg-white/20 text-white border border-white/30 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspect={(p) => setInspectingProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Director's Reel Full-Width Mode */
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <DirectorsReelItem
                key={project.id}
                project={project}
                onInspect={(p) => setInspectingProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Cinema Stage Lightbox Modal */}
      <CinemaStageModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </section>
  );
};
