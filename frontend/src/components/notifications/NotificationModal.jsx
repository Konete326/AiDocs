import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BellOff, X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import NotificationItem from './NotificationItem';

const NotificationModal = ({ isOpen, notifications, onMarkRead, onMarkAllRead, onDelete, isLoading, onClose }) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 md:p-6" style={{ width: '100vw', height: '100vh' }}>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="bg-black/95 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col">
              
              {/* Header */}
              <div className="flex flex-col gap-4 px-6 py-6 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Notifications</h2>
                    {unreadCount > 0 && (
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-lg uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white cursor-pointer active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="w-fit text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-all border border-white/5 cursor-pointer uppercase tracking-widest"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Content Area */}
              <div className="overflow-y-auto max-h-[60vh] p-5 custom-scrollbar px-2 mr-2">
                {isLoading ? (
                  <div className="py-12 flex justify-center">
                    <LoadingSpinner size="md" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <BellOff className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-white/60 font-medium">You're all caught up!</p>
                    <p className="text-white/40 text-sm mt-1">No new notifications right now.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {notifications.map((n) => (
                      <div key={n._id} className="bg-white/5 rounded-2xl p-0.5 border border-white/5 overflow-hidden">
                        <NotificationItem notification={n} onMarkRead={onMarkRead} onDelete={onDelete} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return null;
};

export default NotificationModal;
