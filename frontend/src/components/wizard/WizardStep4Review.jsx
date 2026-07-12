export default function WizardStep4Review({ formData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="liquid-glass rounded-2xl p-4 border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Project Overview</h3>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">{formData.title || "Untitled Project"}</p>
            <p className="text-xs text-white/60 capitalize">{formData.projectType || "Type not selected"}</p>
          </div>
        </div>
        
        <div className="liquid-glass rounded-2xl p-4 border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Core Problem</h3>
          <p className="text-xs text-white/70 line-clamp-2 italic leading-relaxed">
            "{formData.wizardAnswers.problemStatement || "No description provided."}"
          </p>
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 border border-white/5 text-center">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">9-Document Suite</h3>
        <p className="text-xs text-white/80 leading-relaxed max-w-lg mx-auto tracking-wide">
          PRD • SRD • TRD • Master Plan • User Stories • API Specs • Schema • Security • Deployment
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-white/5 rounded-xl p-2.5 border border-dashed border-white/10">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-[#6C63FF] rounded-full animate-ping opacity-75" />
          <div className="relative bg-[#6C63FF] h-2 w-2 rounded-full" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
          Generation takes ~2-3 minutes. Don't close the tab.
        </p>
      </div>
    </div>
  );
}
