import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';

const STACK_OPTIONS = [
  { label: 'Next.js 15 Fullstack (App Router + Server Actions)', value: 'Next.js 15 App Router with Server Actions, React 19, and Tailwind CSS v4' },
  { label: 'Next.js 15 Decoupled (Next.js + Backend API)', value: 'Next.js 15 App Router Frontend with Decoupled REST API' },
  { label: 'Python 3.12+ (FastAPI / Django REST Framework)', value: 'Python 3.12 FastAPI Async API with Pydantic v2 and SQLAlchemy 2.0' },
  { label: '.NET 9 (ASP.NET Core Web API)', value: 'C# .NET 9 ASP.NET Core Web API with Clean Architecture & EF Core 9' },
  { label: 'PHP 8.3 / Laravel 11+ API Framework', value: 'PHP 8.3 Laravel 11 API with Eloquent ORM and Form Requests' },
  { label: 'React 19 SPA (Vite 6 + REST Services)', value: 'React 19 Vite 6 Single Page App with Zustand and Axios' },
  { label: 'MERN Stack (Node.js v20+ Express + React 19)', value: 'Node.js v20 Express REST API with MongoDB Mongoose and React 19' }
];

export default function TechField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'techPreferences',
    formData.wizardAnswers.techPreferences,
    formData.wizardAnswers
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-2">Target Architecture & Framework</label>
      
      <div className="liquid-glass rounded-xl px-4 py-2.5 w-full mb-3 border border-white/10">
        <select
          value={STACK_OPTIONS.find(s => formData.wizardAnswers.techPreferences?.includes(s.label.split(' ')[0]))?.value || ''}
          onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
          className="bg-transparent text-white outline-none w-full text-sm cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
        >
          <option value="">-- Choose Framework Preset (Optional) --</option>
          {STACK_OPTIONS.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <label className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-1.5">Custom Tech Notes & Libraries</label>
      <div className="liquid-glass rounded-xl px-4 py-2.5 w-full">
        <textarea 
          value={formData.wizardAnswers.techPreferences || ''}
          onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
          placeholder="e.g. Next.js 14, Tailwind, PostgreSQL, Stripe, Redis..."
          rows={2}
          className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
        />
      </div>

      <SuggestionPills
        suggestions={suggestions}
        isLoading={isLoading}
        onSelect={(s) => onChange('wizardAnswers.techPreferences', s)}
        fieldName="tech"
      />
    </div>
  );
}
