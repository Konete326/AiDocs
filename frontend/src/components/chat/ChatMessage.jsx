import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import { mdComponents } from '../project/markdownComponents';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="liquid-glass rounded-3xl rounded-tr-sm px-5 py-3 max-w-[80%]">
          <p className="text-sm text-white/90 leading-relaxed font-sans">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white/60" />
      </div>

      <div className="liquid-glass rounded-3xl rounded-tl-sm px-5 py-3 max-w-[80%]">
        {message.content === '...' ? (
          <div className="flex gap-1 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        ) : (
          <div className="text-sm text-white/80 leading-relaxed font-sans prose-invert">
            <ReactMarkdown components={mdComponents}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
