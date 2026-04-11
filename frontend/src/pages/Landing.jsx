import LandingLeftPanel from '../components/landing/LandingLeftPanel';
import LandingRightPanel from '../components/landing/LandingRightPanel';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Dark overlay — video from PersistentBackground in App.jsx */}
      <div className="absolute inset-0 z-[1] bg-black/40" />
      <LandingLeftPanel />
      <LandingRightPanel />
    </div>
  );
}
