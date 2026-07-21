import { CheckCircle, AlertCircle, Sparkles, Clock, Bell, Shield, Trash2 } from 'lucide-react';

const icons = {
  doc_ready: CheckCircle,
  generation_failed: AlertCircle,
  plan_upgraded: Sparkles,
  milestone_due: Clock,
  system: Bell,
  security: Shield
};

const colors = {
  doc_ready: 'text-emerald-400',
  generation_failed: 'text-rose-400',
  plan_upgraded: 'text-amber-400',
  milestone_due: 'text-sky-400',
  system: 'text-white/40',
  security: 'text-rose-500'
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
      className={`group relative px-2.5 py-1.5 flex items-start gap-2 transition-all rounded-lg border-b border-white/[0.03] cursor-pointer ${!notification.isRead ? 'bg-white/[0.06] hover:bg-white/[0.09]' : 'hover:bg-white/[0.03]'}`}
      onClick={() => !notification.isRead && onMarkRead(notification._id)}
    >
      <div className={`p-1 rounded-md bg-white/[0.04] ${colorClass} mt-0.5 flex-shrink-0`}>
        <Icon className="w-3 h-3" />
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center justify-between gap-1">
          <span className={`text-[11px] font-semibold truncate ${!notification.isRead ? 'text-white' : 'text-white/60'}`}>
            {notification.title}
          </span>
          {!notification.isRead && (
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] flex-shrink-0" />
          )}
        </div>
        <p className="text-[10px] text-white/50 leading-tight line-clamp-1 mt-0.5">
          {notification.message}
        </p>
        <div className="text-[8.5px] text-white/40 font-medium tracking-tight mt-0.5">
          {new Date(notification.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 transition-all cursor-pointer"
        aria-label="Delete notification"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};

export default NotificationItem;
