import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Award, Layers, Search, Loader2, ArrowLeft, UserPlus, UserCheck, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import UserAvatar from '../components/common/UserAvatar';

const calculateCreatorTier = (points = 0) => {
  if (points >= 500) return { tierName: 'Diamond Founder', icon: '💎', badgeBg: 'bg-purple-50 text-purple-600 border-purple-200' };
  if (points >= 200) return { tierName: 'Gold Founder', icon: '🥇', badgeBg: 'bg-amber-50 text-amber-600 border-amber-200' };
  if (points >= 50) return { tierName: 'Silver Founder', icon: '🥈', badgeBg: 'bg-slate-100 text-slate-700 border-slate-200' };
  return { tierName: 'Bronze Creator', icon: '🥉', badgeBg: 'bg-orange-50 text-orange-600 border-orange-200' };
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const tableRef = useRef(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('all');
  const [myFollowingIds, setMyFollowingIds] = useState(new Set());

  const [tablePage, setTablePage] = useState(1);
  const tableLimit = 5;

  const handleTablePageChange = (newPage) => {
    setTablePage(newPage);
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    setTablePage(1);
  }, [period, searchQuery]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/leaderboard?period=${period}`);
        if (res.data?.success) setLeaderboard(res.data.data || []);

        if (currentUser) {
          const myId = currentUser._id || currentUser.id;
          const meRes = await api.get(`/users/profile/${myId}`);
          if (meRes.data?.success) {
            const ids = (meRes.data.data.following || []).map((id) => String(id));
            setMyFollowingIds(new Set(ids));
          }
        }
      } catch {
        toast.error('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [currentUser, period]);

  const handleToggleFollow = async (targetId, targetName) => {
    if (!currentUser) {
      toast.error('Please login to follow creators!');
      navigate('/login');
      return;
    }

    const myId = currentUser._id || currentUser.id;
    if (String(targetId) === String(myId)) return;

    try {
      const res = await api.post(`/users/${targetId}/follow`);
      if (res.data?.success) {
        const nowFollowing = res.data.data.isFollowing;
        setMyFollowingIds((prev) => {
          const updated = new Set(prev);
          if (nowFollowing) updated.add(String(targetId));
          else updated.delete(String(targetId));
          return updated;
        });

        if (nowFollowing) toast.success(`You are now following ${targetName}!`);
        else toast.success(`Unfollowed ${targetName}.`);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update follow state.');
    }
  };

  const filteredList = leaderboard.filter(
    (u) =>
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.bio || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  const restList = filteredList.filter((u) => u.rank > 3 || filteredList.length < 3);

  const totalTablePages = Math.ceil(restList.length / tableLimit) || 1;
  const paginatedRestList = restList.slice((tablePage - 1) * tableLimit, tablePage * tableLimit);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
        <span className="text-xs font-bold text-[#3D4852]">Loading global creator rankings...</span>
      </div>
    );
  }

  const myId = currentUser?._id || currentUser?.id;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E0E5EC] pt-20 md:pt-24 px-6 md:px-8 pb-12">
      <div className="w-full max-w-none flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-3.5 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-sm text-[#3D4852]">Global Top 100 Creators</span>
          </div>
        </div>

        <div className="bg-[#E0E5EC] rounded-[32px] p-6 md:p-8 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A3B1C6]/20 pb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#3D4852] flex items-center gap-2.5">
                <Trophy className="w-7 h-7 text-amber-500" />
                <span>Global Creator Leaderboard</span>
              </h1>
              <p className="text-xs text-[#6B7280] font-semibold mt-1">
                Top 100 UI component creators ranked live by Creator Points, Community Impact & Favorites.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#E0E5EC] p-1.5 rounded-2xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20">
                <button
                  onClick={() => setPeriod('week')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    period === 'week'
                      ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30'
                      : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>This Week</span>
                </button>

                <button
                  onClick={() => setPeriod('month')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    period === 'month'
                      ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30'
                      : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>This Month</span>
                </button>

                <button
                  onClick={() => setPeriod('all')}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    period === 'all'
                      ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30'
                      : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>All Time</span>
                </button>
              </div>

              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder-[#6B7280] rounded-2xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {leaderboard.length >= 3 && !searchQuery && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-4">
              {top2 && (
                <div className="order-2 md:order-1 bg-[#E0E5EC] rounded-[28px] p-5 shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-400" />
                  <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-slate-200 text-slate-800 border border-slate-300 shadow-sm mb-3">
                    🥈 #2 Rank
                  </span>

                  <div className="rounded-full ring-4 ring-[#E0E5EC] shadow-md overflow-hidden flex-shrink-0 mb-2">
                    <UserAvatar user={top2} size="xl" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#3D4852] truncate max-w-full">{top2.displayName}</h3>
                  <span className="text-xs font-bold text-blue-600 mb-3">{top2.creatorPoints || 0} PTS</span>

                  <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-[#A3B1C6]/20 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Components</span>
                      <span className="font-extrabold text-blue-600">{top2.submittedComponentsCount || 0}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Followers</span>
                      <span className="font-extrabold text-emerald-600">{top2.followersCount || 0}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <button
                      onClick={() => navigate(`/profile/${top2._id}`)}
                      className="w-full py-2 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] font-bold text-xs rounded-xl shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 cursor-pointer"
                    >
                      Profile
                    </button>

                    {String(top2._id) !== String(myId) && (
                      <button
                        onClick={() => handleToggleFollow(top2._id, top2.displayName)}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                          myFollowingIds.has(String(top2._id))
                            ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        }`}
                      >
                        {myFollowingIds.has(String(top2._id)) ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                        <span>{myFollowingIds.has(String(top2._id)) ? 'Following' : '+ Follow'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {top1 && (
                <div className="order-1 md:order-2 bg-[#E0E5EC] rounded-[28px] p-6 shadow-[9px_9px_18px_rgba(163,177,198,0.7),-9px_-9px_18px_rgba(255,255,255,0.6)] border-2 border-amber-400/60 flex flex-col items-center text-center relative overflow-hidden scale-105 z-10">
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
                  <span className="text-xs font-black px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 shadow-md border border-amber-300 mb-3 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-slate-900" /> #1 Top Contributor
                  </span>

                  <div className="rounded-full ring-4 ring-amber-400/80 shadow-lg overflow-hidden flex-shrink-0 mb-2">
                    <UserAvatar user={top1} size="xl" />
                  </div>
                  <h3 className="font-black text-lg text-[#3D4852] truncate max-w-full">{top1.displayName}</h3>
                  <span className="text-sm font-black text-blue-600 mb-3">{top1.creatorPoints || 0} PTS</span>

                  <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-[#A3B1C6]/20 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Components</span>
                      <span className="font-extrabold text-blue-600">{top1.submittedComponentsCount || 0}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Followers</span>
                      <span className="font-extrabold text-emerald-600">{top1.followersCount || 0}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <button
                      onClick={() => navigate(`/profile/${top1._id}`)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      Top Profile
                    </button>

                    {String(top1._id) !== String(myId) && (
                      <button
                        onClick={() => handleToggleFollow(top1._id, top1.displayName)}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                          myFollowingIds.has(String(top1._id))
                            ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        }`}
                      >
                        {myFollowingIds.has(String(top1._id)) ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                        <span>{myFollowingIds.has(String(top1._id)) ? 'Following' : '+ Follow'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {top3 && (
                <div className="order-3 bg-[#E0E5EC] rounded-[28px] p-5 shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-600" />
                  <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-sm mb-3">
                    🥉 #3 Rank
                  </span>

                  <div className="rounded-full ring-4 ring-[#E0E5EC] shadow-md overflow-hidden flex-shrink-0 mb-2">
                    <UserAvatar user={top3} size="xl" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#3D4852] truncate max-w-full">{top3.displayName}</h3>
                  <span className="text-xs font-bold text-blue-600 mb-3">{top3.creatorPoints || 0} PTS</span>

                  <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-[#A3B1C6]/20 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Components</span>
                      <span className="font-extrabold text-blue-600">{top3.submittedComponentsCount || 0}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block font-bold">Followers</span>
                      <span className="font-extrabold text-emerald-600">{top3.followersCount || 0}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <button
                      onClick={() => navigate(`/profile/${top3._id}`)}
                      className="w-full py-2 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] font-bold text-xs rounded-xl shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 cursor-pointer"
                    >
                      Profile
                    </button>

                    {String(top3._id) !== String(myId) && (
                      <button
                        onClick={() => handleToggleFollow(top3._id, top3.displayName)}
                        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                          myFollowingIds.has(String(top3._id))
                            ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        }`}
                      >
                        {myFollowingIds.has(String(top3._id)) ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                        <span>{myFollowingIds.has(String(top3._id)) ? 'Following' : '+ Follow'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#A3B1C6]/30 text-xs font-extrabold text-[#6B7280] uppercase tracking-wider">
                  <th className="pb-3 px-3">Rank</th>
                  <th className="pb-3 px-3">Creator</th>
                  <th className="pb-3 px-3">Tier</th>
                  <th className="pb-3 px-3 text-center">Components</th>
                  <th className="pb-3 px-3 text-center">Followers</th>
                  <th className="pb-3 px-3 text-right">Points</th>
                  <th className="pb-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A3B1C6]/20">
                {paginatedRestList.map((creatorItem) => {
                  const isMe = String(creatorItem._id) === String(myId);
                  const isAmFollowing = myFollowingIds.has(String(creatorItem._id));
                  const tier = calculateCreatorTier(creatorItem.creatorPoints || 0);

                  return (
                    <tr key={creatorItem._id} className="hover:bg-white/30 transition-colors">
                      <td className="py-3 px-3 font-extrabold text-xs text-[#3D4852]">
                        #{creatorItem.rank}
                      </td>

                      <td className="py-3 px-3">
                        <div
                          onClick={() => navigate(`/profile/${creatorItem._id}`)}
                          className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
                        >
                          <UserAvatar user={creatorItem} size="sm" className="rounded-full flex-shrink-0" />
                          <div>
                            <span className="font-bold text-xs text-[#3D4852] hover:text-blue-600 block transition-colors truncate max-w-[150px]">
                              {creatorItem.displayName}
                            </span>
                            {creatorItem.bio && (
                              <span className="text-[10px] text-[#6B7280] block truncate max-w-[150px]">
                                {creatorItem.bio}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.badgeBg} inline-flex items-center gap-0.5`}>
                          <span>{tier.icon}</span><span>{tier.tierName}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center font-bold text-xs text-blue-600">
                        {creatorItem.submittedComponentsCount || 0}
                      </td>

                      <td className="py-3 px-3 text-center font-bold text-xs text-emerald-600">
                        {creatorItem.followersCount || 0}
                      </td>

                      <td className="py-3 px-3 text-right font-extrabold text-xs text-blue-600">
                        <span className="flex items-center justify-end gap-1">
                          <Award className="w-3.5 h-3.5 text-blue-600" />
                          {creatorItem.creatorPoints || 0}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => navigate(`/profile/${creatorItem._id}`)}
                            className="px-3 py-1 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] rounded-lg text-[11px] font-bold shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 cursor-pointer"
                          >
                            Profile
                          </button>

                          {!isMe && (
                            <button
                              onClick={() => handleToggleFollow(creatorItem._id, creatorItem.displayName)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                                isAmFollowing
                                  ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              {isAmFollowing ? <UserCheck className="w-3 h-3 text-emerald-600" /> : <UserPlus className="w-3 h-3 text-white" />}
                              <span>{isAmFollowing ? 'Following' : '+ Follow'}</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {restList.length > 5 && (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-[#A3B1C6]/20">
              <span className="text-xs font-semibold text-[#6B7280]">
                Showing {Math.min((tablePage - 1) * tableLimit + 1, restList.length)}-{Math.min(tablePage * tableLimit, restList.length)} of {restList.length} creators
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={tablePage <= 1}
                  onClick={() => handleTablePageChange(Math.max(1, tablePage - 1))}
                  className="px-3 py-1.5 rounded-xl bg-[#E0E5EC] text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-blue-600" /> Prev
                </button>

                {Array.from({ length: totalTablePages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => handleTablePageChange(pNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tablePage === pNum
                        ? 'bg-blue-600 text-white shadow-[3px_3px_6px_rgba(37,99,235,0.3)]'
                        : 'bg-[#E0E5EC] text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}

                <button
                  disabled={tablePage >= totalTablePages}
                  onClick={() => handleTablePageChange(Math.min(totalTablePages, tablePage + 1))}
                  className="px-3 py-1.5 rounded-xl bg-[#E0E5EC] text-xs font-bold text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
