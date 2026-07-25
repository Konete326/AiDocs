import { useSuggestions } from '../../hooks/useSuggestions';
import SuggestionPills from './SuggestionPills';

export default function WizardStep2Requirements({ formData, onChange }) {
  const { suggestions: audSugg, isLoading: audLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'targetAudience',
    formData.wizardAnswers.targetAudience,
    formData.wizardAnswers
  );

  const { suggestions: featSugg, isLoading: featLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'coreFeatures',
    formData.wizardAnswers.coreFeatures,
    formData.wizardAnswers
  );

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-1.5">Target Audience</label>
        <div className="liquid-glass rounded-xl px-4 py-2.5 w-full">
          <textarea 
            value={formData.wizardAnswers.targetAudience}
            onChange={(e) => onChange('wizardAnswers.targetAudience', e.target.value)}
            placeholder="Who are your users? Seniors, tech-savvy teens, SMEs?"
            rows={2}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <SuggestionPills
          suggestions={audSugg}
          isLoading={audLoading}
          onSelect={(s) => onChange('wizardAnswers.targetAudience', s)}
          fieldName="audience"
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-1.5">Core Features (MVP)</label>
        <div className="liquid-glass rounded-xl px-4 py-2.5 w-full">
          <textarea 
            value={formData.wizardAnswers.coreFeatures}
            onChange={(e) => onChange('wizardAnswers.coreFeatures', e.target.value)}
            placeholder="user auth, searchable dashboard, CSV export..."
            rows={2}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <SuggestionPills
          suggestions={featSugg}
          isLoading={featLoading}
          onSelect={(s) => onChange('wizardAnswers.coreFeatures', s)}
          fieldName="features"
        />
      </div>
    </div>
  );
}
