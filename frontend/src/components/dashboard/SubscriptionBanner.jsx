import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionBanner({ projectsUsed, projectLimit }) {
  const navigate = useNavigate();
  return (
    <div className="liquid-glass rounded-2xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Zap className="w-4 h-4 text-white/70 flex-shrink-0" />
        <span className="text-sm text-white/70">
          You've used {projectsUsed}/{projectLimit} projects. Upgrade for more.
        </span>
      </div>
      <button
        onClick={() => navigate('/pricing')}
        className="liquid-glass-strong rounded-full px-4 py-2 text-xs text-white hover:scale-105 transition-transform flex-shrink-0 ml-4"
      >
        Upgrade to Pro
      </button>
    </div>
  );
}
