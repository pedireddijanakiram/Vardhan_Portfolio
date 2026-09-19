'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionDeckProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  enableCollapse?: boolean;
}

const CollapsibleSection: React.FC<SectionDeckProps> = ({
  children,
  id,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth entrance (0.0 -> 0.22) & collapsing exit (0.78 -> 1.0)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.94, 1, 1, 0.93]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.5, 1, 1, 0.6]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [50, 0, 0, -40]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [2, 0, 0, -2]
  );

  return (
    <div
      ref={containerRef}
      style={{ perspective: '1200px' }}
      className="relative w-full"
    >
      <motion.div
        id={id}
        style={{
          scale,
          opacity,
          y,
          rotateX,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className={`relative w-full origin-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SectionDeck: React.FC<SectionDeckProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, initial hydration, or when collapse is disabled, render standard container
  if (!props.enableCollapse || !mounted) {
    return (
      <section id={props.id} className={`relative w-full ${props.className || ''}`}>
        {props.children}
      </section>
    );
  }

  return <CollapsibleSection {...props} />;
};
