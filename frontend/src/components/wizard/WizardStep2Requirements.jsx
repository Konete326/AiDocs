export default function WizardStep2Requirements({ formData, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Target Audience</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.targetAudience}
            onChange={(e) => onChange('wizardAnswers.targetAudience', e.target.value)}
            placeholder="Who are your users? Seniors, tech-savvy teens, SMEs?"
            rows={4}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
            <span>💡</span> Tip: Be specific about demographics and daily constraints.
          </p>
          <p className="text-[10px] text-white/20 italic leading-relaxed">
            Ex: "Marketing managers at 10-50 person agencies who need quick reports for clients."
          </p>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Core Features (MVP)</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.coreFeatures}
            onChange={(e) => onChange('wizardAnswers.coreFeatures', e.target.value)}
            placeholder="user auth, searchable dashboard, CSV export..."
            rows={4}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
            <span>💡</span> Tip: Separate with commas. Focus on the core value.
          </p>
          <p className="text-[10px] text-white/20 italic leading-relaxed">
            Ex: "One-click invoice creation, Automated late payment reminders, Stripe integration."
          </p>
        </div>
      </div>
    </div>
  );
}
