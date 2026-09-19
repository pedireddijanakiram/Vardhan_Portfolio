'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Layers,
  Sparkles,
  Film,
  Info,
  ExternalLink,
  SplitSquareVertical,
} from 'lucide-react';
import { VideoProject } from '@/data/projects';
import { formatSMPTE, formatMinutesSeconds } from '@/lib/timecode';
import { ColorGradeSplitSlider } from './ColorGradeSplitSlider';

interface Props {
  project: VideoProject | null;
  onClose: () => void;
}

export const CinemaStageModal: React.FC<Props> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cinema' | 'grade' | 'specs'>('cinema');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener: Space to toggle play/pause, Esc to close, Arrow keys for 1-frame jog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        jogFrame(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        jogFrame(1);
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isPlaying]);

  // Frame-by-frame jog helper (1 frame at 24fps = 1/24 second)
  const jogFrame = useCallback((frames: number) => {
    const video = videoRef.current;
    if (!video) return;
    const delta = frames * (1 / 24);
    video.currentTime = Math.max(0, Math.min(video.duration || 10, video.currentTime + delta));
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const video = videoRef.current;
    if (!video) return;
    video.volume = val;
    if (val === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!stageContainerRef.current) return;
    if (!document.fullscreenElement) {
      stageContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop blur with light dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
          aria-hidden="true"
        />

        {/* Floating Cinema Stage Shell */}
        <motion.div
          ref={stageContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-6xl h-[92vh] max-h-[880px] bg-[#07070a] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cinema-title"
        >
          {/* Top Cinema Stage Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <div>
                <h2 id="cinema-title" className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  {project.title}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono font-normal">
                    {project.formatBadge}
                  </span>
                </h2>
                <p className="text-xs text-zinc-400 hidden sm:block">
                  {project.role} · Client: {project.client} ({project.year})
                </p>
              </div>
            </div>

            {/* Stage Viewport Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
              <button
                onClick={() => setActiveTab('cinema')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'cinema'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cinema Master</span>
              </button>

              {project.hasColorGradeSlider && (
                <button
                  onClick={() => setActiveTab('grade')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'grade'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">LOG vs Rec.709</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'specs'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Specs & Toolchain</span>
              </button>
            </div>

            {/* Close Lightbox */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close cinema stage"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage Viewport */}
          <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 bg-radial from-[#0e0e14] via-[#07070a] to-[#040406] overflow-hidden">
            {activeTab === 'cinema' && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Cinema Screen Frame */}
                <div
                  className={`relative max-w-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black flex items-center justify-center ${
                    project.aspectRatio === '2.39:1'
                      ? 'aspect-[2.39/1] w-full max-w-5xl'
                      : project.aspectRatio === '9:16'
                      ? 'aspect-[9/16] h-[68vh]'
                      : 'aspect-[16/9] w-full max-w-4xl'
                  }`}
                >
                  <video
                    ref={videoRef}
                    src={project.videoSrc}
                    poster={project.poster}
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 10)}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Anamorphic Scope Letterbox subtle guide lines */}
                  {project.aspectRatio === '2.39:1' && (
                    <div className="absolute inset-0 pointer-events-none border-y border-white/5" />
                  )}
                </div>

                {/* Floating Frosted-Glass Cinema Player Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-40 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 shadow-2xl flex flex-col gap-2">
                  {/* Scrubber track */}
                  <div className="relative flex items-center w-full group">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.04}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    {/* Left: Play/Pause, Frame Jog */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-white hover:text-cyan-300 transition-all border border-white/10"
                        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      {/* Frame-by-Frame Jog Controls */}
                      <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                        <button
                          onClick={() => jogFrame(-1)}
                          className="px-2 py-1 text-[10px] text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5 border-r border-white/5"
                          title="Step Back 1 Frame (Left Arrow)"
                        >
                          <ChevronLeft className="w-3 h-3" />
                          <span>1f</span>
                        </button>
                        <button
                          onClick={() => jogFrame(1)}
                          className="px-2 py-1 text-[10px] text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5"
                          title="Step Forward 1 Frame (Right Arrow)"
                        >
                          <span>1f</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Precision SMPTE Timecode Display */}
                      <div className="px-2.5 py-1 rounded bg-black/50 border border-white/10 text-cyan-300 font-bold text-xs tracking-wider">
                        {formatSMPTE(currentTime, 24)}
                      </div>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-400 text-xs">
                        {formatMinutesSeconds(duration)}
                      </span>
                    </div>

                    {/* Right: Volume & Fullscreen */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleMute}
                          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-4 h-4 text-rose-400" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-cyan-400" />
                          )}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                      </div>

                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                        title="Toggle Fullscreen"
                      >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'grade' && project.hasColorGradeSlider && (
              <div className="w-full h-full max-w-5xl flex items-center justify-center">
                <ColorGradeSplitSlider
                  videoSrc={project.videoSrc}
                  camera={project.colorPipeline.camera}
                  colorSpace={project.colorPipeline.colorSpace}
                  lut={project.colorPipeline.lut}
                  lenses={project.colorPipeline.lenses}
                  isPlaying={isPlaying}
                />
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="w-full max-w-4xl overflow-y-auto space-y-6 py-4">
                {/* Description & Narrative Approach */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                    Editorial Vision & Story Architecture
                  </h3>
                  <p className="text-zinc-200 text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                      Rhythmic Pacing & Cutting Philosophy
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{project.editorialApproach}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider font-mono">
                      Color Science & Dynamic Range Tone Curve
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{project.colorApproach}</p>
                  </div>
                </div>

                {/* Camera & Color Pipeline Card */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs">
                  <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-sans mb-4 border-b border-white/10 pb-2">
                    Production & Color Pipeline Architecture
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Camera Package</span>
                      <span className="text-white font-bold">{project.colorPipeline.camera}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Optics / Lenses</span>
                      <span className="text-cyan-400 font-bold">{project.colorPipeline.lenses}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Capture Color Space</span>
                      <span className="text-zinc-200">{project.colorPipeline.colorSpace}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Print LUT Transform</span>
                      <span className="text-emerald-400 font-bold">{project.colorPipeline.lut}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Master Resolution</span>
                      <span className="text-white">{project.metrics.resolution}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-zinc-500">Master Codec</span>
                      <span className="text-cyan-400">{project.metrics.codec}</span>
                    </div>
                  </div>
                </div>

                {/* Toolchain Badges */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono mb-3">
                    Post-Production Toolchain
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.toolchain.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
