import { useEffect } from 'react';
import { X, Code2, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function VsCodeComingSoonModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#E0E5EC] rounded-[24px] w-full max-w-[360px] p-5 md:p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-white/60 relative text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#E0E5EC] text-[#6B7280] hover:text-[#3D4852] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer border border-white/40"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#E0E5EC] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.6)] flex items-center justify-center mx-auto mb-3 border border-white/50 text-blue-600 relative">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#E0E5EC]"></span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Coming Soon</span>
        </div>

        <h3 className="text-base font-extrabold text-[#3D4852] mb-1">
          VS Code Web Studio
        </h3>

        <p className="text-xs text-[#6B7280] leading-relaxed mb-4 font-medium px-2">
          Our integrated cloud editor and AI Co-founder sidecar are launching soon.
        </p>

        <div className="space-y-2 mb-5 text-left px-2">
          <div className="flex items-center gap-2 text-xs text-[#3D4852]">
            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span className="font-semibold text-xs">Cloud VS Code workspace</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#3D4852]">
            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span className="font-semibold text-xs">AI Co-founder assistant</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#3D4852]">
            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span className="font-semibold text-xs">Live hot-reload sandbox</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[3px_3px_8px_rgba(37,99,235,0.35)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Continue with In-Browser Editor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
