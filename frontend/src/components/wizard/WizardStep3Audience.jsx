export default function WizardStep3Audience({ formData, onChange }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Target Audience</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.targetAudience}
          onChange={(e) => onChange('wizardAnswers.targetAudience', e.target.value)}
          placeholder="Who are your users? Roles, pain points, technical level..."
          rows={6}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
    </div>
  );
}
