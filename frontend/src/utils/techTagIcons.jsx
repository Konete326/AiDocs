import { Code2, Server, Database, Layers, ShieldCheck, Sparkles, Cpu } from 'lucide-react';

export const renderTechTagIcon = (tag = '') => {
  const t = tag.toLowerCase();

  if (t.includes('react')) return <Sparkles className="w-3 h-3 text-sky-500 shrink-0" />;
  if (t.includes('next.js') || t.includes('app router')) return <Layers className="w-3 h-3 text-slate-900 shrink-0" />;
  if (t.includes('node') || t.includes('express')) return <Server className="w-3 h-3 text-emerald-600 shrink-0" />;
  if (t.includes('python') || t.includes('fastapi') || t.includes('pydantic')) return <Cpu className="w-3 h-3 text-blue-600 shrink-0" />;
  if (t.includes('.net') || t.includes('c#') || t.includes('ef core')) return <ShieldCheck className="w-3 h-3 text-blue-700 shrink-0" />;
  if (t.includes('php') || t.includes('laravel')) return <Code2 className="w-3 h-3 text-rose-600 shrink-0" />;
  if (t.includes('mongo') || t.includes('mongoose') || t.includes('sql') || t.includes('orm')) return <Database className="w-3 h-3 text-blue-600 shrink-0" />;

  return <Code2 className="w-3 h-3 text-slate-400 shrink-0" />;
};
