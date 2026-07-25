import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bot, FileText, Layers, Lightbulb, Trash2, UploadCloud, AlertCircle, ExternalLink, RotateCcw } from 'lucide-react';
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
    let timer;
    const init = async () => {
      try {
        const [proj, sub, history] = await Promise.all([
          getProject(id),
          getMySubscription().catch(() => null),
          getChatHistory(id).catch(() => [])
        ]);
        setProject(proj);
        setSubscription(sub);
        if (history && history.length > 0) setMessages(history);
      } catch (err) {
        setError('Connection temporarily delayed. Please refresh or try again in a moment.');
      } finally {
        setIsLoading(false);
      }
    };
    init();
    timer = setInterval(async () => {
      try {
        const history = await getChatHistory(id);
        if (history && history.length > 0) setMessages(history);
      } catch {}
    }, 4000);
    return () => clearInterval(timer);
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

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg && !isSending) {
      handleSend(lastUserMsg.content, lastUserMsg.attachments || []);
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
    <div className="relative h-screen w-full overflow-hidden flex flex-col bg-[#E0E5EC] text-[#3D4852]">
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="liquid-glass rounded-3xl p-6 w-full max-w-sm text-center relative z-10 shadow-2xl">
            <h3 className="text-sm font-bold text-[#3D4852]">Delete Chat History?</h3>
            <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
              Are you sure you want to delete all chat history for this project?
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="neumorphic-btn rounded-2xl px-4 py-2 text-xs text-[#3D4852] font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white rounded-2xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col pt-24 sm:pt-28 pb-3 px-3 sm:px-6 max-w-7xl w-full mx-auto overflow-hidden">
        <header className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/projects/${id}`)} className="neumorphic-btn rounded-2xl px-3.5 py-1.5 flex items-center gap-1 text-xs text-[#3D4852] font-bold cursor-pointer">
              <ChevronLeft className="w-4 h-4 text-[#3D4852]" /> Back
            </button>
            <h1 className="text-xs sm:text-sm font-bold text-[#3D4852] truncate max-w-[180px] sm:max-w-md">
              {project?.title} — AI Chat
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="neumorphic-btn rounded-2xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-bold cursor-pointer"
              title="Delete chat history"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Delete Chat</span>
            </button>

            {messages.some(m => m.isMcpAgent || m.content?.includes('[Antigravity IDE Agent]')) && (
              <div className="neumorphic-inset rounded-full px-3 py-1 flex items-center gap-1.5 text-[9.5px] text-[#6C63FF] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-ping" />
                <span>🤖 IDE Agent Synced</span>
              </div>
            )}
            <div className="neumorphic-inset rounded-full px-3 py-1 flex items-center gap-1.5 text-[9.5px] text-[#38B2AC] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B2AC] animate-ping" />
              <span>NVIDIA GPU Active</span>
            </div>
          </div>
        </header>

        <div 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden rounded-3xl relative"
        >
          {isDragging && (
            <div className="absolute inset-0 bg-[#6C63FF]/20 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#6C63FF] z-50 flex flex-col items-center justify-center space-y-2 text-[#3D4852] pointer-events-none shadow-2xl">
              <UploadCloud className="w-12 h-12 text-[#6C63FF] animate-bounce" />
              <h3 className="text-sm font-bold text-[#3D4852]">Drop files to attach & analyze</h3>
              <p className="text-[11px] text-[#6B7280]">Images and Document files supported (max 8 files)</p>
            </div>
          )}

          <div className="lg:col-span-4 flex flex-col space-y-3 h-full overflow-hidden pr-0.5 rounded-3xl">
            <div className="liquid-glass rounded-3xl p-4 space-y-2 overflow-hidden flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] uppercase tracking-widest text-[#6B7280] font-mono font-bold">Project Context</span>
                <span className="text-[8.5px] bg-[#6C63FF] font-bold px-2.5 py-0.5 rounded-full text-white uppercase shadow-sm">
                  {project?.projectType || 'SaaS'}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#3D4852] truncate">{project?.title}</h3>
                {project?.wizardAnswers?.problemStatement && (
                  <p className="text-[11px] text-[#6B7280] mt-0.5 line-clamp-2 leading-relaxed">
                    {project.wizardAnswers.problemStatement}
                  </p>
                )}
              </div>

              {project?.wizardAnswers?.coreFeatures && project.wizardAnswers.coreFeatures.length > 0 && (
                <div className="pt-2 border-t border-black/5 flex flex-col gap-1 overflow-hidden">
                  <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-mono font-bold">Core Features</span>
                  <div className="flex flex-wrap gap-1">
                    {project.wizardAnswers.coreFeatures.slice(0, 3).map((f, i) => (
                      <span key={i} className="neumorphic-inset rounded-full px-2.5 py-0.5 text-[9.5px] text-[#3D4852] font-semibold truncate max-w-[120px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="liquid-glass rounded-3xl p-4 space-y-2 flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
              <div className="space-y-0.5 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-[#3D4852]">
                  <Lightbulb className="w-3.5 h-3.5 text-[#6C63FF]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Suggested Questions</span>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">
                  Click any prompt to trigger actions:
                </p>
              </div>

              <div className="space-y-2 p-0.5 overflow-y-auto hover-scrollbar custom-scrollbar flex-1 min-h-0">
                {[
                  { label: "Analyze website URL (e.g. https://stripe.com)", icon: ExternalLink },
                  { label: "Add Stripe Integration skill to project", icon: Bot },
                  { label: "Download PRD in PDF format", icon: FileText },
                  { label: "Download all project files (.zip)", icon: FileText },
                  { label: "Download DB Schema as Excel (.csv)", icon: Layers }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleSend(label)}
                    className="w-full text-left neumorphic-btn rounded-2xl px-3 py-2 text-[11px] text-[#3D4852] font-semibold flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-2">{label}</span>
                    <Icon className="w-3 h-3 text-[#6C63FF] flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden liquid-glass rounded-3xl">
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 hover-scrollbar custom-scrollbar">
              {dragError && (
                <div className="neumorphic-inset rounded-2xl p-3 flex items-center justify-between text-xs text-rose-600 font-bold">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{dragError}</span>
                  </div>
                  <button onClick={() => setDragError('')} className="text-rose-600 cursor-pointer">
                    ✕
                  </button>
                </div>
              )}

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl neumorphic-inset-deep flex items-center justify-center mx-auto text-[#6C63FF]">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-sm font-extrabold text-[#3D4852] tracking-tight">Welcome! I'm your AI Co-founder</h3>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Ask me anything about <strong className="text-[#3D4852] font-bold">{project?.title || 'your project'}</strong>, edit docs, or download project files!
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center max-w-md pt-1">
                    {["Download all project files", "Download PRD as Word", "Download DB Schema as Excel"].map(s => (
                      <button key={s} onClick={() => handleSend(s)} className="neumorphic-btn rounded-full px-3 py-1 text-[10.5px] text-[#3D4852] font-bold cursor-pointer">{s}</button>
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
                <div className="text-center py-1 flex items-center justify-center">
                  <div className="neumorphic-inset px-4 py-2 rounded-2xl text-[11px] text-amber-700 font-bold inline-flex items-center gap-2.5">
                    <span>{error}</span>
                    <button
                      onClick={handleRetry}
                      disabled={isSending}
                      className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                      title="Retry last prompt"
                    >
                      <RotateCcw className="w-3 h-3 text-white" />
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-[#E0E5EC] border-t border-black/5 flex-shrink-0 rounded-b-3xl overflow-hidden">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
