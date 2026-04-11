import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createProject, triggerGeneration } from '../services/projectService';
import {
  WizardShell, WizardStep1Identity, WizardStep2Requirements,
  WizardStep3Tech, WizardStep4Review
} from '../components/wizard';

const STORAGE_KEY = 'aidocs_wizard_draft';

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      title: '', projectType: 'saas',
      wizardAnswers: { problemStatement: '', targetAudience: '', coreFeatures: '', techPreferences: '', monetizationModel: '', additionalContext: '' }
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (f, v) => {
    if (f.startsWith('wizardAnswers.')) {
      setFormData(p => ({ ...p, wizardAnswers: { ...p.wizardAnswers, [f.split('.')[1]]: v } }));
    } else setFormData(p => ({ ...p, [f]: v }));
  };

  const validateAndNext = () => {
    if (step === 1 && (!formData.title || !formData.wizardAnswers.problemStatement)) {
      setError('Title and Problem Statement are required.'); return;
    }
    if (step === 2 && (!formData.wizardAnswers.targetAudience || !formData.wizardAnswers.coreFeatures)) {
      setError('Audience and Features are required to build your docs.'); return;
    }
    setError(''); setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const featArr = formData.wizardAnswers.coreFeatures.split(',').map(f => f.trim()).filter(Boolean);
      const proj = await createProject({ ...formData, wizardAnswers: { ...formData.wizardAnswers, coreFeatures: featArr } });
      await triggerGeneration(proj._id);
      localStorage.removeItem(STORAGE_KEY);
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 p-6 bg-black">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" />
      
      <button 
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          navigate('/dashboard');
        }}
        className="absolute top-8 right-8 z-50 liquid-glass rounded-full p-3 hover:scale-110 transition-transform cursor-pointer text-white/70"
        title="Cancel and go back"
      >
        <X className="w-6 h-6" />
      </button>

      <WizardShell 
        step={step} totalSteps={4} 
        onNext={validateAndNext} onBack={() => { setError(''); setStep(s => s - 1); }} 
        onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error}
      >
        {steps[step]}
      </WizardShell>
    </div>
  );
};

export default CreateProject;
