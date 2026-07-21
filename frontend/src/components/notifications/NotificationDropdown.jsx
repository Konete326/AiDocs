import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellOff, CheckCheck } from 'lucide-react';
import { Separator } from '../ui/separator';
import NotificationItem from './NotificationItem';
import LoadingSpinner from '../common/LoadingSpinner';

export default function NotificationDropdown({ isOpen, notifications = [], onMarkRead, onMarkAllRead, onDelete, isLoading, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const unreadCount = (notifications || []).filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 top-12 z-[200] w-80 sm:w-96 liquid-glass-strong no-hover rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
        >
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span style={{ color: '#34d399' }} className="bg-emerald-500/25 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                className="text-[11px] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3 h-3 text-white/70" /> Mark all read
              </button>
            )}
          </div>

          <Separator className="mb-2" />

          {isLoading ? (
            <div className="py-8 flex justify-center">
              <LoadingSpinner size="sm" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center">
              <BellOff className="w-6 h-6 text-white/20 mx-auto mb-1.5" />
              <p className="text-xs text-white/50 font-medium">All caught up!</p>
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto pr-1 space-y-1 hover-scrollbar custom-scrollbar">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
