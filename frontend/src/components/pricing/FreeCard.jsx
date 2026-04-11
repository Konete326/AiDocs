import { CheckCircle } from 'lucide-react';

const FreeCard = ({ subscription, onCheckout }) => {
  const isCurrent = subscription?.plan === 'free' || !subscription;
  const features = [
    '3 projects to start', 'All 9 AI-generated docs',
    'Markdown export & copy', 'Read & view all docs',
    'Community support'
  ];

  return (
    <div className="lg:col-span-3 liquid-glass rounded-3xl p-6 flex flex-col h-full">
      <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50 w-fit mb-4">Free</div>
      <div className="mt-3 mb-6">
        <span className="text-5xl font-medium text-white">$0</span>
        <span className="text-sm text-white/50 block mt-1">forever</span>
      </div>
      <div className="space-y-3 flex-1">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-white/60">{f}</span>
          </div>
        ))}
      </div>
      {isCurrent ? (
        <div className="mt-8 liquid-glass rounded-full py-2.5 w-full text-sm text-white/40 text-center cursor-default">Current Plan</div>
      ) : (
        <button onClick={() => onCheckout('free')} className="mt-8 liquid-glass rounded-full py-2.5 w-full text-sm text-white/70 text-center hover:scale-105 transition-transform cursor-pointer border-none outline-none">
          Get Started Free
        </button>
      )}
    </div>
  );
};

export default FreeCard;
