import { useState, useEffect } from 'react';
import { Users, X, UserPlus, Shield, Trash2, Check, Mail } from 'lucide-react';
import { 
  getProjectMembers, 
  inviteProjectMember, 
  updateProjectMemberRole, 
  removeProjectMember 
} from '../../services/projectService';
import { showSuccess, showError } from '../../utils/toast';

export default function TeamInviteModal({ projectId, isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [membersData, setMembersData] = useState({ owner: null, members: [] });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getProjectMembers(projectId);
      if (data) setMembersData(data);
    } catch (err) {
      showError('Failed to load team', 'Could not retrieve project members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && projectId) {
      fetchMembers();
    }
  }, [isOpen, projectId]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showError('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      const updatedMembers = await inviteProjectMember(projectId, email, role);
      setMembersData((prev) => ({ ...prev, members: updatedMembers }));
      setEmail('');
      showSuccess('Invitation Sent', `Collaborator invited as ${role.toUpperCase()}.`);
    } catch (err) {
      showError('Invite Failed', err.response?.data?.error || 'Could not send invitation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    try {
      const updatedMembers = await updateProjectMemberRole(projectId, memberId, newRole);
      setMembersData((prev) => ({ ...prev, members: updatedMembers }));
      showSuccess('Role Updated', `Member role updated to ${newRole.toUpperCase()}.`);
    } catch (err) {
      showError('Update Failed', 'Could not update member role.');
    }
  };

  const handleRemove = async (memberId) => {
    try {
      const updatedMembers = await removeProjectMember(projectId, memberId);
      setMembersData((prev) => ({ ...prev, members: updatedMembers }));
      showSuccess('Member Removed', 'Collaborator removed from workspace.');
    } catch (err) {
      showError('Removal Failed', 'Could not remove team member.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative z-10 w-full max-w-lg neumorphic-card rounded-[32px] bg-[#E0E5EC] text-[#3D4852] border border-white/60 shadow-2xl p-6 md:p-7 space-y-6 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-black/5 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6C63FF]/15 flex items-center justify-center text-[#6C63FF]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#3D4852]">Team Workspace Collaboration</h3>
              <p className="text-[11px] text-[#6B7280]">Invite co-founders and developers with Role-Based Access.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#3D4852] p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleInvite} className="space-y-3 bg-[#E0E5EC] p-4 rounded-2xl border border-white/60 neumorphic-inset shrink-0">
          <label className="text-xs font-extrabold text-[#3D4852] block">Invite Team Member</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@agency.com"
                className="w-full bg-[#E0E5EC] text-xs font-bold text-[#3D4852] placeholder:text-[#6B7280] pl-9 pr-3 py-2.5 rounded-xl outline-none neumorphic-card"
              />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-[#E0E5EC] text-xs font-extrabold text-[#3D4852] p-2.5 rounded-xl outline-none neumorphic-card cursor-pointer"
            >
              <option value="admin">Admin (Full Access)</option>
              <option value="editor">Editor (Can Edit)</option>
              <option value="viewer">Viewer (Read Only)</option>
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer border-none disabled:opacity-50"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </button>
          </div>
        </form>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          <h4 className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider">Active Workspace Members</h4>

          {loading ? (
            <div className="py-8 text-center text-xs text-[#6B7280] font-bold">Loading team members...</div>
          ) : (
            <div className="space-y-2.5">
              {membersData.owner && (
                <div className="p-3 rounded-2xl bg-[#E0E5EC] border border-white/60 flex items-center justify-between shadow-[3px_3px_6px_rgba(163,177,198,0.4),-3px_-3px_6px_rgba(255,255,255,0.5)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-xs">
                      {membersData.owner.displayName?.[0] || 'O'}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#3D4852]">{membersData.owner.displayName} (Owner)</p>
                      <p className="text-[10px] text-[#6B7280]">{membersData.owner.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#6C63FF]/15 text-[#6C63FF] font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Owner
                  </span>
                </div>
              )}

              {membersData.members.length === 0 ? (
                <div className="py-6 text-center text-[11px] text-[#6B7280] font-semibold">
                  No additional collaborators added yet.
                </div>
              ) : (
                membersData.members.map((m) => (
                  <div key={m._id} className="p-3 rounded-2xl bg-[#E0E5EC] border border-white/60 flex items-center justify-between gap-2 shadow-[3px_3px_6px_rgba(163,177,198,0.4),-3px_-3px_6px_rgba(255,255,255,0.5)]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-black/10 text-[#3D4852] flex items-center justify-center font-extrabold text-xs uppercase">
                        {m.email[0]}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-extrabold text-[#3D4852] truncate">{m.email}</p>
                        <p className="text-[9px] text-[#6B7280]">Invited {new Date(m.invitedAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={m.role}
                        onChange={(e) => handleRoleChange(m._id, e.target.value)}
                        className="bg-[#E0E5EC] text-[10px] font-extrabold text-[#3D4852] py-1 px-2 rounded-lg outline-none neumorphic-inset cursor-pointer"
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <button
                        onClick={() => handleRemove(m._id)}
                        className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
