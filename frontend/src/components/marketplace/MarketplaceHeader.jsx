import { useState, useRef, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Heart, ChevronLeft, ChevronRight, Trophy, Layers, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketplaceHeader = ({
  searchQuery,
  setSearchQuery,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onOpenSubmit,
  page = 1,
  setPage,
  totalPages = 1,
  totalComponents = 0
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#E0E5EC] rounded-[28px] p-4 md:p-5 shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/30 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <h1 className="text-xl md:text-2xl font-black text-[#3D4852] tracking-tight">
            UI Component Marketplace
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-3 py-1.5 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Dashboard</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showFavoritesOnly
                  ? 'bg-red-50 text-red-500 border-red-300 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)]'
                  : 'bg-[#E0E5EC] text-[#3D4852] hover:bg-white/50 border-[#A3B1C6]/20 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)]'
              }`}
            >
              <span>Explore Menu</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#E0E5EC] rounded-2xl shadow-[10px_10px_20px_rgba(163,177,198,0.6),-10px_-10px_20px_rgba(255,255,255,0.6)] border border-[#A3B1C6]/30 p-2 z-50 flex flex-col gap-1.5 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    navigate('/leaderboard');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#3D4852] hover:bg-white/40 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Leaderboard</span>
                </button>

                <button
                  onClick={() => {
                    setShowFavoritesOnly(!showFavoritesOnly);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    showFavoritesOnly
                      ? 'bg-red-50 text-red-500'
                      : 'text-[#3D4852] hover:bg-white/40'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
                  <span>{showFavoritesOnly ? 'Show All' : 'Favorites'}</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenSubmit || (() => navigate('/components/create'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit (+10 PTS)</span>
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

        {setPage && (
          <div className="flex items-center gap-1.5 p-1 bg-[#E0E5EC] rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 flex-shrink-0">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed hover:text-blue-600 flex items-center gap-0.5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>Prev</span>
            </button>
            <span className="px-2 py-0.5 text-xs font-extrabold text-[#3D4852] bg-[#E0E5EC] rounded-md shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20">
              {page} / {totalPages || 1}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed hover:text-blue-600 flex items-center gap-0.5 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceHeader;
