import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { getProject } from '../services/projectService';
import { getMySubscription } from '../services/subscriptionService';
import { sendChatMessage } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

export default function ProjectChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [proj, sub] = await Promise.all([getProject(id), getMySubscription().catch(() => null)]);
        setProject(proj);
        setSubscription(sub);
      } catch (err) {
        setError('Connection temporarily delayed. Please refresh or try again in a moment.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending]);

  const handleSend = async (text) => {
    if (!text.trim() || isSending) return;
    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsSending(true);
    setError('');

    try {
      const reply = await sendChatMessage(id, updated);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const raw = err.response?.data?.error;
      let friendly = 'Connection temporarily delayed. Please try sending again!';
      if (typeof raw === 'string' && !raw.includes('timed out') && !raw.includes('Socket') && !raw.includes('connect') && !raw.includes('503')) {
        friendly = raw;
      }
      setError(friendly);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="relative z-10 h-screen flex flex-col pt-24 max-w-4xl mx-auto px-4 sm:px-6 py-6 overflow-hidden">
        <header className="flex items-center justify-between mb-4 flex-shrink-0">
          <button onClick={() => navigate(`/projects/${id}`)} className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-all cursor-pointer">
            <ChevronLeft className="w-4 h-4" /> Back to Project
          </button>
          <h1 className="text-sm sm:text-base font-medium text-white truncate max-w-[180px] sm:max-w-md">{project?.title} — AI Chat</h1>
          <div className="liquid-glass rounded-full px-3 py-1 flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#6C63FF]" /> AI Co-founder
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden liquid-glass-strong rounded-[2.5rem] mb-4 shadow-2xl border border-white/10">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 hover-scrollbar custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center mx-auto text-[#6C63FF]">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-base font-semibold text-white tracking-tight">Welcome! I'm your AI Co-founder 🚀</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Ask me anything about <strong className="text-white font-medium">{project?.title || 'your project'}</strong> architecture, stack, or strategy!
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center max-w-md pt-2">
                  {["What's our tech stack?", "Explain the database schema", "What are key MVP features?"].map(s => (
                    <button key={s} onClick={() => handleSend(s)} className="liquid-glass rounded-full px-4 py-2 text-xs text-white/70 hover:text-white transition-all cursor-pointer border border-white/5">{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
            {isSending && <ChatMessage message={{ role: 'assistant', content: '...' }} />}
            {error && (
              <div className="text-center py-2">
                <span className="liquid-glass px-4 py-2 rounded-full text-xs text-amber-300/90 border border-amber-500/20 inline-block shadow-lg">
                  {error}
                </span>
              </div>
            )}
          </div>
          <div className="p-4 bg-white/5 border-t border-white/10">
            <ChatInput onSend={handleSend} isDisabled={isSending} />
          </div>
        </div>
      </div>
    </div>
  );
}
