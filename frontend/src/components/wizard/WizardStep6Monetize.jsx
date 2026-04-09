export default function WizardStep6Monetize({ formData, onChange }) {
  const models = ['Free', 'Freemium', 'Subscription', 'One-time', 'Usage-based', 'Not sure'];
  return (
    <div className="space-y-8">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Monetization Model</label>
        <div className="flex flex-wrap gap-3">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => onChange('wizardAnswers.monetizationModel', model)}
              className={`${
                formData.wizardAnswers.monetizationModel === model ? 'liquid-glass-strong text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'liquid-glass text-white/60'
              } rounded-full px-5 py-2.5 text-sm cursor-pointer hover:scale-105 transition-all active:scale-95`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.monetizationModel}
          onChange={(e) => onChange('wizardAnswers.monetizationModel', e.target.value)}
          placeholder="More details about your pricing strategy..."
          rows={3}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
    </div>
  );
}
