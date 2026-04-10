import { BellOff } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ notifications, onMarkRead, isLoading }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 liquid-glass-strong rounded-2xl overflow-hidden cursor-default">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-sm font-medium text-white">Notifications</span>
        {unreadCount > 0 && <span className="text-xs text-white/50">{unreadCount} new</span>}
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
