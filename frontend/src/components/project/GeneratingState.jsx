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
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-3">

      {showCancelConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-200 text-center relative z-10 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Cancel Generation?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to cancel? This will set the project back to draft, allowing you to edit features or restart.
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="liquid-glass rounded-full px-5 py-2 text-xs text-slate-700 font-semibold transition-all cursor-pointer border border-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showRetryConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-200 text-center relative z-10 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Retry / Resume Generation?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to retry? This will release any active locks and resume the AI document generator.
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowRetryConfirm(false)}
                className="liquid-glass rounded-full px-5 py-2 text-xs text-slate-700 font-semibold transition-all cursor-pointer border border-slate-200"
              >
                Close
              </button>
              <button
                onClick={handleRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-sm"
              >
                Yes, Resume
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-5 md:p-6 text-center flex flex-col items-center gap-3.5 w-full relative overflow-hidden group shadow-sm">
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center z-10 border border-blue-100">
          <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
        </div>
        
        <div className="space-y-1.5 relative z-10 max-w-xl mx-auto mt-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Generating your business blueprint...</h2>
            <p className="text-[11px] text-slate-600 leading-relaxed px-4 font-medium">
              Our AI agents are building 9 comprehensive documents based on your requirements.
              Sit back and watch your project come to life.
            </p>
        </div>

        <div className="w-full space-y-1.5 relative z-10">
            <div className="flex justify-between items-center px-2">
                <p className="text-[11px] text-slate-500 uppercase font-bold tracking-[0.2em]">{count} of 9 complete</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 mr-1">
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      title="Cancel Generation"
                      className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center border border-slate-200 hover:scale-105 active:scale-95 transition-all cursor-pointer text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowRetryConfirm(true)}
                      title="Retry / Resume"
                      className="w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer text-white border-none shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{pct}%</p>
                </div>
            </div>
            <div className="bg-slate-100 rounded-full h-3 w-full overflow-hidden border border-slate-200 p-0.5">
                <div
                className="bg-blue-600 rounded-full h-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex items-center justify-between px-2 pt-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest">Page updates automatically</p>
              {canViewPartial && onViewReady && (
                <button
                  onClick={onViewReady}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  View {count} ready docs →
                </button>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
        <div className="md:col-span-8 bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-800 text-xs font-bold tracking-wide uppercase">Blueprint Sequence</h3>
                <span className="text-[9px] text-slate-500 font-semibold tracking-widest uppercase">Real-time status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {DOC_ORDER.map((type) => {
                    const isReady = docsGenerated.includes(type);
                    return (
                        <div key={type} className={`rounded-2xl p-2 border flex items-center gap-2.5 transition-all ${isReady ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                            <div className={`w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 ${isReady ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>
                                {isReady ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <Loader className="w-3.5 h-3.5 text-slate-500 animate-spin" />}
                            </div>
                            <span className={`text-[11px] font-semibold truncate ${isReady ? 'text-slate-900' : 'text-slate-600'}`}>{DOC_LABELS[type]}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex-1 bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                   <div className="bg-blue-50 rounded-full w-8 h-8 flex items-center justify-center mb-2 text-blue-600 border border-blue-100">
                        <MessageCircle className="w-4 h-4" />
                   </div>
                   <h4 className="text-slate-900 text-xs font-bold mb-1">AI Co-founder Chat</h4>
                   <p className="text-[11px] text-slate-600 leading-relaxed font-normal">Discuss your generated documents with AI in real-time as they appear.</p>
                </div>
                <button 
                  onClick={() => handleProGate('chat')}
                  className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-1.5 text-xs font-semibold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm"
                >
                    Enter Chat
                </button>
            </div>

            <div className="bg-white rounded-[2rem] p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-900 text-xs font-bold">Workspace</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <ChevronLeft className="w-3.5 h-3.5 text-slate-600 rotate-180" />
                    </div>
                </div>
                <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest mb-2">Manage Roadmap</p>
                <button 
                  onClick={() => handleProGate('workspace')}
                  className="w-full text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
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
