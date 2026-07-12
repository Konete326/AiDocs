import { CheckCircle } from 'lucide-react';

const FreeCard = ({ subscription, onCheckout }) => {
  const isCurrent = subscription?.plan === 'free' || !subscription;
  const features = [
    '3 projects to start', 'All 9 AI-generated docs',
    'Markdown export & copy', 'Read & view all docs',
    'Community support'
  ];

  return (
    <div className="lg:col-span-3 liquid-glass rounded-[32px] p-6 flex flex-col h-full select-none">
      <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#6B7280] w-fit mb-4">Free</div>
      <div className="mt-3 mb-6">
        <span className="text-5xl font-medium text-[#3D4852]">$0</span>
        <span className="text-sm text-[#6B7280] block mt-1">forever</span>
      </div>
      <div className="space-y-3 flex-1">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
            </div>
            <span className="text-sm text-[#6B7280]">{f}</span>
          </div>
        ))}
      </div>
      {isCurrent ? (
        <div className="mt-8 liquid-glass rounded-2xl py-2.5 w-full text-sm text-[#6B7280]/60 text-center cursor-default">Current Plan</div>
      ) : (
        <button onClick={() => onCheckout('free')} className="mt-8 liquid-glass rounded-2xl py-2.5 w-full text-sm text-[#3D4852] font-semibold text-center hover:scale-105 transition-transform cursor-pointer border-none outline-none">
          Get Started Free
        </button>
      )}
    </div>
  );
};

export default FreeCard;
