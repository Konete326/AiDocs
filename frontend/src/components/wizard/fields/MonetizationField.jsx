import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function MonetizationField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'monetizationModel',
    formData.wizardAnswers.monetizationModel
  );

  return (
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
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.monetizationModel', s)}
        fieldName="monetization"
      />
    </div>
  );
}
