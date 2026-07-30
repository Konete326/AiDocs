import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { createProject, triggerGeneration } from '../services/projectService';
import { showError } from '../utils/toast';
import {
  WizardShell, WizardStep1Identity, WizardStep2Requirements,
  WizardStep3Tech, WizardStep4Review
} from '../components/wizard';

const DRAFT_STORAGE_KEY = 'draft_wizard_state';

const defaultFormData = {
  title: '',
  projectType: 'saas',
  wizardAnswers: {
    problemStatement: '',
    targetAudience: '',
    coreFeatures: '',
    techPreferences: '',
    monetizationModel: '',
    additionalContext: ''
  }
};

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [savedDraftInfo, setSavedDraftInfo] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const hasContent = parsed.formData?.title || parsed.formData?.wizardAnswers?.problemStatement;
        if (hasContent) {
          setSavedDraftInfo(parsed);
          setShowRestorePrompt(true);
        }
      }
    } catch {}
  }, []);

  const handleRestoreDraft = () => {
    if (savedDraftInfo?.formData) {
      setFormData(savedDraftInfo.formData);
      if (savedDraftInfo.step) setStep(savedDraftInfo.step);
    }
    setShowRestorePrompt(false);
  };

  const handleStartFresh = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setFormData(defaultFormData);
    setStep(1);
    setShowRestorePrompt(false);
  };

  useEffect(() => {
    if (!showRestorePrompt && (formData.title || formData.wizardAnswers?.problemStatement)) {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
        formData,
        step,
        updatedAt: new Date().toISOString()
      }));
    }
  }, [formData, step, showRestorePrompt]);

  const handleChange = (f, v) => {
    if (f.startsWith('wizardAnswers.')) {
      setFormData(p => ({ ...p, wizardAnswers: { ...p.wizardAnswers, [f.split('.')[1]]: v } }));
    } else setFormData(p => ({ ...p, [f]: v }));
  };

  const validateAndNext = () => {
    if (step === 1 && (!formData.title || !formData.wizardAnswers.problemStatement)) {
      const msg = 'Title and Problem Statement are required.';
      showError('Required Field', msg);
      setError(msg);
      return;
    }
    if (step === 2 && (!formData.wizardAnswers.targetAudience || !formData.wizardAnswers.coreFeatures)) {
      const msg = 'Audience and Features are required to build your docs.';
      showError('Required Field', msg);
      setError(msg);
      return;
    }
    setError(''); setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const rawFeat = formData.wizardAnswers?.coreFeatures;
      const featArr = Array.isArray(rawFeat)
        ? rawFeat
        : (typeof rawFeat === 'string' ? rawFeat.split(',').map(f => f.trim()).filter(Boolean) : []);
      const proj = await createProject({ ...formData, wizardAnswers: { ...formData.wizardAnswers, coreFeatures: featArr } });
      await triggerGeneration(proj._id);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(`/projects/${proj._id}`);
    } catch (err) {
      const msg = err.response?.data?.error;
      setError(typeof msg === 'string' ? msg : msg?.message || 'Generation failed');
      setIsSubmitting(false);
    }
  };

  const steps = {
    1: <WizardStep1Identity formData={formData} onChange={handleChange} />,
    2: <WizardStep2Requirements formData={formData} onChange={handleChange} />,
    3: <WizardStep3Tech formData={formData} onChange={handleChange} />,
    4: <WizardStep4Review formData={formData} />
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-6 px-4">
      <div className="fixed inset-0 bg-black/55 z-[1]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">
        {showRestorePrompt && (
          <div className="w-full mb-4 p-4 rounded-2xl neumorphic-card bg-[#E0E5EC] flex flex-wrap items-center justify-between gap-3 border border-[#6C63FF]/40 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#6C63FF]/15 flex items-center justify-center text-[#6C63FF]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#3D4852]">
                  Unsaved Draft Found: &ldquo;{savedDraftInfo?.formData?.title || 'Untitled Project'}&rdquo; (Step {savedDraftInfo?.step || 1})
                </p>
                <p className="text-[11px] text-[#6B7280] font-medium">
                  Would you like to restore your saved inputs or start with a blank form?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartFresh}
                className="neumorphic-btn rounded-xl px-4 py-2 text-xs text-[#6B7280] font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                Start Fresh
              </button>
              <button
                onClick={handleRestoreDraft}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-5 py-2 text-xs font-extrabold shadow-[4px_4px_10px_rgba(108,99,255,0.35)] hover:scale-105 transition-transform cursor-pointer border-none"
              >
                Restore Draft
              </button>
            </div>
          </div>
        )}

        <WizardShell 
          step={step} totalSteps={4} 
          onNext={validateAndNext} 
          onBack={() => { setError(''); setStep(s => s - 1); }} 
          onClose={() => {
            localStorage.removeItem(DRAFT_STORAGE_KEY);
            navigate('/dashboard');
          }}
          onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} onClearError={() => setError('')}
        >
          {steps[step]}
        </WizardShell>
      </div>
    </div>
  );
};

export default CreateProject;
