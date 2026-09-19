'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [phaseText, setPhaseText] = useState('INITIALIZING TIMELINE');

  useEffect(() => {
    // Quick, high-polish progress increment over ~1.1s
    const startTime = performance.now();
    const duration = 1100; // 1.1s total

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setPhaseText('CALIBRATING 4K CANVASES');
      } else if (pct < 65) {
        setPhaseText('ALIGNING RETENTION CUTS');
      } else if (pct < 95) {
        setPhaseText('BUFFERING ZERO-LATENCY PREVIEWS');
      } else {
        setPhaseText('SYSTEM READY');
      }

      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 120);
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
          }}
          className="fixed inset-0 z-[1000] flex flex-col justify-between p-6 sm:p-12 bg-[#060608] text-white select-none pointer-events-auto"
        >
          {/* Top Bar: Rec Indicator & Frame Rate */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <span className="text-rose-400 font-bold tracking-wider">REC // 4K 60FPS</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-400">
              <span>COLOR: REC.709</span>
              <span>AUDIO: 48kHz 24-BIT</span>
              <span className="text-cyan-400">VP·DIRECTOR CUT</span>
            </div>

            {/* Audio Bars */}
            <div className="flex items-end gap-0.5 h-4">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.8].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['20%', `${height * 100}%`, '20%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Center Brand & Progress Display */}
          <div className="my-auto text-center max-w-lg mx-auto w-full space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs uppercase tracking-widest shadow-md"
            >
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vardhan Pedireddi</span>
            </motion.div>

            {/* Giant Big Percentage Counter */}
            <div className="relative">
              <div className="text-7xl sm:text-9xl font-black font-mono tracking-tighter text-white tabular-nums">
                {progress}
                <span className="text-2xl sm:text-4xl text-cyan-400 font-bold ml-1">%</span>
              </div>
            </div>

            {/* Thin High-Precision Progress Bar */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Phase Status & Timecode */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="tracking-wider">{phaseText}</span>
              </div>
              <div className="text-zinc-300 font-bold">
                00:00:0{Math.floor(progress / 25)}:{String((progress * 2) % 60).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Skip Hint / Creator Footnote */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-4">
            <span>CREATIVE VIDEO SUITE &amp; GROWTH LAB</span>
            <button
              onClick={() => {
                setIsFinished(true);
                onComplete?.();
              }}
              className="text-zinc-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Enter Site &rarr;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
