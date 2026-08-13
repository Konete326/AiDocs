import { Loader2, Code2, Folder, Terminal, FileCode } from 'lucide-react';

export default function EditorSkeletonLoader() {
  return (
    <div className="w-full h-full bg-[#E0E5EC] flex flex-col p-4 rounded-[24px] shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 overflow-hidden relative">
      <div className="flex items-center justify-between pb-3 border-b border-[#A3B1C6]/20 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-sm" />
          <span className="ml-2 text-xs font-extrabold text-[#3D4852] flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>VS Code Web Engine</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E5EC] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]">
          <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          <span className="text-[11px] font-bold text-blue-600">Loading Engine...</span>
        </div>
      </div>

      <div className="flex-1 flex gap-3 overflow-hidden">
        <div className="w-64 bg-[#E0E5EC] rounded-2xl shadow-[6px_6px_12px_rgba(163,177,198,0.5),-6px_-6px_12px_rgba(255,255,255,0.5)] p-4 flex flex-col gap-3 flex-shrink-0 animate-pulse border border-[#A3B1C6]/20">
          <div className="flex items-center gap-2 pb-2 border-b border-[#A3B1C6]/20">
            <Folder className="w-4 h-4 text-blue-600" />
            <div className="h-3 bg-[#A3B1C6]/40 rounded-full w-24" />
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-blue-500/70" />
              <div className="h-2.5 bg-[#A3B1C6]/30 rounded-full w-32" />
            </div>
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-blue-500/70" />
              <div className="h-2.5 bg-[#A3B1C6]/30 rounded-full w-28" />
            </div>
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-blue-500/70" />
              <div className="h-2.5 bg-[#A3B1C6]/30 rounded-full w-36" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          <div className="flex-1 bg-[#E0E5EC] rounded-2xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] p-5 flex flex-col justify-between animate-pulse border border-[#A3B1C6]/20 relative">
            <div className="flex flex-col gap-3">
              <div className="h-3 bg-[#A3B1C6]/40 rounded-full w-1/3" />
              <div className="h-3 bg-[#A3B1C6]/30 rounded-full w-2/3" />
              <div className="h-3 bg-[#A3B1C6]/30 rounded-full w-1/2" />
              <div className="h-3 bg-[#A3B1C6]/25 rounded-full w-3/4" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.6)]">
                <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
              </div>
              <p className="text-xs font-extrabold text-[#3D4852]">Initializing Open-Source VS Code Engine...</p>
            </div>
          </div>

          <div className="h-32 bg-[#E0E5EC] rounded-2xl shadow-[6px_6px_12px_rgba(163,177,198,0.5),-6px_-6px_12px_rgba(255,255,255,0.5)] p-3 flex flex-col gap-2 animate-pulse border border-[#A3B1C6]/20 flex-shrink-0">
            <div className="flex items-center gap-2 pb-1 border-b border-[#A3B1C6]/20">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              <div className="h-2.5 bg-[#A3B1C6]/40 rounded-full w-20" />
            </div>
            <div className="h-2 bg-[#A3B1C6]/30 rounded-full w-2/3" />
            <div className="h-2 bg-[#A3B1C6]/25 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
