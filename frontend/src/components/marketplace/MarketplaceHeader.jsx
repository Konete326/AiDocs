import { Search, Plus, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const frameworks = ['All', 'CSS', 'Tailwind', 'React'];

const MarketplaceHeader = ({
  searchQuery,
  setSearchQuery,
  selectedFramework,
  setSelectedFramework,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onOpenSubmit
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#E0E5EC] rounded-[28px] p-4 md:p-5 shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/30 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-3.5 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-xl md:text-2xl font-extrabold text-[#3D4852] tracking-tight">
            UI Component Marketplace
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              showFavoritesOnly
                ? 'bg-red-50 text-red-500 border-red-300 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)]'
                : 'bg-[#E0E5EC] text-[#3D4852] hover:text-red-500 border-[#A3B1C6]/20 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)]'
            }`}
            title="Filter by your liked components"
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
            <span>My Favorites</span>
          </button>

          <button
            onClick={onOpenSubmit || (() => navigate('/components/create'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Submit Component
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
              +10 PTS
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search components by title, tag, or prompt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] placeholder-[#6B7280] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#E0E5EC] rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 w-full sm:w-auto overflow-x-auto">
          {frameworks.map((fw) => {
            const isActive = selectedFramework === fw;
            return (
              <button
                key={fw}
                onClick={() => setSelectedFramework(fw)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#E0E5EC] text-blue-600 shadow-[4px_4px_8px_rgba(163,177,198,0.5),-4px_-4px_8px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20'
                    : 'text-[#6B7280] hover:text-[#3D4852]'
                }`}
              >
                {fw}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
