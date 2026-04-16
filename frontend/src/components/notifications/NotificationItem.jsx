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
      className={`group relative px-5 py-4 flex items-start gap-4 transition-all rounded-2xl border-b border-white/[0.03] cursor-pointer ${!notification.isRead ? 'bg-white/[0.04] hover:bg-white/[0.06]' : 'hover:bg-white/[0.02]'}`}
      onClick={() => !notification.isRead && onMarkRead(notification._id)}
    >
      <div className={`p-2 rounded-xl bg-white/[0.03] ${colorClass} mt-0.5`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-sm font-medium truncate ${!notification.isRead ? 'text-white' : 'text-white/60'}`}>
            {notification.title}
          </span>
          {!notification.isRead && (
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] flex-shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-white/40 mt-1 leading-relaxed line-clamp-2">
          {notification.message}
        </p>
        <div className="text-[10px] text-white/20 mt-2 font-medium tracking-tight">
          {new Date(notification.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Delete Button - Visible on hover */}
      <button
        onClick={handleDelete}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500 text-white/20 transition-all cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItem;
