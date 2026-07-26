import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function ContextField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'additionalContext',
    formData.wizardAnswers.additionalContext,
    formData.wizardAnswers
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold block mb-2">Additional Context</label>
      <div className="neumorphic-inset rounded-2xl px-4 py-3 w-full bg-[#E0E5EC] border border-black/5">
        <textarea 
          value={formData.wizardAnswers.additionalContext}
          onChange={(e) => onChange('wizardAnswers.additionalContext', e.target.value)}
          placeholder="Any other specific details, design preferences or constraints..."
          rows={2}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-sm resize-none"
        />
      </div>
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.additionalContext', s)}
        fieldName="context"
      />
    </div>
  );
}
