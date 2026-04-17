import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

export default function TechField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'techPreferences',
    formData.wizardAnswers.techPreferences
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Tech Preferences</label>
      <div className="liquid-glass rounded-xl px-4 py-3 w-full">
        <textarea 
          value={formData.wizardAnswers.techPreferences}
          onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
          placeholder="e.g. MERN stack, Next.js, Python, AWS, Supabase..."
          rows={2}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>
      <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
        <span>💡</span> Tip: Leave blank if you want the AI to recommend the optimal stack.
      </p>
      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.techPreferences', s)}
        fieldName="tech"
      />
    </div>
  );
}
