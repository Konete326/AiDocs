import { Download, MessageCircle, Loader2, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { downloadZip } from '../../services/exportService';

const ProjectHeaderActions = ({ project }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleZipDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadZip(project._id, project.title);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button
        onClick={() => navigate(`/projects/${project._id}/chat`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0"
      >
        <MessageCircle className="w-4 h-4 text-white/80" />
        <span className="text-xs sm:text-sm font-medium">AI Chat</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/workspace`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0"
      >
        <span className="text-xs sm:text-sm text-white/80 font-medium">Workspace</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/skills`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0"
      >
        <Cpu className="w-4 h-4 text-blue-400" />
        <span className="text-xs sm:text-sm text-white/80 font-medium">Skills</span>
      </button>

      {project.status === 'complete' && (
        <button
          onClick={handleZipDownload}
          disabled={isDownloading}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 disabled:hover:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
        >
          {isDownloading ? <Loader2 className="w-4 h-4 animate-spin opacity-70" /> : <Download className="w-4 h-4 text-white/80" />}
          <span className="text-xs sm:text-sm text-white/90 font-medium">Download All</span>
        </button>
      )}
    </div>
  );
};

export default ProjectHeaderActions;
