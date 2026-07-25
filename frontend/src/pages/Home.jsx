import LeftPanel from '../components/layout/LeftPanel';
import RightPanel from '../components/layout/RightPanel';
import TestimonialsSection from '../components/landing/TestimonialsSection';

const Home = () => (
  <div className="relative min-h-screen w-full bg-[#E0E5EC] text-[#3D4852]">
    <div className="relative z-10 w-full flex flex-col">
      <main className="flex flex-col lg:flex-row w-full min-h-screen pt-28 md:pt-32 max-w-7xl mx-auto px-4 md:px-8 gap-8">
        <LeftPanel />
        <RightPanel />
      </main>

      <TestimonialsSection />

      <footer className="py-12 border-t border-black/5 bg-[#E0E5EC] text-center">
        <p className="text-[#6B7280] text-xs tracking-widest uppercase font-bold">
          © 2026 AiDocs Platform • Built for the Spirit of Curiosity
        </p>
      </footer>
    </div>
  </div>
);

export default Home;
