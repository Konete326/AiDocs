import { Sparkles, ArrowRight, Wand2, BookOpen } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  return (
  <div className="flex justify-end items-center w-full mt-4 lg:mt-0">
    <GlassCard onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')} className="rounded-full px-5 py-2.5 flex gap-3 items-center cursor-pointer hover:bg-white/5 transition-transform hover:scale-105 active:scale-95">
      <Sparkles className="w-4 h-4 text-white/80 fill-white/10" />
      <span className="text-sm font-medium text-white/80">{isAuthenticated ? user?.displayName || 'Dashboard' : 'Sign In'}</span>
    </GlassCard>
  </div>
)};

const CommunityCard = () => (
  <GlassCard className="rounded-2xl p-5 w-full lg:w-60 border-l border-t border-white/5 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
    <p className="text-sm font-semibold text-white tracking-tight">Enter our ecosystem</p>
    <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">Built for founders who ship.</p>
  </GlassCard>
);

const FeatureCards = () => {
  const navigate = useNavigate();
  return (
  <div className="mt-auto space-y-4 lg:space-y-6 w-full">
    <div className="flex flex-col sm:flex-row gap-4">
      <GlassCard className="rounded-3xl p-6 flex-1 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        <Wand2 className="w-8 h-8 text-white/60" />
        <p className="text-sm font-semibold text-white/90 mt-4">Generation</p>
      </GlassCard>
      <GlassCard className="rounded-3xl p-6 flex-1 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        <BookOpen className="w-8 h-8 text-white/60" />
        <p className="text-sm font-semibold text-white/90 mt-4 tracking-tight">Archive</p>
      </GlassCard>
    </div>
    <GlassCard onClick={() => navigate('/register')} className="rounded-[2.5rem] p-5 flex gap-5 items-center border border-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
      <img src="https://images.unsplash.com/photo-1620712948624-91eb7dd1562b?w=800&q=80" alt="Preview" className="w-20 h-20 sm:w-28 sm:h-20 object-cover rounded-2xl shadow-xl flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white leading-tight">Advanced AI Document Sculpting</p>
        <p className="text-xs text-white/40 mt-2 font-medium">For modern founders who ship fast.</p>
      </div>
      <button className="liquid-glass rounded-full w-12 h-12 flex items-center justify-center text-white/80 ml-auto cursor-pointer hover:text-white transition-transform hover:scale-110 active:scale-90 text-2xl font-light">
        +
      </button>
    </GlassCard>
  </div>
)};

const RightPanel = () => (
  <div className="flex flex-col w-full lg:w-[48%] min-h-[50%] lg:h-full px-4 lg:px-6 pb-6 lg:pb-12 lg:pt-10 gap-3 lg:gap-8 overflow-y-auto lg:overflow-hidden">
    <TopBar />
    <div className="flex flex-col lg:flex-1 justify-center lg:justify-between h-full gap-3 lg:gap-0">
      <CommunityCard />
      <FeatureCards />
    </div>
  </div>
);

export default RightPanel;
