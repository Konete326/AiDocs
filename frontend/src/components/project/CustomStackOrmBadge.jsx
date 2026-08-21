import { Database } from 'lucide-react';
import { detectAutomatedOrm } from '../../utils/ormDetector';

export default function CustomStackOrmBadge({ backend, database }) {
  const orm = detectAutomatedOrm(backend, database);

  return (
    <div className="p-2.5 rounded-2xl neumorphic-inset border border-[#CAD1DB] text-[#3D4852] flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Database className="w-4 h-4 text-[#6C63FF] shrink-0" />
        <div className="truncate">
          <span className="text-[9px] uppercase font-mono tracking-wider text-[#6C63FF] block font-bold">Auto-Paired ORM / Driver</span>
          <span className="text-[11px] font-bold text-[#3D4852] truncate block">{orm}</span>
        </div>
      </div>
      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-[#6C63FF] text-white shrink-0 font-bold">
        Auto
      </span>
    </div>
  );
}
