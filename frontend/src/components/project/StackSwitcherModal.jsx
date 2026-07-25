import { useState } from 'react';
import { X, Layers, Check, Loader2, Sparkles } from 'lucide-react';
import { updateProject, triggerGeneration } from '../../services/projectService';

const STACK_PRESETS = [
  { id: 'nextjs_fullstack', name: 'Next.js 15 Fullstack (App Router)', value: 'Next.js 15 App Router with Server Actions, React 19, and Tailwind CSS v4' },
  { id: 'nextjs_decoupled', name: 'Next.js 15 Decoupled (Frontend + API)', value: 'Next.js 15 App Router Frontend with Decoupled REST API' },
  { id: 'python_fastapi', name: 'Python 3.12+ (FastAPI / Django)', value: 'Python 3.12 FastAPI Async API with Pydantic v2 and SQLAlchemy 2.0' },
  { id: 'dotnet_csharp', name: '.NET 9 (ASP.NET Core Web API)', value: 'C# .NET 9 ASP.NET Core Web API with Clean Architecture & EF Core 9' },
  { id: 'php_laravel', name: 'PHP 8.3 / Laravel 11+ Framework', value: 'PHP 8.3 Laravel 11 API with Eloquent ORM and Form Requests' },
  { id: 'react_spa', name: 'React 19 SPA (Vite 6 + REST)', value: 'React 19 Vite 6 Single Page App with Zustand and Axios' },
  { id: 'mern_stack', name: 'MERN Stack (Node.js v20+ Express)', value: 'Node.js v20 Express REST API with MongoDB Mongoose and React 19' }
];

export default function StackSwitcherModal({ isOpen, onClose, project, onProjectUpdated }) {
  const [selectedPreset, setSelectedPreset] = useState(project?.wizardAnswers?.techPreferences || STACK_PRESETS[0].value);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !project) return null;

  const handleApplyStack = async () => {
    setIsUpdating(true);
    setErrorMsg('');
    try {
      const updatedAnswers = {
        ...(project.wizardAnswers || {}),
        techPreferences: selectedPreset
      };
      const updatedProj = await updateProject(project._id, { wizardAnswers: updatedAnswers });
      await triggerGeneration(project._id, true);
      if (onProjectUpdated) onProjectUpdated(updatedProj);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.error;
      setErrorMsg(typeof msg === 'string' ? msg : 'Failed to update stack profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="liquid-glass-strong rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/[0.02] blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center border border-white/10">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white leading-tight">Switch Target Architecture</h3>
              <p className="text-xs text-white/50">Re-target document blueprints for your stack</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto hover-scrollbar pr-1">
          {STACK_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.value;
            return (
              <div
                key={preset.id}
                onClick={() => setSelectedPreset(preset.value)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'liquid-glass border-[#38B2AC] bg-[#38B2AC]/10 shadow-[0_0_15px_rgba(56,178,172,0.15)]' 
                    : 'liquid-glass border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <p className="text-xs font-medium text-white">{preset.name}</p>
                  <p className="text-[11px] text-white/40 truncate mt-0.5">{preset.value}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#38B2AC] shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="liquid-glass rounded-full px-5 py-2.5 text-xs text-white/60 hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyStack}
            disabled={isUpdating}
            className="liquid-glass-strong rounded-full px-6 py-2.5 text-xs font-medium text-white flex items-center gap-2 hover:scale-105 transition-all cursor-pointer disabled:cursor-not-allowed border border-white/20"
          >
            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-[#38B2AC]" /> : <Sparkles className="w-4 h-4 text-emerald-400" />}
            <span>Apply & Re-generate Specs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
