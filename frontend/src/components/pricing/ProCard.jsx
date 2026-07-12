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
    <div className="lg:col-span-5 liquid-glass-strong rounded-[32px] p-8 relative overflow-hidden group select-none">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#6B7280]">Pro</div>
          <div className="liquid-glass rounded-full px-3 py-1 text-[10px] text-[#3D4852] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#6C63FF]" /> Most Popular
          </div>
        </div>
        {!isCurrent ? (
          <button onClick={() => onCheckout('pro')} disabled={isLoading} className="bg-[#6C63FF] rounded-2xl px-6 py-2.5 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none outline-none shadow-[5px_5px_10px_rgba(108,99,255,0.2),-5px_-5px_10px_rgba(255,255,255,0.5)]">
            Get Pro
          </button>
        ) : (
          <div className="liquid-glass rounded-2xl px-6 py-2 text-sm text-[#38B2AC] font-semibold cursor-default">Current Plan</div>
        )}
      </div>
      <div className="flex items-end gap-2 mb-6">
        <span className="text-6xl font-medium text-[#3D4852] tracking-tight">$5</span>
        <span className="text-sm text-[#6B7280] mb-2">/month</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#38B2AC]" />
            </div>
            <span className="text-sm text-[#3D4852]">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProCard;
