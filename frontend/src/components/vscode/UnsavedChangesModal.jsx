import { AlertTriangle, LogOut } from 'lucide-react';

export default function UnsavedChangesModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#E0E5EC] rounded-[28px] p-6 max-w-md w-full shadow-[12px_12px_24px_rgba(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-[#A3B1C6]/30 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-amber-200 flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#3D4852]">Unsaved Workspace Edits</h3>
            <p className="text-xs text-[#6B7280]">VS Code Session Exit Confirmation</p>
          </div>
        </div>

        <p className="text-xs text-[#3D4852] font-medium bg-[#E0E5EC] p-3.5 rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20 leading-relaxed">
          You may have unsaved changes in your VS Code workspace. Are you sure you want to exit?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#3D4852] bg-[#E0E5EC] hover:bg-white/50 shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20 cursor-pointer active:scale-95 transition-all"
          >
            Stay & Keep Editing
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-[4px_4px_10px_rgba(37,99,235,0.35)] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Editor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
