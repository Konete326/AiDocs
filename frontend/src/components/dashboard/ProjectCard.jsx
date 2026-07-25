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
      className="liquid-glass rounded-[32px] p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all cursor-pointer group select-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="rounded-full px-3 py-1 text-[10px] uppercase font-mono font-bold tracking-wider text-[#6C63FF] neumorphic-inset">
            {project.projectType}
          </span>
          <h3 className="text-lg font-bold text-[#3D4852] mt-3 line-clamp-2">{project.title}</h3>
        </div>
        <div className={`rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider ${getStatusStyle(project.status)}`}>
          {project.status}
        </div>
      </div>

      {(project.status === 'generating' || project.status === 'complete') && (
        <div>
          <div className="text-[10.5px] uppercase font-mono font-bold tracking-widest text-[#6B7280] flex justify-between mb-1.5">
            <span>Documents</span>
            <span>{project.docsGenerated?.length || 0}/9</span>
          </div>
          <div className="neumorphic-inset rounded-full h-2 w-full overflow-hidden p-0.5">
            <div 
              className="bg-[#6C63FF] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
        <span className="text-[10px] font-mono text-[#6B7280] font-medium">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
          className="rounded-full w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-rose-600 neumorphic-btn transition-all cursor-pointer"
          aria-label="Delete project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
