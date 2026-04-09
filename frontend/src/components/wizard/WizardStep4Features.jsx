export default function WizardStep4Features({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Core Features</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.coreFeatures}
          onChange={(e) => onChange('wizardAnswers.coreFeatures', e.target.value)}
          placeholder="user auth, dashboard, AI generation, payments..."
          rows={6}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
      <p className="text-xs text-white/30 uppercase tracking-[0.1em]">Separate features with commas for better generation</p>
    </div>
  );
}
