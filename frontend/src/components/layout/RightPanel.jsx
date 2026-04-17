import { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Wand2, BookOpen, FolderOpen, 
  ChevronRight, Clock, Box, Rocket, Smartphone, 
  Globe, Layout, Zap, FileText 
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';

import heroImage from '../../assets/hero.png';

const STATUS_CONFIG = {
  complete:   { color: 'bg-emerald-500', label: 'Ready' },
  generating: { color: 'bg-amber-400 animate-pulse', label: 'Crafting...' },
  draft:      { color: 'bg-white/20', label: 'Draft' },
  error:      { color: 'bg-rose-500', label: 'Failed' },
};

const TYPE_ICONS = {
  saas: Globe,
  mobile: Smartphone,
  ai: Zap,
  ecommerce: Box,
  marketplace: Layout,
  other: Rocket,
};

const RecentProjects = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    getProjects()
      .then(data => setProjects((data || []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <GlassCard
        onClick={() => navigate('/register')}
        className="rounded-2xl p-5 w-full lg:w-72 border-l border-t border-white/5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <p className="text-sm font-semibold text-white tracking-tight">Enter our ecosystem</p>
        <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">Built for founders who ship.</p>
      </GlassCard>
    );
  }

  if (loading) {
    return (
      <div className="w-full lg:w-80 space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className={`h-24 w-64 rounded-2xl liquid-glass animate-pulse ${i % 2 === 0 ? 'ml-auto' : ''}`} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <GlassCard
        onClick={() => navigate('/projects/new')}
        className="rounded-2xl p-6 w-full lg:w-80 border-l border-t border-white/5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Your Workspace</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">0 Projects</p>
          </div>
        </div>
        <p className="text-xs text-white/50 leading-relaxed">Your creative history will appear here. Start your first AI-powered project today.</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/40" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Latest History</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
        >
          Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Zig-zag Project Bubbles */}
      <div className="flex flex-col gap-4">
        {projects.map((project, i) => {
          const Icon = TYPE_ICONS[project.projectType] || FileText;
          const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.draft;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className={`
                group relative flex flex-col max-w-[85%] p-4 rounded-2xl transition-all cursor-pointer
                border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5
                glass-card hover:-translate-y-1 active:scale-95
                ${isLeft ? 'self-start rounded-tl-none' : 'self-end rounded-tr-none'}
              `}
              style={{
                background: isLeft 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)' 
                  : 'linear-gradient(225deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)'
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
                  <Icon className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs font-bold text-white/90 truncate group-hover:text-white">
                      {project.title}
                    </h4>
                    <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-white/5`}>
                      <div className={`w-1 h-1 rounded-full ${status.color}`} />
                      <span className="text-[8px] font-bold uppercase text-white/40">{status.label}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/40 line-clamp-2 leading-relaxed italic">
                    {project.wizardAnswers?.problemStatement || `An innovative ${project.projectType} solution.`}
                  </p>
                </div>
              </div>

              {/* Decorative side indicator */}
              <div className={`absolute top-0 w-1 h-8 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors ${isLeft ? '-left-1' : '-right-1'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FeatureCards = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
  <div className="mt-auto space-y-4 lg:space-y-6 w-full">
    <div className="flex flex-col sm:flex-row gap-4">
      <GlassCard 
        onClick={() => navigate(isAuthenticated ? '/projects/new' : '/register')}
        className="rounded-3xl p-6 flex-1 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Wand2 className="w-8 h-8 text-white/60" />
        <p className="text-sm font-semibold text-white/90 mt-4">Generation</p>
      </GlassCard>
      <GlassCard 
        onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
        className="rounded-3xl p-6 flex-1 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <BookOpen className="w-8 h-8 text-white/60" />
        <p className="text-sm font-semibold text-white/90 mt-4 tracking-tight">Archive</p>
      </GlassCard>
    </div>
    <GlassCard onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')} className="rounded-[2.5rem] p-5 flex gap-5 items-center border border-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
      <img src={heroImage} alt="Preview" className="w-20 h-20 sm:w-28 sm:h-20 object-cover rounded-2xl shadow-xl flex-shrink-0" />
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
  <div className="flex flex-col w-full lg:w-[48%] px-4 lg:px-6 pb-6 lg:pb-12 gap-3 lg:gap-8 overflow-y-visible">
    <div className="flex flex-col lg:flex-1 justify-start lg:justify-between h-full gap-3 lg:gap-8 mt-4 lg:mt-0">
      <RecentProjects />
      <FeatureCards />
    </div>
  </div>
);

export default RightPanel;
