import { useState, useEffect, useRef } from 'react';
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
  const submittingRef = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const isExpired = parsed.expiresAt && new Date(parsed.expiresAt) < new Date();
        if (isExpired) {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        } else {
          const hasContent = parsed.formData?.title || parsed.formData?.wizardAnswers?.problemStatement;
          if (hasContent) {
            setSavedDraftInfo(parsed);
            setShowRestorePrompt(true);
          }
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = 'Document generation in progress, are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitting]);

  const handleRestoreDraft = () => {
    if (savedDraftInfo?.formData) {
      setFormData(prev => ({
        ...defaultFormData,
        ...savedDraftInfo.formData,
        wizardAnswers: {
          ...defaultFormData.wizardAnswers,
          ...(savedDraftInfo.formData.wizardAnswers || {})
        }
      }));
      if (savedDraftInfo.step && savedDraftInfo.step >= 1 && savedDraftInfo.step <= 4) {
        setStep(savedDraftInfo.step);
      }
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
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
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
    if (submittingRef.current || isSubmitting) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const rawFeat = formData.wizardAnswers?.coreFeatures;
      const featArr = Array.isArray(rawFeat)
        ? rawFeat
        : (typeof rawFeat === 'string' ? rawFeat.split(',').map(f => f.trim()).filter(Boolean) : []);
      const proj = await createProject({ ...formData, wizardAnswers: { ...formData.wizardAnswers, coreFeatures: featArr } });
      localStorage.setItem('clarifyai_active_generation', JSON.stringify({
        projectId: proj._id,
        title: proj.title,
        startedAt: Date.now()
      }));
      await triggerGeneration(proj._id);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      navigate(`/projects/${proj._id}`);
    } catch (err) {
      setTimeout(() => {
        submittingRef.current = false;
        setIsSubmitting(false);
      }, 1500);
      const msg = err.response?.data?.error;
      setError(typeof msg === 'string' ? msg : msg?.message || 'Generation failed');
    }
  };

  const steps = {
    1: <WizardStep1Identity formData={formData} onChange={handleChange} />,
    2: <WizardStep2Requirements formData={formData} onChange={handleChange} />,
    3: <WizardStep3Tech formData={formData} onChange={handleChange} />,
    4: <WizardStep4Review formData={formData} />
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-12 md:pt-14 pb-3 px-3 bg-[#E0E5EC]">
      <div className="fixed inset-0 bg-[#E0E5EC]/85 backdrop-blur-md z-[1]" />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">
        {showRestorePrompt && (
          <div className="w-full mb-2.5 p-2.5 px-4 rounded-2xl neumorphic-card bg-[#E0E5EC] flex flex-wrap items-center justify-between gap-2 border border-[#6C63FF]/30 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#6C63FF]/15 flex items-center justify-center text-[#6C63FF] shrink-0">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#3D4852] truncate">
                  Unsaved Draft: &ldquo;{savedDraftInfo?.formData?.title || 'Untitled Project'}&rdquo; (Step {savedDraftInfo?.step || 1})
                </p>
                <p className="text-[10px] text-[#6B7280] font-medium truncate">
                  Restore saved inputs or start with a blank form?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleStartFresh}
                className="neumorphic-btn rounded-xl px-3 py-1 text-xs text-[#6B7280] font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                Start Fresh
              </button>
              <button
                onClick={handleRestoreDraft}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-3.5 py-1 text-xs font-extrabold shadow-sm hover:scale-105 transition-transform cursor-pointer border-none"
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
