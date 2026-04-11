import { Download, Lock, MessageCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { downloadZip } from '../../services/exportService';

const ProjectHeaderActions = ({ project, isPro }) => {
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
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate(`/projects/${project._id}/${isPro ? 'chat' : 'pricing'}`)}
        className={`liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer ${!isPro ? 'text-white/40' : ''}`}
      >
        {isPro ? <MessageCircle className="w-4 h-4 text-white/80" /> : <Lock className="w-4 h-4" />}
        <span className="text-sm font-medium">AI Chat</span>
      </button>

      <button
        onClick={() => navigate('/projects/' + project._id + '/workspace')}
        className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
      >
        <span className="text-sm text-white/80 font-medium">⬡ Workspace</span>
      </button>

      {project.status === 'complete' && (
        isPro ? (
          <button
            onClick={handleZipDownload}
            disabled={isDownloading}
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-white/80" />}
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

export default ProjectHeaderActions;
