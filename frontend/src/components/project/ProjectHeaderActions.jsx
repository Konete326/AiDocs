import { Download, MessageCircle, Loader2, Cpu, Palette, Layers } from 'lucide-react';
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
        onClick={() => navigate(`/projects/${project._id}/stack`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 border border-slate-200"
      >
        <Layers className="w-4 h-4 text-emerald-600" />
        <span className="text-xs sm:text-sm text-slate-800 font-semibold">Target Stack</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/design-system`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 border border-slate-200"
      >
        <Palette className="w-4 h-4 text-teal-600" />
        <span className="text-xs sm:text-sm text-slate-800 font-semibold">Design System</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/chat`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 border border-slate-200"
      >
        <MessageCircle className="w-4 h-4 text-indigo-600" />
        <span className="text-xs sm:text-sm text-slate-800 font-semibold">AI Chat</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/workspace`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 border border-slate-200"
      >
        <span className="text-xs sm:text-sm text-slate-800 font-semibold">Workspace</span>
      </button>

      <button
        onClick={() => navigate(`/projects/${project._id}/skills`)}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer flex-shrink-0 border border-slate-200"
      >
        <Cpu className="w-4 h-4 text-blue-600" />
        <span className="text-xs sm:text-sm text-slate-800 font-semibold">Skills</span>
      </button>

      {project.status === 'complete' && (
        <button
          onClick={handleZipDownload}
          disabled={isDownloading}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 disabled:hover:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed flex-shrink-0 border border-slate-200"
        >
          {isDownloading ? <Loader2 className="w-4 h-4 animate-spin text-slate-600" /> : <Download className="w-4 h-4 text-slate-700" />}
          <span className="text-xs sm:text-sm text-slate-900 font-semibold">Download All</span>
        </button>
      )}
    </div>
  );
};

export default ProjectHeaderActions;
