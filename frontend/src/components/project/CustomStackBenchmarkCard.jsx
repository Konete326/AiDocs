import { useMemo } from 'react';
import { Activity, Zap, Cpu, Clock } from 'lucide-react';

const calculateBenchmarks = (frontend = '', backend = '', database = '') => {
  const f = frontend.toLowerCase();
  const b = backend.toLowerCase();
  const d = database.toLowerCase();

  let latency = 42;
  let memory = 90;
  let ttfb = 110;

  if (b.includes('go') || b.includes('fiber')) {
    latency = 18;
    memory = 32;
    ttfb = 60;
  } else if (b.includes('fastapi') || b.includes('python')) {
    latency = 28;
    memory = 95;
    ttfb = 85;
  } else if (b.includes('express') || b.includes('node')) {
    latency = 38;
    memory = 78;
    ttfb = 95;
  } else if (b.includes('next.js') || b.includes('server actions')) {
    latency = 48;
    memory = 135;
    ttfb = 120;
  } else if (b.includes('.net') || b.includes('c#')) {
    latency = 24;
    memory = 160;
    ttfb = 90;
  } else if (b.includes('laravel') || b.includes('php')) {
    latency = 52;
    memory = 110;
    ttfb = 130;
  }

  if (d.includes('sqlite') || d.includes('hive')) {
    latency = Math.max(12, latency - 10);
    memory = Math.max(25, memory - 15);
  } else if (d.includes('redis')) {
    latency = Math.max(10, latency - 12);
  }

  const isMobile = f.includes('flutter') || f.includes('react native') || f.includes('swift') || f.includes('kotlin');

  return {
    latency: `< ${latency}ms`,
    memory: `~${memory} MB`,
    ttfb: isMobile ? '60/120 FPS' : `< ${ttfb}ms`,
    thirdLabel: isMobile ? 'UI Render' : 'Cold Start'
  };
};

export default function CustomStackBenchmarkCard({ currentStack }) {
  const { frontend, backend, database } = currentStack;
  const benchmarks = useMemo(() => calculateBenchmarks(frontend, backend, database), [frontend, backend, database]);

  return (
    <div className="p-2.5 rounded-2xl neumorphic-inset border border-[#CAD1DB] text-[#3D4852] space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#6C63FF] font-black flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#6C63FF]" />
          <span>Estimated Benchmarks</span>
        </span>
        <span className="text-[9px] font-mono text-[#6B7280] font-bold">Telemetry</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
        <div className="p-1.5 rounded-xl bg-black/[0.03] flex flex-col items-center justify-center text-center">
          <span className="text-[8.5px] font-bold text-[#6B7280] flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 text-amber-600 shrink-0" />
            <span>Latency</span>
          </span>
          <span className="text-[10.5px] font-mono font-black text-[#3D4852] mt-0.5">{benchmarks.latency}</span>
        </div>

        <div className="p-1.5 rounded-xl bg-black/[0.03] flex flex-col items-center justify-center text-center">
          <span className="text-[8.5px] font-bold text-[#6B7280] flex items-center gap-0.5">
            <Cpu className="w-2.5 h-2.5 text-blue-600 shrink-0" />
            <span>Idle RAM</span>
          </span>
          <span className="text-[10.5px] font-mono font-black text-[#3D4852] mt-0.5">{benchmarks.memory}</span>
        </div>

        <div className="p-1.5 rounded-xl bg-black/[0.03] flex flex-col items-center justify-center text-center">
          <span className="text-[8.5px] font-bold text-[#6B7280] flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
            <span>{benchmarks.thirdLabel}</span>
          </span>
          <span className="text-[10.5px] font-mono font-black text-[#3D4852] mt-0.5">{benchmarks.ttfb}</span>
        </div>
      </div>
    </div>
  );
}
