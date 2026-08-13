import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Award, Layers, Sparkles, Loader2, CheckCircle, UserPlus, UserCheck, ChevronLeft, ChevronRight, Filter, Trophy, AlertTriangle, X, Save, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import UserAvatar from '../components/common/UserAvatar';
import ComponentCard from '../components/marketplace/ComponentCard';

const CATEGORIES = [
  'All',
  'Buttons',
  'Cards',
  'Inputs',
  'Forms',
  'Loaders',
  'Toggle switches',
  'Radio buttons',
  'Checkboxes',
  'Tooltips',
  'Patterns',
  'UI Kits'
];

const BANNER_GRADIENTS = [
  'from-blue-600/40 via-indigo-600/30 to-purple-600/40',
  'from-indigo-600/40 via-purple-600/30 to-pink-600/40',
  'from-emerald-600/40 via-teal-600/30 to-cyan-600/40',
  'from-amber-600/40 via-orange-600/30 to-rose-600/40',
  'from-violet-600/40 via-fuchsia-600/30 to-pink-600/40',
  'from-cyan-600/40 via-blue-600/30 to-indigo-600/40'
];

const getDefaultBannerGradient = (id = '') => {
  if (!id) return BANNER_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BANNER_GRADIENTS.length;
  return BANNER_GRADIENTS[index];
};

const calculateCreatorTier = (points = 0) => {
  if (points >= 500) {
    return {
      tierName: 'Diamond Founder',
      icon: '💎',
      color: 'from-indigo-500 via-purple-600 to-pink-600',
      badgeBg: 'bg-purple-50 text-purple-600 border-purple-200',
      currentMin: 500,
      nextThreshold: 1000,
      nextTierName: 'Master Architect',
      percentage: 100,
      remaining: 0
    };
  }
  if (points >= 200) {
    const min = 200;
    const max = 500;
    const pct = Math.min(100, Math.round(((points - min) / (max - min)) * 100));
    return {
      tierName: 'Gold Founder',
      icon: '🥇',
      color: 'from-amber-400 to-yellow-600',
      badgeBg: 'bg-amber-50 text-amber-600 border-amber-200',
      currentMin: min,
      nextThreshold: max,
      nextTierName: 'Diamond Founder',
      percentage: pct,
      remaining: max - points
    };
  }
  if (points >= 50) {
    const min = 50;
    const max = 200;
    const pct = Math.min(100, Math.round(((points - min) / (max - min)) * 100));
    return {
      tierName: 'Silver Founder',
      icon: '🥈',
      color: 'from-slate-400 to-gray-600',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
      currentMin: min,
      nextThreshold: max,
      nextTierName: 'Gold Founder',
      percentage: pct,
      remaining: max - points
    };
  }
  const min = 0;
  const max = 50;
  const pct = Math.min(100, Math.round(((points - min) / (max - min)) * 100));
  return {
    tierName: 'Bronze Creator',
    icon: '🥉',
    color: 'from-amber-600 to-amber-800',
    badgeBg: 'bg-orange-50 text-orange-600 border-orange-200',
    currentMin: min,
    nextThreshold: max,
    nextTierName: 'Silver Founder',
    percentage: pct,
    remaining: max - points
  };
};

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const compsRef = useRef(null);
  const [creator, setCreator] = useState(null);
  const [components, setComponents] = useState([]);
  const [stats, setStats] = useState({ totalViews: 0, totalFavorites: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingComps, setLoadingComps] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComponentsCount, setTotalComponentsCount] = useState(0);

  const [componentToDelete, setComponentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const isOwnProfile = currentUser && (String(currentUser._id || currentUser.id) === String(userId));

  const handleOpenEdit = (comp) => {
    navigate(`/components/edit/${comp._id}`);
  };

  const handleConfirmDelete = async () => {
    if (!componentToDelete) return;
    setDeleting(true);
    try {
      const res = await api.delete(`/ui-components/${componentToDelete._id}`);
      if (res.data?.success) {
        toast.success('Component deleted successfully!');
        setComponents((prev) => prev.filter((c) => c._id !== componentToDelete._id));
        setTotalComponentsCount((prev) => Math.max(0, prev - 1));
        setComponentToDelete(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete component');
    } finally {
      setDeleting(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    compsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchAllProfileData = async () => {
      if (!userId) return;
      try {
        let compUrl = `/ui-components?creator=${userId}&page=${page}&limit=9`;
        if (selectedCategory && selectedCategory !== 'All') {
          compUrl += `&category=${encodeURIComponent(selectedCategory)}`;
        }

        const [profileRes, statsRes, compRes] = await Promise.all([
          api.get(`/users/profile/${userId}`),
          api.get(`/ui-components/user-stats/${userId}`),
          api.get(compUrl)
        ]);

        if (!isMounted) return;

        if (profileRes.data?.success) {
          const uData = profileRes.data.data;
          setCreator(uData);
          setFollowersCount(uData.followers?.length || 0);
          if (currentUser) {
            const myId = currentUser._id || currentUser.id;
            setIsFollowing((uData.followers || []).some((id) => String(id) === String(myId)));
          }
        }

        if (statsRes.data?.success) setStats(statsRes.data.data);

        if (compRes.data?.success) {
          setComponents(compRes.data.data?.components || []);
          setTotalPages(compRes.data.data?.totalPages || 1);
          setTotalComponentsCount(compRes.data.data?.total || 0);
        }
      } catch {
        toast.error('Failed to load profile data.');
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadingComps(false);
        }
      }
    };

    fetchAllProfileData();
    return () => { isMounted = false; };
  }, [userId, page, selectedCategory, currentUser]);

  const handleShareProfile = () => {
    const url = `${window.location.origin}/profile/${userId}`;
    navigator.clipboard.writeText(url);
    toast.success('Public creator profile link copied!');
  };

  const handleToggleFollow = async () => {
    if (!currentUser) {
      toast.error('Please login to follow creators!');
      navigate('/login');
      return;
    }
    try {
      const res = await api.post(`/users/${userId}/follow`);
      if (res.data?.success) {
        setIsFollowing(res.data.data.isFollowing);
        setFollowersCount(res.data.data.followersCount);
        if (res.data.data.isFollowing) {
          toast.success(`You are now following ${creator?.displayName || 'this creator'}!`);
        } else {
          toast.success(`Unfollowed ${creator?.displayName || 'creator'}.`);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update follow status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
        <span className="text-xs font-bold text-[#3D4852]">Loading creator profile...</span>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] p-8 text-center pt-28">
        <h2 className="text-[#3D4852] font-extrabold text-xl mb-4">Creator Profile Not Found</h2>
        <button onClick={() => navigate('/components')} className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-bold text-xs shadow-md">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const tier = calculateCreatorTier(creator.creatorPoints || 0);
  const defaultGradient = getDefaultBannerGradient(creator._id || userId);
  const creatorRank = typeof creator?.rank === 'number' ? creator.rank : null;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E0E5EC] pt-20 md:pt-24 px-6 md:px-8 pb-12">
      <div className="w-full max-w-none flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#E0E5EC] rounded-[24px] shadow-[6px_6px_14px_rgba(163,177,198,0.6),-6px_-6px_14px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 overflow-hidden flex flex-col justify-between h-full relative">
              <div>
                <div className="h-[75px] md:h-[85px] w-full relative overflow-hidden">
                  {creator.bgImageUrl ? (
                    <img src={creator.bgImageUrl} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${defaultGradient}`} />
                  )}
                </div>

                <div className="p-3.5 md:p-4 -mt-10 flex flex-col gap-2 relative z-10">
                  <div className="flex items-end justify-between">
                    <div className="rounded-full ring-3 ring-[#E0E5EC] shadow-md overflow-hidden flex-shrink-0 bg-[#E0E5EC]">
                      <UserAvatar user={creator} size="md" />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {creatorRank === 1 ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 shadow border border-amber-300 flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-slate-900" /> #1 Top Contributor
                        </span>
                      ) : creatorRank === 2 ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 border border-slate-300 shadow-sm flex items-center gap-1">
                          🥈 #2 Contributor
                        </span>
                      ) : creatorRank === 3 ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-sm flex items-center gap-1">
                          🥉 #3 Contributor
                        </span>
                      ) : creatorRank ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                          #{creatorRank} Contributor
                        </span>
                      ) : null}

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.badgeBg} flex items-center gap-0.5 shadow-sm`}>
                        <span>{tier.icon}</span><span>{tier.tierName}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-base font-extrabold text-[#3D4852] truncate">{creator.displayName || 'Creator'}</h1>
                    <p className="text-[10px] text-[#6B7280] font-medium">
                      Member since {new Date(creator.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  {creator.bio && (
                    <p className="text-xs text-[#3D4852] bg-[#E0E5EC] p-2 rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20 leading-snug font-medium line-clamp-2">
                      {creator.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3.5 md:p-4 pt-0 grid grid-cols-2 gap-2">
                {isOwnProfile ? (
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full py-1.5 bg-[#E0E5EC] hover:bg-white/50 text-blue-600 rounded-xl text-xs font-bold shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5 text-blue-600" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={handleToggleFollow}
                    className={`w-full py-1.5 rounded-xl font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isFollowing
                        ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[2px_2px_5px_rgba(37,99,235,0.3)]'
                      }`}
                  >
                    {isFollowing ? <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> : <UserPlus className="w-3.5 h-3.5 text-white" />}
                    <span>{isFollowing ? 'Following' : '+ Follow'}</span>
                  </button>
                )}

                <button
                  onClick={handleShareProfile}
                  className="w-full py-1.5 bg-[#E0E5EC] hover:bg-white/50 text-blue-600 rounded-xl text-xs font-bold shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600" /><span>Share Link</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#E0E5EC] rounded-[24px] p-4 shadow-[6px_6px_14px_rgba(163,177,198,0.6),-6px_-6px_14px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-sm font-extrabold text-[#3D4852]">Creator Performance & Record</h2>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Live Stats</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#E0E5EC] p-2.5 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] text-center mb-2.5">
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] block uppercase tracking-wider">Components</span>
                  <span className="text-xs font-extrabold text-blue-600">{totalComponentsCount}</span>
                </div>
                {String(currentUser?._id || currentUser?.id) === String(userId) ? (
                  <div
                    onClick={() => navigate(`/profile/${userId}/followers`)}
                    className="cursor-pointer hover:opacity-85 transition-opacity"
                    title="View your followers list and follow back"
                  >
                    <span className="text-[9px] font-bold text-[#6B7280] block uppercase tracking-wider">Followers</span>
                    <span className="text-xs font-extrabold text-emerald-600 underline decoration-dotted underline-offset-2">{followersCount}</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[9px] font-bold text-[#6B7280] block uppercase tracking-wider">Followers</span>
                    <span className="text-xs font-extrabold text-emerald-600">{followersCount}</span>
                  </div>
                )}
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] block uppercase tracking-wider">Views</span>
                  <span className="text-xs font-extrabold text-blue-600">{stats.totalViews || 0}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#6B7280] block uppercase tracking-wider">Points</span>
                  <span className="text-xs font-extrabold text-blue-600 flex items-center justify-center gap-0.5"><Award className="w-3 h-3" />{creator.creatorPoints || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#E0E5EC] p-3 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#3D4852] mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Creator Level: <strong>{tier.tierName}</strong></span>
                </span>
                <span className="text-blue-600 font-mono text-[10px]">{creator.creatorPoints || 0} / {tier.nextThreshold} PTS ({tier.percentage}%)</span>
              </div>

              <div className="w-full h-2 bg-[#E0E5EC] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] p-0.5">
                <div
                  style={{ width: `${tier.percentage}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${tier.color} transition-all duration-500 shadow-sm`}
                />
              </div>

              {tier.remaining > 0 ? (
                <p className="text-[10px] text-[#6B7280] mt-1 font-medium">
                  Submit <strong>{Math.ceil(tier.remaining / 10)} more components</strong> ({tier.remaining} PTS) to unlock <strong>{tier.nextTierName}</strong> tier!
                </p>
              ) : (
                <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Max Creator Tier Reached! Master Architect.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#E0E5EC] rounded-[28px] p-6 md:p-7 shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30" ref={compsRef}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#3D4852]">Created UI Components ({totalComponentsCount})</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">All Marketplace components published by {creator.displayName || 'this creator'}.</p>
            </div>

            <div className="flex items-center gap-3">
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20">
                  <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    className="p-1 bg-[#E0E5EC] text-[#3D4852] disabled:opacity-30 rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.6),-2px_-2px_4px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <span className="px-1.5 text-[11px] font-extrabold text-blue-600">
                    {page} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    className="p-1 bg-[#E0E5EC] text-[#3D4852] disabled:opacity-30 rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.6),-2px_-2px_4px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    handlePageChange(1);
                  }}
                  className="px-3 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loadingComps ? (
            <div className="py-12 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
              <span className="text-xs font-bold text-[#3D4852]">Loading components...</span>
            </div>
          ) : components.length === 0 ? (
            <div className="bg-[#E0E5EC] rounded-2xl p-8 text-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
              <Layers className="w-10 h-10 text-[#6B7280] mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold text-[#3D4852]">No components found for this category</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {components.map((comp) => (
                  <ComponentCard
                    key={comp._id}
                    component={comp}
                    onFavorite={() => { }}
                    onEdit={handleOpenEdit}
                    onDelete={(c) => setComponentToDelete(c)}
                    isOwner={isOwnProfile}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#A3B1C6]/20">
                  <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    className="px-3 py-1 bg-[#E0E5EC] text-[#3D4852] disabled:opacity-40 font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-blue-600" /> Prev
                  </button>

                  <div className="px-3 py-1 bg-[#E0E5EC] rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] text-xs font-extrabold text-blue-600">
                    Page {page} of {totalPages}
                  </div>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    className="px-3 py-1 bg-[#E0E5EC] text-[#3D4852] disabled:opacity-40 font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {componentToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#E0E5EC] rounded-[28px] p-6 max-w-md w-full shadow-[12px_12px_24px_rgba(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-[#A3B1C6]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-red-50 text-red-500 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-red-200">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#3D4852]">Delete UI Component?</h3>
                <p className="text-xs text-[#6B7280]">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-xs text-[#3D4852] font-medium bg-[#E0E5EC] p-3 rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] mb-5 border border-[#A3B1C6]/20">
              Are you sure you want to delete <strong className="text-red-600">{componentToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                disabled={deleting}
                onClick={() => setComponentToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#3D4852] bg-[#E0E5EC] hover:bg-white/50 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-[3px_3px_6px_rgba(220,38,38,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{deleting ? 'Deleting...' : 'Delete Component'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
