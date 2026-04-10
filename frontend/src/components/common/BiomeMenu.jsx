import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import BiomeMenuItems from './BiomeMenuItems';

const BiomeMenu = ({
  isOpen, onClose,
  sidebarTitle = 'SwiftDocs AI',
  sidebarDescription = 'The next generation of AI-powered technical documentation.',
  items = [],
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-4 sm:pt-8 md:pt-24 px-2 sm:px-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-[101] w-full max-w-[95vw] md:max-w-[700px] h-auto max-h-[90vh] md:h-[400px] flex flex-col md:flex-row overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl bg-black/90 border-t border-l border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="relative overflow-hidden p-6 md:p-8 flex flex-col justify-between w-full md:w-[35%] shrink-0 bg-white/[0.03]">
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[80px] opacity-20 bg-white" />
              <div className="relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl font-medium italic mb-2 md:mb-3 text-white tracking-tight">
                  {sidebarTitle}
                </h3>
                <p className="text-xs md:text-sm text-white/40 leading-relaxed font-medium">
                  {sidebarDescription}
                </p>
              </div>
              <div className="relative z-10 mt-4 md:mt-auto hidden md:block">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                  <ArrowUpRight className="text-white/60 w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>

            <BiomeMenuItems items={items} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BiomeMenu;
