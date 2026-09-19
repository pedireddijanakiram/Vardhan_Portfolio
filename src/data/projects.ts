export interface ColorPipeline {
  camera: string;
  colorSpace: string;
  lut: string;
  lenses: string;
}

export interface VideoProject {
  id: string;
  title: string;
  tagline: string;
  category: 'Commercial' | 'Social / Shorts' | 'Narrative' | 'Music Video';
  aspectRatio: '9:16' | '16:9' | '2.39:1';
  formatBadge: '9:16 Vertical' | '16:9 4K' | '2.39:1 Anamorphic';
  role: string;
  client: string;
  year: string;
  runtime: string;
  description: string;
  editorialApproach: string;
  colorApproach: string;
  toolchain: string[];
  colorPipeline: ColorPipeline;
  hasColorGradeSlider: boolean;
  videoSrc: string;
  poster?: string;
  metrics: {
    resolution: string;
    codec: string;
    targetFrameRate: string;
    deliveryColorSpace: string;
  };
}

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'nirmaan-digi',
    title: 'Nirmaan Digi / Brand Commercial',
    tagline: 'High-Conversion Digital Commercial & Kinetic Typography Master',
    category: 'Commercial',
    aspectRatio: '9:16',
    formatBadge: '9:16 Vertical',
    role: 'Lead Video Editor & Motion Graphics',
    client: 'Nirmaan Digi',
    year: '2026',
    runtime: '01:00',
    description: 'High-retention commercial cut engineered for rapid-fire engagement. Interweaves kinetic typography, snappy dynamic zooms, and synchronized beat-driven pacing to deliver 100% brand clarity across mobile screens.',
    editorialApproach: 'Cadence-driven cuts on sub-2-second intervals, utilizing directional match-cuts and speed ramping to sustain peak viewer retention throughout the 60-second broadcast.',
    colorApproach: 'High-impact commercial grade emphasizing rich contrast, clean OLED black levels, and vibrant primaries calibrated for mobile display gamut.',
    toolchain: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    colorPipeline: {
      camera: 'Sony FX9 Cinema Line',
      colorSpace: 'Sony S-Log3 / S-Gamut3.Cine',
      lut: 'Clean Commercial Rec.709 Punch Curve',
      lenses: 'Sony G-Master 24-70mm f/2.8 II',
    },
    hasColorGradeSlider: true,
    videoSrc: '/videos/nirmaan-digi.mp4',
    poster: '/videos/nirmaan-digi-poster.jpg',
    metrics: {
      resolution: '1080 × 1920 (9:16 Mobile Master)',
      codec: 'H.264 FastStart WebStream / AAC',
      targetFrameRate: '30.000 fps',
      deliveryColorSpace: 'Rec.709 / Display P3',
    },
  },
  {
    id: 'any-event-pan-mahal',
    title: 'Any Event / Pan Mahal Review',
    tagline: 'Customer Experience Story & Authentic Hospitality Narrative',
    category: 'Commercial',
    aspectRatio: '9:16',
    formatBadge: '9:16 Vertical',
    role: 'Lead Editor & Sound Design',
    client: 'Any Event & Pan Mahal',
    year: '2026',
    runtime: '00:35',
    description: 'Authentic customer review reel capturing heartfelt reactions and event energy. Features seamless speech-gap trimming, punchy b-roll cutaways, and ambient acoustic enhancement.',
    editorialApproach: 'Dialogue cadence editing with breath-reduction trimming, intercut with fluid b-roll pans to produce an effortless, spontaneous narrative rhythm.',
    colorApproach: 'Warm, inviting hospitality tone with golden highlights, rich ambient interior warmth, and natural lifelike skin tones.',
    toolchain: ['DaVinci Resolve', 'Premiere Pro', 'Audio Finishing'],
    colorPipeline: {
      camera: 'Sony FX6 Cinema Line',
      colorSpace: 'Sony S-Log3 / S-Gamut3.Cine',
      lut: 'Warm Hospitality Kodak Print Curve',
      lenses: 'Sigma 24-70mm f/2.8 DG DN Art',
    },
    hasColorGradeSlider: false,
    videoSrc: '/videos/any-event-pan-mahal.mp4',
    poster: '/videos/any-event-pan-mahal-poster.jpg',
    metrics: {
      resolution: '1080 × 1920 (9:16 Mobile Master)',
      codec: 'H.264 FastStart WebStream / AAC',
      targetFrameRate: '30.000 fps',
      deliveryColorSpace: 'Rec.709 Gamma 2.4',
    },
  },
  {
    id: 'contractor-review',
    title: 'Any Event / Contractor Testimonial',
    tagline: 'High-Credibility B2B Partner Review & Service Showcase',
    category: 'Commercial',
    aspectRatio: '9:16',
    formatBadge: '9:16 Vertical',
    role: 'Lead Video Editor & Finishing Colorist',
    client: 'Any Event Productions',
    year: '2026',
    runtime: '00:27',
    description: 'Fast-moving contractor testimonial reel emphasizing project execution speed, craftsmanship, and on-site delivery.',
    editorialApproach: 'Punched-in jump cuts on key value propositions with subtle motion tracking and synchronized audio emphasis risers.',
    colorApproach: 'Clean architectural commercial finish preserving natural textures, crisp white points, and balanced skin hues.',
    toolchain: ['Premiere Pro', 'DaVinci Resolve'],
    colorPipeline: {
      camera: 'Sony FX3 Cinema Line',
      colorSpace: 'Sony S-Log3 / S-Gamut3.Cine',
      lut: 'Architectural Clean Daylight LUT',
      lenses: 'Sony G-Master 35mm f/1.4',
    },
    hasColorGradeSlider: false,
    videoSrc: '/videos/contractor-review.mp4',
    poster: '/videos/contractor-review-poster.jpg',
    metrics: {
      resolution: '1080 × 1920 (9:16 Mobile Master)',
      codec: 'H.264 FastStart WebStream / AAC',
      targetFrameRate: '30.000 fps',
      deliveryColorSpace: 'Rec.709',
    },
  },
  {
    id: 'podcast-spotlight',
    title: 'The Creator Spotlight / Podcast Cut #02',
    tagline: 'Viral Podcast Snippet with Reactive Framing & Multicam Sync',
    category: 'Social / Shorts',
    aspectRatio: '9:16',
    formatBadge: '9:16 Vertical',
    role: 'Podcast Editor & Sound Finishing',
    client: 'Studio Podcast Series',
    year: '2026',
    runtime: '00:37',
    description: 'High-retention studio podcast clip engineered for viral discovery. Features dynamic framing switches, studio audio leveling with zero room noise, and punchy caption animations.',
    editorialApproach: 'Tight dialogue pace with multicam cross-cutting, audio ducking, and animated typographic emphasis designed for TikTok and Instagram Reels.',
    colorApproach: 'High-contrast moody podcast grade with muted background studio tones and crisp highlight separation on speakers.',
    toolchain: ['Premiere Pro', 'DaVinci Resolve', 'iZotope Audio'],
    colorPipeline: {
      camera: 'Blackmagic Pocket Cinema 6K',
      colorSpace: 'Blackmagic Gen 5 Film',
      lut: 'Custom Dark Studio Contrast LUT',
      lenses: 'DZOFilm Vespid Primes',
    },
    hasColorGradeSlider: false,
    videoSrc: '/videos/podcast-2.mp4',
    poster: '/videos/podcast-2-poster.jpg',
    metrics: {
      resolution: '1080 × 1920 (9:16 Vertical HD)',
      codec: 'H.264 FastStart WebStream / AAC',
      targetFrameRate: '30.000 fps',
      deliveryColorSpace: 'Rec.709',
    },
  },
  {
    id: 'cinematic-rhythm-0805',
    title: 'Visual Rhythm / Creative Reel 0805',
    tagline: 'Cinematic Rhythm Montage & Experimental Editorial Flow',
    category: 'Narrative',
    aspectRatio: '9:16',
    formatBadge: '9:16 Vertical',
    role: 'Director & Lead Editor',
    client: 'Creative Showcase',
    year: '2026',
    runtime: '00:31',
    description: 'An artistic editorial study exploring visual tempo, momentum, and frame juxtaposition. Showcases Vardhan\'s instinct for visual poetry and audio-visual synchronization.',
    editorialApproach: 'Montage theory cutting with rhythmic acceleration and sonic-visual match cuts.',
    colorApproach: 'Filmic contrast curve with organic halation and rich tonal separation.',
    toolchain: ['DaVinci Resolve', 'Premiere Pro', 'Motion Lab'],
    colorPipeline: {
      camera: 'RED V-Raptor 8K',
      colorSpace: 'REDWideGamutRGB / Log3G10',
      lut: 'Kodak 2383 35mm Print Emulation',
      lenses: 'Atlas Orion Anamorphic 40mm',
    },
    hasColorGradeSlider: true,
    videoSrc: '/videos/0805.mp4',
    poster: '/videos/0805-poster.jpg',
    metrics: {
      resolution: '1080 × 1920 (9:16 Mobile Master)',
      codec: 'H.264 FastStart WebStream / AAC',
      targetFrameRate: '30.000 fps',
      deliveryColorSpace: 'ACES 1.3 / Rec.709',
    },
  },
];
