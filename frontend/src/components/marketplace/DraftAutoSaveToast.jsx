import { useState, useEffect } from 'react';
import { Save, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const DRAFT_KEY = 'clarifyai_component_draft';

const DraftAutoSaveToast = ({ currentData, onRestore }) => {
  const [savedDraft, setSavedDraft] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.html || parsed.css || parsed.title) {
          setSavedDraft(parsed);
          setVisible(true);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentData.title || currentData.html || currentData.css) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(currentData));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentData]);

  const handleRestore = () => {
    if (savedDraft) {
      onRestore(savedDraft);
      toast.success('Draft restored!');
    }
    setVisible(false);
  };

  const handleDiscard = () => {
    localStorage.removeItem(DRAFT_KEY);
    setVisible(false);
    toast.success('Draft discarded.');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#E0E5EC] rounded-[28px] p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-white/60 w-full max-w-md relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-[#E0E5EC] rounded-2xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
            <Save className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#3D4852]">Unsaved Draft Detected</h3>
            <p className="text-xs text-[#6B7280] mt-0.5">Would you like to restore your previously edited component draft?</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleDiscard}
            className="px-4 py-2 bg-[#E0E5EC] text-[#6B7280] hover:text-red-500 text-xs font-bold rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Discard</span>
          </button>
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Restore Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftAutoSaveToast;
