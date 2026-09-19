'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorksSection } from '@/components/projects/WorksSection';
import { CreativePillars } from '@/components/services/CreativePillars';
import { ClientImpact } from '@/components/growth/ClientImpact';
import { Footer } from '@/components/Footer';
import { CinematicLoader } from '@/components/ui/CinematicLoader';
import { SectionDeck } from '@/components/ui/SectionDeck';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[var(--bg-base)] text-[var(--text-base)] selection:bg-cyan-500 selection:text-black">
      {/* 00. Cinematic Preloader Landing Overlay */}
      <CinematicLoader />

      {/* Dynamic Navigation */}
      <Navbar />

      {/* Main Sections with 3D Scroll Collapsing & Card Deck Motion */}
      <main className="relative flex flex-col w-full overflow-hidden">
        {/* 01. Hero Section with Staggered Content Blocks Landing */}
        <SectionDeck id="hero" enableCollapse={true}>
          <Hero />
        </SectionDeck>

        {/* 02. Selected Works with Smooth Native FastStart Previews */}
        <SectionDeck id="works" enableCollapse={true}>
          <WorksSection />
        </SectionDeck>

        {/* 03. Creative Pillars & Talents (Apple Bento Grid) */}
        <SectionDeck id="services" enableCollapse={true}>
          <CreativePillars />
        </SectionDeck>

        {/* 04. Client Impact, Retention Graphs & Viral Transformation */}
        <SectionDeck id="impact" enableCollapse={true}>
          <ClientImpact />
        </SectionDeck>
      </main>

      {/* 05. Footer & Direct Freelance Contact */}
      <SectionDeck id="contact" enableCollapse={false}>
        <Footer />
      </SectionDeck>
    </div>
  );
}
