import { CheckCircle } from 'lucide-react';

const TeamCard = ({ subscription, isLoading, onCheckout }) => {
  const isCurrent = subscription?.plan === 'team';
  const features = [
    'Unlimited projects', 'Everything in Pro',
    'Advanced export formats', 'Custom AI prompts',
    'Collaboration tools', 'Dedicated support & SLA'
  ];

  return (
    <div className="lg:col-span-8 liquid-glass rounded-[32px] p-8 flex flex-col lg:flex-row lg:items-center gap-8 group select-none">
      <div className="lg:w-1/3">
        <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#6B7280] w-fit mb-3">Team</div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-5xl font-medium text-[#3D4852] tracking-tight">$10</span>
          <span className="text-sm text-[#6B7280] mb-1">/month</span>
        </div>
        <p className="text-sm text-[#6B7280] leading-relaxed mb-6">For teams shipping together. Unlimited projects, advanced collaboration, and support.</p>
        <button onClick={() => onCheckout('team')} disabled={isLoading || isCurrent} className={`px-8 py-2.5 rounded-2xl text-sm font-medium transition-transform ${isCurrent ? 'liquid-glass text-[#6B7280]/60 cursor-default' : 'liquid-glass-strong text-[#3D4852] hover:scale-105 active:scale-95 cursor-pointer border-none outline-none'}`}>
          {isCurrent ? 'Current Plan' : 'Get Team Plan'}
        </button>
      </div>
      <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default TeamCard;
