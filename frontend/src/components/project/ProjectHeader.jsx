import { ChevronLeft, Download, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const STATUS_STYLES = {
  draft: 'text-white/40',
  generating: 'text-white/70 animate-pulse',
  complete: 'text-white/80',
  error: 'text-white/40',
};

const ProjectHeader = ({ project, onBack, subscription }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

  const handleZipDownload = () => {
    alert('ZIP download coming soon! Your Pro plan is active.');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <button
          onClick={onBack}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Dashboard</span>
        </button>
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-white tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-white/50">
              {project.projectType}
            </span>
            <span className={`liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${STATUS_STYLES[project.status] || 'text-white/50'}`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {project.status === 'complete' && (
        isPro ? (
          <button
            onClick={handleZipDownload}
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/90 font-medium">Download All</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/pricing')}
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer text-white/40"
          >
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Download All (Pro)</span>
          </button>
        )
      )}
    </div>
  );
};

export default ProjectHeader;
