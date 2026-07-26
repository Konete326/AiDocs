import { Zap, ChevronLeft, CheckCircle, Loader, MessageCircle, Lock, X, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';
import { updateProject, triggerGeneration } from '../../services/projectService';

const DOC_LABELS = {
  prd: 'Product Requirements',
  srd: 'Software Requirements',
  techStack: 'Tech Stack',
  dbSchema: 'Database Schema',
  userFlows: 'User Flows',
  mvpPlan: 'MVP Plan',
  folderStructure: 'Folder Structure',
  claudeContext: 'Claude Context',
  agentSystemPrompt: 'Agent Prompts',
};

const DOC_ORDER = [
  'prd','srd','techStack','dbSchema','userFlows',
  'mvpPlan','folderStructure','claudeContext','agentSystemPrompt',
];

const GeneratingState = ({ project, onViewReady }) => {
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showRetryConfirm, setShowRetryConfirm] = useState(false);
  
  const docsGenerated = project?.docsGenerated || [];
  const count = docsGenerated.length;
  const pct = Math.round((count / 9) * 100);
  const canViewPartial = count >= 3;

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
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-4">

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
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold rounded-full px-5 py-2 text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-md"
              >
                Yes, Resume
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="neumorphic-card bg-[#E0E5EC] border border-black/5 rounded-[2.5rem] p-5 md:p-6 text-center flex flex-col items-center gap-3.5 w-full relative overflow-hidden group shadow-md">
        <div className="absolute top-4 right-4 w-11 h-11 rounded-full neumorphic-card bg-[#E0E5EC] flex items-center justify-center z-10 border border-black/5">
          <Zap className="w-5 h-5 text-[#2563EB] animate-pulse" />
        </div>
        
        <div className="space-y-1.5 relative z-10 max-w-xl mx-auto mt-2">
            <h2 className="text-xl font-extrabold text-[#3D4852] tracking-tight">Generating your business blueprint...</h2>
            <p className="text-xs text-[#6B7280] font-semibold leading-relaxed px-4">
              Our AI agents are building 9 comprehensive documents based on your requirements.
              Sit back and watch your project come to life.
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
                      className="w-7 h-7 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer text-white border-none shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <p className="text-lg font-extrabold text-[#2563EB]">{pct}%</p>
                </div>
            </div>

            <div className="neumorphic-inset rounded-full h-3.5 w-full overflow-hidden bg-[#E0E5EC] border border-black/5 p-0.5">
                <div
                className="bg-[#2563EB] rounded-full h-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex items-center justify-between px-2 pt-1">
              <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-widest">Page updates automatically</p>
              {canViewPartial && onViewReady && (
                <button
                  onClick={onViewReady}
                  className="text-[11px] font-extrabold text-[#2563EB] hover:underline transition-colors cursor-pointer"
                >
                  View {count} ready docs →
                </button>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        <div className="md:col-span-8 neumorphic-card bg-[#E0E5EC] rounded-[2rem] p-5 border border-black/5 shadow-md">
            <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-[#3D4852] text-xs font-extrabold tracking-wide uppercase">Blueprint Sequence</h3>
                <span className="text-[10px] text-[#6B7280] font-bold tracking-widest uppercase">Real-time status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {DOC_ORDER.map((type) => {
                    const isReady = docsGenerated.includes(type);
                    return (
                        <div 
                          key={type} 
                          className={`rounded-2xl p-2.5 px-3 border flex items-center gap-2.5 transition-all ${
                            isReady 
                              ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB] shadow-sm' 
                              : 'neumorphic-inset bg-[#E0E5EC] border-black/5 text-[#6B7280]'
                          }`}
                        >
                            <div className={`w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 ${isReady ? 'bg-[#2563EB] text-white' : 'bg-black/10'}`}>
                                {isReady ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <Loader className="w-3.5 h-3.5 text-[#6B7280] animate-spin" />}
                            </div>
                            <span className={`text-xs font-extrabold truncate ${isReady ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}>{DOC_LABELS[type]}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 neumorphic-card bg-[#E0E5EC] rounded-[2rem] p-5 border border-black/5 shadow-md flex flex-col justify-between">
                <div>
                   <div className="w-9 h-9 rounded-2xl bg-[#2563EB]/15 text-[#2563EB] flex items-center justify-center mb-2.5 border border-[#2563EB]/20">
                        <MessageCircle className="w-4.5 h-4.5" />
                   </div>
                   <h4 className="text-[#3D4852] text-xs font-extrabold mb-1">AI Co-founder Chat</h4>
                   <p className="text-[11px] text-[#6B7280] leading-relaxed font-semibold">Discuss your generated documents with AI in real-time as they appear.</p>
                </div>
                <button 
                  onClick={() => handleProGate('chat')}
                  className="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold rounded-full py-2 text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-none shadow-md"
                >
                    <span className="text-white font-extrabold">Enter Chat</span>
                </button>
            </div>

            <div className="neumorphic-card bg-[#E0E5EC] rounded-[2rem] p-5 border border-black/5 shadow-md">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[#3D4852] text-xs font-extrabold">Workspace</span>
                    <div className="w-7 h-7 rounded-full neumorphic-btn flex items-center justify-center">
                        <ChevronLeft className="w-3.5 h-3.5 text-[#6B7280] rotate-180" />
                    </div>
                </div>
                <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mb-2.5">Manage Roadmap</p>
                <button 
                  onClick={() => handleProGate('workspace')}
                  className="w-full text-xs font-extrabold text-[#2563EB] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                    Open Kanban Board →
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingState;
