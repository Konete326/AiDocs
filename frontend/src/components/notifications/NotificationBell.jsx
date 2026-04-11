import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../../services/notificationService';
import NotificationModal from './NotificationModal';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        if (active) setNotifications(data || []);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetchNotifications();

    const handleRefresh = () => {
      fetchNotifications();
    };
    window.addEventListener('notificationRefresh', handleRefresh);
    
    return () => {
      active = false;
      window.removeEventListener('notificationRefresh', handleRefresh);
    };
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to delete notification', err);
    }
  };

  const unreadCount = (notifications || []).filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center relative hover:scale-105 transition-transform cursor-pointer border-none outline-none"
      >
        <Bell className="w-4 h-4 text-white/70" />
        {unreadCount > 0 && (
          <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        )}
      </button>

      <NotificationModal 
        isOpen={isOpen}
        notifications={notifications} 
        onMarkRead={handleMarkRead} 
        onMarkAllRead={handleMarkAllRead}
        onDelete={handleDelete}
        isLoading={isLoading} 
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default NotificationBell;
