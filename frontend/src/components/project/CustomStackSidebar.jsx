import { Sliders, Sparkles, AlertTriangle } from 'lucide-react';
import CustomStackRadarScores from './CustomStackRadarScores';
import CustomStackOrmBadge from './CustomStackOrmBadge';
import CustomStackBenchmarkCard from './CustomStackBenchmarkCard';

export default function CustomStackSidebar({ currentStack, conflict, onApply, isUpdating }) {
  const { frontend, backend, database, auth } = currentStack;

  return (
    <div className="neumorphic-card rounded-2xl p-3.5 sm:p-4 border border-[#CAD1DB] h-full flex flex-col justify-between space-y-2.5">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <div className="w-7 h-7 rounded-xl neumorphic-inset flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5 text-[#6C63FF]" />
          </div>
          <div>
            <h2 className="text-xs font-black text-[#3D4852] tracking-tight">Custom Target Specs</h2>
            <p className="text-[9.5px] text-[#6B7280] font-medium">Live Architecture Blueprint</p>
          </div>
        </div>

        {conflict && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-[10.5px] font-bold flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-tight"><strong>Conflict:</strong> {conflict}</span>
          </div>
        )}

        <div className="space-y-1 text-xs">
          <div className="p-1.5 px-2 rounded-xl neumorphic-inset flex justify-between items-center border border-[#CAD1DB]">
            <span className="text-[#6B7280] text-[9px] uppercase font-mono font-bold">Frontend</span>
            <span className="text-[#3D4852] font-bold text-[10.5px] truncate pl-2">{frontend}</span>
          </div>
          <div className="p-1.5 px-2 rounded-xl neumorphic-inset flex justify-between items-center border border-[#CAD1DB]">
            <span className="text-[#6B7280] text-[9px] uppercase font-mono font-bold">Backend</span>
            <span className="text-[#3D4852] font-bold text-[10.5px] truncate pl-2">{backend}</span>
          </div>
          <div className="p-1.5 px-2 rounded-xl neumorphic-inset flex justify-between items-center border border-[#CAD1DB]">
            <span className="text-[#6B7280] text-[9px] uppercase font-mono font-bold">Database</span>
            <span className="text-[#3D4852] font-bold text-[10.5px] truncate pl-2">{database}</span>
          </div>
          <div className="p-1.5 px-2 rounded-xl neumorphic-inset flex justify-between items-center border border-[#CAD1DB]">
            <span className="text-[#6B7280] text-[9px] uppercase font-mono font-bold">Auth</span>
            <span className="text-[#3D4852] font-bold text-[10.5px] truncate pl-2">{auth}</span>
          </div>
        </div>

        <CustomStackOrmBadge backend={backend} database={database} />
        <CustomStackBenchmarkCard currentStack={currentStack} />
        <CustomStackRadarScores currentStack={currentStack} />
      </div>

      <button
        onClick={onApply}
        disabled={isUpdating || Boolean(conflict)}
        className={`w-full rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-all mt-2 ${
          conflict
            ? 'bg-rose-600 text-white opacity-60 cursor-not-allowed'
            : 'bg-[#6C63FF] hover:bg-[#8B84FF] text-white shadow-md cursor-pointer'
        }`}
      >
        {conflict ? <AlertTriangle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
        <span className="text-white font-bold">{conflict ? 'Fix Incompatible Stack' : 'Apply Architecture Specs'}</span>
      </button>
    </div>
  );
}
