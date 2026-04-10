import { ChevronLeft, Download } from 'lucide-react';

const STATUS_STYLES = {
  draft: 'text-white/40',
  generating: 'text-white/70 animate-pulse',
  complete: 'text-white/80',
  error: 'text-white/40',
};

const ProjectHeader = ({ project, onBack, onDownload, subscription }) => {
  const isPro = subscription?.plan === 'pro' || subscription?.plan === 'team';

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
        <button
          onClick={onDownload}
          className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer group"
        >
          <Download className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-xs text-white/90 font-semibold tracking-wide uppercase">Download Project</span>
            {!isPro && <span className="text-[9px] text-white/40 mt-0.5">PRO FEATURE</span>}
          </div>
        </button>
      )}
    </div>
  );
};

export default ProjectHeader;
