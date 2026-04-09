import { ChevronLeft, Download } from 'lucide-react';

const STATUS_STYLES = {
  draft: 'text-white/40',
  generating: 'text-white/70 animate-pulse',
  complete: 'text-white/80',
  error: 'text-white/40',
};

const ProjectHeader = ({ project, onBack }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <button
        onClick={onBack}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 text-white/70" />
        <span className="text-sm text-white/70">Dashboard</span>
      </button>
      <div className="mt-3">
        <h1 className="text-2xl font-medium text-white">{project.title}</h1>
        <div className="flex items-center gap-3 mt-1">
          <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/50 capitalize">
            {project.projectType}
          </span>
          <span className={`liquid-glass rounded-full px-3 py-1 text-xs capitalize ${STATUS_STYLES[project.status] || 'text-white/50'}`}>
            {project.status}
          </span>
        </div>
      </div>
    </div>
    {project.status === 'complete' && (
      <button
        onClick={() => console.log('ZIP download - coming soon')}
        className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        <Download className="w-4 h-4 text-white/70" />
        <span className="text-sm text-white/70">Download All</span>
      </button>
    )}
  </div>
);

export default ProjectHeader;
