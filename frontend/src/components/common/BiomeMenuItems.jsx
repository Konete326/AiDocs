import { Circle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function BiomeMenuItems({ items }) {
  const location = useLocation();
  return (
    <div className="flex-1 p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 bg-white/[0.02] overflow-y-auto content-start">
      {items.map((item) => {
        const isActive = item.href && location.pathname === item.href;
        return (
          <div
            key={item.title}
            onClick={item.onClick}
            className={`rounded-2xl md:rounded-3xl p-3 md:p-5 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 md:gap-5 group ${
              isActive ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white/[0.02] hover:bg-white/5'
            }`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg shrink-0 transition-colors ${
              isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              {item.icon || <Circle className="w-4 h-4 text-white" />}
            </div>
            <span className={`text-sm md:text-base font-semibold tracking-tight transition-colors ${
              isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}>
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
