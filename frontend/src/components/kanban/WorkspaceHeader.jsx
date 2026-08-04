import { ChevronLeft, Bot, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import GithubIcon from '../common/GithubIcon';
import GithubSyncStatusBadge from '../workspace/GithubSyncStatusBadge';
import logo from '../../assets/logo.png';

const WorkspaceHeader = ({ project, isSaving, onBack, onOpenGithubModal }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/5 flex-shrink-0 gap-3 flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="neumorphic-btn rounded-2xl px-4 py-2 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#3D4852]" />
          <span className="whitespace-nowrap">Back to Project</span>
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="ClarifyAI Logo" className="h-8 w-auto object-contain neumorphic-card p-1 rounded-xl cursor-pointer" onClick={() => navigate('/')} />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-[#3D4852] truncate max-w-[200px] sm:max-w-md">{project?.title}</h1>
              <span className="text-[10px] text-[#6C63FF] font-mono font-bold uppercase tracking-wider neumorphic-inset px-2.5 py-0.5 rounded-full">
                Workspace
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <GithubSyncStatusBadge project={project} />

        <button
          onClick={onOpenGithubModal}
          className="neumorphic-btn hover:text-[#6C63FF] text-[#3D4852] rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          title="Push 9-Document Suite to GitHub"
        >
          <GithubIcon className="w-3.5 h-3.5 text-[#3D4852]" />
          <span className="hidden sm:inline">Sync GitHub</span>
        </button>

        {project?._id && (
          <button
            onClick={() => navigate(`/projects/${project._id}/chat`)}
            className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            title="Chat with AI Co-founder"
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">AI Co-founder</span>
          </button>
        )}

        {isSaving ? (
          <div className="neumorphic-inset rounded-full px-3.5 py-1.5 flex items-center gap-2 text-amber-600 font-bold text-[11px]">
            <LoadingSpinner size="sm" />
            <span>Saving...</span>
          </div>
        ) : (
          <div className="neumorphic-inset rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
