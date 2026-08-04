import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function TitleField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'title',
    formData.title,
    formData.wizardAnswers
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold block mb-1.5">Project Title</label>
      <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 flex items-center gap-3">
        <input 
          value={formData.title} 
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="e.g. AI-powered invoice generator"
          className="bg-transparent text-[#3D4852] font-bold placeholder:text-[#9CA3AF] outline-none w-full text-sm"
        />
      </div>
      <p className="mt-1.5 text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">
        Give your idea a working name. You can change it later.
      </p>
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('title', s)}
        fieldName="title"
      />
    </div>
  );
}
