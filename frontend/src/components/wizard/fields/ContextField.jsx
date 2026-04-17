import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function ContextField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'additionalContext',
    formData.wizardAnswers.additionalContext
  );

  return (
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
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.additionalContext', s)}
        fieldName="context"
      />
    </div>
  );
}
