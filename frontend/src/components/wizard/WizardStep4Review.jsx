export default function WizardStep4Review({ formData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="neumorphic-card rounded-2xl p-4 border border-black/5 bg-[#E0E5EC]">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#6C63FF] font-extrabold mb-2">Project Overview</h3>
          <div className="space-y-1">
            <p className="text-sm font-extrabold text-[#3D4852]">{formData.title || "Untitled Project"}</p>
            <p className="text-xs text-[#6B7280] font-bold capitalize">{formData.projectType || "Type not selected"}</p>
          </div>
        </div>
        
        <div className="neumorphic-card rounded-2xl p-4 border border-black/5 bg-[#E0E5EC]">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#6C63FF] font-extrabold mb-2">Core Problem</h3>
          <p className="text-xs text-[#3D4852] font-medium line-clamp-2 italic leading-relaxed">
            "{formData.wizardAnswers.problemStatement || "No description provided."}"
          </p>
        </div>
      </div>

      <div className="neumorphic-card rounded-2xl p-4 border border-black/5 bg-[#E0E5EC] text-center">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#6C63FF] font-extrabold mb-2">9-Document Suite</h3>
        <p className="text-xs text-[#3D4852] font-semibold leading-relaxed max-w-lg mx-auto tracking-wide">
          PRD • SRD • TRD • Master Plan • User Stories • API Specs • Schema • Security • Deployment
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-[#6C63FF]/10 rounded-xl p-2.5 border border-dashed border-[#6C63FF]/30">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-[#6C63FF] rounded-full animate-ping opacity-75" />
          <div className="relative bg-[#6C63FF] h-2 w-2 rounded-full" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6C63FF] font-extrabold">
          Generation takes ~2-3 minutes. Don't close the tab.
        </p>
      </div>
    </div>
  );
}
