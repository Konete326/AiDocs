import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectPolling } from "../hooks/useProjectPolling";
import { updateProject } from "../services/projectService";
import { DesignSystemSelector } from "../components/design/DesignSystemSelector";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { ArrowLeft, Palette } from "lucide-react";

const ProjectDesignSystemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { project, setProject, isLoading, error } = useProjectPolling(id);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center relative z-10"><LoadingSpinner /></div>;
  if (error || !project) return <div className="min-h-screen flex items-center justify-center text-[#6B7280] relative z-10">{error || "Project not found"}</div>;

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
      setProject(updated);
    } catch (err) {
      console.error("Failed to update design system:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans pt-20 md:pt-22 px-4 pb-2 md:px-6">
      <div className="relative z-10 max-w-7xl mx-auto space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 liquid-glass px-3.5 py-2.5 rounded-2xl">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(`/projects/${project._id}`)} className="p-1.5 liquid-glass text-[#3D4852] hover:scale-105 rounded-xl transition-transform cursor-pointer">
              <ArrowLeft size={15} />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-[#3D4852] tracking-tight">{project.title}</h1>
                <span className="text-[9.5px] liquid-glass text-[#38B2AC] px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  {project.projectType}
                </span>
              </div>
              <p className="text-[10.5px] text-[#6B7280]">Design System Presets & Live Interactive Preview Studio</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-[#38B2AC] liquid-glass px-3 py-1 rounded-xl font-mono font-bold">
            <Palette size={13} className="text-[#38B2AC]" />
            <span>Active: {project.designSystem?.name || "Monochrome"}</span>
          </div>
        </div>

        <DesignSystemSelector
          selectedPresetId={project.designSystem?.id || "monochrome"}
          onSelectPreset={handleSelectTheme}
        />
      </div>
    </div>
  );
};

export default ProjectDesignSystemPage;

