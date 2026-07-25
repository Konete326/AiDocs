import { Zap, TrendingUp, ShieldCheck, Wrench } from 'lucide-react';
import { calculateStackScores } from '../../utils/stackRadarCalculator';

export default function CustomStackRadarScores({ currentStack }) {
  const { devSpeed, scalability, security, maintenance } = calculateStackScores(
    currentStack.frontend, currentStack.backend, currentStack.database, currentStack.auth
  );

  const metrics = [
    { label: 'Dev Speed Score', value: devSpeed, icon: Zap },
    { label: 'Scalability Rating', value: scalability, icon: TrendingUp },
    { label: 'Security Grade', value: security, icon: ShieldCheck },
    { label: 'Maintenance Index', value: maintenance, icon: Wrench },
  ];

  return (
    <div className="space-y-2 pt-2 border-t border-slate-200">
      <span className="text-[9.5px] uppercase tracking-widest text-blue-600 block font-mono font-bold">
        Live Performance Radar
      </span>
      <div className="space-y-1.5">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="space-y-0.5">
            <div className="flex justify-between items-center text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="text-slate-800 font-semibold">{label}</span>
              </div>
              <span className="font-mono text-blue-600 font-bold">{value}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
