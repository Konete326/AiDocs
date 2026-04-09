export default function WizardStep5Tech({ formData, onChange }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Tech Preferences</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.techPreferences}
          onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
          placeholder="e.g. React, Node.js, MongoDB, or 'no preference'..."
          rows={6}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
    </div>
  );
}
