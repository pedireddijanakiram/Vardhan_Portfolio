'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Smooth springs for fluid trailing effect
  const cursorX = useSpring(-100, { stiffness: 600, damping: 32 });
  const cursorY = useSpring(-100, { stiffness: 600, damping: 32 });
  const ringX = useSpring(-100, { stiffness: 220, damping: 24 });
  const ringY = useSpring(-100, { stiffness: 220, damping: 24 });

  useEffect(() => {
    // Detect non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, [role="button"], canvas, .clickable, select')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-cyan-400 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Smooth trailing outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 -ml-4 -mt-4"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          marginLeft: isHovered ? -24 : -16,
          marginTop: isHovered ? -24 : -16,
          borderColor: isHovered ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 255, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
    </div>
  );
};
