'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowDown,
  Sparkles,
  Scissors,
  Video,
  Image as ImageIcon,
  PenTool,
  TrendingUp,
  Play,
  MessageCircle,
} from 'lucide-react';

// Container variant to choreograph sequential cascade of landing blocks
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const blockVariant: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const pillCascadeVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Hero: React.FC = () => {
  const talents = [
    { label: 'Video Edits & Cuts', icon: Scissors, color: 'text-cyan-400' },
    { label: 'Kinetic Motion Graphics', icon: Sparkles, color: 'text-purple-400' },
    { label: 'On-Location Shooting', icon: Video, color: 'text-emerald-400' },
    { label: 'Posters & Thumbnails', icon: ImageIcon, color: 'text-amber-400' },
    { label: 'Logo & Brand Identity', icon: PenTool, color: 'text-rose-400' },
    { label: 'Social Media & SEO Reach', icon: TrendingUp, color: 'text-blue-400' },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
      {/* Ambient background glow orbs (Apple/OpenAI style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[340px] h-[340px] bg-purple-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Main Orchestrated Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Block 1: Status Pill Badge */}
        <motion.div
          variants={blockVariant}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0c0c14] border border-black/10 dark:border-white/15 text-emerald-400 text-xs font-mono mb-8 shadow-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="tracking-wide">Available for Freelance &amp; Creative Projects</span>
          <span className="text-zinc-400">· Worldwide &amp; Remote</span>
        </motion.div>

        {/* Block 2: Main Name & Value Proposition */}
        <motion.div variants={blockVariant} className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-950 dark:text-white select-none">
            <span className="inline-block hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors duration-300">
              Vardhan
            </span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 hover:from-cyan-500 hover:to-indigo-500 transition-all duration-500">
              Pedireddi
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight max-w-3xl mx-auto">
            Visuals That Hook.{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
              Edits That Grow Your Business.
            </span>
          </p>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-2 font-normal">
            Freelance video editor, motion designer, and visual creative based in India. I turn raw footage and brand ideas
            into viral short-form reels, high-converting commercial cuts, kinetic typography, posters, and organic digital reach.
          </p>
        </motion.div>

        {/* Block 3: Interactive Core Discipline Pills (Dark high-contrast objects) */}
        <motion.div
          variants={blockVariant}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto mt-8 mb-10"
        >
          {talents.map((t, idx) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={idx}
                variants={pillCascadeVariant}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0c14] hover:bg-[#161622] border border-black/10 dark:border-white/15 hover:border-cyan-400/50 text-zinc-200 hover:text-white text-xs font-mono transition-all cursor-default shadow-md"
              >
                <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                <span>{t.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Block 4: Hero Action Buttons */}
        <motion.div
          variants={blockVariant}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#works"
            className="px-7 py-3.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-cyan-300 font-semibold text-sm transition-all shadow-xl hover:shadow-cyan-500/25 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch Featured Reels</span>
          </a>

          <a
            href="#services"
            className="px-6 py-3.5 rounded-full bg-[#0c0c14] hover:bg-[#161622] border border-black/10 dark:border-white/15 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-md"
          >
            <span>What I Do</span>
            <ArrowDown className="w-4 h-4 text-cyan-400" />
          </a>

          <a
            href="https://wa.me/918465079293?text=Hi%20Vardhan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20project!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp Me</span>
          </a>
        </motion.div>

        {/* Block 5: Metric highlight dark box */}
        <motion.div
          variants={blockVariant}
          className="mt-14 p-5 sm:p-6 rounded-3xl bg-[#0c0c14] border border-black/10 dark:border-white/10 shadow-2xl grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl w-full mx-auto text-xs font-mono text-zinc-300"
        >
          <div>
            <div className="text-white font-bold text-sm sm:text-base">100% Mobile-Ready</div>
            <div className="text-[11px] text-zinc-400">9:16 Vertical &amp; 4K Masters</div>
          </div>
          <div>
            <div className="text-white font-bold text-sm sm:text-base">Retention-First</div>
            <div className="text-[11px] text-zinc-400">Fast-Paced Hook &amp; Cut Pacing</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-white font-bold text-sm sm:text-base">Full Spectrum</div>
            <div className="text-[11px] text-zinc-400">Shoot, Edit, Design &amp; Reach</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
