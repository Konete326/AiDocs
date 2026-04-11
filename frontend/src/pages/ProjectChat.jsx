import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Lock } from 'lucide-react';
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
        const [proj, sub] = await Promise.all([getProject(id), getMySubscription()]);
        setProject(proj);
        setSubscription(sub);
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending]);

  const isPro = ['pro', 'team'].includes(subscription?.plan) || user?.role === 'admin';

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
      setError(err.response?.data?.error || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" />
      <div className="relative z-10 h-screen flex flex-col max-w-4xl mx-auto px-6 py-6 overflow-hidden">
        <header className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(`/projects/${id}`)} className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-sm text-white/70 hover:scale-105 transition-all">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-lg font-medium text-white truncate max-w-[200px] md:max-w-md">{project?.title} — AI Chat</h1>
          <div className="liquid-glass rounded-full px-3 py-1 flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> AI Co-founder
          </div>
        </header>

        {!isPro ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center liquid-glass-strong rounded-[2rem] p-12 gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white/30" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">AI Co-founder is a Pro feature</h2>
              <p className="text-white/60 text-sm max-w-sm mx-auto">Upgrade to Pro to chat with an AI that understands your entire project and documentation.</p>
            </div>
            <button onClick={() => navigate('/pricing')} className="liquid-glass-strong rounded-full px-10 py-3.5 text-white font-medium hover:scale-105 transition-all">Upgrade to Pro</button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden glass-strong rounded-[2rem] mb-6 shadow-2xl">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-50">
                  <Sparkles className="w-10 h-10 text-white/20 mb-4" />
                  <p className="text-sm font-medium">Ask me anything about your project</p>
                  <div className="flex gap-2 flex-wrap justify-center mt-6">
                    {["What's the tech stack?", "Explain the DB schema", "What are core features?"].map(s => (
                      <button key={s} onClick={() => handleSend(s)} className="liquid-glass rounded-full px-4 py-2 text-xs hover:scale-105 transition-all">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
              {isSending && <ChatMessage message={{ role: 'assistant', content: '...' }} />}
              {error && <div className="text-center py-2"><span className="liquid-glass px-4 py-1.5 rounded-full text-[10px] text-white/50">{error}</span></div>}
            </div>
            <div className="p-4 bg-white/5 border-t border-white/10">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
