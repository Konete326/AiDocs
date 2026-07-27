import { Download, MessageCircle, Loader2, Cpu, Palette, Layers, Play, ChevronDown, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { downloadZip } from '../../services/exportService';
import { getAccessToken, refreshAccessTokenSilent } from '../../services/api';
import LiveSandboxModal from './LiveSandboxModal';
import { toast } from 'react-hot-toast';

const ProjectHeaderActions = ({ project }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [agentLiveUrl, setAgentLiveUrl] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!project?._id) return;

    let eventSource;
    try {
      eventSource = new EventSource(`/api/projects/${project._id}/events`, { withCredentials: true });

      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'kanban_update') {
            setIsSandboxOpen(true);
            toast.success(`Antigravity Agent updated task "${data.taskId || 'status'}" to ${data.status || 'done'}! Live Sandbox auto-opened.`);
          }
          if (data.type === 'live_sandbox' && data.liveUrl) {
            setAgentLiveUrl(data.liveUrl);
            setIsSandboxOpen(true);
            toast.success(`🚀 Antigravity Dev Server running at ${data.liveUrl} — Live Sandbox auto-opened!`, { duration: 5000 });
          }
        } catch (err) {}
      };
    } catch (err) {}

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [project?._id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="flex items-center gap-2.5 flex-wrap relative">
        <button
          onClick={() => setIsSandboxOpen(true)}
          className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-4 py-2 flex items-center gap-2 transition-all cursor-pointer shadow-md flex-shrink-0"
        >
          <Play className="w-4 h-4 text-white" />
          <span className="text-xs sm:text-sm font-bold">Live Sandbox</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/workspace`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <LayoutGrid className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">Workspace</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project._id}/chat`)}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#6C63FF]" />
          <span className="text-xs sm:text-sm text-[#3D4852] font-bold">AI Chat</span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span className="text-xs sm:text-sm text-[#3D4852] font-bold">More Tools</span>
            <ChevronDown className={`w-4 h-4 text-[#3D4852] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#E0E5EC] rounded-2xl p-2 z-50 flex flex-col gap-1 border border-white/60 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/stack`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#38B2AC]" />
                <span>Target Stack</span>
              </button>

              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/design-system`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Palette className="w-4 h-4 text-[#6C63FF]" />
                <span>Design System</span>
              </button>

              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/skills`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#6C63FF]" />
                <span>Skills</span>
              </button>

              {project.status === 'complete' && (
                <>
                  <div className="h-px bg-[#c4cdd8] my-1" />
                  <button
                    onClick={() => {
                      handleZipDownload();
                      setIsDropdownOpen(false);
                    }}
                    disabled={isDownloading}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin text-[#3D4852]" /> : <Download className="w-4 h-4 text-[#3D4852]" />}
                    <span>Download All</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <LiveSandboxModal isOpen={isSandboxOpen} onClose={() => setIsSandboxOpen(false)} project={project} initialUrl={agentLiveUrl} />
    </>
  
  );
};

export default ProjectHeaderActions;
