import React from "react";
import { DesignSystemSelector } from "./DesignSystemSelector";

export const DesignSystemWorkspaceTab = ({ project, onUpdateProjectTheme }) => {
  const currentThemeId = project?.designSystem?.id || "monochrome";

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Project Design System Template</h2>
          <p className="text-sm text-slate-400 mt-1">
            Select a design system preset for your project. Generated PRD, SRD, and TRD docs will incorporate these visual tokens and guidelines.
          </p>
        </div>
      </div>
      <DesignSystemSelector
        selectedPresetId={currentThemeId}
        onSelectPreset={onUpdateProjectTheme}
      />
    </div>
  );
};
