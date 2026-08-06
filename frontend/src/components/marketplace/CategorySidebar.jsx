const categories = [
  'All', 'Buttons', 'Checkboxes', 'Toggle switches', 'Cards',
  'Loaders', 'Inputs', 'Radio buttons', 'Forms', 'Patterns',
  'Tooltips', 'UI Kits', 'Themes'
];

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-[#E0E5EC] rounded-[28px] p-4 shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/30 h-full flex flex-col overflow-y-auto">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#6B7280] mb-3 px-1">
        Categories
      </h3>
      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-between ${
                isActive
                  ? 'bg-[#E0E5EC] text-blue-600 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20'
                  : 'text-[#3D4852] hover:bg-white/40'
              }`}
            >
              <span>{cat}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
