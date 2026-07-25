import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Star, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import AlertModal from '../common/AlertModal';
import { useAlertModal } from '../../hooks/useModal';

const FeedbackModal = ({ isOpen, onClose, onSuccess }) => {
  const { user, isAuthenticated } = useAuth();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modal: alertModal, alert: triggerAlert, close: closeAlert } = useAlertModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please login to submit feedback');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/feedback', 
        { content, rating }
      );

      triggerAlert({
        title: 'Feedback Received!',
        message: 'Thank you for your valuable feedback! We appreciate your support in making AiDocs better.',
        buttonLabel: 'Awesome'
      });
      
      window.dispatchEvent(new Event('notificationRefresh'));
      onSuccess(response.data.data);
      setContent('');
      // We don't call onClose() immediately so user sees the AlertModal
    } catch (error) {
      console.error('Feedback error:', error);
      toast.error(error.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg liquid-glass-strong rounded-[2.5rem] p-8 border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">Your <span className="font-serif italic text-white/80">Feedback</span></h2>
                <p className="text-white/40 text-sm mt-1">Help us build the space you need.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-all cursor-pointer ${rating >= star ? 'text-yellow-400 scale-110' : 'text-white/20 hover:text-white/40'}`}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell us what you think about AiDocs..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm leading-relaxed"
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-4 text-[10px] text-white/20 tracking-widest font-bold uppercase">
                  {content.length}/500
                </div>
              </div>

              {!isAuthenticated && (
                <div className="flex items-center gap-2 p-3 bg-red-400/5 border border-red-400/10 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-400/50" />
                  <p className="text-xs text-red-400/60 font-medium">
                    Please <Link to="/login" className="underline hover:text-red-400 transition-colors">login</Link> to share your feedback.
                  </p>
                </div>
              )}

              <Button 
                type="submit"
                variant="strong" 
                className="w-full flex items-center justify-center gap-3 py-4 shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !content.trim() || !isAuthenticated}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Global Review</span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
      <AlertModal 
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        buttonLabel={alertModal.buttonLabel}
        onClose={() => {
          closeAlert();
          onClose(); // Now close the feedback modal too
        }}
      />
    </AnimatePresence>
  );
};

export default FeedbackModal;
