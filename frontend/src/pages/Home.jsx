import LeftPanel from '../components/layout/LeftPanel';
import RightPanel from '../components/layout/RightPanel';
import TestimonialsSection from '../components/landing/TestimonialsSection';

const Home = () => (
  <div className="relative min-h-screen w-full">
    {/* Dark overlay — video comes from PersistentBackground in App.jsx */}
    <div className="fixed inset-0 bg-black/55 z-[1]" />

    {/* Scrollable Content */}
    <div className="relative z-10 w-full flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row w-full min-h-screen pt-20">
        <LeftPanel />
        <RightPanel />
      </main>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase font-medium">
          © 2026 AiDocs Platform • Built for the Spirit of Curiosity
        </p>
      </footer>
    </div>
  </div>
);

export default Home;
