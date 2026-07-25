import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function ProblemField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'problemStatement',
    formData.wizardAnswers.problemStatement,
    formData.wizardAnswers
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-1.5">Problem Statement</label>
      <div className="liquid-glass rounded-xl px-4 py-2.5 w-full">
        <textarea 
          value={formData.wizardAnswers.problemStatement}
          onChange={(e) => onChange('wizardAnswers.problemStatement', e.target.value)}
          placeholder="What gap in the market are you filling? What is the main pain point?"
          rows={2}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.problemStatement', s)}
        fieldName="problem"
      />
    </div>
  );
}
