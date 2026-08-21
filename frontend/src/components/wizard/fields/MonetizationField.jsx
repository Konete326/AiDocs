import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function MonetizationField({ formData, onChange }) {
  const { suggestions, isLoading, refresh } = useSuggestions(
    formData.title,
    formData.projectType,
    'monetizationModel',
    formData.wizardAnswers.monetizationModel,
    formData.wizardAnswers
  );

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Monetization & Scale</label>
        <SuggestionPills
          suggestions={suggestions}
          isLoading={isLoading}
          onSelect={(s) => onChange('wizardAnswers.monetizationModel', s)}
          fieldName="monetization"
          onRefresh={refresh}
        />
      </div>
      <div className="neumorphic-input-wrapper rounded-xl px-4 py-2.5 w-full">
        <textarea 
          value={formData.wizardAnswers.monetizationModel}
          onChange={(e) => onChange('wizardAnswers.monetizationModel', e.target.value)}
          placeholder="SaaS subscription, one-time payment, ads, open source..."
          rows={1}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-xs resize-none"
        />
      </div>
    </div>
  );
}
