import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function MonetizationField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'monetizationModel',
    formData.wizardAnswers.monetizationModel,
    formData.wizardAnswers
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold block mb-2">Monetization & Scale</label>
      <div className="neumorphic-inset rounded-2xl px-4 py-3 w-full bg-[#E0E5EC] border border-black/5">
        <textarea 
          value={formData.wizardAnswers.monetizationModel}
          onChange={(e) => onChange('wizardAnswers.monetizationModel', e.target.value)}
          placeholder="SaaS subscription, one-time payment, ads, open source..."
          rows={2}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-sm resize-none"
        />
      </div>
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.monetizationModel', s)}
        fieldName="monetization"
      />
    </div>
  );
}
