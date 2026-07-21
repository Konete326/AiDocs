import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Copy, Check } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="liquid-glass rounded-3xl rounded-tr-sm px-5 py-3 max-w-[80%] border border-white/5">
          <p className="text-sm text-white/90 leading-relaxed font-sans">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 group">
      <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 text-[#6C63FF]" />
      </div>

      <div className="liquid-glass rounded-3xl rounded-tl-sm px-5 py-3.5 max-w-[85%] relative border border-white/5 flex-1">
        {message.content === '...' ? (
          <div className="flex gap-1 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">AI Co-founder</span>
              <button
                onClick={handleCopy}
                className="liquid-glass rounded-full px-2.5 py-0.5 text-[10px] text-white/50 hover:text-white flex items-center gap-1 transition-all cursor-pointer border border-white/5"
                title="Copy AI response"
                aria-label="Copy AI response"
              >
                {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <div className="text-sm text-white/80 leading-relaxed font-sans prose-invert">
              <ReactMarkdown components={mdComponents}>{message.content}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
