import { ChevronLeft, Bot, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const WorkspaceHeader = ({ project, isSaving, onBack }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 flex-shrink-0 gap-3 flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="liquid-glass rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-all cursor-pointer border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium whitespace-nowrap">Back to Project</span>
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-semibold text-white truncate max-w-[200px] sm:max-w-md">{project?.title}</h1>
            <span className="text-[9.5px] bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Workspace
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {project?._id && (
          <button
            onClick={() => navigate(`/projects/${project._id}/chat`)}
            className="bg-[#38B2AC] hover:bg-[#319795] text-white rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 border-none"
            title="Chat with AI Co-founder"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">AI Co-founder</span>
          </button>
        )}

        {isSaving ? (
          <div className="liquid-glass rounded-full px-3 py-1.5 flex items-center gap-2 border border-amber-500/30">
            <LoadingSpinner size="sm" />
            <span className="text-[11px] text-amber-300 font-medium">Saving...</span>
          </div>
        ) : (
          <div className="liquid-glass rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">Saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
