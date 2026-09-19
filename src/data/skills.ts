export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number;
    highlight?: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Editorial & Story Pacing',
    description: 'Rhythmic cutting, dramatic tension arcs, and seamless narrative transitions.',
    skills: [
      { name: 'Adobe Premiere Pro & DaVinci Resolve', level: 98, highlight: 'High-speed offline-to-online' },
      { name: 'Metric & Rhythmic Pacing', level: 96, highlight: 'Music video & commercial sync' },
      { name: 'Multi-Cam & High-Volume Conform', level: 95, highlight: '8K RAW proxy workflows' },
      { name: 'Narrative Story Architecture', level: 94, highlight: 'Dramatic tension & smash cuts' },
      { name: 'Time-Remapping & Optical Flow', level: 92, highlight: 'Organic motion acceleration' },
    ],
  },
  {
    title: 'Color Science & Grading',
    description: 'Hardware-calibrated color grading, ACES workflows, and film print emulation.',
    skills: [
      { name: 'DaVinci Resolve Studio 19', level: 98, highlight: 'Colorist node architecture' },
      { name: 'ACES 1.3 & Wide Gamut Color Spaces', level: 95, highlight: 'Arri LogC4 / RED IPP2 / S-Log3' },
      { name: 'Film Print Emulation (Kodak 2383)', level: 96, highlight: 'Photochemical print curves' },
      { name: 'HDR Mastering & Dolby Vision', level: 90, highlight: '1000-nit highlight roll-off' },
      { name: 'Skin-Tone & Hue Isolation', level: 96, highlight: 'Subtle naturalistic melanin curve' },
    ],
  },
  {
    title: 'Finishing, VFX & Audio',
    description: 'Master deliverables, optical grain, spatial sound design, and clean conforms.',
    skills: [
      { name: 'ProRes 4444 XQ & IMF Deliverables', level: 98, highlight: 'DCI Theatrical & Netflix spec' },
      { name: 'After Effects & VFX Clean-up', level: 92, highlight: 'Object removal & screen replacement' },
      { name: 'Dehancer Pro & 35mm Grain Halation', level: 95, highlight: 'Optical gate weave & scatter' },
      { name: 'Pro Tools & Sound Design Mastering', level: 88, highlight: 'Sub-bass hits & spatial panning' },
      { name: 'Blender 3D VFX Pre-viz', level: 86, highlight: 'Camera match-moving & conform' },
    ],
  },
];

export interface StatMetric {
  label: string;
  value: string;
  subtext: string;
}

export const ARCHITECTURE_METRICS: StatMetric[] = [
  { label: 'Master Delivery Accuracy', value: '100%', subtext: 'Zero QC rejections across Netflix & broadcast' },
  { label: 'Theatrical & Commercial Works', value: '48+ Projects', subtext: 'Anamorphic, 4K Broadcast, and High-Retention Social' },
  { label: 'Display Calibration', value: 'Delta E < 1.0', subtext: 'Calibrated Sony BVM / Apple Pro Display XDR' },
  { label: 'Frame Precision Standard', value: 'SMPTE 24fps', subtext: 'Frame-accurate timecode conforms' },
];
