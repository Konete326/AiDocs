import LeftPanel from '../components/layout/LeftPanel';
import RightPanel from '../components/layout/RightPanel';
import TestimonialsSection from '../components/landing/TestimonialsSection';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

const Home = () => (
  <div className="relative min-h-screen w-full bg-black">
    {/* Background elements */}
    <video
      src={VIDEO_URL}
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover z-0"
    />
    <div className="fixed inset-0 bg-black/60 z-[1] backdrop-blur-[1px]" />
    
    {/* Scrollable Content */}
    <div className="relative z-10 w-full flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row w-full min-h-screen pt-20">
        <LeftPanel />
        <RightPanel />
      </main>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer or extra space if needed */}
      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-md text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase font-medium">
          © 2026 AiDocs Platform • Built for the Spirit of Curiosity
        </p>
      </footer>
    </div>
  </div>
);

export default Home;
