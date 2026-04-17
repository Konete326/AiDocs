import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Wand2, BookOpen, FolderOpen, ChevronRight, Clock } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';

import heroImage from '../../assets/hero.png';

const STATUS_COLORS = {
  complete:   'bg-emerald-500',
  generating: 'bg-amber-400 animate-pulse',
  draft:      'bg-white/20',
  failed:     'bg-rose-500',
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

  // Not logged in — show enter ecosystem card
  if (!isAuthenticated) {
    return (
      <GlassCard
        onClick={() => navigate('/register')}
        className="rounded-2xl p-5 w-full lg:w-60 border-l border-t border-white/5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <p className="text-sm font-semibold text-white tracking-tight">Enter our ecosystem</p>
        <p className="text-xs text-white/50 font-medium mt-1 leading-relaxed">Built for founders who ship.</p>
      </GlassCard>
    );
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full lg:w-60 space-y-2">
        {[1,2,3].map(i => (
          <div key={i} className="h-14 rounded-2xl liquid-glass animate-pulse" />
        ))}
      </div>
    );
  }

  // No projects yet
  if (projects.length === 0) {
    return (
      <GlassCard
        onClick={() => navigate('/projects/new')}
        className="rounded-2xl p-5 w-full lg:w-60 border-l border-t border-white/5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-1">
          <FolderOpen className="w-4 h-4 text-white/40" />
          <p className="text-sm font-semibold text-white tracking-tight">Your Projects</p>
        </div>
        <p className="text-xs text-white/50 mt-1">No projects yet. Start your first one!</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full lg:w-60 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-1">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-white/30" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">Recent</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-[10px] text-white/30 hover:text-white/70 transition-colors flex items-center gap-0.5 cursor-pointer"
        >
          View all <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Zig-zag project cards */}
      {projects.map((project, i) => (
        <div
          key={project._id}
          onClick={() => navigate(`/projects/${project._id}`)}
          className={`group flex items-center gap-3 p-3 rounded-2xl liquid-glass border border-white/5 hover:border-white/15 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${i % 2 === 0 ? 'mr-2' : 'ml-2'}`}
        >
          {/* Status dot */}
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLORS[project.status] || 'bg-white/20'}`} />

          {/* Title */}
          <p className="flex-1 text-xs font-medium text-white/80 group-hover:text-white transition-colors truncate">
            {project.title}
          </p>

          <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
      ))}
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
