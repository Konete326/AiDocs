import React, { useState } from 'react';
import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';
import { Code2, Check, X, Layers } from 'lucide-react';

const STACK_OPTIONS = [
  { id: 'react-native', label: 'React Native (Expo Web + React Navigation)', icon: '📱', desc: 'Cross-platform iOS, Android, and Web using Expo SDK 51 & NativeWind', value: 'React Native Expo SDK 51 Web with Expo Router and NativeWind' },
  { id: 'flutter', label: 'Flutter 3.24+ Web App (Dart + Riverpod)', icon: '💙', desc: 'Material 3 mobile & web experience powered by Dart & Riverpod', value: 'Flutter 3.24 Web App with Material 3, Dart, and Riverpod State Management' },
  { id: 'next-full', label: 'Next.js 15 Fullstack (App Router + Server Actions)', icon: '⚡', desc: 'Modern React 19 web app with App Router & Server Actions', value: 'Next.js 15 App Router with Server Actions, React 19, and Tailwind CSS v4' },
  { id: 'next-decoupled', label: 'Next.js 15 Decoupled (Next.js + Backend API)', icon: '🌐', desc: 'High-performance React 19 SSR frontend with separate REST API', value: 'Next.js 15 App Router Frontend with Decoupled REST API' },
  { id: 'python-fastapi', label: 'Python 3.12+ (FastAPI / Django DRF)', icon: '🐍', desc: 'Async Python microservices with Pydantic v2 & SQLAlchemy 2.0', value: 'Python 3.12 FastAPI Async API with Pydantic v2 and SQLAlchemy 2.0' },
  { id: 'dotnet', label: '.NET 9 (ASP.NET Core Web API)', icon: '🟦', desc: 'Enterprise C# .NET 9 Web API with Clean Architecture & Entity Framework 9', value: 'C# .NET 9 ASP.NET Core Web API with Clean Architecture & EF Core 9' },
  { id: 'laravel', label: 'PHP 8.3 / Laravel 11+ API Framework', icon: '🔴', desc: 'Robust RESTful API architecture powered by Eloquent ORM', value: 'PHP 8.3 Laravel 11 API with Eloquent ORM and Form Requests' },
  { id: 'react-vite', label: 'React 19 SPA (Vite 6 + REST Services)', icon: '⚛️', desc: 'Lightweight Client-Side Single Page Application with Zustand', value: 'React 19 Vite 6 Single Page App with Zustand and Axios' },
  { id: 'mern', label: 'MERN Stack (Node.js Express + React 19)', icon: '🍃', desc: 'Classic Node.js Express REST server with MongoDB & React 19', value: 'Node.js v20 Express REST API with MongoDB Mongoose and React 19' }
];

export function TechFieldSelector({ formData, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedVal = formData.wizardAnswers.techPreferences || '';
  const currentStack = STACK_OPTIONS.find(s => selectedVal.includes(s.label.split(' ')[0])) || STACK_OPTIONS[2];

  const handleSelectStack = (stack) => {
    onChange('wizardAnswers.techPreferences', stack.value);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-1">
      <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Target Framework</label>
      
      <div className="neumorphic-card rounded-2xl p-2.5 px-3 bg-[#E0E5EC] border border-black/5 flex items-center justify-between gap-2.5 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
            {currentStack.icon}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-extrabold text-[#3D4852] truncate">
              {currentStack.label}
            </h4>
            <p className="text-[10px] text-[#6B7280] font-medium truncate mt-0.5">{currentStack.desc}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
        >
          <span>Select Stack ↗</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-4xl neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl max-h-[85vh]">
            <div className="flex items-center justify-between p-5 px-7 border-b border-black/5 bg-[#E0E5EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  💻
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#3D4852]">Choose Target Framework & Stack</h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    Select your preferred framework architecture. Our AI will align code structures and API schemas to your stack.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {STACK_OPTIONS.map((stack) => {
                const isSelected = selectedVal.includes(stack.label.split(' ')[0]);
                return (
                  <button
                    key={stack.id}
                    type="button"
                    onClick={() => handleSelectStack(stack)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-lg ring-2 ring-[#6C63FF]/30"
                        : "neumorphic-card bg-[#E0E5EC] border-black/5 text-[#3D4852] hover:border-[#6C63FF]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{stack.icon}</span>
                        {isSelected && <Check size={16} className="text-white" />}
                      </div>
                      <h4 className="text-xs font-extrabold mb-1 leading-snug">{stack.label}</h4>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/90' : 'text-[#6B7280]'}`}>{stack.desc}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-black/5 flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`}>
                        {isSelected ? 'Active Stack' : 'Click to Select'}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#6C63FF]'}`}>Select ↗</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 px-7 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
              <span className="text-xs text-[#6B7280] font-semibold">
                Current Stack: <strong className="text-[#6C63FF]">{currentStack.label}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TechNotesField({ formData, onChange }) {
  const { suggestions, isLoading } = useSuggestions(
    formData.title,
    formData.projectType,
    'techPreferences',
    formData.wizardAnswers.techPreferences,
    formData.wizardAnswers
  );

  return (
    <div className="space-y-1">
      <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Custom Tech Notes</label>
      <div className="neumorphic-inset rounded-2xl px-3.5 py-2 w-full bg-[#E0E5EC] border border-black/5">
        <textarea 
          value={formData.wizardAnswers.techPreferences || ''}
          onChange={(e) => onChange('wizardAnswers.techPreferences', e.target.value)}
          placeholder="e.g. Next.js 15, Tailwind, PostgreSQL, Stripe, Redis..."
          rows={1}
          className="bg-transparent text-[#3D4852] font-semibold placeholder:text-[#9CA3AF] outline-none w-full text-xs resize-none"
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

export default function TechField({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <TechFieldSelector formData={formData} onChange={onChange} />
      <TechNotesField formData={formData} onChange={onChange} />
    </div>
  );
}
