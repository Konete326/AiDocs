import { ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const WorkspaceHeader = ({ project, isSaving, onBack }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <button
          onClick={onBack}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Back to Project</span>
        </button>
        <div className="mt-3">
          <h1 className="text-2xl font-medium text-white">{project?.title}</h1>
          <p className="text-xs uppercase tracking-widest text-white/50 mt-1">Workspace</p>
        </div>
      </div>
      
      <div>
        {isSaving ? (
          <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span className="text-xs text-white/50">Saving...</span>
          </div>
        ) : (
          <div className="liquid-glass rounded-full px-4 py-2 border border-white/5">
            <span className="text-xs text-white/40">All changes saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
