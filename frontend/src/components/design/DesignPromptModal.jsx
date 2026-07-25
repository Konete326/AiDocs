import React, { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";

export const DesignPromptModal = ({ isOpen, onClose, preset }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !preset) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(preset.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 pb-8 px-4 overflow-y-auto">
      <div onClick={(e) => e.stopPropagation()} className="liquid-glass-strong rounded-3xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden my-auto shadow-2xl relative z-10">
        <div className="flex items-center justify-between p-5 shadow-[0_2px_6px_rgba(163,177,198,0.3)]">
          <div>
            <h2 className="text-xl font-bold text-[#3D4852] flex items-center gap-2.5">
              <span>{preset.name} Design System Prompt</span>
              <span className="text-xs liquid-glass text-[#38B2AC] px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold">
                {preset.mode}
              </span>
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">{preset.tagline}</p>
          </div>
          <button onClick={onClose} className="p-2 liquid-glass text-[#3D4852] hover:scale-105 rounded-xl transition-transform cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-[#3D4852] liquid-glass leading-relaxed whitespace-pre-wrap select-text custom-scrollbar my-3 mx-5 rounded-2xl shadow-[inset_2px_2px_6px_rgba(163,177,198,0.4)]">
          {preset.prompt || "Prompt coming soon for this preset!"}
        </div>
        <div className="p-4 flex flex-wrap items-center justify-between gap-3 shadow-[0_-2px_6px_rgba(163,177,198,0.3)]">
          <span className="text-xs text-[#6B7280]">Copy this prompt into any AI agent (Claude, Cursor, etc.)</span>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
              Close
            </button>
            <button onClick={handleCopy} className="px-5 py-2.5 liquid-glass-strong text-[#38B2AC] hover:scale-105 rounded-xl font-semibold text-xs flex items-center gap-2 cursor-pointer transition-transform">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Prompt"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
