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
    return <code className="bg-white/10 text-white/90 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-2xl liquid-glass-strong border border-white/10 overflow-hidden group">
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/30 border-b border-white/10 text-[10px] text-white/50 font-mono">
        <span className="uppercase">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="liquid-glass rounded-full px-2 py-0.5 text-[9.5px] text-white/60 hover:text-white flex items-center gap-1 transition-all cursor-pointer border border-white/5"
          title="Copy code"
        >
          {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Code</>}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono text-white/80 leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export const mdComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-medium text-white mt-6 mb-3">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-medium text-white/90 mt-5 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-medium text-white/80 mt-4 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-white/70 text-sm leading-relaxed mb-3">{children}</p>,
  ul: ({ children }) => <ul className="text-white/70 text-sm space-y-1 mb-3 list-disc list-inside">{children}</ul>,
  ol: ({ children }) => <ol className="text-white/70 text-sm space-y-1 mb-3 list-decimal list-inside">{children}</ol>,
  li: ({ children }) => <li className="text-white/70">{children}</li>,
  strong: ({ children }) => <strong className="text-white font-medium">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="border-l-2 border-white/20 pl-4 text-white/60 italic mb-3">{children}</blockquote>,
  hr: () => <hr className="border-white/10 my-4" />,
  table: ({ children }) => <table className="w-full text-sm mb-3">{children}</table>,
  th: ({ children }) => <th className="text-left text-white/80 font-medium pb-2 border-b border-white/10 pr-4">{children}</th>,
  td: ({ children }) => <td className="text-white/60 py-2 border-b border-white/5 pr-4">{children}</td>,
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
