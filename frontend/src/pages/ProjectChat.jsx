import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, FileText, Layers, Lightbulb, Zap } from 'lucide-react';
import { getProject } from '../services/projectService';
import { getMySubscription } from '../services/subscriptionService';
import { sendChatMessage } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../services/api';

export default function ProjectChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [activeSkillsCount, setActiveSkillsCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  const fetchSkills = async () => {
    try {
      const res = await api.get(`/projects/${id}/skills`);
      if (res.data?.data?.skills) {
        setActiveSkillsCount(res.data.data.skills.length);
      }
    } catch (err) {
      console.error('Failed to fetch skills count:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [proj, sub] = await Promise.all([
          getProject(id), 
          getMySubscription().catch(() => null),
          fetchSkills()
        ]);
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
      fetchSkills(); // Refresh skills count in case AI modified skills
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

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0d1117] flex items-center justify-center pt-20">
        <LoadingSpinner size="lg" message="Loading AI Co-founder workspace..." />
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-[#0d1117] pt-24 pb-4 px-3 sm:px-6 flex flex-col overflow-hidden text-white font-sans">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 overflow-hidden space-y-3">
        
        {/* Compact Navigation Bar */}
        <div className="flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => navigate(`/projects/${id}`)}
            className="liquid-glass no-hover rounded-full px-3 py-1 text-xs text-white/70 hover:text-white flex items-center gap-1 transition-all border border-white/10 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Project
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass no-hover border border-white/10 text-xs text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span className="font-semibold text-white">AI Co-founder</span>
            </div>
          </div>
        </div>

        {/* Compact Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 lg:h-[calc(100vh-180px)] max-h-[500px] min-h-0 overflow-hidden rounded-3xl">
          
          {/* Left Panel: Project Context & Quick Ref (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3 h-full overflow-y-auto hover-scrollbar custom-scrollbar pr-0.5 rounded-3xl">
            <div className="liquid-glass-strong no-hover rounded-3xl p-4 sm:p-5 border border-white/15 ring-1 ring-white/10 shadow-lg space-y-2.5 overflow-hidden flex-shrink-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Project Context</span>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: '#38bdf8' }} className="text-[9px] bg-sky-500/20 text-sky-300 font-bold px-2.5 py-0.5 rounded-full border border-sky-500/30 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-sky-400" />
                    {activeSkillsCount} Skills
                  </span>
                  <span className="text-[9px] bg-[#6C63FF]/20 text-[#6C63FF] font-semibold px-2 py-0.5 rounded-full uppercase border border-[#6C63FF]/30">
                    {project?.projectType || 'SaaS'}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{project?.title}</h3>
                {project?.wizardAnswers?.problemStatement && (
                  <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                    {project.wizardAnswers.problemStatement}
                  </p>
                )}
              </div>

              {project?.wizardAnswers?.coreFeatures && project.wizardAnswers.coreFeatures.length > 0 && (
                <div className="pt-2.5 border-t border-white/10 flex flex-col gap-1.5 overflow-hidden">
                  <span className="text-[9.5px] uppercase tracking-wider text-white/40 font-medium">Core Features</span>
                  <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/[0.02]">
                    {project.wizardAnswers.coreFeatures.slice(0, 3).map((f, i) => (
                      <span key={i} className="liquid-glass no-hover rounded-full px-2.5 py-1 text-[10px] text-white/80 border border-white/15 truncate max-w-[130px] shadow-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Document Prompts Card */}
            <div className="liquid-glass no-hover rounded-3xl p-4 sm:p-5 border border-white/15 ring-1 ring-white/10 shadow-lg space-y-3 flex-1 flex flex-col justify-between overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Lightbulb className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Suggested Questions</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Click any prompt to trigger AI Co-founder actions:
                </p>
              </div>

              <div className="space-y-2 p-1 overflow-y-auto hover-scrollbar custom-scrollbar">
                {[
                  { label: "Add Stripe Integration skill to project", icon: Sparkles },
                  { label: "Download PRD in PDF format", icon: FileText },
                  { label: "Download all project files (.zip)", icon: FileText },
                  { label: "Download DB Schema as Excel (.csv)", icon: Layers }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleSend(label)}
                    className="w-full text-left liquid-glass-strong no-hover rounded-2xl px-3.5 py-2.5 text-xs text-white/80 hover:text-white hover:border-white/30 transition-all flex items-center justify-between group cursor-pointer border border-white/10 shadow-sm"
                  >
                    <span className="truncate pr-2">{label}</span>
                    <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-[#6C63FF] transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Chat Interface (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden liquid-glass-strong no-hover rounded-3xl shadow-2xl border border-white/15 ring-1 ring-white/10">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 hover-scrollbar custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="w-10 h-10 rounded-full liquid-glass no-hover flex items-center justify-center mx-auto text-[#6C63FF]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-sm font-semibold text-white tracking-tight">Welcome! I'm your AI Co-founder</h3>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Ask me anything about <strong className="text-white font-medium">{project?.title || 'your project'}</strong>, edit docs, or manage project skills!
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-center max-w-md pt-1">
                    {["Add Stripe Integration skill", "Download all project files", "Download DB Schema as Excel"].map(s => (
                      <button key={s} onClick={() => handleSend(s)} className="liquid-glass no-hover rounded-full px-3 py-1 text-[11px] text-white/70 hover:text-white transition-all cursor-pointer border border-white/5">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <ChatMessage 
                  key={i} 
                  message={m} 
                  projectId={id} 
                  projectTitle={project?.title} 
                  onSkillAdded={fetchSkills}
                />
              ))}
              {isSending && (
                <ChatMessage 
                  message={{ role: 'assistant', content: '...' }} 
                  projectId={id} 
                  projectTitle={project?.title} 
                  onSkillAdded={fetchSkills}
                />
              )}
              {error && (
                <div className="text-center py-1">
                  <span className="liquid-glass no-hover px-3 py-1 rounded-full text-[11px] text-amber-300/90 border border-amber-500/20 inline-block shadow-lg">
                    {error}
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white/5 border-t border-white/10 flex-shrink-0 rounded-b-3xl overflow-hidden">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
