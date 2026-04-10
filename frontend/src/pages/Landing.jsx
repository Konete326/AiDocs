import LandingLeftPanel from '../components/landing/LandingLeftPanel';
import LandingRightPanel from '../components/landing/LandingRightPanel';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-[1] bg-black/30" />
      <LandingLeftPanel />
      <LandingRightPanel />
    </div>
  );
}
