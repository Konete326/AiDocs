import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, isDisabled }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim() || isDisabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="liquid-glass-strong rounded-2xl px-4 py-3 flex items-end gap-3 shadow-xl">
      <textarea
        className="bg-transparent text-white placeholder:text-white/30 outline-none w-full text-sm resize-none max-h-32 py-1"
        rows={1}
        placeholder="Ask anything about your project... (Enter to send)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim() || isDisabled}
        className={`liquid-glass rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 ${
          (!text.trim() || isDisabled) ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
        }`}
      >
        <Send className="w-4 h-4 text-white/70" />
      </button>
    </div>
  );
}
