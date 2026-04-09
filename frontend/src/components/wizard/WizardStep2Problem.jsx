export default function WizardStep2Problem({ formData, onChange }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Problem Statement</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.problemStatement}
          onChange={(e) => onChange('wizardAnswers.problemStatement', e.target.value)}
          placeholder="Describe the core problem your product solves..."
          rows={6}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
    </div>
  );
}
