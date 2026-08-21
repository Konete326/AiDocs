import React, { useState } from 'react';
import SuggestionPills from '../SuggestionPills';
import { useSuggestions } from '../../../hooks/useSuggestions';
import { Code2, Check, X, Layers } from 'lucide-react';

export const StackLogo = ({ stackId, className = "w-6 h-6" }) => {
  switch (stackId) {
    case 'react-native':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="2" width="14" height="20" rx="3" fill="#61DAFB" fillOpacity="0.2" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="1" fill="#61DAFB"/>
        </svg>
      );
    case 'flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M14.2 2L4 12.2L7.1 15.3L14.2 8.2L20.4 2H14.2Z" fill="#54C5F8"/>
          <path d="M14.2 12.2L8.6 17.8L11.7 20.9L14.2 18.4L17.3 21.5H20.4L14.2 15.3L17.3 12.2H14.2Z" fill="#01579B"/>
          <path d="M11.7 15.3L8.6 17.8L11.7 20.9L14.2 18.4L11.7 15.3Z" fill="#29B6F6"/>
        </svg>
      );
    case 'next-full':
    case 'next-decoupled':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#000000"/>
          <path d="M15.5 16.5L9 8V16H7.5V8.5C7.5 7.9 8.2 7.6 8.6 8L15.8 16.2C15.7 16.3 15.6 16.4 15.5 16.5Z" fill="white"/>
          <path d="M16.5 8H15V12.5L16.5 14.2V8Z" fill="white"/>
        </svg>
      );
    case 'python-fastapi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.8 2C6.8 2 7 4.2 7 4.2V6.4H12V7.1H5.1C5.1 7.1 2 6.8 2 11.8C2 16.8 4.7 16.5 4.7 16.5H6.1V14.3C6.1 14.3 6 11.8 8.6 11.8H13.6C13.6 11.8 16 11.9 16 9.5V4.7C16 4.7 16.4 2 11.8 2Z" fill="#3776AB"/>
          <path d="M12.2 22C17.2 22 17 19.8 17 19.8V17.6H12V16.9H18.9C18.9 16.9 22 17.2 22 12.2C22 7.2 19.3 7.5 19.3 7.5H17.9V9.7C17.9 9.7 18 12.2 15.4 12.2H10.4C10.4 12.2 8 12.1 8 14.5V19.3C8 19.3 7.6 22 12.2 22Z" fill="#FFD43B"/>
          <circle cx="9" cy="4.5" r="0.8" fill="white"/>
          <circle cx="15" cy="19.5" r="0.8" fill="#3776AB"/>
        </svg>
      );
    case 'dotnet':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#512BD4"/>
          <path d="M6 16V14.5H8.5V16H6ZM10 16V8H11.8L14.2 13.5V8H15.8V16H14L11.6 10.5V16H10ZM17 16V8H20.5V9.5H18.5V11.2H20V12.7H18.5V14.5H20.5V16H17Z" fill="white"/>
        </svg>
      );
    case 'laravel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M3 7.5L12 2L21 7.5V16.5L12 22L3 16.5V7.5Z" stroke="#FF2D20" strokeWidth="1.5" fill="#FF2D20" fillOpacity="0.1"/>
          <path d="M12 2L21 7.5V16.5L12 22V2Z" fill="#FF2D20" fillOpacity="0.3"/>
          <path d="M7 9.5L12 12.5L17 9.5" stroke="#FF2D20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12.5V17.5" stroke="#FF2D20" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case 'react-vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 6L12 21L21 6L12 2Z" fill="#BD34FE" fillOpacity="0.3" stroke="#BD34FE" strokeWidth="1.2"/>
          <path d="M12 2L19.5 5.5L12 19.5V2Z" fill="#FFC017" fillOpacity="0.7"/>
          <ellipse cx="12" cy="11" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(-25 12 11)"/>
          <circle cx="12" cy="11" r="1" fill="#61DAFB"/>
        </svg>
      );
    case 'mern':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7 3 5 8 5 12C5 17 8 20 12 21C12.5 21 12.8 20.6 12.8 20.1C12.8 19.7 12 18.5 12 16.5C12 13 15 11 15 8C15 5 13 3 12 3Z" fill="#13AA52"/>
          <path d="M12 3V21C16 20 19 16 19 12C19 7.5 16 3 12 3Z" fill="#47A248"/>
          <circle cx="12" cy="12" r="1.5" fill="white"/>
        </svg>
      );
    default:
      return <Code2 className={className} />;
  }
};

const STACK_OPTIONS = [
  { id: 'react-native', label: 'React Native (Expo Web + React Navigation)', desc: 'Cross-platform iOS, Android, and Web using Expo SDK 51 & NativeWind', value: 'React Native Expo SDK 51 Web with Expo Router and NativeWind' },
  { id: 'flutter', label: 'Flutter 3.24+ Web App (Dart + Riverpod)', desc: 'Material 3 mobile & web experience powered by Dart & Riverpod', value: 'Flutter 3.24 Web App with Material 3, Dart, and Riverpod State Management' },
  { id: 'next-full', label: 'Next.js 15 Fullstack (App Router + Server Actions)', desc: 'Modern React 19 web app with App Router & Server Actions', value: 'Next.js 15 App Router with Server Actions, React 19, and Tailwind CSS v4' },
  { id: 'next-decoupled', label: 'Next.js 15 Decoupled (Next.js + Backend API)', desc: 'High-performance React 19 SSR frontend with separate REST API', value: 'Next.js 15 App Router Frontend with Decoupled REST API' },
  { id: 'python-fastapi', label: 'Python 3.12+ (FastAPI / Django DRF)', desc: 'Async Python microservices with Pydantic v2 & SQLAlchemy 2.0', value: 'Python 3.12 FastAPI Async API with Pydantic v2 and SQLAlchemy 2.0' },
  { id: 'dotnet', label: '.NET 9 (ASP.NET Core Web API)', desc: 'Enterprise C# .NET 9 Web API with Clean Architecture & Entity Framework 9', value: 'C# .NET 9 ASP.NET Core Web API with Clean Architecture & EF Core 9' },
  { id: 'laravel', label: 'PHP 8.3 / Laravel 11+ API Framework', desc: 'Robust RESTful API architecture powered by Eloquent ORM', value: 'PHP 8.3 Laravel 11 API with Eloquent ORM and Form Requests' },
  { id: 'react-vite', label: 'React 19 SPA (Vite 6 + REST Services)', desc: 'Lightweight Client-Side Single Page Application with Zustand', value: 'React 19 Vite 6 Single Page App with Zustand and Axios' },
  { id: 'mern', label: 'MERN Stack (Node.js Express + React 19)', desc: 'Classic Node.js Express REST server with MongoDB & React 19', value: 'Node.js v20 Express REST API with MongoDB Mongoose and React 19' }
];

export function TechFieldSelector({ formData, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedVal = formData.wizardAnswers.techPreferences || '';
  const currentStack = STACK_OPTIONS.find(s => selectedVal === s.value || selectedVal === s.id || (selectedVal && selectedVal.toLowerCase().includes(s.id.toLowerCase()))) || STACK_OPTIONS[2];
  const shortStackName = currentStack.label.split(' (')[0];

  const handleSelectStack = (stack) => {
    onChange('wizardAnswers.techPreferences', stack.value);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-1">
      <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Target Framework</label>
      
      <div className="neumorphic-card rounded-2xl p-2.5 px-3 bg-[#E0E5EC] border border-black/5 flex items-center justify-between gap-2.5 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm shrink-0 p-1.5">
            <StackLogo stackId={currentStack.id} className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-extrabold text-[#3D4852] truncate">
              {shortStackName}
            </h4>
            <p className="text-[10px] text-[#2563EB] font-extrabold truncate mt-0.5">Active Framework</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer shrink-0"
        >
          <span className="text-white font-extrabold">Select Stack ↗</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center pt-16 md:pt-20 pb-6 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-6xl w-[92vw] neumorphic-card rounded-[2.5rem] bg-[#E0E5EC] text-[#3D4852] flex flex-col overflow-hidden shadow-2xl max-h-[85vh] mt-2 md:mt-4">
            <div className="flex items-center justify-between p-5 px-7 border-b border-black/5 bg-[#E0E5EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  <Layers className="w-5 h-5" />
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
                const isSelected = currentStack.id === stack.id;
                return (
                  <button
                    key={stack.id}
                    type="button"
                    onClick={() => handleSelectStack(stack)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg ring-2 ring-[#2563EB]/30"
                        : "neumorphic-card bg-[#E0E5EC] border-black/5 text-[#3D4852] hover:border-[#2563EB]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-white/20 p-1 flex items-center justify-center">
                          <StackLogo stackId={stack.id} className="w-6 h-6" />
                        </div>
                        {isSelected && <Check size={16} className="text-white font-bold" />}
                      </div>
                      <h4 className="text-xs font-extrabold mb-1 leading-snug">{stack.label}</h4>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/90' : 'text-[#6B7280]'}`}>{stack.desc}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-black/5 flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-white' : 'text-[#2563EB]'}`}>
                        {isSelected ? 'Active Stack' : 'Click to Select'}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#2563EB]'}`}>Select ↗</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 px-7 border-t border-black/5 bg-[#E0E5EC] flex justify-between items-center">
              <span className="text-xs text-[#6B7280] font-semibold">
                Current Stack: <strong className="text-[#2563EB] font-extrabold">{currentStack.label}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold px-5 py-2 rounded-2xl text-xs transition-all shadow-md cursor-pointer"
              >
                <span className="text-white font-extrabold">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TechNotesField({ formData, onChange }) {
  const { suggestions, isLoading, refresh } = useSuggestions(
    formData.title,
    formData.projectType,
    'techPreferences',
    formData.wizardAnswers.techPreferences,
    formData.wizardAnswers
  );

  return (
    <div className="space-y-1">
      <label className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-extrabold block">Custom Tech Notes</label>
      <div className="neumorphic-input-wrapper rounded-xl px-4 py-2.5 w-full">
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
        onRefresh={refresh}
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
