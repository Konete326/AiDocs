import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import MermaidDiagram from '../common/MermaidDiagram';

const CodeBlock = ({ inline, className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  if (language === 'mermaid') {
    return <MermaidDiagram chartCode={codeString} />;
  }

  if (inline) {
    return <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">{children}</code>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
        <span className="uppercase">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="rounded-full px-2 py-0.5 text-[9.5px] bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-all cursor-pointer border border-slate-700"
          title="Copy code"
        >
          {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Code</>}
        </button>
      </div>
      <pre className="p-3.5 sm:p-4 text-xs font-mono text-slate-100 leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
        <code className="break-words whitespace-pre-wrap font-mono text-slate-100">{children}</code>
      </pre>
    </div>
  );
};

export const mdComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight border-b border-slate-200 pb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-slate-900 mt-5 mb-2 tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-slate-700 text-sm leading-relaxed mb-3 font-normal">{children}</p>,
  ul: ({ children }) => <ul className="text-slate-700 text-sm space-y-1 mb-3 list-disc list-inside">{children}</ul>,
  ol: ({ children }) => <ol className="text-slate-700 text-sm space-y-1 mb-3 list-decimal list-inside">{children}</ol>,
  li: ({ children }) => <li className="text-slate-700">{children}</li>,
  strong: ({ children }) => <strong className="text-slate-900 font-semibold">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 bg-blue-50/50 p-3 rounded-r-xl text-slate-700 italic mb-3 text-sm">{children}</blockquote>,
  hr: () => <hr className="border-slate-200 my-4" />,
  table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full text-sm border-collapse">{children}</table></div>,
  th: ({ children }) => <th className="text-left text-slate-900 font-semibold pb-2 pt-2 border-b-2 border-slate-200 pr-4 bg-slate-50 px-3">{children}</th>,
  td: ({ children }) => <td className="text-slate-700 py-2 border-b border-slate-200 pr-4 px-3">{children}</td>,
  code: CodeBlock,
  pre: ({ children }) => <>{children}</>,
};

export const DOC_LABELS = {
  prd: 'Product Requirements', srd: 'Software Requirements',
  techStack: 'Tech Stack', dbSchema: 'Database Schema',
  userFlows: 'User Flows', mvpPlan: 'MVP Plan',
  folderStructure: 'Folder Structure', claudeContext: 'Claude Context',
  agentSystemPrompt: 'Agent Prompts',
  skills: 'Project Skills',
};
