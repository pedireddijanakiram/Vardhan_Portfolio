export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'Principal Creative Technologist & Frontend Architect',
    company: 'Independent Studio',
    location: 'Global / Remote',
    description: 'Directing design engineering and building high-performance creative web applications, 3D interactive sandboxes, and bespoke digital platforms for venture-backed startups and international brands.',
    achievements: [
      'Architected 12+ award-nominated creative interactive applications with 60fps WebGL/Canvas benchmarks',
      'Engineered bespoke design systems reducing frontend delivery cycles by 40%',
      'Optimized Core Web Vitals to sub-1.0s LCP and 0ms INP across all client enterprise deployments',
    ],
    tech: ['Next.js 15', 'Three.js', 'WebGL', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    period: '2023 — 2024',
    role: 'Senior Frontend Engineer',
    company: 'Nexus Hypermedia',
    location: 'Remote',
    description: 'Spearheaded the flagship trading and data visualization interface, handling millions of streaming records with zero frame dropping.',
    achievements: [
      'Implemented Web Worker offscreen rendering pipeline slashing main thread blocking by 78%',
      'Authored internal micro-animation motion library adopted by 30+ product engineers',
      'Pioneered glassmorphic accessibility standards compatible with WCAG AAA contrast',
    ],
    tech: ['React 18', 'Canvas 2D API', 'TypeScript', 'Web Workers', 'Tailwind CSS'],
  },
  {
    period: '2021 — 2023',
    role: 'Interactive Creative Developer',
    company: 'Vanguard Digital Lab',
    location: 'Bengaluru / Hybrid',
    description: 'Built immersive microsites, generative art installations, and brand experiences blending brutalist typography with fluid physics.',
    achievements: [
      'Engineered multi-touch generative canvas installation showcased at major design tech conferences',
      'Collaborated with 3D motion designers to transform heavy Blender assets into lightweight client WebGL meshes',
    ],
    tech: ['Three.js', 'GSAP', 'GLSL', 'JavaScript', 'HTML5 Audio'],
  },
];
