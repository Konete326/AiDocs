import { Zap, X, RefreshCw } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { updateProject, triggerGeneration } from '../../services/projectService';

const PIPELINE_NODES = [
  { id: 'prd', label: 'PRD', fullTitle: 'Product Requirements' },
  { id: 'srd', label: 'SRD', fullTitle: 'Software Requirements' },
  { id: 'techStack', label: 'Tech Stack', fullTitle: 'Tech Stack Specs' },
  { id: 'dbSchema', label: 'DB Schema', fullTitle: 'Database Schema' },
  { id: 'userFlows', label: 'User Flows', fullTitle: 'User Logic & Flows' },
  { id: 'mvpPlan', label: 'MVP Plan', fullTitle: 'MVP Roadmap' },
  { id: 'folderStructure', label: 'Structure', fullTitle: 'Folder Structure' },
  { id: 'claudeContext', label: 'Claude Docs', fullTitle: 'CLAUDE.md Guide' },
  { id: 'agentSystemPrompt', label: 'Prompts', fullTitle: 'Agent System Prompts' },
];

const GeneratingState = ({ project, onCancelState }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showRetryConfirm, setShowRetryConfirm] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Document generation in progress, are you sure you want to leave?';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  
  const docsGenerated = project?.docsGenerated || [];
  const count = docsGenerated.length;

  const currentActiveDocId = useMemo(() => {
    return PIPELINE_NODES.find((node) => !docsGenerated.includes(node.id))?.id || null;
  }, [docsGenerated]);

  const activeDocTitle = useMemo(() => {
    const node = PIPELINE_NODES.find(n => n.id === currentActiveDocId);
    return node ? node.fullTitle : 'Finalizing Architecture Blueprint...';
  }, [currentActiveDocId]);

  const targetPct = useMemo(() => {
    if (project?.status === 'complete' || project?.status === 'ready' || count >= 9) return 100;
    return Math.min(95, Math.max(20, Math.round((count / 9) * 90) + 8));
  }, [count, project?.status]);

  const [smoothPct, setSmoothPct] = useState(() => targetPct);

  useEffect(() => {
    if (targetPct >= 100) {
      setSmoothPct(100);
      return;
    }
    const interval = setInterval(() => {
      setSmoothPct(prev => {
        if (prev < targetPct) {
          return Math.min(targetPct, prev + 3);
        }
        return prev;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [targetPct]);

  const handleCancel = async () => {
    setShowCancelConfirm(false);
    try {
      await updateProject(project._id, { status: 'draft', generationLock: null });
      localStorage.removeItem('clarifyai_active_generation');
      if (onCancelState) {
        onCancelState();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('[handleCancel] failed:', err);
    }
  };

  const handleRetry = async () => {
    setShowRetryConfirm(false);
    try {
      await updateProject(project._id, { generationLock: null });
      await triggerGeneration(project._id, true);
    } catch (err) {
      console.error('[handleRetry] failed:', err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto space-y-4 pt-4 md:pt-8">
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
          <div className="neumorphic-card bg-[#E0E5EC] rounded-3xl p-6 w-full max-w-sm border border-black/5 text-center relative z-10 shadow-2xl">
            <h3 className="text-base font-extrabold text-[#3D4852]">Cancel Generation?</h3>
            <p className="text-xs text-[#6B7280] font-medium mt-2 leading-relaxed">
              Are you sure you want to cancel? This will set the project back to draft, allowing you to edit features or restart.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="neumorphic-btn rounded-xl px-4 py-2 text-xs font-bold text-[#3D4852] cursor-pointer"
              >
                No, Continue
              </button>
              <button
                onClick={handleCancel}
                className="rounded-xl px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showRetryConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
          <div className="neumorphic-card bg-[#E0E5EC] rounded-3xl p-6 w-full max-w-sm border border-black/5 text-center relative z-10 shadow-2xl">
            <h3 className="text-base font-extrabold text-[#3D4852]">Restart Generation?</h3>
            <p className="text-xs text-[#6B7280] font-medium mt-2 leading-relaxed">
              This will re-run the architecture generation pipeline from the beginning.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setShowRetryConfirm(false)}
                className="neumorphic-btn rounded-xl px-4 py-2 text-xs font-bold text-[#3D4852] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRetry}
                className="rounded-xl px-4 py-2 text-xs font-bold bg-[#6C63FF] hover:bg-[#8B84FF] text-white shadow-md cursor-pointer"
              >
                Restart Pipeline
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="neumorphic-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden border border-[#CAD1DB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neumorphic-inset flex items-center justify-center text-[#6C63FF]">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#3D4852]">Synthesizing Architecture</h2>
              <p className="text-xs text-[#6B7280] font-medium">Parallel AI Specification Engine</p>
            </div>
          </div>
          <span className="font-mono text-xl font-black text-[#6C63FF]">{smoothPct}%</span>
        </div>

        <div className="w-full bg-[#cad1db]/40 rounded-full h-3 overflow-hidden neumorphic-inset p-0.5">
          <div
            className="bg-[#6C63FF] h-full rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${smoothPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#6B7280]">
          <span className="font-medium">Currently building: <strong className="text-[#3D4852]">{activeDocTitle}</strong></span>
          <span className="font-mono text-[11px] font-bold text-[#6C63FF]">{count} / 9 complete</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5 pt-2">
          {PIPELINE_NODES.map((node) => {
            const isDone = docsGenerated.includes(node.id);
            const isCurrent = currentActiveDocId === node.id;
            return (
              <div
                key={node.id}
                className={`p-2.5 rounded-2xl text-center text-xs font-bold transition-all ${
                  isDone
                    ? 'neumorphic-inset text-emerald-700 border border-emerald-500/30'
                    : isCurrent
                    ? 'bg-[#6C63FF] text-white shadow-md animate-pulse'
                    : 'neumorphic-card text-[#6B7280] opacity-60'
                }`}
              >
                <div className="truncate">{node.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center pt-4 border-t border-black/5 gap-3">
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="neumorphic-btn rounded-2xl px-5 py-2 text-xs font-bold text-rose-600 flex items-center gap-1.5 cursor-pointer hover:bg-rose-50"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          <button
            onClick={() => setShowRetryConfirm(true)}
            className="neumorphic-btn rounded-2xl px-5 py-2 text-xs font-bold text-[#3D4852] flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>Restart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratingState;
