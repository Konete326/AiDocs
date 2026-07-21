import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, FileText, Layers, Lightbulb, Trash2, UploadCloud, AlertCircle } from 'lucide-react';
import { getProject } from '../services/projectService';
import { getMySubscription } from '../services/subscriptionService';
import { sendChatMessage, getChatHistory, deleteChatHistory } from '../services/chatService';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [proj, sub, history] = await Promise.all([
          getProject(id),
          getMySubscription().catch(() => null),
          getChatHistory(id).catch(() => [])
        ]);
        setProject(proj);
        setSubscription(sub);
        if (history && history.length > 0) {
          setMessages(history);
        }
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

  const handleSend = async (text, attachments = []) => {
    if ((!text.trim() && attachments.length === 0) || isSending) return;
    const userMsg = { role: 'user', content: text, attachments };
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

  const handleConfirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await deleteChatHistory(id);
      setMessages([]);
    } catch (err) {
      setError('Failed to clear chat history. Please try again.');
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setDragError('');

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;

    if (files.length > 8) {
      setDragError('Maximum 8 files allowed per drop.');
      return;
    }

    const invalidVideo = files.find(f => 
      f.type.startsWith('video/') || 
      /\.(mp4|mov|avi|mkv|webm)$/i.test(f.name)
    );
    if (invalidVideo) {
      setDragError('Video files are not allowed. Please upload images or document files.');
      return;
    }

    const oversized = files.find(f => f.size > 10 * 1024 * 1024);
    if (oversized) {
      setDragError(`File "${oversized.name}" exceeds 10MB limit.`);
      return;
    }

    const attachments = [];
    for (const file of files) {
      const isImage = file.type.startsWith('image/');
      const content = await new Promise((resolve) => {
        const reader = new FileReader();
        if (isImage) {
          reader.onload = (ev) => resolve({ isImage: true, dataUrl: ev.target.result });
          reader.readAsDataURL(file);
        } else {
          reader.onload = (ev) => resolve({ isImage: false, content: ev.target.result });
          reader.readAsText(file);
        }
      });

      attachments.push({
        name: file.name,
        size: file.size,
        type: file.type,
        ...content
      });
    }

    if (attachments.length > 0) {
      handleSend('', attachments);
    }
  };

  if (isLoading) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="liquid-glass-strong rounded-3xl p-6 w-full max-w-sm border border-white/10 text-center relative z-10 shadow-2xl">
            <h3 className="text-sm font-semibold text-white">Delete Chat History?</h3>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">
              Are you sure you want to delete all chat history for this project? This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 hover:text-white transition-all cursor-pointer border border-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer border-none shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col pt-24 sm:pt-28 pb-3 px-3 sm:px-6 max-w-7xl w-full mx-auto overflow-hidden">

        <header className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/projects/${id}`)} className="liquid-glass rounded-full px-3 py-1 flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-all cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
            <h1 className="text-xs sm:text-sm font-medium text-white truncate max-w-[180px] sm:max-w-md">
              {project?.title} — AI Chat
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="liquid-glass rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[10px] text-red-400/90 hover:text-red-300 transition-all cursor-pointer border border-red-500/10 hover:border-red-500/30"
              title="Delete chat history"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
              <span className="hidden sm:inline">Delete Chat</span>
            </button>

            <div className="liquid-glass rounded-full px-3 py-1 flex items-center gap-1.5 text-[9px] text-white/60 uppercase tracking-widest border border-white/5">
              <Sparkles className="w-3 h-3 text-[#6C63FF]" /> AI Co-founder Active
            </div>
          </div>
        </header>

        <div 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden rounded-3xl relative"
        >
          {isDragging && (
            <div className="absolute inset-0 bg-[#6C63FF]/30 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#6C63FF] z-50 flex flex-col items-center justify-center space-y-2 text-white pointer-events-none shadow-2xl">
              <UploadCloud className="w-12 h-12 text-white animate-bounce" />
              <h3 className="text-sm font-semibold text-white">Drop files to attach & analyze</h3>
              <p className="text-[11px] text-white/70">Images and Document files supported (max 8 files, no videos)</p>
            </div>
          )}

          <div className="lg:col-span-4 flex flex-col space-y-2.5 h-full overflow-hidden pr-0.5 rounded-3xl">
            <div className="liquid-glass-strong rounded-3xl p-3.5 sm:p-4 border border-white/15 ring-1 ring-white/10 shadow-lg space-y-2 overflow-hidden flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase tracking-widest text-white/40 font-semibold">Project Context</span>
                <span style={{ color: '#ffffff' }} className="text-[8.5px] bg-[#6C63FF] font-semibold px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                  {project?.projectType || 'SaaS'}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{project?.title}</h3>
                {project?.wizardAnswers?.problemStatement && (
                  <p className="text-[11px] text-white/60 mt-0.5 line-clamp-2 leading-relaxed">
                    {project.wizardAnswers.problemStatement}
                  </p>
                )}
              </div>

              {project?.wizardAnswers?.coreFeatures && project.wizardAnswers.coreFeatures.length > 0 && (
                <div className="pt-2 border-t border-white/10 flex flex-col gap-1 overflow-hidden">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">Core Features</span>
                  <div className="flex flex-wrap gap-1 p-0.5 rounded-2xl bg-white/[0.02]">
                    {project.wizardAnswers.coreFeatures.slice(0, 3).map((f, i) => (
                      <span key={i} className="liquid-glass rounded-full px-2 py-0.5 text-[9.5px] text-white/80 border border-white/15 truncate max-w-[120px] shadow-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="liquid-glass rounded-3xl p-3.5 sm:p-4 border border-white/15 ring-1 ring-white/10 shadow-lg space-y-2 flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
              <div className="space-y-0.5 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Lightbulb className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Suggested Questions</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Click any prompt to trigger actions:
                </p>
              </div>

              <div className="space-y-1.5 p-0.5 overflow-y-auto hover-scrollbar custom-scrollbar flex-1 min-h-0">
                {[
                  { label: "Add Stripe Integration skill to project", icon: Sparkles },
                  { label: "Download PRD in PDF format", icon: FileText },
                  { label: "Download all project files (.zip)", icon: FileText },
                  { label: "Download DB Schema as Excel (.csv)", icon: Layers }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleSend(label)}
                    className="w-full text-left liquid-glass-strong rounded-2xl px-3 py-2 text-[11px] text-white/80 hover:text-white hover:border-white/30 transition-all flex items-center justify-between group cursor-pointer border border-white/10 shadow-sm"
                  >
                    <span className="truncate pr-2">{label}</span>
                    <Icon className="w-3 h-3 text-white/40 group-hover:text-[#6C63FF] transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden liquid-glass-strong rounded-3xl shadow-2xl border border-white/15 ring-1 ring-white/10">
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 hover-scrollbar custom-scrollbar">
              {dragError && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-2.5 flex items-center justify-between text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{dragError}</span>
                  </div>
                  <button onClick={() => setDragError('')} className="text-amber-300/60 hover:text-amber-300 cursor-pointer">
                    ✕
                  </button>
                </div>
              )}

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2.5">
                  <div className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center mx-auto text-[#6C63FF]">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">Welcome! I'm your AI Co-founder</h3>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Ask me anything about <strong className="text-white font-medium">{project?.title || 'your project'}</strong>, edit docs, or download project files!
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-center max-w-md pt-1">
                    {["Download all project files", "Download PRD as Word", "Download DB Schema as Excel"].map(s => (
                      <button key={s} onClick={() => handleSend(s)} className="liquid-glass rounded-full px-2.5 py-0.5 text-[10.5px] text-white/70 hover:text-white transition-all cursor-pointer border border-white/5">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} projectId={id} projectTitle={project?.title} />
              ))}
              {isSending && (
                <ChatMessage message={{ role: 'assistant', content: '...', userQuery: messages[messages.length - 1]?.content || '' }} projectId={id} projectTitle={project?.title} />
              )}
              {error && (
                <div className="text-center py-1">
                  <span className="liquid-glass px-3 py-1 rounded-full text-[11px] text-amber-300/90 border border-amber-500/20 inline-block shadow-lg">
                    {error}
                  </span>
                </div>
              )}
            </div>
            <div className="p-2.5 sm:p-3 bg-white/5 border-t border-white/10 flex-shrink-0 rounded-b-3xl overflow-hidden">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
