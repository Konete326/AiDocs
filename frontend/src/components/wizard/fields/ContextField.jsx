import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function ContextField({ formData, onChange }) {
  const { suggestions, isLoading, refresh } = useSuggestions(
    formData.title,
    formData.projectType,
    'additionalContext',
    formData.wizardAnswers.additionalContext,
    formData.wizardAnswers
  );

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Additional Context</label>
        <SuggestionPills
          suggestions={suggestions}
          isLoading={isLoading}
          onSelect={(s) => onChange('wizardAnswers.additionalContext', s)}
          fieldName="context"
          onRefresh={refresh}
        />
      </div>
      <div className="neumorphic-input-wrapper rounded-xl px-4 py-2.5 w-full">
        <textarea 
          value={formData.wizardAnswers.additionalContext}
          onChange={(e) => onChange('wizardAnswers.additionalContext', e.target.value)}
          placeholder="Any other specific details, design preferences or constraints..."
          rows={1}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-xs resize-none"
        />
      </div>
    </div>
  );
}
