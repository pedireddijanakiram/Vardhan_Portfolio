/**
 * SMPTE Timecode formatting utility (Standard 24.00 fps)
 */
export function formatSMPTE(seconds: number, fps: number = 24): string {
  if (isNaN(seconds) || seconds < 0) return '00:00:00:00';

  const totalFrames = Math.floor(seconds * fps);
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(seconds);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (num: number, size = 2) => String(num).padStart(size, '0');

  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
}

export function formatMinutesSeconds(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
