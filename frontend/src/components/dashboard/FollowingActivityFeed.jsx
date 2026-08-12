import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Loader2, Sparkles, Compass } from 'lucide-react';
import api from '../../services/api';
import ComponentCard from '../marketplace/ComponentCard';

const FollowingActivityFeed = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const meRes = await api.get('/users/me');
        if (meRes.data?.success) {
          const followingIds = meRes.data.data.following || [];
          setFollowingCount(followingIds.length);

          if (followingIds.length > 0) {
            const compRes = await api.get('/ui-components?limit=24');
            if (compRes.data?.success) {
              const allComps = compRes.data.data?.components || [];
              const followedSet = new Set(followingIds.map((id) => String(id)));
              const filtered = allComps.filter((c) => {
                const cId = c.creator?._id || c.creator?.id || c.creator;
                return followedSet.has(String(cId));
              });
              setComponents(filtered);
            }
          }
        }
      } catch {
        setComponents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600 mr-2" />
        <span className="text-xs font-bold text-[#3D4852]">Fetching real-time activity feed...</span>
      </div>
    );
  }

  if (followingCount === 0) {
    return (
      <div className="bg-[#E0E5EC] rounded-[28px] p-8 md:p-12 text-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 max-w-2xl mx-auto">
        <Users className="w-12 h-12 text-[#6B7280] mx-auto mb-3 opacity-40" />
        <h3 className="text-base font-extrabold text-[#3D4852] mb-1">Not Following Any Creators Yet</h3>
        <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
          Follow top UI creators on ClarifyAI to get real-time activity updates whenever they release new UI components!
        </p>
        <button
          onClick={() => navigate('/components')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs shadow-[3px_3px_6px_rgba(37,99,235,0.35)] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Marketplace Creators</span>
        </button>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="bg-[#E0E5EC] rounded-[28px] p-8 md:p-10 text-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 max-w-2xl mx-auto">
        <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-3 opacity-60" />
        <h3 className="text-sm font-extrabold text-[#3D4852] mb-1">No New Releases From Followed Creators</h3>
        <p className="text-xs text-[#6B7280] mb-4">
          You are following {followingCount} creator{followingCount > 1 ? 's' : ''}. When they publish new components, they will appear here!
        </p>
        <button
          onClick={() => navigate('/components')}
          className="px-4 py-2 bg-[#E0E5EC] text-blue-600 rounded-xl font-bold text-xs shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] cursor-pointer"
        >
          Browse All Marketplace Components
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#6B7280]">
          Showing {components.length} recent release{components.length > 1 ? 's' : ''} from creators you follow:
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {components.map((comp) => (
          <ComponentCard key={comp._id} component={comp} onFavorite={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default FollowingActivityFeed;
