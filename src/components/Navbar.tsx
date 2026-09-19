'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Send, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGrain } from './ui/GrainContext';
import { useTheme } from './ui/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { grainEnabled, toggleGrain } = useGrain();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = soundEnabled ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(soundEnabled ? 320 : 640, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // AudioContext unavailable
    }
    setSoundEnabled(!soundEnabled);
  };

  const navLinks = [
    { label: 'Featured Reels', href: '#works' },
    { label: 'Services & Talents', href: '#services' },
    { label: 'Growth Process', href: '#impact' },
    { label: 'Get in Touch', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 sm:py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 py-2.5 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0c14]/95 backdrop-blur-2xl border-white/20 shadow-2xl py-2'
            : 'bg-[#0e0e16]/90 backdrop-blur-xl border-white/15 shadow-xl'
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-2 group font-bold tracking-tight text-sm text-white"
        >
          <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-xs font-black text-black shadow-md group-hover:scale-105 transition-transform">
            V
          </span>
          <span className="font-sans font-semibold text-white group-hover:text-cyan-300 transition-colors">
            Vardhan<span className="text-cyan-400 font-mono text-xs">.creative</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Status + Noise Toggle + Contact Button */}
        <div className="flex items-center gap-2.5">
          {/* Film Grain Toggle */}
          <button
            onClick={toggleGrain}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono transition-all ${
              grainEnabled
                ? 'bg-white/10 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title="Toggle Film Grain Overlay"
            aria-label="Toggle Film Grain"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${grainEnabled ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-500'}`} />
            <span>Grain: {grainEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-white/15 hover:border-cyan-400/60 bg-white/10 text-zinc-200 hover:text-white transition-all shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-full border transition-colors ${
              soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute sound feedback' : 'Enable sound feedback'}
            aria-label="Toggle sound feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-cyan-300 transition-colors shadow-sm"
          >
            <span>Hire Me</span>
            <Send className="w-3 h-3" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto md:hidden fixed top-20 left-4 right-4 rounded-3xl border border-white/20 p-6 flex flex-col gap-4 text-sm z-50 bg-[#0c0c14]/98 backdrop-blur-2xl shadow-2xl text-white"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-200 hover:text-cyan-300 py-2 border-b border-white/10 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-2xl bg-cyan-400 text-black font-bold text-sm shadow-md"
            >
              Start a Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
