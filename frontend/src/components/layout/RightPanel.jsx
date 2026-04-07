import { Sparkles, ArrowRight, Globe, Layers, Mail, Wand2, BookOpen } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import thumb from '../../assets/hero-flowers.png';

const TopBar = () => (
  <div className="flex justify-between items-center w-full">
    <GlassCard className="rounded-full px-5 py-2.5 flex gap-4 items-center">
      {[Globe, Layers, Mail].map((Icon, i) => (
        <button key={i} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 transition-all cursor-pointer">
          <Icon className="w-4 h-4" />
        </button>
      ))}
      <div className="w-px h-5 bg-white/20" />
      <ArrowRight className="w-4 h-4 text-white/50" />
    </GlassCard>
    <GlassCard className="rounded-full px-5 py-2.5 flex gap-3 items-center cursor-pointer hover:bg-white/5 transition-all">
      <Sparkles className="w-4 h-4 text-white/80 fill-white/10" />
      <span className="text-sm font-medium text-white/80">Account</span>
    </GlassCard>
  </div>
);

const CommunityCard = () => (
  <GlassCard className="rounded-2xl p-5 w-60 border-l border-t border-white/5">
    <p className="text-sm font-semibold text-white tracking-tight">Enter our ecosystem</p>
    <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">Built for founders who ship.</p>
  </GlassCard>
);

const FeatureCards = () => (
  <div className="mt-auto space-y-4">
    <div className="flex gap-4">
      <GlassCard className="rounded-3xl p-5 flex-1 flex flex-col items-center text-center">
        <Wand2 className="w-6 h-6 text-white/70" />
        <p className="text-sm font-medium text-white/80 mt-3">Generation</p>
      </GlassCard>
      <GlassCard className="rounded-3xl p-5 flex-1 flex flex-col items-center text-center">
        <BookOpen className="w-6 h-6 text-white/70" />
        <p className="text-sm font-medium text-white/80 mt-3 tracking-tight">Doc Archive</p>
      </GlassCard>
    </div>
    <GlassCard className="rounded-[2rem] p-4 flex gap-4 items-center border border-white/5">
      <img src={thumb} alt="Preview" className="w-28 h-20 object-cover rounded-2xl shadow-xl flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white leading-tight">Advanced AI Document Sculpting</p>
        <p className="text-xs text-white/50 mt-1.5 font-medium">For modern founders who ship fast.</p>
      </div>
      <button className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center text-white/80 ml-auto cursor-pointer hover:text-white transition-all text-xl font-light">
        +
      </button>
    </GlassCard>
  </div>
);

const RightPanel = () => (
  <div className="hidden lg:flex flex-col w-[48%] p-10 gap-6 h-screen">
    <TopBar />
    <CommunityCard />
    <FeatureCards />
  </div>
);

export default RightPanel;
