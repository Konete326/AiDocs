import { Zap } from 'lucide-react';

export default function SubscriptionBanner() {
  return (
    <div className="liquid-glass rounded-2xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Zap className="w-4 h-4 text-[#38B2AC] flex-shrink-0" />
        <span className="text-sm text-white/90 font-medium">
          🎉 Limited Time Offer: All features and unlimited project creation are 100% FREE for all users!
        </span>
      </div>
    </div>
  );
}
