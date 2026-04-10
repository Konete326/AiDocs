export default function WizardStep3Tech({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Tech Preferences</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.techPreferences}
            onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
            placeholder="e.g. MERN stack, Next.js, Python, AWS, Supabase..."
            rows={2}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
          <span>💡</span> Tip: Leave blank if you want the AI to recommend the optimal stack.
        </p>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Monetization & Scale</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.monetizationModel}
            onChange={(e) => onChange('wizardAnswers.monetizationModel', e.target.value)}
            placeholder="SaaS subscription, one-time payment, ads, open source..."
            rows={2}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
          How will this project make money? Or is it internal tools?
        </p>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Additional Context</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.additionalContext}
            onChange={(e) => onChange('wizardAnswers.additionalContext', e.target.value)}
            placeholder="Any other specific details, design preferences or constraints..."
            rows={3}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
          Add details about competitors, specific design styles, or future scaling plans.
        </p>
      </div>
    </div>
  );
}
