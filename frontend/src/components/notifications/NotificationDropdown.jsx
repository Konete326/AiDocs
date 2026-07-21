import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellOff, CheckCheck } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import NotificationItem from './NotificationItem';
import LoadingSpinner from '../common/LoadingSpinner';

const getDateGroup = (createdAt) => {
  if (!createdAt) return 'Today';
  const date = new Date(createdAt);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 24 && date.getDate() === now.getDate()) return 'Today';
  if (diffDays < 2) return 'Yesterday';
  if (diffDays < 7) return 'This Week';
  if (diffDays < 14) return 'Last Week';
  return 'Older';
};

const dateGroupOrder = ["Today", "Yesterday", "This Week", "Last Week", "Older"];

const groupNotifications = (list) => {
  const grouped = {};
  (list || []).forEach(n => {
    const group = getDateGroup(n.createdAt);
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(n);
  });
  return grouped;
};

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
  const grouped = groupNotifications(notifications);
  const activeGroups = dateGroupOrder.filter(g => grouped[g] && grouped[g].length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.12 }}
          className="absolute right-0 top-12 z-[200] w-80 sm:w-96 liquid-glass-strong rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
        >
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-[11px] text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3 h-3" /> Mark all read
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
            <div className="max-h-72 overflow-y-auto pr-1 space-y-3 hover-scrollbar custom-scrollbar">
              {activeGroups.map((group) => (
                <div key={group} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#38B2AC] sticky top-0 bg-black/90 backdrop-blur-md px-2 py-1 rounded-md z-10 border border-white/10 my-1">
                    {group}
                  </div>
                  {grouped[group].map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                      onMarkRead={onMarkRead}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
