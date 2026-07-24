import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const McpDeleteModal = ({ isOpen, onClose, onConfirm, deleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121624] border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Revoke MCP API Key</h4>
              <p className="text-xs text-white/40">Action cannot be undone</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 rounded-xl transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">
          Are you sure you want to revoke your MCP API key? Any connected AI agents (Claude Code, Antigravity, Cursor) will immediately lose access to your ClarifyAI project documentation.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl text-xs font-medium text-white/70 hover:bg-white/5 border border-white/10 transition-all cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting} className="px-4 py-2.5 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-500 text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/30">
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Revoking...' : 'Revoke Key'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default McpDeleteModal;
