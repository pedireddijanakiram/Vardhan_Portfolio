'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Video,
  Image as ImageIcon,
  PenTool,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Eye,
  Zap,
} from 'lucide-react';

interface Pillar {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  headline: string;
  description: string;
  capabilities: string[];
  metrics: string;
  spanCol: string;
  accentColor: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'video-editing',
    icon: Scissors,
    title: 'High-Retention Video Editing',
    badge: 'Core Superpower',
    headline: 'Pacing that hooks viewers in 3 seconds and holds them until the final frame.',
    description:
      'Fast-moving commercial cuts, viral Instagram Reels, YouTube long-form, and brand stories. Precision jump-cuts, elimination of dialogue dead-space, audio-beat sync, and psychological retention hooks.',
    capabilities: [
      'Reels, Shorts & TikToks',
      'YouTube Long-Form & Documentaries',
      'Commercial Ads & Product Cuts',
      'Speech Gap Trimming & Beat Sync',
    ],
    metrics: '92%+ Watch-Time Retention Focus',
    spanCol: 'lg:col-span-8',
    accentColor: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  },
  {
    id: 'motion-graphics',
    icon: Sparkles,
    title: 'Kinetic Motion Graphics & VFX',
    badge: 'Visual Punch',
    headline: 'Dynamic typographic animations and eye-catching graphic accents.',
    description:
      'Animated subtitles with custom emphasis styling, logo stingers, animated charts, 3D title tracking, and clean graphic callouts that give every video a high-budget broadcast feel.',
    capabilities: [
      'Animated Kinetic Captions',
      'Logo Intros & Stinger Reveals',
      '2D/3D Graphic Overlays',
      'Lower Thirds & Callout UI',
    ],
    metrics: '60fps Butter-Smooth Animations',
    spanCol: 'lg:col-span-4',
    accentColor: 'from-purple-500/20 via-pink-500/10 to-transparent',
  },
  {
    id: 'video-shooting',
    icon: Video,
    title: 'On-Location Shooting & Cinematography',
    badge: 'Production',
    headline: 'Crisp camera work, cinematic lighting, and studio-grade audio capture.',
    description:
      'On-site video production for brand commercials, customer testimonials, executive interviews, and events. Multi-angle camera setups, directional lighting, and wireless microphone recording.',
    capabilities: [
      'Commercial & Ad Shoots',
      'Customer Review Testimonials',
      'Event Highlights & Coverage',
      'Multi-Mic Studio Audio',
    ],
    metrics: '4K Ultra-HD Native Capture',
    spanCol: 'lg:col-span-4',
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'poster-design',
    icon: ImageIcon,
    title: 'High-CTR Posters & Graphic Design',
    badge: 'Visual Marketing',
    headline: 'Thumbnails and posters designed with one goal: commanding the click.',
    description:
      'Click-worthy YouTube thumbnails, event posters, social media banners, marketing collateral, and digital ad graphics engineered with high-contrast composition that stops the endless scroll.',
    capabilities: [
      'High-CTR YouTube Thumbnails',
      'Event & Film Posters',
      'Social Media Ad Creatives',
      'Marketing Banners & Assets',
    ],
    metrics: 'Engineered for Maximum CTR',
    spanCol: 'lg:col-span-4',
    accentColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'logo-branding',
    icon: PenTool,
    title: 'Logo Design & Brand Identity',
    badge: 'Identity',
    headline: 'Memorable brand logos and aesthetic visual guidelines.',
    description:
      'Minimalist, iconic logos crafted to work across social avatars, video watermarks, merchandise, and website headers. Complete color palette selection and typography rules for your brand.',
    capabilities: [
      'Vector Logo Marks',
      'Brand Color Palettes',
      'Typography Hierarchy',
      'Watermarks & Brand Kits',
    ],
    metrics: 'Versatile Vector Assets',
    spanCol: 'lg:col-span-4',
    accentColor: 'from-rose-500/20 via-red-500/10 to-transparent',
  },
  {
    id: 'social-seo',
    icon: TrendingUp,
    title: 'Social Media Management, SEO & Reach',
    badge: 'Business ROI',
    headline: 'Not just making videos look good — making sure they actually get discovered.',
    description:
      'Handling social media profiles, strategic publishing schedules, YouTube & Instagram SEO keyword optimization, viral hook testing, and audience engagement to turn views into tangible business leads.',
    capabilities: [
      'YouTube & Instagram SEO Tags',
      'Viral Content Calendar Strategy',
      'Handle Management & Growth',
      'Audience-to-Client Conversion',
    ],
    metrics: 'Organic Reach & Lead Generation',
    spanCol: 'lg:col-span-12',
    accentColor: 'from-cyan-500/15 via-emerald-500/10 to-transparent',
  },
];

export const CreativePillars: React.FC = () => {
  return (
    <section id="services" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0c14] border border-black/10 dark:border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4 shadow-md">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full Creative &amp; Digital Suite</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          Crafted For Attention.<br />
          <span className="bg-gradient-to-r from-cyan-600 via-zinc-800 to-zinc-600 dark:from-cyan-300 dark:via-white dark:to-zinc-400 bg-clip-text text-transparent">
            Built For Real Business Reach.
          </span>
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mt-4 leading-relaxed">
          From cutting fast-paced viral reels and kinetic motion graphics to on-location video shooting,
          poster design, and full social media growth — here is what I deliver for creators and businesses.
        </p>
      </div>

      {/* Apple Bento Grid Showcase (Dark luxury boxes on light/dark canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-3xl p-6 sm:p-8 bg-[#0c0c14] border border-black/10 dark:border-white/10 hover:border-cyan-400/40 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between ${pillar.spanCol}`}
            >
              {/* Subtle top-corner gradient sheen */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              <div className="relative z-10 space-y-4">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-300 uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title & Headline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-300 mt-1">
                    {pillar.headline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Capability Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/10">
                  {pillar.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Result Pill */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {pillar.metrics}
                </span>
                <a href="#contact" className="text-zinc-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Inquire &rarr;
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
