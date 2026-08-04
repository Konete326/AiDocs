import LeftPanel from '../components/layout/LeftPanel';
import RightPanel from '../components/layout/RightPanel';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import logo from '../assets/logo.png';

const Home = () => (
  <div className="relative min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] pt-20 sm:pt-24 md:pt-28">
    <div className="relative z-10 w-full flex flex-col">
      <main className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 md:px-8 gap-8 mt-2 sm:mt-4">
        <LeftPanel />
        <RightPanel />
      </main>

      <TestimonialsSection />

      <footer className="py-12 border-t border-black/5 bg-[#E0E5EC] text-center flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ClarifyAI Logo" className="h-6 w-auto object-contain" />
          <span className="font-extrabold text-sm text-[#3D4852] tracking-tight">ClarifyAI</span>
        </div>
        <p className="text-[#6B7280] text-xs tracking-widest uppercase font-bold">
          © 2026 ClarifyAI Platform • Built for the Spirit of Curiosity
        </p>
      </footer>
    </div>
  </div>
);

export default Home;
