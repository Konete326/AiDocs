import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, FileText, Layers, Lightbulb, ExternalLink } from 'lucide-react';
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
      <div className="relative z-10 min-h-screen flex flex-col pt-24 px-4 sm:px-6 py-3 max-w-7xl mx-auto overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button onClick={() => navigate(`/projects/${id}`)} className="liquid-glass rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /> Back to Project
            </button>
            <h1 className="text-xs sm:text-sm font-medium text-white truncate max-w-[180px] sm:max-w-md">
              {project?.title} — AI Chat
            </h1>
          </div>
          <div className="liquid-glass rounded-full px-3 py-1 flex items-center gap-1.5 text-[9.5px] text-white/60 uppercase tracking-widest border border-white/5">
            <Sparkles className="w-3 h-3 text-[#6C63FF]" /> AI Co-founder Active
          </div>
        </header>

        {/* Compact Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 lg:h-[calc(100vh-180px)] max-h-[500px] min-h-0 overflow-hidden">
          
          {/* Left Panel: Project Context & Quick Ref (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5 h-full overflow-y-auto hover-scrollbar custom-scrollbar pr-0.5">
            <div className="liquid-glass-strong rounded-2xl p-3.5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Project Context</span>
                <span className="text-[9px] bg-[#6C63FF]/20 text-[#6C63FF] font-semibold px-2 py-0.5 rounded-full uppercase border border-[#6C63FF]/30">
                  {project?.projectType || 'SaaS'}
                </span>
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-white truncate">{project?.title}</h3>
                {project?.wizardAnswers?.problemStatement && (
                  <p className="text-[11px] text-white/60 mt-1 line-clamp-2 leading-relaxed">
                    {project.wizardAnswers.problemStatement}
                  </p>
                )}
              </div>

              {project?.wizardAnswers?.coreFeatures && project.wizardAnswers.coreFeatures.length > 0 && (
                <div className="pt-1.5 border-t border-white/5 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Core Features</span>
                  <div className="flex flex-wrap gap-1">
                    {project.wizardAnswers.coreFeatures.slice(0, 3).map((f, i) => (
                      <span key={i} className="liquid-glass rounded-full px-2 py-0.5 text-[9.5px] text-white/70 truncate max-w-[140px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Document Prompts Card */}
            <div className="liquid-glass rounded-2xl p-3.5 border border-white/5 space-y-2 flex-1 flex flex-col justify-between overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/70">
                  <Lightbulb className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Suggested Questions</span>
                </div>
                <p className="text-[10.5px] text-white/50 leading-tight">
                  Click any question to ask your AI Co-founder:
                </p>
              </div>

              <div className="space-y-1.5 pt-1 overflow-y-auto hover-scrollbar custom-scrollbar">
                {[
                  { label: "What is our primary tech stack & DB choice?", icon: Layers },
                  { label: "Summarize core system & API requirements", icon: FileText },
                  { label: "What are the main MVP milestones & phases?", icon: Sparkles },
                  { label: "How should we structure folder architecture?", icon: ExternalLink }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleSend(label)}
                    className="w-full text-left liquid-glass-strong rounded-xl px-3 py-1.5 text-[11px] text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center justify-between group cursor-pointer border border-white/5"
                  >
                    <span className="truncate pr-2">{label}</span>
                    <Icon className="w-3 h-3 text-white/30 group-hover:text-[#6C63FF] transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Chat Interface (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden liquid-glass-strong rounded-2xl shadow-2xl border border-white/10">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 hover-scrollbar custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center mx-auto text-[#6C63FF]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-sm font-semibold text-white tracking-tight">Welcome! I'm your AI Co-founder</h3>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Ask me anything about <strong className="text-white font-medium">{project?.title || 'your project'}</strong> architecture or stack!
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-center max-w-md pt-1">
                    {["What's our tech stack?", "Explain the database schema", "What are key MVP features?"].map(s => (
                      <button key={s} onClick={() => handleSend(s)} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/70 hover:text-white transition-all cursor-pointer border border-white/5">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
              {isSending && <ChatMessage message={{ role: 'assistant', content: '...' }} />}
              {error && (
                <div className="text-center py-1">
                  <span className="liquid-glass px-3 py-1 rounded-full text-[11px] text-amber-300/90 border border-amber-500/20 inline-block shadow-lg">
                    {error}
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white/5 border-t border-white/10 flex-shrink-0">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
