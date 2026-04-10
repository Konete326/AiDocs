import { CheckCircle } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const PricingCard = ({
  plan,
  price,
  period,
  description,
  features,
  ctaLabel,
  isPopular,
  isCurrent,
  isLoading,
  onCheckout
}) => {
  return (
    <div className={`rounded-3xl p-8 flex flex-col gap-6 relative hover:scale-[1.02] transition-transform ${isPopular ? 'liquid-glass-strong' : 'liquid-glass'}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 liquid-glass-strong rounded-full px-4 py-1 text-xs text-white/80 uppercase tracking-widest whitespace-nowrap shadow-sm">
          Most Popular
        </div>
      )}

      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">{plan}</div>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-4xl font-medium text-white">{price}</span>
          {period && <span className="text-sm text-white/50 mb-1">{period}</span>}
        </div>
        <p className="text-sm text-white/60 mt-2">{description}</p>
      </div>

      <div className="space-y-3 mt-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-white/50 flex-shrink-0" />
            <span className="text-sm text-white/70">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {isCurrent ? (
          <button className="liquid-glass rounded-full py-3 w-full text-white/50 text-sm cursor-default border-none outline-none">
            Current Plan
          </button>
        ) : (
          <button 
            className={`rounded-full py-3 w-full text-white font-medium text-sm hover:scale-105 active:scale-95 transition-transform border-none outline-none cursor-pointer ${isPopular ? 'liquid-glass-strong' : 'liquid-glass'}`}
            onClick={() => onCheckout(plan)}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
