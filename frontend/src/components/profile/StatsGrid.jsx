import { FolderOpen, CheckCircle2, CalendarDays, Layers } from 'lucide-react';

const StatsGrid = ({ projectsCount, componentsCount = 0, completedCount, joinedAt }) => {
  const daysActive = joinedAt
    ? Math.floor((Date.now() - new Date(joinedAt).getTime()) / 86_400_000)
    : 0;

  const items = [
    { icon: FolderOpen,    label: 'Projects',   value: projectsCount, accent: '#6C63FF' },
    { icon: Layers,        label: 'Components', value: componentsCount, accent: '#2563eb' },
    { icon: CheckCircle2,  label: 'Completed',  value: completedCount, accent: '#10b981' },
    { icon: CalendarDays,  label: 'Days Active', value: daysActive,    accent: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {items.map(({ icon: Icon, label, value, accent }) => (
        <div key={label} className="neumorphic-inset rounded-2xl p-3 cursor-default">
          <div className="flex items-center gap-1 mb-1">
            <Icon className="w-3 h-3 flex-shrink-0" style={{ color: accent }} />
            <p className="text-[9px] uppercase tracking-widest text-[#6B7280] leading-none truncate">{label}</p>
          </div>
          <p className="text-lg font-bold text-[#3D4852]">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
