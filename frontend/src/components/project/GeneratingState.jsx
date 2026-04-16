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

const GeneratingState = ({ project, subscription }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [upgradeModal, setUpgradeModal] = useState({ open: false, feature: '' });
  
  const docsGenerated = project?.docsGenerated || [];
  const count = docsGenerated.length;
  const pct = Math.round((count / 9) * 100);
  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

  const handleProGate = (feature) => {
    if (isPro) {
      if (feature === 'chat') navigate(`/projects/${project._id}/chat`);
      if (feature === 'workspace') navigate(`/projects/${project._id}/workspace`);
    } else {
      setUpgradeModal({ open: true, feature });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      <UpgradeModal
        isOpen={upgradeModal.open}
        onClose={() => setUpgradeModal({ open: false, feature: '' })}
        onUpgrade={() => { setUpgradeModal({ open: false, feature: '' }); navigate('/pricing'); }}
      />

      <div className="flex items-center justify-between px-2">
        <button 
          onClick={() => navigate('/dashboard')}
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Dashboard</span>
        </button>
        <div className="flex items-center gap-2 px-4 py-1.5 liquid-glass rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Live Generation</span>
        </div>
      </div>

      {/* Main Status Box - Wider */}
      <div className="liquid-glass-strong rounded-[2.5rem] p-10 md:p-12 text-center flex flex-col items-center gap-8 w-full relative overflow-hidden group">
        {/* Animated Background Light */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        
        <div className="w-24 h-24 rounded-full liquid-glass flex items-center justify-center relative z-10">
          <Sparkles className="w-10 h-10 text-white animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
        </div>
        
        <div className="space-y-4 relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl font-semibold text-white tracking-tight">Generating your business blueprint...</h2>
            <p className="text-sm text-white/50 leading-relaxed px-4">
              Our AI agents are building 9 comprehensive documents based on your requirements.
              Sit back and watch your project come to life.
            </p>
        </div>

        <div className="w-full max-w-2xl space-y-3 relative z-10">
            <div className="flex justify-between items-end px-2">
                <p className="text-xs text-white/40 uppercase tracking-[0.2em]">{count} of 9 complete</p>
                <p className="text-2xl font-premium-gradient font-bold">{pct}%</p>
            </div>
            <div className="liquid-glass rounded-full h-3 w-full overflow-hidden border border-white/5 p-0.5">
                <div
                className="bg-white rounded-full h-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{ width: `${pct}%` }}
                />
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">Page updates automatically as docs are ready</p>
        </div>
      </div>

      {/* Lower Bento Grid (8:4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        
        {/* Docs Progress List - 8 Columns */}
        <div className="md:col-span-8 liquid-glass rounded-[2rem] p-8 border border-white/5">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-white/60 text-sm font-medium tracking-wide uppercase">Blueprint Sequence</h3>
                <span className="text-[10px] text-white/30 tracking-widest uppercase">Real-time status</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOC_ORDER.map((type) => {
                    const isReady = docsGenerated.includes(type);
                    return (
                        <div key={type} className={`liquid-glass rounded-2xl p-4 border border-white/5 flex items-center gap-3 transition-all ${isReady ? 'bg-white/[0.03]' : 'opacity-40'}`}>
                            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                                {isReady ? <CheckCircle className="w-4 h-4 text-white" /> : <Loader className="w-4 h-4 text-white/40 animate-spin" />}
                            </div>
                            <span className="text-xs text-white/80 font-medium truncate">{DOC_LABELS[type]}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Quick Actions - 4 Columns */}
        <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 liquid-glass-strong rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all">
                <div>
                   <div className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center mb-4 text-white/40 group-hover:text-white transition-colors">
                        <MessageCircle className="w-5 h-5" />
                   </div>
                   <h4 className="text-white font-medium mb-1">AI Co-founder Chat</h4>
                   <p className="text-xs text-white/40 leading-relaxed">Discuss your generated documents with AI in real-time as they appear.</p>
                </div>
                <button 
                  onClick={() => handleProGate('chat')}
                  className="mt-6 w-full liquid-glass rounded-full py-3 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/5"
                >
                    {!isPro && <Lock className="w-3.5 h-3.5" />}
                    Enter Chat
                </button>
            </div>

            <div className="liquid-glass rounded-[2rem] p-6 border border-white/5 group hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 font-medium">⬡ Workspace</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <ChevronLeft className="w-4 h-4 text-white/40 rotate-180" />
                    </div>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Manage Roadmap</p>
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
