import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Syne } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrainProvider } from '@/components/ui/GrainContext';
import { ThemeProvider } from '@/components/ui/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Vardhan Pedireddi — Freelance Video Editor & Visual Content Creator',
  description:
    'Visuals that hook, edits that grow your business. Freelance video editing, kinetic motion graphics, commercial shoots, posters, and organic reach by Vardhan Pedireddi. Direct WhatsApp & Call: +91 84650 79293 | Email: vardhanpedireddi@gmail.com',
  keywords: [
    'Vardhan Pedireddi',
    'Freelance Video Editor',
    'Reels Editor',
    'Motion Graphics',
    'Commercial Video Editing',
    'Poster Design',
    'Social Media Growth',
    'Cinematography',
  ],
  authors: [{ name: 'Vardhan Pedireddi' }],
  openGraph: {
    title: 'Vardhan Pedireddi — Freelance Video Editor & Visual Creator',
    description:
      'High-retention video editing, kinetic motion graphics, commercial shoots, posters, and digital reach.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vardhan Pedireddi — Freelance Video Editor & Visual Creator',
    description:
      'High-retention video editing, kinetic motion graphics, commercial shoots, posters, and digital reach.',
  },
};

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} dark antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-base)] relative overflow-x-hidden font-sans transition-colors duration-250">
        <ThemeProvider>
          <GrainProvider>
            <ToastProvider>
              {/* Magnetic follower cursor */}
              <CustomCursor />

              {/* Main content */}
              <main className="relative z-10">{children}</main>
            </ToastProvider>
          </GrainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
