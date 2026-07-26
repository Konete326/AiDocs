import React from "react";
import { DESIGN_PRESETS } from "../../../constants/designSystemPresets";
import { Palette, Check } from "lucide-react";

export default function DesignSystemField({ formData, onChange }) {
  const currentThemeId = formData.designSystem?.id || "monochrome";

  const handleSelectTheme = (preset) => {
    onChange("designSystem", {
      id: preset.id,
      name: preset.name,
      prompt: preset.prompt,
      tokens: preset.tokens
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-2">
        <Palette size={14} className="text-[#6C63FF]" />
        <span>Design System Theme Template</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {DESIGN_PRESETS.map((preset) => {
          const isSelected = currentThemeId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectTheme(preset)}
              disabled={!preset.isAvailable}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-md"
                  : preset.isAvailable
                  ? "neumorphic-card bg-[#E0E5EC] border-black/5 text-[#3D4852] hover:border-[#6C63FF]/40"
                  : "bg-[#E0E5EC]/50 border-black/5 text-[#9CA3AF] opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-serif">{preset.name}</span>
                {isSelected && <Check size={14} className="text-white" />}
                {!preset.isAvailable && <span className="text-[9px] bg-slate-300 px-1 py-0.5 rounded text-slate-700 font-bold">Soon</span>}
              </div>
              <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-white/90' : 'text-[#6B7280]'}`}>{preset.tagline}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
