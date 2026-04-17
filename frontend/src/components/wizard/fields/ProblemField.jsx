import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function ProblemField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'problemStatement',
    formData.wizardAnswers.problemStatement
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Problem Statement</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.problemStatement}
          onChange={(e) => onChange('wizardAnswers.problemStatement', e.target.value)}
          placeholder="What gap in the market are you filling? What is the main pain point?"
          rows={4}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
          <span>💡</span> Tip: Clearly define the frustration you are solving.
        </p>
        <p className="text-[10px] text-white/20 italic leading-relaxed">
          Ex: "Freelancers struggle to track unpaid invoices across multiple platforms, leading to lost revenue."
        </p>
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
