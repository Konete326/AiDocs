import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';
import VoiceMicButton from '../../common/VoiceMicButton';

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
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold">Problem Statement</label>
        <VoiceMicButton
          currentValue={formData.wizardAnswers.problemStatement}
          onTranscript={(text) => onChange('wizardAnswers.problemStatement', text)}
        />
      </div>
      <div className="neumorphic-inset rounded-2xl px-4 py-3 w-full bg-[#E0E5EC] border border-black/5">
        <textarea 
          value={formData.wizardAnswers.problemStatement}
          onChange={(e) => onChange('wizardAnswers.problemStatement', e.target.value)}
          placeholder="What gap in the market are you filling? What is the main pain point? (Or click the mic to dictate)"
          rows={3}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-sm resize-none"
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
