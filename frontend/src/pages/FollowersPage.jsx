import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, UserCheck, Award, Users, UserCheck as UserCheckIcon, Loader2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import UserAvatar from '../components/common/UserAvatar';

const FollowersPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [creator, setCreator] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState('followers');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [myFollowingIds, setMyFollowingIds] = useState(new Set());

  useEffect(() => {
    const fetchSocialData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/social/${userId}`);
        if (res.data?.success) {
          setCreator(res.data.data.user);
          setFollowers(res.data.data.followers || []);
          setFollowing(res.data.data.following || []);
        }

        if (currentUser) {
          const myId = currentUser._id || currentUser.id;
          const meRes = await api.get(`/users/profile/${myId}`);
          if (meRes.data?.success) {
            const ids = (meRes.data.data.following || []).map((id) => String(id));
            setMyFollowingIds(new Set(ids));
          }
        }
      } catch {
        toast.error('Failed to load followers list.');
      } finally {
        setLoading(false);
      }
    };
    fetchSocialData();
  }, [userId, currentUser]);

  const handleToggleFollow = async (targetId, targetName) => {
    if (!currentUser) {
      toast.error('Please login to follow users!');
      navigate('/login');
      return;
    }

    const myId = currentUser._id || currentUser.id;
    if (String(targetId) === String(myId)) {
      toast.error('You cannot follow yourself.');
      return;
    }

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

        if (nowFollowing) {
          toast.success(`You are now following ${targetName}!`);
        } else {
          toast.success(`Unfollowed ${targetName}.`);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update follow state.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
        <span className="text-xs font-bold text-[#3D4852]">Loading community members...</span>
      </div>
    );
  }

  const rawList = activeTab === 'followers' ? followers : following;
  const currentList = rawList.filter(
    (m) =>
      (m.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.bio || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const myId = currentUser?._id || currentUser?.id;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E0E5EC] pt-20 md:pt-24 px-6 md:px-8 pb-12">
      <div className="w-full max-w-none flex flex-col gap-6">
        <div className="bg-[#E0E5EC] rounded-[32px] p-6 md:p-8 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A3B1C6]/20 pb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-blue-600" />
                <span>Back</span>
              </button>

              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-[#3D4852] flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>{creator?.displayName || 'Creator'}&apos;s Community</span>
                </h1>
                <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                  Explore users following {creator?.displayName || 'this creator'} and follow them back.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search members by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder-[#6B7280] rounded-2xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-[#E0E5EC] p-1.5 rounded-2xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'followers'
                      ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                      : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Followers ({followers.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('following')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'following'
                      ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                      : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                >
                  <UserCheckIcon className="w-4 h-4" />
                  <span>Following ({following.length})</span>
                </button>
              </div>
            </div>
          </div>

          {currentList.length === 0 ? (
            <div className="bg-[#E0E5EC] rounded-2xl p-12 text-center shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
              <Users className="w-12 h-12 text-[#6B7280] mx-auto mb-3 opacity-40" />
              <h3 className="text-sm font-extrabold text-[#3D4852] mb-1">No {activeTab} yet</h3>
              <p className="text-xs text-[#6B7280]">
                {activeTab === 'followers'
                  ? 'No community members are currently following this user.'
                  : 'This user is not following anyone yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentList.map((member) => {
                const isMe = String(member._id) === String(myId);
                const isAmFollowing = myFollowingIds.has(String(member._id));

                return (
                  <div
                    key={member._id}
                    className="bg-[#E0E5EC] rounded-2xl p-5 shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 flex flex-col justify-between gap-4 hover:border-blue-400/40 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        onClick={() => navigate(`/profile/${member._id}`)}
                        className="cursor-pointer hover:opacity-85 transition-opacity flex-shrink-0"
                      >
                        <UserAvatar user={member} size="lg" className="rounded-full ring-2 ring-[#E0E5EC] shadow-md" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            onClick={() => navigate(`/profile/${member._id}`)}
                            className="font-extrabold text-sm text-[#3D4852] truncate hover:text-blue-600 cursor-pointer transition-colors"
                          >
                            {member.displayName || 'User'}
                          </h3>
                          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0">
                            <Award className="w-3 h-3 text-blue-600" />
                            {member.creatorPoints || 0}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#6B7280] font-medium mt-0.5 line-clamp-2">
                          {member.bio || 'ClarifyAI Community Contributor'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#A3B1C6]/20">
                      <button
                        onClick={() => navigate(`/profile/${member._id}`)}
                        className="w-full py-2 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] rounded-xl text-xs font-bold shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all text-center cursor-pointer"
                      >
                        View Profile
                      </button>

                      {!isMe ? (
                        <button
                          onClick={() => handleToggleFollow(member._id, member.displayName)}
                          className={`w-full py-2 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            isAmFollowing
                              ? 'bg-[#E0E5EC] text-emerald-600 border border-emerald-400/40 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[2px_2px_4px_rgba(37,99,235,0.3)]'
                          }`}
                        >
                          {isAmFollowing ? <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> : <UserPlus className="w-3.5 h-3.5 text-white" />}
                          <span>{isAmFollowing ? 'Following' : 'Follow Back'}</span>
                        </button>
                      ) : (
                        <span className="w-full py-2 bg-[#E0E5EC] text-[#6B7280] rounded-xl text-xs font-bold text-center block shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)]">
                          You
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;
