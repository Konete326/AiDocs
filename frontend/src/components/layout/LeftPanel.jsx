import { Download } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Pill from '../common/Pill';
import Button from '../common/Button';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroText = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
  <div className="flex flex-col items-center justify-center text-center gap-4 lg:gap-8 flex-1 py-12 lg:py-0">
    <img src={logo} alt="SwiftDocs AI" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover shadow-2xl" />
    <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium tracking-[-0.05em] text-white leading-[1.1]">
      Generating the<br />
      spirit of your{' '}
      <em className="font-serif italic text-white/80">idea</em>
    </h1>
    <Button 
      variant="strong" 
      className="flex items-center gap-3" 
      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
    >
      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <Download className="w-4 h-4" />
      </span>
      Explore Now
    </Button>
    <div className="flex gap-2 flex-wrap justify-center max-w-sm mt-4 mb-3">
      {['PRD Generation', 'AI Docs', 'Dev-Ready Specs'].map(tag => (
        <Pill key={tag}>{tag}</Pill>
      ))}
    </div>
  </div>
  );
};

const BottomQuote = () => (
  <div className="mt-auto text-center pb-8 lg:pb-2">
    <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3 font-semibold">VISIONARY DOCS</p>
    <p className="text-white/60 text-sm md:text-base px-6">
      We imagined{' '}
      <span className="font-serif italic text-white/80">docs that write themselves.</span>
    </p>
    <div className="flex items-center gap-4 justify-center mt-4">
      <div className="h-px w-8 lg:w-12 bg-white/10" />
      <span className="text-xs tracking-[0.15em] text-white/30 font-bold">SWIFT DOCS TEAM</span>
      <div className="h-px w-8 lg:w-12 bg-white/10" />
    </div>
  </div>
);

const LeftPanel = () => (
  <div className="relative flex flex-col w-full lg:w-[52%] p-2 sm:p-4 lg:p-6 overflow-y-visible">
    <GlassCard strong className="absolute inset-2 sm:inset-4 lg:inset-6 rounded-3xl lg:rounded-[2.5rem] z-0" />
    <div className="relative z-10 flex flex-col m-2 lg:m-4 flex-1 h-full min-h-[400px]">
      <HeroText />
      <BottomQuote />
    </div>
  </div>
);

export default LeftPanel;
