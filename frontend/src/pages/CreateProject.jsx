import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject, triggerGeneration } from '../services/projectService';
import {
  WizardShell, WizardStep1Basics, WizardStep2Problem, WizardStep3Audience,
  WizardStep4Features, WizardStep5Tech, WizardStep6Monetize, WizardStep7Final
} from '../components/wizard';

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '', projectType: '',
    wizardAnswers: { problemStatement: '', targetAudience: '', coreFeatures: '', techPreferences: '', monetizationModel: '', additionalContext: '' }
  });

  const handleChange = (f, v) => {
    if (f.startsWith('wizardAnswers.')) {
      setFormData(p => ({ ...p, wizardAnswers: { ...p.wizardAnswers, [f.split('.')[1]]: v } }));
    } else setFormData(p => ({ ...p, [f]: v }));
  };

  const validateAndNext = () => {
    const cur = step === 1 ? formData.title : Object.values(formData.wizardAnswers)[step - 2];
    if ((step === 1 && (!formData.title || !formData.projectType)) || (step > 1 && step < 6 && !cur)) {
      setError('Please fill in the required field before continuing.'); return;
    }
    setError(''); setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const featArr = formData.wizardAnswers.coreFeatures.split(',').map(f => f.trim()).filter(Boolean);
      const proj = await createProject({ ...formData, wizardAnswers: { ...formData.wizardAnswers, coreFeatures: featArr } });
      await triggerGeneration(proj._id);
      navigate(`/projects/${proj._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Generation trigger failed');
      setIsSubmitting(false);
    }
  };

  const steps = {
    1: <WizardStep1Basics formData={formData} onChange={handleChange} />,
    2: <WizardStep2Problem formData={formData} onChange={handleChange} />,
    3: <WizardStep3Audience formData={formData} onChange={handleChange} />,
    4: <WizardStep4Features formData={formData} onChange={handleChange} />,
    5: <WizardStep5Tech formData={formData} onChange={handleChange} />,
    6: <WizardStep6Monetize formData={formData} onChange={handleChange} />,
    7: <WizardStep7Final formData={formData} onChange={handleChange} />
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-black">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" />
      <WizardShell 
        step={step} totalSteps={7} 
        onNext={validateAndNext} onBack={() => { setError(''); setStep(s => s - 1); }} 
        onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error}
      >
        {steps[step]}
      </WizardShell>
    </div>
  );
};

export default CreateProject;
