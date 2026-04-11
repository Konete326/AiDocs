import { CheckCircle, Sparkles } from 'lucide-react';

const ProCard = ({ subscription, isLoading, onCheckout }) => {
  const isCurrent = subscription?.plan === 'pro';
  const features = [
    '10 projects — build your portfolio', 'Unlimited regeneration',
    'Edit & customize docs', 'ZIP download all 9 docs',
    'AI Co-founder Chat context', 'Priority generation queue',
    'PDF and Word formats', 'Email support 24h'
  ];

  return (
    <div className="lg:col-span-5 liquid-glass-strong rounded-3xl p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50">Pro</div>
          <div className="liquid-glass rounded-full px-3 py-1 text-[10px] text-white/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Most Popular
          </div>
        </div>
        {!isCurrent ? (
          <button onClick={() => onCheckout('pro')} disabled={isLoading} className="liquid-glass-strong rounded-full px-6 py-2 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none outline-none">
            Get Pro
          </button>
        ) : (
          <div className="liquid-glass rounded-full px-6 py-2 text-sm text-white/40 cursor-default">Current Plan</div>
        )}
      </div>
      <div className="flex items-end gap-2 mb-6">
        <span className="text-6xl font-medium text-white tracking-tight">$5</span>
        <span className="text-sm text-white/50 mb-2">/month</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/70">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProCard;
