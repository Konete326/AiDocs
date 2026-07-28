import { useState, useEffect } from 'react';
import { 
  Sparkles, FolderOpen, ChevronRight, Clock, Box, Rocket, 
  Smartphone, Globe, Layout, Zap, FileText, BookOpen 
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../services/projectService';
import heroImage from '../../assets/hero.png';

const STATUS_CONFIG = {
  complete:   { color: 'bg-[#38B2AC]', label: 'Ready' },
  generating: { color: 'bg-amber-500 animate-pulse', label: 'Crafting...' },
  draft:      { color: 'bg-[#6B7280]', label: 'Draft' },
  error:      { color: 'bg-rose-600', label: 'Failed' },
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
      .then(data => setProjects((data || []).slice(0, 5)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <GlassCard
        onClick={() => navigate('/register')}
        className="rounded-2xl p-5 w-full transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <p className="text-sm font-bold text-[#3D4852] tracking-tight">Enter our ecosystem</p>
        <p className="text-xs text-[#6B7280] font-medium mt-1 leading-relaxed">Built for founders who ship.</p>
      </GlassCard>
    );
  }

  if (loading) {
    return (
      <div className="w-full space-y-3">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`h-16 w-[85%] rounded-2xl neumorphic-inset animate-pulse ${i % 2 === 0 ? 'ml-auto rounded-tr-none' : 'mr-auto rounded-tl-none'}`} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <GlassCard
        onClick={() => navigate('/projects/new')}
        className="rounded-2xl p-6 w-full transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl neumorphic-inset flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#3D4852]">Your Workspace</p>
            <p className="text-[10px] text-[#6B7280] font-mono font-bold uppercase tracking-widest">0 Projects</p>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] leading-relaxed font-medium">Your creative history will appear here. Start your first AI-powered project today.</p>
      </GlassCard>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between px-1 mb-0.5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B7280] font-mono">Latest History</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs text-[#6B7280] font-bold hover:text-[#3D4852] transition-colors flex items-center gap-1 group cursor-pointer"
        >
          Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col gap-3.5 md:gap-4 py-1">
        {projects.map((project, i) => {
          const Icon = TYPE_ICONS[project.projectType] || FileText;
          const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.draft;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className={`
                group relative flex items-center justify-between p-3.5 md:p-4 rounded-2xl transition-all cursor-pointer neumorphic-card hover:-translate-y-0.5 active:scale-[0.99] max-w-[85%] sm:max-w-[88%]
                ${isLeft ? 'self-start rounded-tl-none' : 'self-end rounded-tr-none'}
              `}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-xl neumorphic-inset flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#6C63FF]" />
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-xs font-bold text-[#3D4852] truncate group-hover:text-[#6C63FF] transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-[8px] font-mono uppercase font-bold text-[#6C63FF] neumorphic-inset px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {project.projectType}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6B7280] truncate font-medium">
                    {project.wizardAnswers?.problemStatement || `An innovative ${project.projectType} solution.`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full neumorphic-inset flex-shrink-0 ml-2">
                <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                <span className="text-[8px] font-bold uppercase text-[#3D4852] font-mono">{status.label}</span>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate('/dashboard')}
          className="self-center mt-2 text-xs font-bold text-[#6C63FF] hover:text-[#8B84FF] flex items-center gap-1 cursor-pointer transition-colors py-1.5 px-4 rounded-full neumorphic-inset"
        >
          <span>View More Projects</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
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
        <FileText className="w-8 h-8 text-[#6C63FF]" />
        <p className="text-sm font-bold text-[#3D4852] mt-4">Generation</p>
      </GlassCard>
      <GlassCard 
        onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
        className="rounded-3xl p-6 flex-1 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <BookOpen className="w-8 h-8 text-[#6C63FF]" />
        <p className="text-sm font-bold text-[#3D4852] mt-4 tracking-tight">Archive</p>
      </GlassCard>
    </div>
    <GlassCard onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')} className="rounded-[2.5rem] p-5 flex gap-5 items-center transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
      <img src={heroImage} alt="Preview" className="w-20 h-20 sm:w-28 sm:h-20 object-cover rounded-2xl shadow-xl flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-bold text-[#3D4852] leading-tight">Advanced AI Document Sculpting</p>
        <p className="text-xs text-[#6B7280] mt-2 font-medium">For modern founders who ship fast.</p>
      </div>
      <button className="neumorphic-btn rounded-full w-10 h-10 flex items-center justify-center text-[#3D4852] ml-auto cursor-pointer text-xl font-bold">
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
