import { Terminal } from 'lucide-react';

const SkillFilters = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, categories }) => (
  <div className="space-y-4 mb-4">
    <div className="relative group">
      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Filter project skills..."
        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
      />
    </div>

    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`
            flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all border cursor-pointer
            ${activeCategory === cat.id 
              ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
              : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'}
          `}
        >
          <cat.icon className="w-3 h-3" />
          {cat.name}
        </button>
      ))}
    </div>
  </div>
);

export default SkillFilters;
