import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function TitleField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'title',
    formData.title
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Project Title</label>
      <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
        <input 
          value={formData.title} 
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="e.g. AI-powered invoice generator"
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm"
        />
      </div>
      <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
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
