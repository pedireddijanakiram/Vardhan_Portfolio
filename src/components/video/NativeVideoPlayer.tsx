'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles } from 'lucide-react';
import { formatSMPTE } from '@/lib/timecode';
import { VideoProject } from '@/data/projects';

interface Props {
  project: VideoProject;
  aspectRatioClass?: string;
  isReelMode?: boolean;
  onInspect?: () => void;
}

export const NativeVideoPlayer: React.FC<Props> = ({
  project,
  aspectRatioClass,
  isReelMode = false,
  onInspect,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverTimecode, setHoverTimecode] = useState('00:00:00:00');

  // Throttle references for silky 60fps seek without decoder choking
  const pendingSeekTime = useRef<number | null>(null);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const isVertical = project.aspectRatio === '9:16';

  // Aspect ratio styling
  const aspectClass =
    aspectRatioClass ||
    (project.aspectRatio === '2.39:1'
      ? 'aspect-[2.39/1]'
      : isVertical
      ? 'aspect-[9/16]'
      : 'aspect-[16/9]');

  // Auto-play / pause on intersection in Director's Reel mode
  useEffect(() => {
    if (!isReelMode) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isReelMode]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 10);
  };

  // Perform throttled seek
  const executeSeek = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.seeking) {
      const vid = video as HTMLVideoElement & { fastSeek?: (time: number) => void };
      if (typeof vid.fastSeek === 'function') {
        vid.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
      isSeekingRef.current = true;
    } else {
      pendingSeekTime.current = targetTime;
    }
  }, []);

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (pendingSeekTime.current !== null) {
      const nextTime = pendingSeekTime.current;
      pendingSeekTime.current = null;
      executeSeek(nextTime);
    }
  };

  // Hover Scrubbing Engine (Smoothed with requestAnimationFrame)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video || duration <= 0) return;

      const rect = container.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const percentage = relativeX / rect.width;
      const targetTime = percentage * duration;

      setHoverPosition(percentage * 100);
      setHoverTimecode(formatSMPTE(targetTime, 24));

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        executeSeek(targetTime);
      });
    },
    [duration, executeSeek]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverPosition(null);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    const video = videoRef.current;
    if (video && !isReelMode) {
      video.pause();
      setIsPlaying(false);
      video.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onInspect}
      className={`group relative w-full ${aspectClass} bg-[#07070b] overflow-hidden cursor-pointer select-none border border-white/10 transition-all duration-500 ${
        isVertical
          ? 'rounded-[28px] max-h-[520px] max-w-[292px] mx-auto ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          : 'rounded-2xl shadow-2xl'
      } ${
        isHovered
          ? 'ring-1 ring-cyan-400/40 shadow-[0_0_40px_rgba(0,240,255,0.18)] scale-[1.01]'
          : 'hover:border-white/20'
      }`}
    >
      {/* Dynamic Apple-style speaker pill for vertical reels */}
      {isVertical && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 z-30 pointer-events-none" />
      )}

      {/* Native HTML5 Video Element with Instant Poster */}
      <video
        ref={videoRef}
        src={project.videoSrc}
        poster={project.poster}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle Ambient Film Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/90 via-transparent to-[#07070a]/30 pointer-events-none" />

      {/* Top Format & Aspect Ratio Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider shadow-md">
            {project.formatBadge}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400">
            {project.runtime}
          </span>
        </div>

        {/* Audio Toggle button */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white hover:border-cyan-400/50 transition-all shadow-md"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
        </button>
      </div>

      {/* Center Play Indicator when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-2xl group-hover:scale-110 group-hover:bg-cyan-500/80 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      )}

      {/* Hover Timecode Bubble Follower (SMPTE at 24fps) */}
      {hoverPosition !== null && (
        <div
          className="absolute top-12 z-30 pointer-events-none transform -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#09090e]/95 backdrop-blur-md border border-cyan-400/60 shadow-xl text-[10px] font-mono text-cyan-300 font-bold"
          style={{ left: `${hoverPosition}%` }}
        >
          {hoverTimecode}
        </div>
      )}

      {/* Hover Timeline Scrub Track */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/70 z-20 pointer-events-none overflow-hidden">
        {/* Playback progress */}
        <div
          className="h-full bg-cyan-400 transition-all duration-75"
          style={{
            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
          }}
        />
        {/* Hover cursor scrub line */}
        {hoverPosition !== null && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_white]"
            style={{ left: `${hoverPosition}%` }}
          />
        )}
      </div>

      {/* Bottom Overlay Info for compact card */}
      {!isReelMode && (
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-end justify-between">
          <div className="truncate mr-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5 truncate">
              {project.client}
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors truncate">
              {project.title}
            </h4>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-colors shrink-0">
            <span>Play</span>
            <Maximize2 className="w-3 h-3 text-cyan-400" />
          </div>
        </div>
      )}
    </div>
  );
};
