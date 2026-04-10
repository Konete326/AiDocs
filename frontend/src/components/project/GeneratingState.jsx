import { Sparkles, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GeneratingState = ({ docsGenerated }) => {
  const navigate = useNavigate();
  const count = docsGenerated?.length || 0;
  const pct = Math.round((count / 9) * 100);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <button 
        onClick={() => navigate('/dashboard')}
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8 hover:scale-105 transition-transform cursor-pointer self-start"
      >
        <ChevronLeft className="w-4 h-4 text-white/70" />
        <span className="text-sm text-white/70 font-medium">Back to Dashboard</span>
      </button>

      <div className="liquid-glass-strong rounded-3xl p-12 text-center flex flex-col items-center gap-6 w-full">
      <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-white/70 animate-pulse" />
      </div>
      <h2 className="text-xl font-medium text-white">Generating your documents...</h2>
      <p className="text-sm text-white/60">{count} of 9 documents ready</p>
      <div className="liquid-glass rounded-full h-2 w-full max-w-xs overflow-hidden">
        <div
          className="bg-white/50 rounded-full h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-white/40">This usually takes 2–3 minutes. Page updates automatically.</p>
    </div>
  );
};

export default GeneratingState;
