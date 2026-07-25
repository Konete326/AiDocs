import { Database } from 'lucide-react';
import { detectAutomatedOrm } from '../../utils/ormDetector';

export default function CustomStackOrmBadge({ backend, database }) {
  const orm = detectAutomatedOrm(backend, database);

  return (
    <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-slate-900 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <div className="truncate">
          <span className="text-[8.5px] uppercase font-mono tracking-wider text-blue-700 block font-bold">Auto-Paired ORM / Driver</span>
          <span className="text-[11px] font-bold text-slate-900 truncate block">{orm}</span>
        </div>
      </div>
      <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono bg-blue-600 text-white border border-blue-600 shrink-0 font-bold">
        Auto
      </span>
    </div>
  );
}
