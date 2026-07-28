import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDelete }) => {
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

  return (
    <div 
      onClick={() => navigate(`/projects/${project._id}`)}
      className="liquid-glass rounded-[24px] p-4 flex flex-col gap-2.5 hover:-translate-y-1 transition-all cursor-pointer group select-none min-h-[140px]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="rounded-full px-2.5 py-0.5 text-[9px] uppercase font-mono font-bold tracking-wider text-[#6C63FF] neumorphic-inset">
            {project.projectType}
          </span>
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
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
          className="rounded-full w-6 h-6 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-sm"
          aria-label="Delete project"
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
