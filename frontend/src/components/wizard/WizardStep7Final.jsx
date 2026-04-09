export default function WizardStep7Final({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Additional Context</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.additionalContext}
            onChange={(e) => onChange('wizardAnswers.additionalContext', e.target.value)}
            placeholder="Scale expectations, competitors, or any unique constraints..."
            rows={4}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
      </div>
      <div className="liquid-glass rounded-2xl p-6">
        <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Review Your Project</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3">
            <span className="text-xs text-white/30 uppercase tracking-widest">Project</span>
            <span className="text-sm text-white font-medium">{formData.title || "Untitled"}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3">
            <span className="text-xs text-white/30 uppercase tracking-widest">Type</span>
            <span className="text-sm text-white font-medium capitalize">{formData.projectType || "Not selected"}</span>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3">
            <span className="text-xs text-white/30 uppercase tracking-widest block mb-1">Problem</span>
            <p className="text-sm text-white/70 line-clamp-2">
              {formData.wizardAnswers.problemStatement || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
