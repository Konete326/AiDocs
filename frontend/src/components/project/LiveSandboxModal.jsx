import { useState } from 'react';
import { X, Play, RefreshCw, Smartphone, Monitor, Terminal, CheckCircle2 } from 'lucide-react';

const LiveSandboxModal = ({ isOpen, onClose, project }) => {
  const [device, setDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('app');
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const refreshApp = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const previewWidth = device === 'mobile' ? 'max-w-[375px]' : device === 'tablet' ? 'max-w-[768px]' : 'w-full';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-6xl h-[85vh] neumorphic-card rounded-[2.5rem] flex flex-col overflow-hidden bg-[#E0E5EC] text-[#3D4852]">
        <div className="flex items-center justify-between p-4 px-6 border-b border-black/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl neumorphic-inset flex items-center justify-center text-[#6C63FF]">
              <Play className="w-4 h-4 text-[#6C63FF]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#3D4852]">{project?.title || 'Project'} — Live Sandbox</h3>
              <p className="text-[10px] text-[#6B7280] font-mono font-bold">Vite / React WebContainer Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 neumorphic-inset rounded-2xl">
              <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'desktop' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'mobile' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button onClick={onClose} className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-2 border-b border-black/5 flex-shrink-0 bg-[#E0E5EC]">
          <div className="flex items-center gap-2 flex-1 max-w-xl neumorphic-inset rounded-2xl px-4 py-1.5">
            <button onClick={refreshApp} className="cursor-pointer text-[#6B7280] hover:text-[#3D4852]">
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <span className="text-xs font-mono font-bold text-[#3D4852] truncate">https://preview.clarifyai.app/projects/{project?._id || 'demo'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#38B2AC] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Container Active</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-[#E0E5EC] p-6 flex justify-center items-center overflow-hidden">
          <div className={`${previewWidth} h-full neumorphic-inset rounded-3xl overflow-hidden flex flex-col transition-all duration-300`}>
            {isRefreshing ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#6B7280]">
                <RefreshCw className="w-6 h-6 animate-spin text-[#6C63FF]" />
                <span>Reloading sandbox bundle...</span>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-[#E0E5EC]">
                <div className="w-16 h-16 rounded-3xl neumorphic-card flex items-center justify-center text-[#6C63FF]">
                  <Play className="w-8 h-8 text-[#6C63FF] ml-1" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#3D4852]">{project?.title || 'Generated Product'}</h4>
                  <p className="text-xs text-[#6B7280] font-medium max-w-md mt-1">Live WebContainer Sandbox compiled successfully. React app running on port 5173.</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs font-mono font-bold text-[#38B2AC] neumorphic-inset px-3 py-1.5 rounded-full">⚡ HMR Enabled</span>
                  <span className="text-xs font-mono font-bold text-[#6C63FF] neumorphic-inset px-3 py-1.5 rounded-full">📦 Vite 8.0 Engine</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSandboxModal;
