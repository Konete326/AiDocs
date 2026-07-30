import { Zap, ChevronLeft, CheckCircle2, Loader2, MessageCircle, X, RefreshCw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';
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

const GeneratingState = ({ project, onViewReady }) => {
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showRetryConfirm, setShowRetryConfirm] = useState(false);
  
  const docsGenerated = project?.docsGenerated || [];
  const count = docsGenerated.length;
  const pct = Math.round((count / 9) * 100);
  const canViewPartial = count >= 3;

  const currentActiveDocId = useMemo(() => {
    return PIPELINE_NODES.find((node) => !docsGenerated.includes(node.id))?.id || null;
  }, [docsGenerated]);

  const handleProGate = (feature) => {
    if (feature === 'chat') navigate(`/projects/${project._id}/chat`);
    if (feature === 'workspace') navigate(`/projects/${project._id}/workspace`);
  };

  const handleCancel = async () => {
    setShowCancelConfirm(false);
    try {
      await updateProject(project._id, { status: 'draft', generationLock: null });
      window.location.reload();
    } catch (err) {
      console.error('[handleCancel] failed:', err);
    }
  };

  const handleRetry = async () => {
    setShowRetryConfirm(false);
    try {
      await updateProject(project._id, { generationLock: null });
      await triggerGeneration(project._id);
      window.location.reload();
    } catch (err) {
      console.error('[handleRetry] failed:', err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-5">

      {showCancelConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
          <div className="neumorphic-card bg-[#E0E5EC] rounded-3xl p-6 w-full max-w-sm border border-black/5 text-center relative z-10 shadow-2xl">
            <h3 className="text-base font-extrabold text-[#3D4852]">Cancel Generation?</h3>
            <p className="text-xs text-[#6B7280] font-medium mt-2 leading-relaxed">
              Are you sure you want to cancel? This will set the project back to draft, allowing you to edit features or restart.
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="neumorphic-btn rounded-full px-5 py-2 text-xs text-[#3D4852] font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-full px-5 py-2 text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-md"
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
            <h3 className="text-base font-extrabold text-[#3D4852]">Retry / Resume Generation?</h3>
            <p className="text-xs text-[#6B7280] font-medium mt-2 leading-relaxed">
              Are you sure you want to retry? This will release any active locks and resume the AI document generator.
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowRetryConfirm(false)}
                className="neumorphic-btn rounded-full px-5 py-2 text-xs text-[#3D4852] font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleRetry}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white font-extrabold rounded-full px-5 py-2 text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-md"
              >
                Yes, Resume
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="neumorphic-card bg-[#E0E5EC] border border-white/60 rounded-[2.5rem] p-6 md:p-7 text-center flex flex-col items-center gap-4 w-full relative overflow-hidden group shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)]">
        <div className="absolute top-5 right-5 w-11 h-11 rounded-full neumorphic-card bg-[#E0E5EC] flex items-center justify-center z-10 border border-white/60">
          <Zap className="w-5 h-5 text-[#6C63FF] animate-pulse" />
        </div>
        
        <div className="space-y-1.5 relative z-10 max-w-xl mx-auto mt-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#3D4852] tracking-tight">Generating your business blueprint...</h2>
            <p className="text-xs text-[#6B7280] font-semibold leading-relaxed px-2">
              Our AI agents are executing the 9-document architecture pipeline in real time.
            </p>
        </div>

        <div className="w-full space-y-2 relative z-10">
            <div className="flex justify-between items-center px-2">
                <p className="text-[11px] text-[#6B7280] uppercase font-extrabold tracking-[0.2em]">{count} of 9 complete</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 mr-1">
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      title="Cancel Generation"
                      className="w-7 h-7 rounded-full neumorphic-btn flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer text-[#6B7280]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowRetryConfirm(true)}
                      title="Retry / Resume"
                      className="w-7 h-7 rounded-full bg-[#6C63FF] hover:bg-[#8B84FF] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer text-white border-none shadow-[3px_3px_8px_rgba(108,99,255,0.35)]"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <p className="text-lg font-extrabold text-[#6C63FF]">{pct}%</p>
                </div>
            </div>

            <div className="neumorphic-inset rounded-full h-4 w-full overflow-hidden bg-[#E0E5EC] border border-white/60 p-0.5 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
                <div
                className="bg-[#6C63FF] rounded-full h-full transition-all duration-700 ease-out shadow-[4px_4px_10px_rgba(108,99,255,0.35)]"
                style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex items-center justify-between px-2 pt-1">
              <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-widest">Pipeline auto-updates</p>
              {canViewPartial && onViewReady && (
                <button
                  onClick={onViewReady}
                  className="text-[11px] font-extrabold text-[#6C63FF] hover:underline transition-colors cursor-pointer"
                >
                  View {count} ready docs →
                </button>
              )}
            </div>
        </div>
      </div>

      <div className="neumorphic-card bg-[#E0E5EC] rounded-[2.5rem] p-6 border border-white/60 shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6C63FF] animate-ping" />
            <h3 className="text-[#3D4852] text-xs font-extrabold tracking-widest uppercase">Real-Time AI Generation Pipeline</h3>
          </div>
          <span className="text-[10px] bg-[#6C63FF]/15 text-[#6C63FF] font-extrabold px-3 py-1 rounded-full neumorphic-inset">
            {currentActiveDocId ? `Building: ${PIPELINE_NODES.find(n => n.id === currentActiveDocId)?.fullTitle}` : 'All Pipelines Complete'}
          </span>
        </div>

        <div className="w-full overflow-x-auto hover-scrollbar custom-scrollbar pb-2">
          <div className="flex items-center justify-between min-w-[780px] px-2 relative py-4">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-4 h-1 bg-black/10 z-0 rounded-full" />

            {PIPELINE_NODES.map((node, index) => {
              const isReady = docsGenerated.includes(node.id);
              const isActive = node.id === currentActiveDocId;
              const isPending = !isReady && !isActive;

              return (
                <div key={node.id} className="relative z-10 flex flex-col items-center group cursor-default">
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#6C63FF] opacity-35 animate-ping" />
                    )}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        isReady
                          ? 'bg-[#6C63FF] border-[#6C63FF] text-white shadow-[4px_4px_10px_rgba(108,99,255,0.35)]'
                          : isActive
                          ? 'bg-[#E0E5EC] border-[#6C63FF] text-[#6C63FF] shadow-[0_0_15px_rgba(108,99,255,0.5)]'
                          : 'bg-[#E0E5EC] border-white/60 text-[#6B7280] neumorphic-inset'
                      }`}
                    >
                      {isReady ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 text-[#6C63FF] animate-spin" />
                      ) : (
                        <span className="text-xs font-bold text-[#6B7280]">{index + 1}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-center mt-2.5 space-y-0.5">
                    <p className={`text-xs font-extrabold transition-colors ${isReady ? 'text-[#3D4852]' : isActive ? 'text-[#6C63FF]' : 'text-[#6B7280]'}`}>
                      {node.label}
                    </p>
                    <span className="text-[9px] font-bold block max-w-[80px] truncate text-[#6B7280]">
                      {isReady ? 'Ready' : isActive ? 'Generating...' : 'Queued'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        <div className="md:col-span-6 neumorphic-card bg-[#E0E5EC] rounded-[2rem] p-5 border border-white/60 shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)] flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-2xl bg-[#6C63FF]/15 text-[#6C63FF] flex items-center justify-center mb-2.5 border border-[#6C63FF]/20">
              <MessageCircle className="w-4.5 h-4.5" />
            </div>
            <h4 className="text-[#3D4852] text-xs font-extrabold mb-1">AI Co-founder Chat</h4>
            <p className="text-[11px] text-[#6B7280] leading-relaxed font-semibold">Discuss your generated documents with AI in real-time as they appear.</p>
          </div>
          <button 
            onClick={() => handleProGate('chat')}
            className="mt-4 w-full bg-[#6C63FF] hover:bg-[#8B84FF] text-white font-extrabold rounded-2xl py-2 text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-none shadow-[4px_4px_10px_rgba(108,99,255,0.35)]"
          >
            <span className="text-white font-extrabold">Enter Chat</span>
          </button>
        </div>

        <div className="md:col-span-6 neumorphic-card bg-[#E0E5EC] rounded-[2rem] p-5 border border-white/60 shadow-[9px_9px_18px_rgba(163,177,198,0.5),-9px_-9px_18px_rgba(255,255,255,0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#3D4852] text-xs font-extrabold">Project Workspace</span>
              <div className="w-7 h-7 rounded-full neumorphic-btn flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-[#6B7280] rotate-180" />
              </div>
            </div>
            <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mb-2.5">Manage Features & Kanban</p>
          </div>
          <button 
            onClick={() => handleProGate('workspace')}
            className="w-full text-xs font-extrabold text-[#6C63FF] hover:underline transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Open Kanban Board</span>
            <ArrowRight className="w-4 h-4 text-[#6C63FF]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratingState;
