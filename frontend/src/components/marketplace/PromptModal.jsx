import { useState } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PromptModal = ({ rawPrompt, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPrompt || '');
    setCopied(true);
    toast.success('AI Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-lg p-6 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#E0E5EC] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] hover:text-red-500 cursor-pointer"
        >
          <X className="w-4 h-4 text-[#3D4852]" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-[#3D4852]">AI Prompt Specification</h2>
        </div>

        <div className="mb-5">
          <textarea
            rows={7}
            readOnly
            value={rawPrompt || ''}
            className="w-full p-3.5 bg-white/50 rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] border border-white/40 resize-none focus:outline-none leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Prompt Copied!' : 'Copy Prompt'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#E0E5EC] text-[#6B7280] hover:text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
