import { Users } from 'lucide-react';
import ComingSoonModal from '../common/ComingSoonModal';

export default function TeamInviteModal({ projectId, isOpen, onClose }) {
  return (
    <ComingSoonModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Team Workspace Coming Soon"
      description="Multiplayer collaboration, team invites, and role-based permissions are currently under development and will be live in the next update."
      icon={Users}
    />
  );
}
