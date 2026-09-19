'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Copy,
  Check,
  Clock,
  ArrowUp,
  Phone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon, LinkedinIcon, XTwitterIcon } from './ui/Icons';
import { useToast } from './ui/Toast';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const email = 'vardhanpedireddi@gmail.com';
  const phone = '+918465079293';
  const phoneDisplay = '+91 84650 79293';
  const whatsappUrl = 'https://wa.me/918465079293?text=Hi%20Vardhan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20video%20project!';

  // Real-time IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!', 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    showToast('Phone number copied to clipboard!', 'success');
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full border-t border-white/10 bg-[#07070c] pt-24 pb-12 overflow-hidden text-zinc-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big Call to Action (Apple style) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Let&apos;s Build Your Audience</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Ready to create content{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                that actually converts?
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Let&apos;s talk about your project. Direct WhatsApp chat, phone call, or email — quick response times,
              collaborative revisions, and zero agency fluff.
            </p>

            {/* Direct Contact Badges (Dark high-contrast pills) */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12121c] hover:bg-[#181826] border border-white/15 text-zinc-100 transition-colors shadow-md"
                title="Click to copy phone number"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{phoneDisplay}</span>
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
              </button>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12121c] hover:bg-[#181826] border border-white/15 text-zinc-100 transition-colors shadow-md"
                title="Click to copy email address"
              >
                <span>{email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-xl shadow-emerald-600/20"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${email}?subject=Project%20Inquiry%20-%20Video%20Editing%20%26%20Creative`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black hover:bg-cyan-300 font-semibold text-sm transition-all shadow-lg"
            >
              <span>Send an Email</span>
              <Send className="w-4 h-4" />
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#151522] hover:bg-[#1e1e30] border border-white/15 text-white font-medium text-sm transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Direct</span>
            </a>
          </div>
        </div>

        {/* Channels, Location & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-white/10 text-xs font-mono">
          {/* Column 1: Timezone */}
          <div className="space-y-2">
            <div className="text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Operating Studio Time</span>
            </div>
            <div className="text-white text-lg font-bold" suppressHydrationWarning>
              {currentTime ? `${currentTime} IST` : '18:00:00 IST'}
            </div>
            <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>India · Available for Remote &amp; On-Site Shoots</span>
            </div>
          </div>

          {/* Column 2: Social Connects */}
          <div className="space-y-2">
            <div className="text-zinc-400 uppercase tracking-wider font-bold">Direct Channels</div>
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-200 hover:text-emerald-400 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp ({phoneDisplay})</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 text-zinc-200 hover:text-cyan-300 transition-colors"
              >
                <span>{email}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Column 3: Quality Commitment */}
          <div className="space-y-2">
            <div className="text-zinc-400 uppercase tracking-wider font-bold">Freelance Deliverables</div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Video edits, kinetic motion graphics, on-location shooting, high-CTR posters, logo design,
              and social media management tailored to grow your brand reach.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Vardhan Pedireddi. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
