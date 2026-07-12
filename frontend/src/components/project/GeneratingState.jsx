import { Sparkles, ChevronLeft, CheckCircle, Loader, MessageCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';

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

const GeneratingState = ({ project, subscription, onViewReady }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [upgradeModal, setUpgradeModal] = useState({ open: false, feature: '' });
  
  const docsGenerated = project?.docsGenerated || [];
  const count = docsGenerated.length;
  const pct = Math.round((count / 9) * 100);
  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';
  const canViewPartial = count >= 3;

  const handleProGate = (feature) => {
    if (isPro) {
      if (feature === 'chat') navigate(`/projects/${project._id}/chat`);
      if (feature === 'workspace') navigate(`/projects/${project._id}/workspace`);
    } else {
      setUpgradeModal({ open: true, feature });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-4">
      <UpgradeModal
        isOpen={upgradeModal.open}
        onClose={() => setUpgradeModal({ open: false, feature: '' })}
        onUpgrade={() => { setUpgradeModal({ open: false, feature: '' }); navigate('/pricing'); }}
      />


      {/* Main Status Box - Wider */}
      <div className="liquid-glass-strong no-hover rounded-[2.5rem] p-6 md:p-8 text-center flex flex-col items-center gap-5 w-full relative overflow-hidden group">
        {/* Animated Background Light */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full liquid-glass flex items-center justify-center z-10">
          <Sparkles className="w-7 h-7 text-white animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
        </div>
        
        <div className="space-y-2 relative z-10 max-w-xl mx-auto mt-4">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Generating your business blueprint...</h2>
            <p className="text-xs text-white/50 leading-relaxed px-4">
              Our AI agents are building 9 comprehensive documents based on your requirements.
              Sit back and watch your project come to life.
            </p>
        </div>

        <div className="w-full max-w-2xl space-y-2.5 relative z-10">
            <div className="flex justify-between items-end px-2">
                <p className="text-xs text-white/40 uppercase tracking-[0.2em]">{count} of 9 complete</p>
                <p className="text-xl font-bold text-white">{pct}%</p>
            </div>
            <div className="liquid-glass rounded-full h-3 w-full overflow-hidden border border-white/5 p-0.5">
                <div
                className="bg-white rounded-full h-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex items-center justify-between px-2 pt-1">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Page updates automatically</p>
              {canViewPartial && onViewReady && (
                <button
                  onClick={onViewReady}
                  className="text-[11px] text-white/70 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  View {count} ready docs →
                </button>
              )}
            </div>
        </div>
      </div>

      {/* Lower Bento Grid (8:4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        
        {/* Docs Progress List - 8 Columns */}
        <div className="md:col-span-8 liquid-glass no-hover rounded-[2rem] p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/60 text-sm font-medium tracking-wide uppercase">Blueprint Sequence</h3>
                <span className="text-[10px] text-white/30 tracking-widest uppercase">Real-time status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {DOC_ORDER.map((type) => {
                    const isReady = docsGenerated.includes(type);
                    return (
                        <div key={type} className={`liquid-glass no-hover rounded-2xl p-2.5 border border-white/5 flex items-center gap-3 transition-all ${isReady ? 'bg-white/[0.03]' : 'opacity-40'}`}>
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${isReady ? 'bg-[#6C63FF] shadow-[2px_2px_5px_rgba(108,99,255,0.35),-2px_-2px_5px_rgba(255,255,255,0.5)]' : 'bg-white/5'}`}>
                                {isReady ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <Loader className="w-3.5 h-3.5 text-white/40 animate-spin" />}
                            </div>
                            <span className="text-xs text-white/80 font-medium truncate">{DOC_LABELS[type]}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Quick Actions - 4 Columns */}
        <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 liquid-glass-strong no-hover rounded-[2rem] p-5 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all">
                <div>
                   <div className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center mb-3 text-white/40 group-hover:text-white transition-colors">
                        <MessageCircle className="w-5 h-5" />
                   </div>
                   <h4 className="text-white font-medium mb-1">AI Co-founder Chat</h4>
                   <p className="text-xs text-white/40 leading-relaxed">Discuss your generated documents with AI in real-time as they appear.</p>
                </div>
                <button 
                  onClick={() => handleProGate('chat')}
                  className="mt-4 w-full liquid-glass rounded-full py-2 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/5"
                >
                    {!isPro && <Lock className="w-3.5 h-3.5" />}
                    Enter Chat
                </button>
            </div>

            <div className="liquid-glass no-hover rounded-[2rem] p-4 border border-white/5 group hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 font-medium">⬡ Workspace</span>
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                        <ChevronLeft className="w-4 h-4 text-white/40 rotate-180" />
                    </div>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Manage Roadmap</p>
                <button 
                  onClick={() => handleProGate('workspace')}
                  className="w-full text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                    {!isPro && <Lock className="w-3 h-3" />}
                    Open Kanban Board
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default GeneratingState;
