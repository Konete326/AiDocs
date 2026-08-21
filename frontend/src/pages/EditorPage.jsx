import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Sparkles, CheckCircle2, Rocket, LayoutGrid } from 'lucide-react';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#E0E5EC] flex flex-col overflow-hidden">
      <header className="h-12 px-6 bg-[#E0E5EC] border-b border-[#A3B1C6]/30 shadow-[0_2px_8px_rgba(163,177,198,0.3)] flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (id) navigate('/components/' + id);
              else navigate('/components');
            }}
            className="px-3.5 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:text-blue-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-[#A3B1C6]/20"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{id ? 'Back to Component' : 'Back to Marketplace'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Feature in Development</span>
          </span>
        </div>
      </header>

      <main className="flex-1 w-full bg-[#E0E5EC] flex items-center justify-center p-6 overflow-y-auto">
        <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-xl p-8 md:p-10 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-[#A3B1C6]/30 text-center relative">
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-24 h-24 rounded-[32px] bg-[#E0E5EC] shadow-[inset_6px_6px_12px_rgba(163,177,198,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.6)] flex items-center justify-center border border-[#A3B1C6]/30">
              <Code2 className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -top-1 -right-1 p-2 rounded-full bg-blue-600 text-white shadow-[2px_2px_6px_rgba(37,99,235,0.4)]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-extrabold uppercase tracking-wider mb-3">
            Coming Soon 🚀
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#3D4852] mb-3">
            VS Code Web Studio
          </h2>

          <p className="text-xs text-[#6B7280] leading-relaxed max-w-lg mx-auto mb-6 font-medium">
            We are building a seamless cloud-based VS Code workbench with integrated AI Co-founder capabilities. This feature is currently in preparation and will be available in the upcoming release.
          </p>

          <div className="bg-[#E0E5EC] rounded-2xl p-5 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20 text-left space-y-3 mb-8 text-xs text-[#3D4852]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">Complete VS Code Web interface in your browser</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">AI Co-founder Side-Panel extension & Code Applier</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">Live component preview sandbox with auto hot-reload</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {id && (
              <button
                type="button"
                onClick={() => navigate('/components/' + id)}
                className="px-6 py-3 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#A3B1C6]/20 hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Component</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/components')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-[4px_4px_10px_rgba(37,99,235,0.35)] active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Browse Marketplace</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
