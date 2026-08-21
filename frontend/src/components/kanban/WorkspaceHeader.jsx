import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Bot, CheckCircle2, Maximize2, Minimize2, ChevronDown, Layers, Palette, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import GithubIcon from '../common/GithubIcon';
import logo from '../../assets/logo.png';

const WorkspaceHeader = ({ project, isSaving, onBack, onOpenGithubModal, isFullWidth, onToggleFullWidth }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/5 flex-shrink-0 gap-3 flex-wrap sm:flex-nowrap w-full">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
          <span className="whitespace-nowrap">Back</span>
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <img src={logo} alt="ClarifyAI Logo" className="h-8 w-auto object-contain neumorphic-card p-1 rounded-xl cursor-pointer shrink-0" onClick={() => navigate('/')} />
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-base sm:text-lg font-black text-[#3D4852] truncate max-w-[180px] sm:max-w-md">{project?.title}</h1>
            <span className="text-[10px] text-[#6C63FF] font-mono font-bold uppercase tracking-wider neumorphic-inset px-2.5 py-0.5 rounded-full shrink-0">
              Workspace
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {project?._id && (
          <button
            onClick={() => navigate(`/projects/${project._id}/chat`)}
            className="neumorphic-btn text-[#3D4852] rounded-2xl px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span className="hidden sm:inline">AI Co-founder</span>
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="neumorphic-btn rounded-2xl px-3.5 py-2 text-xs text-[#3D4852] font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>More Options</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#E0E5EC] rounded-2xl p-2 z-50 flex flex-col gap-1 border border-[#CAD1DB] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
              <button
                onClick={() => {
                  onToggleFullWidth();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                {isFullWidth ? <Minimize2 className="w-4 h-4 text-[#6C63FF]" /> : <Maximize2 className="w-4 h-4 text-[#6C63FF]" />}
                <span>{isFullWidth ? 'Boxed View' : 'Full Width Canvas'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenGithubModal();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-[#3D4852]" />
                <span>Sync with GitHub</span>
              </button>

              <div className="h-px bg-[#CAD1DB] my-1" />

              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/stack`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#38B2AC]" />
                <span>Target Stack</span>
              </button>

              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/design-system`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Palette className="w-4 h-4 text-[#6C63FF]" />
                <span>Design System</span>
              </button>

              <button
                onClick={() => {
                  navigate(`/projects/${project._id}/skills`);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#3D4852] font-bold hover:bg-[#d1d7e0] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#6C63FF]" />
                <span>Skills</span>
              </button>
            </div>
          )}
        </div>

        {isSaving ? (
          <div className="neumorphic-inset rounded-full px-3 py-1.5 flex items-center gap-1.5 text-amber-600 font-bold text-[11px]">
            <LoadingSpinner size="sm" />
            <span className="hidden sm:inline">Saving...</span>
          </div>
        ) : (
          <div className="neumorphic-inset rounded-full px-3 py-1.5 flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
