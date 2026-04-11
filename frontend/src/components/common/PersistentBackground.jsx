/**
 * PersistentBackground — mounts ONCE at App root level.
 * Never unmounts → browser keeps video in memory across all route changes.
 * All pages reuse this single instance; no more per-page video reloads.
 */

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

export default function PersistentBackground() {
  return (
    <video
      src={VIDEO_URL}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        opacity: 0.35,
      }}
    />
  );
}
