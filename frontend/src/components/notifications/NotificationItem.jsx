import { CheckCircle, AlertCircle, Sparkles, Clock, Bell } from 'lucide-react';

const icons = {
  doc_ready: CheckCircle,
  generation_failed: AlertCircle,
  plan_upgraded: Sparkles,
  milestone_due: Clock,
  system: Bell
};

const NotificationItem = ({ notification, onMarkRead }) => {
  const Icon = icons[notification.type] || Bell;

  return (
    <div 
      className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${!notification.isRead ? 'bg-white/5 hover:bg-white/[0.08]' : 'hover:bg-white/[0.03]'}`}
      onClick={() => !notification.isRead && onMarkRead(notification._id)}
    >
      <Icon className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm text-white/80 font-medium">{notification.title}</span>
          {!notification.isRead && <div className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0 mt-1" />}
        </div>
        <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notification.message}</p>
        <div className="text-[10px] text-white/30 mt-1">
          {new Date(notification.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
