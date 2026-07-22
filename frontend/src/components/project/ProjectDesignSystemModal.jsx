import React from "react";
import { X } from "lucide-react";
import { DesignSystemSelector } from "../design/DesignSystemSelector";
import { updateProject } from "../../services/projectService";

export default function ProjectDesignSystemModal({ isOpen, onClose, project, onProjectUpdated }) {
  if (!isOpen || !project) return null;

  const handleSelectTheme = async (preset) => {
    try {
      const updated = await updateProject(project._id, {
        designSystem: {
          id: preset.id,
          name: preset.name,
          prompt: preset.prompt,
          tokens: preset.tokens
        }
      });
      if (onProjectUpdated) onProjectUpdated(updated);
    } catch (err) {
      console.error("Failed to update design system theme:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Project Design System Presets</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select or copy prompt presets for {project.title}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          <DesignSystemSelector
            selectedPresetId={project.designSystem?.id || "monochrome"}
            onSelectPreset={handleSelectTheme}
          />
        </div>
      </div>
    </div>
  );
}
