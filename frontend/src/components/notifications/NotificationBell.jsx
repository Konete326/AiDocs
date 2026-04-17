import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../../services/notificationService';
import NotificationModal from './NotificationModal';
import { useConfirmModal } from '../../hooks/useModal';
import ConfirmModal from '../common/ConfirmModal';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { modal: confirmModal, confirm, close: closeConfirm, handleConfirm } = useConfirmModal();

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

  const handleDelete = (id) => {
    confirm({
      title: 'Delete Notification',
      message: 'Are you sure you want to remove this notification?',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        try {
          await deleteNotification(id);
          setNotifications(prev => prev.filter(n => n._id !== id));
        } catch (err) {
          console.error('Failed to delete notification', err);
        }
      }
    });
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
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
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

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        cancelLabel={confirmModal.cancelLabel}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
};

export default NotificationBell;
