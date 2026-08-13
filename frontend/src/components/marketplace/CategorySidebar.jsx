import { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, LayoutGrid, MousePointerClick, CheckSquare,
  ToggleLeft, CreditCard, Loader, FormInput, CircleDot, FileText,
  Sparkles, MessageSquare, Package, Palette
} from 'lucide-react';
import api from '../../services/api';

const categories = [
  'All', 'Buttons', 'Checkboxes', 'Toggle switches', 'Cards',
  'Loaders', 'Inputs', 'Radio buttons', 'Forms', 'Patterns',
  'Tooltips', 'UI Kits', 'Themes'
];

const categoryIcons = {
  'All': LayoutGrid,
  'Buttons': MousePointerClick,
  'Checkboxes': CheckSquare,
  'Toggle switches': ToggleLeft,
  'Cards': CreditCard,
  'Loaders': Loader,
  'Inputs': FormInput,
  'Radio buttons': CircleDot,
  'Forms': FileText,
  'Patterns': Sparkles,
  'Tooltips': MessageSquare,
  'UI Kits': Package,
  'Themes': Palette
};

const CategorySidebar = ({ selectedCategory, setSelectedCategory, isCollapsed, setIsCollapsed }) => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await api.get('/ui-components/category-counts');
        if (res.data?.success) {
          setCounts(res.data.data || {});
        }
      } catch {}
    };
    fetchCounts();
  }, []);

  return (
    <div className={`bg-[#E0E5EC] rounded-[28px] ${isCollapsed ? 'p-2' : 'p-4'} shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/30 h-full flex flex-col overflow-y-auto transition-all`}>
      <div className="flex items-center justify-between mb-3 px-1">
        {!isCollapsed && (
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">
            Categories
          </h3>
        )}
        <button
          onClick={() => setIsCollapsed?.(!isCollapsed)}
          className={`p-1.5 rounded-xl bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 transition-all cursor-pointer ${isCollapsed ? 'mx-auto' : ''}`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-blue-600" /> : <ChevronLeft className="w-4 h-4 text-blue-600" />}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const countVal = counts[cat] || 0;
          const isEmpty = countVal === 0 && cat !== 'All';
          const IconComponent = categoryIcons[cat] || LayoutGrid;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              title={`${cat} (${countVal} components)`}
              className={`w-full text-left rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-between gap-2 ${
                isCollapsed ? 'p-2 justify-center' : 'px-3.5 py-2'
              } ${
                isActive
                  ? 'bg-[#E0E5EC] text-blue-600 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20'
                  : isEmpty
                  ? 'text-[#9CA3AF] opacity-50 hover:opacity-90 hover:bg-white/30'
                  : 'text-[#3D4852] hover:bg-white/40'
              }`}
            >
              {isCollapsed ? (
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : isEmpty ? 'text-[#9CA3AF]' : 'text-[#3D4852]'}`} />
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-[#6B7280]'}`} />
                    <span className={isEmpty && !isActive ? 'text-[#9CA3AF]' : ''}>{cat}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isEmpty
                      ? 'bg-[#E0E5EC] text-[#9CA3AF] opacity-60 shadow-[inset_1px_1px_2px_rgba(163,177,198,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.4)]'
                      : 'bg-[#E0E5EC] text-[#6B7280] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                  }`}>
                    {countVal}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
