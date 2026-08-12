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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFramework, setSelectedFramework] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComponents, setTotalComponents] = useState(0);
  const limit = 9;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.append('page', page);
      q.append('limit', limit);
      q.append('_t', Date.now().toString());
      if (selectedCategory !== 'All') q.append('category', selectedCategory);
      if (selectedFramework !== 'All') q.append('framework', selectedFramework);
      if (searchQuery.trim()) q.append('search', searchQuery.trim());
      if (creatorId) q.append('creator', creatorId);

      if (showFavoritesOnly) {
        const uId = user?._id || user?.id;
        if (!uId) {
          toast.error('Please sign in to view your favorited components.');
          setShowFavoritesOnly(false);
          setLoading(false);
          return navigate('/login');
        }
        q.append('favoritesOnly', 'true');
        q.append('favoriteUser', uId);
      }

      const res = await api.get(`/ui-components?${q.toString()}`);
      if (res.data?.success) {
        setComponents(res.data.data.components || []);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalComponents(res.data.data.total || 0);
      }
    } catch {
      toast.error('Failed to load components.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.refresh) {
      setSelectedCategory('All');
      setSearchQuery('');
      setPage(1);
    }
  }, [location.key, location.state]);

  useEffect(() => { setPage(1); }, [searchQuery, selectedCategory, selectedFramework, creatorId, showFavoritesOnly]);

  useEffect(() => {
    const timer = setTimeout(() => { fetchComponents(); }, 150);
    return () => clearTimeout(timer);
  }, [page, searchQuery, selectedCategory, selectedFramework, creatorId, showFavoritesOnly, location.key]);

  useEffect(() => {
    let eventSource;
    try {
      eventSource = new EventSource('/api/ui-components/stream');
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'COMPONENT_CREATED' && data.component) {
            toast.success(`🚀 New Component Published: "${data.component.title}"!`);
            setComponents((prev) => [data.component, ...prev.filter((c) => c._id !== data.component._id)]);
            setTotalComponents((prev) => prev + 1);
          }
        } catch {}
      };
    } catch {}

    const handleComponentCreated = () => {
      setSelectedCategory('All');
      setPage(1);
      fetchComponents();
    };
    window.addEventListener('clarifyai_component_created', handleComponentCreated);
    window.addEventListener('focus', fetchComponents);
    return () => {
      if (eventSource) eventSource.close();
      window.removeEventListener('clarifyai_component_created', handleComponentCreated);
      window.removeEventListener('focus', fetchComponents);
    };
  }, []);

  const handleFavorite = async (id) => {
    try {
      const res = await api.post(`/ui-components/${id}/favorite`);
      if (res.data?.success) {
        setComponents((prev) => prev.map((c) => (c._id === id ? res.data.data.component : c)));
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

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#E0E5EC] pt-4 pb-4 px-6 md:px-8 w-full max-w-none flex gap-6">
      <div className={`${isSidebarCollapsed ? 'w-16 md:w-20' : 'w-64 md:w-72'} flex-shrink-0 h-full overflow-hidden transition-all duration-300`}>
        <CategorySidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
          onOpenSubmit={() => navigate('/components/create')}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalComponents={totalComponents}
        />

        <div ref={gridRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B7280]">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
              <span className="text-sm font-semibold">Loading Marketplace...</span>
            </div>
          ) : components.length === 0 ? (
            <div className="bg-[#E0E5EC] rounded-[32px] p-12 text-center shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]">
              <Layers className="w-12 h-12 text-[#6B7280] mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-extrabold text-[#3D4852] mb-1">{showFavoritesOnly ? 'No favorited components yet' : 'No components found'}</h3>
              <p className="text-xs text-[#6B7280] mb-4">{showFavoritesOnly ? 'Click the heart icon on components to save them here!' : 'Be the first creator to submit a component!'}</p>
              <button onClick={() => navigate('/components/create')} className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-2xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] cursor-pointer">
                Submit Component (+10 PTS)
              </button>
            </div>
          ) : (
            <div className="p-3 md:p-4 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((comp) => (
                  <ComponentCard key={comp._id} component={comp} onFavorite={handleFavorite} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#A3B1C6]/20">
                  <span className="text-xs font-semibold text-[#6B7280]">
                    Showing {Math.min((page - 1) * limit + 1, totalComponents)}-{Math.min(page * limit, totalComponents)} of {totalComponents} items
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={page <= 1}
                      onClick={() => { setPage(p => p - 1); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 rounded-xl bg-[#E0E5EC] text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-blue-600" /> Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => { setPage(pNum); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${page === pNum ? 'bg-blue-600 text-white shadow-[3px_3px_6px_rgba(37,99,235,0.3)]' : 'bg-[#E0E5EC] text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'}`}
                      >
                        {pNum}
                      </button>
                    ))}
                    <button
                      disabled={page >= totalPages}
                      onClick={() => { setPage(p => p + 1); gridRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 rounded-xl bg-[#E0E5EC] text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                    >
                      Next <ChevronRight className="w-4 h-4 text-blue-600" />
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
