const DocIcon = ({ name }) => (
  <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
    <div className="w-2 h-2 rounded-full bg-white/40" />
    <span className="text-[10px] uppercase tracking-widest text-white/60">{name}</span>
  </div>
);

export default function WizardStep4Review({ formData }) {
  const docs = ['PRD', 'SRD', 'TRD', 'Master Plan', 'User Stories', 'API Specs', 'Database Schema', 'Security Audit', 'Deployment Guide'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="liquid-glass rounded-2xl p-5 border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Project Overview</h3>
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">{formData.title || "Untitled Project"}</p>
            <p className="text-xs text-white/60 capitalize">{formData.projectType || "Type not selected"}</p>
          </div>
        </div>
        
        <div className="liquid-glass rounded-2xl p-5 border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Core Problem</h3>
          <p className="text-xs text-white/70 line-clamp-3 italic leading-relaxed">
            "{formData.wizardAnswers.problemStatement || "No description provided."}"
          </p>
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-6 border border-white/5">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 text-center">What You'll Get</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {docs.map(doc => <DocIcon key={doc} name={doc} />)}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 bg-white/5 rounded-xl p-4 border border-dashed border-white/10">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
          <div className="relative bg-white h-2 w-2 rounded-full" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
          Generation takes ~2-3 minutes. Don't close the tab.
        </p>
      </div>
    </div>
  );
}
