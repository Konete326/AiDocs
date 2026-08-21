import { useState, useRef, useEffect } from 'react';
import { Search, ArrowLeft, Heart, ChevronLeft, ChevronRight, Trophy, Layers, ChevronDown, Clock, Eye, Shuffle, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../common/ConfirmModal';

const SORT_OPTIONS = [
  { id: 'newest', label: 'Recent', icon: Clock, desc: 'Newest first' },
  { id: 'views', label: 'Views', icon: Eye, desc: 'Most viewed' },
  { id: 'favorites', label: 'Favorites', icon: Heart, desc: 'Most liked' },
  { id: 'random', label: 'Randomize', icon: Shuffle, desc: 'Discover random' }
];

const MarketplaceHeader = ({
  searchQuery,
  setSearchQuery,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onOpenSubmit,
  page = 1,
  setPage,
  totalPages = 1,
  totalComponents = 0,
  selectedSort = 'newest',
  onSortChange
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (onOpenSubmit) {
      onOpenSubmit();
    } else {
      navigate('/components/create');
    }
  };

  const handleAuthConfirm = () => {
    setShowAuthModal(false);
    navigate('/login', { state: { from: '/components/create' } });
  };

  const currentSortObj = SORT_OPTIONS.find(s => s.id === selectedSort) || SORT_OPTIONS[0];
  const CurrentSortIcon = currentSortObj.icon;

  return (
    <>
      <div className="bg-[#E0E5EC] rounded-[28px] p-4 md:p-5 shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#CAD1DB] mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#6C63FF] flex-shrink-0" />
            <h1 className="text-xl md:text-2xl font-black text-[#3D4852] tracking-tight">
              UI Component Marketplace
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 neumorphic-btn text-[#3D4852] font-bold text-xs rounded-xl active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span>Dashboard</span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  showFavoritesOnly
                    ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)]'
                    : 'neumorphic-btn text-[#3D4852]'
                }`}
              >
                <span>Explore Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#E0E5EC] rounded-2xl shadow-[10px_10px_20px_rgba(163,177,198,0.6),-10px_-10px_20px_rgba(255,255,255,0.6)] border border-[#CAD1DB] p-2 z-50 flex flex-col gap-1.5">
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
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-[#3D4852] hover:bg-white/40'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-rose-600 text-rose-600' : 'text-rose-600'}`} />
                    <span>{showFavoritesOnly ? 'Show All' : 'Favorites'}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmitClick}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <span>Submit (+10 PTS)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search components by title, tag, or prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] placeholder-[#6B7280] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.35)] border border-[#CAD1DB]/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="px-3 py-2 rounded-xl text-xs font-bold neumorphic-btn text-[#3D4852] flex items-center gap-1.5 cursor-pointer"
                title="Filter / Sort Components"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span className="text-[11px] font-bold text-[#6B7280]">Sort:</span>
                <CurrentSortIcon className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span>{currentSortObj.label}</span>
                <ChevronDown className={`w-3 h-3 text-[#6B7280] transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-48 bg-[#E0E5EC] rounded-2xl shadow-[10px_10px_20px_rgba(163,177,198,0.6),-10px_-10px_20px_rgba(255,255,255,0.6)] border border-[#CAD1DB] p-1.5 z-50 flex flex-col gap-1">
                  {SORT_OPTIONS.map((opt) => {
                    const OptIcon = opt.icon;
                    const isSelected = selectedSort === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          if (onSortChange) onSortChange(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#6C63FF] text-white shadow-sm'
                            : 'text-[#3D4852] hover:bg-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <OptIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`} />
                          <span>{opt.label}</span>
                        </div>
                        <span className={`text-[9.5px] font-normal ${isSelected ? 'text-white/80' : 'text-[#6B7280]'}`}>
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {setPage && (
              <div className="flex items-center gap-1.5 p-1 bg-[#E0E5EC] rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#CAD1DB]/50 flex-shrink-0">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#6C63FF] flex items-center gap-0.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span>Prev</span>
                </button>
                <span className="px-2 py-0.5 text-xs font-extrabold text-[#3D4852] bg-[#E0E5EC] rounded-md shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#CAD1DB]/50">
                  {page} / {totalPages || 1}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed hover:text-[#6C63FF] flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#6C63FF]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showAuthModal}
        onCancel={() => setShowAuthModal(false)}
        onConfirm={handleAuthConfirm}
        title="Sign In Required"
        message="You must be logged in to create and publish components to the marketplace and earn community points."
        confirmLabel="Sign In to Continue"
      />
    </>
  );
};

export default MarketplaceHeader;
