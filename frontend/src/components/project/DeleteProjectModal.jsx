import { Trash2, X, Loader2 } from 'lucide-react';
import { useState } from 'react';

const DeleteProjectModal = ({ isOpen, onClose, onConfirm, projectTitle }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-[#E0E5EC] rounded-[32px] p-6 max-w-md w-full border border-white/60 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6B7280] hover:text-[#3D4852] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3D4852]">Delete Project</h3>
            <p className="text-xs text-[#6B7280]">Permanent removal</p>
          </div>
        </div>

        <p className="text-sm text-[#3D4852] mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-bold">{projectTitle}</span>? This action cannot be undone and will remove the project and all its documents.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="neumorphic-btn rounded-2xl px-4 py-2 text-xs font-bold text-[#3D4852] cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-rose-600 hover:bg-rose-700 text-white rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Trash2 className="w-4 h-4 text-white" />}
            <span>Delete Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
