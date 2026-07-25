import { Download, MessageCircle, Loader2, Cpu, Palette, Layers, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { downloadZip } from '../../services/exportService';
import LiveSandboxModal from './LiveSandboxModal';
import { toast } from 'react-hot-toast';

const ProjectHeaderActions = ({ project }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  useEffect(() => {
    if (!project?._id) return;
    const token = localStorage.getItem('token');
    const eventSource = new EventSource(`/api/projects/${project._id}/events?token=${token}`);

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'kanban_update') {
          setIsSandboxOpen(true);
          toast.success(`Antigravity Agent updated task "${data.taskId || 'status'}" to ${data.status || 'done'}! Live Sandbox auto-opened.`);
        }
      } catch (err) {}
    };

    return () => eventSource.close();
  }, [project?._id]);

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
    <>
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          onClick={() => setIsSandboxOpen(true)}
          className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-4 py-2 flex items-center gap-2 transition-all cursor-pointer shadow-md flex-shrink-0"
        >
          <Play className="w-4 h-4 text-white" />
          <span className="text-xs sm:text-sm font-bold">Live Sandbox</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/stack`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Layers className="w-4 h-4 text-[#38B2AC]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Target Stack</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/design-system`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Palette className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Design System</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/chat`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">AI Chat</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/workspace`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Workspace</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/skills`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <Cpu className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Skills</span>
        </button>

        {project.status === 'complete' && (
          <button
            onClick={handleZipDownload}
            disabled={isDownloading}
            className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin text-[#3D4852]" /> : <Download className="w-4 h-4 text-[#3D4852]" />}
            <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Download All</span>
          </button>
        )}
      </div>

      <LiveSandboxModal isOpen={isSandboxOpen} onClose={() => setIsSandboxOpen(false)} project={project} />
    </>
  );
};

export default ProjectHeaderActions;
