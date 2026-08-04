import { useSuggestions } from '../../hooks/useSuggestions';
import SuggestionPills from './SuggestionPills';
import VoiceMicButton from '../common/VoiceMicButton';

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
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold">Target Audience</label>
          <VoiceMicButton
            currentValue={formData.wizardAnswers.targetAudience}
            onTranscript={(text) => onChange('wizardAnswers.targetAudience', text)}
          />
        </div>
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.targetAudience}
            onChange={(e) => onChange('wizardAnswers.targetAudience', e.target.value)}
            placeholder="Who are your users? Seniors, tech-savvy teens, SMEs? (Click mic to speak)"
            rows={2}
            className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-sm resize-none"
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
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold">Core Features (MVP)</label>
          <VoiceMicButton
            currentValue={formData.wizardAnswers.coreFeatures}
            onTranscript={(text) => onChange('wizardAnswers.coreFeatures', text)}
          />
        </div>
        <div className="neumorphic-input-wrapper rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.coreFeatures}
            onChange={(e) => onChange('wizardAnswers.coreFeatures', e.target.value)}
            placeholder="user auth, searchable dashboard, CSV export... (Click mic to speak)"
            rows={2}
            className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-sm resize-none"
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
