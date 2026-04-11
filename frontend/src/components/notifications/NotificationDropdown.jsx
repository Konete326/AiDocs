import { BellOff, X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ notifications, onMarkRead, isLoading, onClose }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 liquid-glass-strong rounded-2xl overflow-hidden cursor-default">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Notifications</span>
          {unreadCount > 0 && <span className="bg-white/10 text-white/60 text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-white/30 hover:text-white cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="py-8 flex justify-center">
            <LoadingSpinner size="md" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-8 text-center bg-white/[0.01]">
            <BellOff className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <span className="text-xs text-white/40">No notifications</span>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((n, i) => (
              <div key={n._id}>
                <NotificationItem notification={n} onMarkRead={onMarkRead} />
                {i < notifications.length - 1 && <div className="h-px bg-white/5 w-full" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
