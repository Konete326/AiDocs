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
    <div className="space-y-2 pt-2.5 border-t border-black/5">
      <span className="text-[10px] uppercase tracking-widest text-[#6C63FF] block font-mono font-bold">
        Live Performance Radar
      </span>
      <div className="space-y-2">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between items-center text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-[#6C63FF] shrink-0" />
                <span className="text-[#3D4852] font-bold">{label}</span>
              </div>
              <span className="font-mono text-[#6C63FF] font-black">{value}%</span>
            </div>
            <div className="w-full bg-[#cad1db]/40 rounded-full h-1.5 overflow-hidden neumorphic-inset">
              <div
                className="bg-[#6C63FF] h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
