import { useNavigate } from 'react-router-dom';
import { Trash2, Archive, RotateCcw } from 'lucide-react';

const ProjectCard = ({ project, onDelete, onArchive, onUnarchive }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'generating': return 'neumorphic-inset text-amber-600 animate-pulse';
      case 'complete': return 'neumorphic-inset text-teal-600';
      case 'error': return 'neumorphic-inset text-rose-600';
      default: return 'neumorphic-inset text-[#6B7280]';
    }
  };

  const progress = (project.docsGenerated?.length / 9) * 100 || 0;
  const isArchived = project.isArchived === true;

  return (
    <div 
      onClick={() => navigate(`/projects/${project._id}`)}
      className={`liquid-glass rounded-[24px] p-4 flex flex-col gap-2.5 hover:-translate-y-1 transition-all cursor-pointer group select-none min-h-[140px] ${
        isArchived ? 'opacity-75 border-rose-400/30' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="rounded-full px-2.5 py-0.5 text-[9px] uppercase font-mono font-bold tracking-wider text-[#6C63FF] neumorphic-inset">
              {project.projectType}
            </span>
            {isArchived && (
              <span className="rounded-full px-2 py-0.5 text-[8.5px] uppercase font-mono font-bold tracking-wider text-rose-600 bg-rose-500/10 border border-rose-500/20">
                Archived
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-[#3D4852] mt-1.5 line-clamp-1 truncate">{project.title}</h3>
        </div>
        <div className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${getStatusStyle(project.status)}`}>
          {project.status}
        </div>
      </div>

      {(project.status === 'generating' || project.status === 'complete') && (
        <div className="mt-1">
          <div className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-[#6B7280] flex justify-between mb-1">
            <span>Docs</span>
            <span>{project.docsGenerated?.length || 0}/9</span>
          </div>
          <div className="neumorphic-inset rounded-full h-1.5 w-full overflow-hidden p-0.5">
            <div 
              className="bg-[#6C63FF] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5">
        <span className="text-[9px] font-mono text-[#6B7280] font-medium">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {isArchived ? (
            <button
              onClick={() => onUnarchive?.(project._id)}
              className="rounded-full px-2.5 py-1 flex items-center gap-1 bg-[#6C63FF] hover:bg-[#8B84FF] text-white text-[10px] font-bold transition-all cursor-pointer shadow-sm"
              title="Restore / Unarchive Project"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore</span>
            </button>
          ) : (
            <button
              onClick={() => onArchive?.(project._id)}
              className="rounded-full w-6 h-6 flex items-center justify-center bg-slate-300 hover:bg-slate-400 text-slate-700 transition-all cursor-pointer shadow-sm"
              title="Archive project"
            >
              <Archive className="w-3 h-3" />
            </button>
          )}

          <button 
            onClick={() => onDelete?.(project._id)}
            className="rounded-full w-6 h-6 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-sm"
            aria-label="Delete project"
            title="Delete project"
          >
            <Trash2 className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
