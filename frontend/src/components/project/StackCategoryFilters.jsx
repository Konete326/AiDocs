import { LayoutGrid, Layers, Server, Cpu, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Blueprints', icon: LayoutGrid },
  { id: 'fullstack', label: 'Unified Fullstack', icon: Layers },
  { id: 'decoupled', label: 'Decoupled Microservices', icon: Server },
  { id: 'ai_async', label: 'Async & AI Native', icon: Cpu },
  { id: 'enterprise', label: 'Enterprise (.NET)', icon: ShieldCheck },
];

export default function StackCategoryFilters({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none my-4">
      {CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            onClick={() => onSelectCategory(id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-[#6C63FF] text-white shadow-md'
                : 'neumorphic-btn text-[#3D4852]'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#6C63FF]'}`} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
