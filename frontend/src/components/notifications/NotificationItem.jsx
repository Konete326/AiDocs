import { CheckCircle, AlertCircle, Zap, Clock, Bell, Shield, Trash2 } from 'lucide-react';

const icons = {
  doc_ready: CheckCircle,
  generation_failed: AlertCircle,
  plan_upgraded: Zap,
  milestone_due: Clock,
  system: Bell,
  security: Shield
};

const colors = {
  doc_ready: 'text-emerald-600',
  generation_failed: 'text-rose-500',
  plan_upgraded: 'text-amber-500',
  milestone_due: 'text-sky-500',
  system: 'text-[#6B7280]',
  security: 'text-rose-600'
};

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const Icon = icons[notification.type] || Bell;
  const colorClass = colors[notification.type] || 'text-white/40';

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification._id);
  };

  return (
    <div 
      className={`group relative px-2.5 py-1.5 flex items-start gap-2 transition-all rounded-lg border-b border-[#c4cdd8] cursor-pointer ${!notification.isRead ? 'bg-[#d8dde6] hover:bg-[#cfd5de]' : 'hover:bg-[#d8dde6]'}`}
      onClick={() => !notification.isRead && onMarkRead(notification._id)}
    >
      <div className={`p-1 rounded-md bg-[#c4cdd8] ${colorClass} mt-0.5 flex-shrink-0`}>
        <Icon className="w-3 h-3" />
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center justify-between gap-1">
          <span className={`text-[11px] font-semibold truncate ${!notification.isRead ? 'text-[#3D4852]' : 'text-[#6B7280]'}`}>
            {notification.title}
          </span>
          {!notification.isRead && (
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-[10px] text-[#6B7280] leading-tight line-clamp-1 mt-0.5">
          {notification.message}
        </p>
        <div className="text-[8.5px] text-[#6B7280]/70 font-medium tracking-tight mt-0.5">
          {new Date(notification.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-100 text-[#6B7280] hover:text-rose-500 transition-all cursor-pointer"
        aria-label="Delete notification"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};

export default NotificationItem;
