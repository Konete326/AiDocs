import { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, X, Pencil, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuggestionPills({ suggestions, isLoading, onSelect, fieldName, onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (editingIndex !== null) {
          setEditingIndex(null);
        } else {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, editingIndex]);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setEditingIndex(null);
        }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#E0E5EC] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.6)] border border-white/50 text-[#6C63FF] hover:text-[#5B52EE] text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
        title="View AI Suggestions"
      >
        <Sparkles className="w-3 h-3 text-[#6C63FF]" />
        <span>AI Ideas</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => {
              setIsOpen(false);
              setEditingIndex(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="bg-[#E0E5EC] rounded-[28px] w-full max-w-md p-5 md:p-6 shadow-[14px_14px_28px_rgba(163,177,198,0.7),-14px_-14px_28px_rgba(255,255,255,0.8)] border border-white/70 relative text-left"
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E0E5EC] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center text-[#6C63FF] border border-white/40">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#3D4852]">Smart AI Ideas</h3>
                    <p className="text-[10px] text-[#6B7280] font-medium">Click any idea to use directly</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {onRefresh && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingIndex(null);
                        onRefresh();
                      }}
                      disabled={isLoading}
                      className="p-1.5 rounded-xl bg-[#E0E5EC] text-[#6C63FF] hover:text-[#5B52EE] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer border border-white/40 disabled:opacity-50"
                      title="Generate new ideas"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setEditingIndex(null);
                    }}
                    className="p-1.5 rounded-xl bg-[#E0E5EC] text-[#6B7280] hover:text-[#3D4852] shadow-[2px_2px_5px_rgba(163,177,198,0.5),-2px_-2px_5px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer border border-white/40"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-2.5 py-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] border border-white/30 space-y-2 animate-pulse"
                    >
                      <div className="h-3 bg-[#A3B1C6]/35 rounded-full w-4/5" />
                      <div className="h-2.5 bg-[#A3B1C6]/20 rounded-full w-3/5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[55vh] overflow-y-auto custom-scrollbar pr-1 py-1">
                  {suggestions.map((s, i) => {
                    const isEditingThis = editingIndex === i;

                    if (isEditingThis) {
                      return (
                        <div
                          key={`${fieldName}-${i}`}
                          className="p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.6)] border border-[#6C63FF]/50 space-y-2.5"
                        >
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            className="w-full bg-transparent text-xs font-semibold text-[#3D4852] outline-none resize-none leading-relaxed"
                            autoFocus
                          />
                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#A3B1C6]/20">
                            <button
                              type="button"
                              onClick={() => setEditingIndex(null)}
                              className="px-3 py-1 rounded-xl text-[11px] font-bold text-[#6B7280] hover:text-[#3D4852] bg-[#E0E5EC] shadow-[2px_2px_4px_rgba(163,177,198,0.4),-2px_-2px_4px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (editText.trim()) {
                                  onSelect(editText.trim());
                                  setIsOpen(false);
                                  setEditingIndex(null);
                                }
                              }}
                              className="px-3 py-1 rounded-xl text-[11px] font-extrabold text-white bg-[#6C63FF] hover:bg-[#5B52EE] shadow-[2px_2px_6px_rgba(108,99,255,0.4)] flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Apply Idea</span>
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={`${fieldName}-${i}`}
                        className="w-full p-3.5 rounded-2xl bg-[#E0E5EC] shadow-[3px_3px_6px_rgba(163,177,198,0.45),-3px_-3px_6px_rgba(255,255,255,0.6)] hover:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.6)] text-xs font-semibold text-[#3D4852] transition-all border border-white/40 flex items-center justify-between gap-3 group"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelect(s);
                            setIsOpen(false);
                          }}
                          className="flex-1 text-left cursor-pointer leading-relaxed hover:text-[#6C63FF] transition-colors py-0.5 bg-transparent border-0 outline-none"
                          title="Click to use this idea"
                        >
                          {s}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingIndex(i);
                            setEditText(s);
                          }}
                          className="p-1.5 rounded-xl bg-[#E0E5EC] shadow-[2px_2px_4px_rgba(163,177,198,0.45),-2px_-2px_4px_rgba(255,255,255,0.55)] hover:text-[#6C63FF] text-[#6B7280] active:scale-90 transition-all cursor-pointer border border-white/30 flex-shrink-0"
                          title="Customize this idea"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
