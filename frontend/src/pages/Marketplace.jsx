import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader';
import CategorySidebar from '../components/marketplace/CategorySidebar';
import ComponentCard from '../components/marketplace/ComponentCard';
import { Loader2, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const creatorId = searchParams.get('creator');
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef(null);
  const { user } = useAuth();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFramework, setSelectedFramework] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComponents, setTotalComponents] = useState(0);
  const limit = 9;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const cacheRef = useRef(new Map());

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFavoritesToggle = (val) => {
    setShowFavoritesOnly(val);
    setPage(1);
  };

  useEffect(() => {
    if (location.state?.refresh) {
      cacheRef.current.clear();
      setSelectedCategory('All');
      setSearchQuery('');
      setPage(1);
    }
  }, [location.key, location.state]);

  useEffect(() => {
    let isCancelled = false;

    const doFetch = async () => {
      const targetPage = page;
      const key = `${selectedCategory}_${selectedFramework}_${searchQuery.trim()}_${creatorId || ''}_${showFavoritesOnly ? user?._id || 'fav' : ''}_${targetPage}`;
      const cached = cacheRef.current.get(key);

      if (cached) {
        setComponents(cached.components);
        setTotalPages(cached.totalPages);
        setTotalComponents(cached.total);
        setLoading(false);
      } else {
        if (components.length > 0) setIsFetching(true);
        else setLoading(true);
      }

      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedFramework !== 'All') params.append('framework', selectedFramework);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (creatorId) params.append('creator', creatorId);
        if (showFavoritesOnly) params.append('favoritesOnly', 'true');
        params.append('page', targetPage);
        params.append('limit', limit);

        const res = await api.get(`/api/ui-components?${params.toString()}`);
        if (!isCancelled && res.data?.success) {
          const fetchedComps = res.data.data.components || [];
          const fetchedPages = res.data.data.totalPages || 1;
          const fetchedTotal = res.data.data.total || 0;

          setComponents(fetchedComps);
          setTotalPages(fetchedPages);
          setTotalComponents(fetchedTotal);

          cacheRef.current.set(key, {
            components: fetchedComps,
            totalPages: fetchedPages,
            total: fetchedTotal
          });
        }
      } catch (err) {
        if (!isCancelled) {
          toast.error('Failed to fetch components.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
          setIsFetching(false);
        }
      }
    };

    const debounceTimer = setTimeout(doFetch, searchQuery.trim() ? 300 : 0);

    return () => {
      isCancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [selectedCategory, selectedFramework, searchQuery, creatorId, showFavoritesOnly, page, user?._id]);

  const handleFavorite = async (id) => {
    try {
      const res = await api.post(`/api/ui-components/${id}/favorite`);
      if (res.data?.success) {
        setComponents((prev) => prev.map((c) => (c._id === id ? res.data.data.component : c)));
        cacheRef.current.clear();
        toast.success(res.data.data.isFavorited ? 'Favorited!' : 'Unfavorited.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Sign in to favorite components.');
        navigate('/login');
      } else {
        toast.error('Failed to update favorite.');
      }
    }
  };

  const handleOpenSubmit = () => {
    if (!user) {
      toast.error('Please sign in to submit components.');
      navigate('/login', { state: { from: '/components/create' } });
      return;
    }
    navigate('/components/create');
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#E0E5EC] pt-20 sm:pt-24 pb-4 px-3 sm:px-6 w-full max-w-7xl mx-auto flex gap-4">
      <div className={`${isSidebarCollapsed ? 'w-16 md:w-20' : 'w-60 md:w-64'} flex-shrink-0 h-full overflow-hidden transition-all duration-300 hidden lg:block`}>
        <CategorySidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategorySelect}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          refreshTrigger={totalComponents}
        />
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={handleFavoritesToggle}
          onOpenSubmit={handleOpenSubmit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalComponents={totalComponents}
        />

        <div ref={gridRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 relative">
          {loading && components.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B7280]">
              <Loader2 className="w-8 h-8 animate-spin text-[#6C63FF] mb-2" />
              <span className="text-sm font-semibold">Loading Marketplace...</span>
            </div>
          ) : components.length === 0 ? (
            <div className="bg-[#E0E5EC] rounded-[32px] p-12 text-center shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] border border-[#CAD1DB]">
              <Layers className="w-12 h-12 text-[#6B7280] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-extrabold text-[#3D4852] mb-1">{showFavoritesOnly ? 'No favorited components yet' : 'No components found'}</h3>
              <p className="text-xs text-[#6B7280] mb-4">{showFavoritesOnly ? 'Click the heart icon on components to save them here!' : 'Be the first creator to submit a component!'}</p>
              <button onClick={handleOpenSubmit} className="px-5 py-2.5 bg-[#6C63FF] hover:bg-[#8B84FF] text-white text-xs font-bold rounded-2xl shadow-md cursor-pointer">
                Submit Component (+10 PTS)
              </button>
            </div>
          ) : (
            <div className={`p-3 md:p-4 pb-12 transition-opacity duration-150 ${isFetching ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((comp) => (
                  <ComponentCard key={comp._id} component={comp} onFavorite={handleFavorite} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#CAD1DB]/60">
                  <span className="text-xs font-semibold text-[#6B7280]">
                    Showing {Math.min((page - 1) * limit + 1, totalComponents)}-{Math.min(page * limit, totalComponents)} of {totalComponents} items
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={page <= 1}
                      onClick={() => { setPage(p => p - 1); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 rounded-xl neumorphic-btn text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#6C63FF]" /> Prev
                    </button>
                    {(() => {
                      const maxVisible = 10;
                      let start = Math.max(1, page - Math.floor(maxVisible / 2));
                      let end = Math.min(totalPages, start + maxVisible - 1);
                      if (end - start + 1 < maxVisible) {
                        start = Math.max(1, end - maxVisible + 1);
                      }
                      const pages = [];
                      for (let i = start; i <= end; i++) pages.push(i);
                      return pages.map((pNum) => (
                        <button
                          key={pNum}
                          onClick={() => { setPage(pNum); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${page === pNum ? 'bg-[#6C63FF] text-white shadow-md' : 'neumorphic-btn text-[#3D4852]'}`}
                        >
                          {pNum}
                        </button>
                      ));
                    })()}
                    <button
                      disabled={page >= totalPages}
                      onClick={() => { setPage(p => p + 1); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 rounded-xl neumorphic-btn text-xs font-bold text-[#3D4852] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      Next <ChevronRight className="w-4 h-4 text-[#6C63FF]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
