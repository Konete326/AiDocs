import { Sparkles } from 'lucide-react';

const GeneratingState = ({ docsGenerated }) => {
  const count = docsGenerated?.length || 0;
  const pct = Math.round((count / 9) * 100);

  return (
    <div className="liquid-glass-strong rounded-3xl p-12 text-center flex flex-col items-center gap-6">
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
