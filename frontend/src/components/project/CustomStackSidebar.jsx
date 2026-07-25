import { Sliders, Sparkles, AlertTriangle } from 'lucide-react';
import CustomStackRadarScores from './CustomStackRadarScores';
import CustomStackOrmBadge from './CustomStackOrmBadge';

export default function CustomStackSidebar({ currentStack, conflict, onApply, isUpdating }) {
  const { frontend, backend, database, auth } = currentStack;

  return (
    <div className="liquid-glass-strong rounded-2xl p-3 sm:p-4 border border-slate-200 h-full flex flex-col justify-between space-y-2 bg-white">
      <div className="space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-200">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 tracking-tight">Custom Target Specs</h2>
            <p className="text-[9px] text-slate-500 font-medium">Live Architecture Blueprint</p>
          </div>
        </div>

        {conflict && (
          <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-tight"><strong>Conflict:</strong> {conflict}</span>
          </div>
        )}

        <div className="space-y-1 text-xs">
          <div className="p-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-[9px] uppercase font-mono font-bold">Frontend</span>
            <span className="text-slate-900 font-bold text-[10.5px] truncate pl-2">{frontend}</span>
          </div>
          <div className="p-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-[9px] uppercase font-mono font-bold">Backend</span>
            <span className="text-slate-900 font-bold text-[10.5px] truncate pl-2">{backend}</span>
          </div>
          <div className="p-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-[9px] uppercase font-mono font-bold">Database</span>
            <span className="text-slate-900 font-bold text-[10.5px] truncate pl-2">{database}</span>
          </div>
          <div className="p-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-[9px] uppercase font-mono font-bold">Auth</span>
            <span className="text-slate-900 font-bold text-[10.5px] truncate pl-2">{auth}</span>
          </div>
        </div>

        <CustomStackOrmBadge backend={backend} database={database} />
        <CustomStackRadarScores currentStack={currentStack} />
      </div>

      <button
        onClick={onApply}
        disabled={isUpdating || Boolean(conflict)}
        className={`w-full rounded-xl py-2 px-3 text-xs font-bold !text-white flex items-center justify-center gap-2 transition-all border shadow-md mt-2 ${
          conflict
            ? 'bg-rose-600 border-rose-600 opacity-60 cursor-not-allowed !text-white'
            : 'bg-blue-600 hover:bg-blue-700 border-blue-600 hover:scale-[1.01] cursor-pointer shadow-blue-600/30 !text-white'
        }`}
      >
        {conflict ? <AlertTriangle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
        <span className="!text-white font-bold">{conflict ? 'Fix Incompatible Stack' : 'Apply Architecture Specs'}</span>
      </button>
    </div>
  );
}
