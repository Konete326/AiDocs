import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../marketplace/ComponentCard';
import { ArrowRight, Layers, Plus, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UserProfileComponents = ({ userId }) => {
  const [components, setComponents] = useState([]);
  const [stats, setStats] = useState({ totalViews: 0, totalFavorites: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserComponents = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/ui-components?creator=${userId}&limit=12`);
      const data = await res.json();
      if (data.success) setComponents(data.data.components || []);

      const statsRes = await fetch(`/api/ui-components/user-stats/${userId}`);
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);
    } catch {
      toast.error('Failed to load components.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUserComponents(); }, [userId]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/ui-components/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Component deleted!');
        setComponents((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.error || 'Failed to delete.');
      }
    } catch {
      toast.error('Delete error.');
    }
  };

  return (
    <div className="bg-[#E0E5EC] rounded-[32px] p-6 md:p-8 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-[#3D4852]">Submitted UI Components</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <span>{stats.totalViews} Views</span> • <span>{stats.totalFavorites} Favorites</span>
            </div>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">Marketplace components created and shared by you.</p>
        </div>

        <button onClick={() => navigate(`/components?creator=${userId}`)} className="px-4 py-2 bg-[#E0E5EC] text-blue-600 font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] flex items-center gap-1.5 cursor-pointer">
          <span>View More</span><ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-[#6B7280]"><Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" /><span className="text-xs font-semibold">Loading components...</span></div>
      ) : components.length === 0 ? (
        <div className="bg-[#E0E5EC] rounded-2xl p-8 text-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
          <Layers className="w-10 h-10 text-[#6B7280] mx-auto mb-2 opacity-50" />
          <p className="text-xs font-bold text-[#3D4852] mb-1">No components submitted yet</p>
          <p className="text-[11px] text-[#6B7280] mb-4">Share your UI designs and earn +10 Creator Points for each submission.</p>
          <button onClick={() => navigate('/components/create')} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] inline-flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />Submit First Component (+10 PTS)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {components.map((comp) => (
            <div key={comp._id} className="relative group">
              <ComponentCard component={comp} onFavorite={() => {}} />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleDelete(comp._id)} className="p-1.5 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfileComponents;
