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
      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
        <Palette size={14} className="text-indigo-400" />
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
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg"
                  : preset.isAvailable
                  ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  : "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-serif">{preset.name}</span>
                {isSelected && <Check size={14} className="text-indigo-400" />}
                {!preset.isAvailable && <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded">Soon</span>}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2">{preset.tagline}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
