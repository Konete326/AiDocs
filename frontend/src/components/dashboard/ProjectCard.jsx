import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'generating': return 'text-white/70 animate-pulse';
      case 'complete': return 'text-white/80';
      case 'error': return 'text-red-400/80';
      default: return 'text-white/50';
    }
  };

  const progress = (project.docsGenerated?.length / 9) * 100 || 0;

  return (
    <div 
      onClick={() => navigate(`/projects/${project._id}`)}
      className={`liquid-glass rounded-3xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform cursor-pointer group ${project.status === 'generating' ? 'animate-pulse' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="liquid-glass rounded-full px-3 py-1 text-xs uppercase tracking-wider text-white/60 capitalize">
            {project.projectType}
          </span>
          <h3 className="text-lg font-medium text-white mt-2 line-clamp-2">{project.title}</h3>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs uppercase tracking-wider liquid-glass ${getStatusStyle(project.status)}`}>
          {project.status}
        </div>
      </div>

      {(project.status === 'generating' || project.status === 'complete') && (
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 flex justify-between mb-1">
            <span>Documents</span>
            <span>{project.docsGenerated?.length || 0}/9</span>
          </div>
          <div className="liquid-glass rounded-full h-1 w-full overflow-hidden">
            <div 
              className="bg-white/60 h-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="text-xs text-white/40 uppercase tracking-wider">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project._id}`); }}
            className="liquid-glass rounded-full px-4 py-1.5 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
          >
            View
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(project._id); }}
            className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
