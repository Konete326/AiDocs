import { Download } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Pill from '../common/Pill';
import Button from '../common/Button';
import Navbar from './Navbar';
import logo from '../../assets/logo.png';

const HeroText = () => (
  <div className="flex flex-col items-center justify-center text-center gap-6 flex-1">
    <img src={logo} alt="SwiftDocs AI" className="w-20 h-20 rounded-2xl object-cover shadow-2xl" />
    <h1 className="text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-tight">
      Generating the<br />
      spirit of your{' '}
      <em className="font-serif italic text-white/80">idea</em>
    </h1>
    <Button variant="strong" className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <Download className="w-4 h-4" />
      </span>
      Explore Now
    </Button>
    <div className="flex gap-2 flex-wrap justify-center">
      {['PRD Generation', 'AI Docs', 'Dev-Ready Specs'].map(tag => (
        <Pill key={tag}>{tag}</Pill>
      ))}
    </div>
  </div>
);

const BottomQuote = () => (
  <div className="mt-auto text-center pb-2">
    <p className="text-xs tracking-widest uppercase text-white/50 mb-2">VISIONARY DOCS</p>
    <p className="text-white/70 text-sm">
      We imagined{' '}
      <span className="font-serif italic text-white/90">docs that write themselves.</span>
    </p>
    <div className="flex items-center gap-3 justify-center mt-3">
      <div className="h-px w-12 bg-white/20" />
      <span className="text-[10px] tracking-widest text-white/40 font-medium">SWIFT DOCS TEAM</span>
      <div className="h-px w-12 bg-white/20" />
    </div>
  </div>
);

const LeftPanel = () => (
  <div className="relative flex flex-col w-full lg:w-[52%] min-h-screen p-4 lg:p-6 overflow-hidden">
    <GlassCard strong className="absolute inset-4 lg:inset-6 rounded-3xl z-0 pointer-events-none" />
    <div className="relative z-10 flex flex-col h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] lg:m-4">
      <Navbar />
      <HeroText />
      <BottomQuote />
    </div>
  </div>
);

export default LeftPanel;
