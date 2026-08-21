import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bot, FileText, Layers, Lightbulb, Trash2, UploadCloud, AlertCircle, Sparkles, ShieldCheck, Milestone, Cpu, Download, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [proj, sub, history] = await Promise.all([
          getProject(id).catch(() => ({ _id: id, title: 'Project Assistant', projectType: 'SaaS' })),
          getMySubscription().catch(() => null),
          getChatHistory(id).catch(() => [])
        ]);
        setProject(proj);
        setSubscription(sub);
        if (history && history.length > 0) setMessages(history);
      } catch (err) {
        setProject({ _id: id, title: 'Project Assistant', projectType: 'SaaS' });
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const handleSend = async (content, attachments = []) => {
    if ((!content.trim() && attachments.length === 0) || isSending) return;
    setError('');

    const optimisticUserMsg = {
      role: 'user',
      content: content.trim(),
      attachments,
      createdAt: new Date().toISOString()
    };

    const optimisticThinkingMsg = {
      role: 'assistant',
      content: '...',
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, optimisticUserMsg, optimisticThinkingMsg]);
    setIsSending(true);

    try {
      const res = await sendChatMessage(id, content, attachments);
      const assistantMsg = res?.data?.assistantMessage || {
        role: 'assistant',
        content: res?.data?.message || 'Response received.',
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0 && updated[lastIdx].content === '...') {
          updated[lastIdx] = assistantMsg;
        } else {
          updated.push(assistantMsg);
        }
        return updated;
      });
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.content !== '...'));
      setError(err?.response?.data?.message || 'Failed to get response from AI Co-founder.');
    } finally {
      setIsSending(false);
    }
  };

  const handleEditUserMessage = (msgIndex, newContent) => {
    const updatedMessages = messages.slice(0, msgIndex);
    setMessages(updatedMessages);
    handleSend(newContent, []);
  };

  const handleDeleteHistory = async () => {
    try {
      await deleteChatHistory(id);
      setMessages([]);
      setShowDeleteConfirm(false);
    } catch (err) {
      setError('Failed to clear chat history.');
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
          <div className="neumorphic-card bg-[#E0E5EC] rounded-3xl p-6 w-full max-w-sm text-center relative z-10 shadow-2xl border border-[#CAD1DB]">
            <h3 className="text-sm font-bold text-[#3D4852]">Delete Chat History?</h3>
            <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
              Are you sure you want to delete all chat history for this project?
            </p>
            <div className="flex gap-2 justify-center mt-5">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="neumorphic-btn rounded-xl px-4 py-2 text-xs font-bold text-[#6B7280] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteHistory}
                className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-4 py-2 text-xs font-bold cursor-pointer shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col pt-20 sm:pt-24 pb-3 px-3 sm:px-6 max-w-7xl w-full mx-auto overflow-hidden">
        <header className="flex items-center justify-between mb-2.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/projects/${id}`)} className="neumorphic-btn rounded-2xl px-3.5 py-1.5 flex items-center gap-1.5 text-xs text-[#3D4852] font-bold cursor-pointer">
              <ChevronLeft className="w-4 h-4 text-[#3D4852]" /> Back
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`neumorphic-btn rounded-2xl px-3 py-1.5 hidden lg:flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all ${
                isSidebarOpen ? 'text-[#6C63FF]' : 'text-[#3D4852]'
              }`}
              title={isSidebarOpen ? 'Close project sidebar' : 'Open project sidebar'}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-3.5 h-3.5 text-[#6C63FF]" /> : <PanelLeftOpen className="w-3.5 h-3.5 text-[#6C63FF]" />}
              <span>{isSidebarOpen ? 'Hide Info' : 'Show Info'}</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-extrabold text-[#3D4852] truncate max-w-[160px] sm:max-w-md">
                {project?.title}
              </h1>
              <span className="text-xs text-[#6B7280] font-medium hidden sm:inline">• AI Co-founder</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="neumorphic-btn rounded-2xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-bold cursor-pointer hover:bg-rose-50"
              title="Delete chat history"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>

            {messages.some(m => m.isMcpAgent || m.content?.includes('[Antigravity IDE Agent]')) && (
              <div className="neumorphic-inset rounded-full px-3 py-1 flex items-center gap-1.5 text-[9.5px] text-[#6C63FF] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-ping" />
                <span>IDE Agent Synced</span>
              </div>
            )}
            <div className="neumorphic-inset rounded-full px-3 py-1 flex items-center gap-1.5 text-[9.5px] text-[#38B2AC] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B2AC] animate-ping" />
              <span>Grounded AI Engine</span>
            </div>
          </div>
        </header>

        <div 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="flex gap-4 flex-1 min-h-0 overflow-hidden relative"
        >
          {isDragging && (
            <div className="absolute inset-0 bg-[#6C63FF]/20 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#6C63FF] z-50 flex flex-col items-center justify-center space-y-2 text-[#3D4852] pointer-events-none shadow-2xl">
              <UploadCloud className="w-12 h-12 text-[#6C63FF] animate-bounce" />
              <h3 className="text-sm font-bold text-[#3D4852]">Drop files to attach & analyze</h3>
              <p className="text-[11px] text-[#6B7280]">Images and Document files supported (max 8 files)</p>
            </div>
          )}

          <div className={`${isSidebarOpen ? 'w-72 xl:w-80' : 'w-0 opacity-0 pointer-events-none -ml-4'} flex-shrink-0 h-full overflow-hidden transition-all duration-300 hidden lg:flex flex-col`}>
            <div className="neumorphic-card rounded-3xl p-3.5 flex-1 min-h-0 flex flex-col justify-between overflow-hidden border border-[#CAD1DB] shadow-md">
              <div className="space-y-2.5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl neumorphic-inset flex items-center justify-center text-[#6C63FF]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#6B7280] font-mono font-bold">Project Context</span>
                      <h3 className="text-xs font-black text-[#3D4852] truncate max-w-[140px]">{project?.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] bg-[#6C63FF] font-bold px-2 py-0.5 rounded-full text-white uppercase shadow-sm">
                      {project?.projectType || 'SaaS'}
                    </span>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 rounded-lg text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                      title="Collapse sidebar"
                    >
                      <PanelLeftClose className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {project?.wizardAnswers?.problemStatement && (
                  <div className="neumorphic-inset rounded-2xl p-2">
                    <p className="text-[10px] text-[#6B7280] line-clamp-2 leading-relaxed">
                      {project.wizardAnswers.problemStatement}
                    </p>
                  </div>
                )}

                {project?.wizardAnswers?.coreFeatures && project.wizardAnswers.coreFeatures.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-mono font-bold">Key Features</span>
                    <div className="flex flex-wrap gap-1">
                      {project.wizardAnswers.coreFeatures.slice(0, 3).map((f, i) => (
                        <span key={i} className="neumorphic-inset rounded-lg px-2 py-0.5 text-[9.5px] text-[#3D4852] font-semibold truncate max-w-[120px]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-black/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#3D4852]">
                    <Lightbulb className="w-3.5 h-3.5 text-[#6C63FF]" />
                    <span className="text-[10.5px] font-black uppercase tracking-wider">Quick Actions</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {[
                      { label: "Download all project files (.zip)", icon: Download },
                      { label: "Download PRD in PDF format", icon: FileText },
                      { label: "Download DB Schema as Excel", icon: Layers },
                      { label: "Audit security & access rules", icon: ShieldCheck },
                      { label: "Propose 90-Day MVP Roadmap", icon: Milestone }
                    ].map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => handleSend(label)}
                        className="w-full text-left neumorphic-btn rounded-xl px-2.5 py-1.5 flex items-center justify-between group cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98]"
                        title={label}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 text-[#6C63FF] shrink-0" />
                          <span className="text-[10px] text-[#3D4852] font-bold truncate">{label}</span>
                        </div>
                        <Sparkles className="w-3 h-3 text-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-black/5 flex items-center gap-2 text-[9px] text-[#6B7280] font-medium flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">Grounded with 9 project documents</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden neumorphic-card rounded-3xl border border-[#CAD1DB] shadow-md">
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
                  <div className="w-12 h-12 rounded-2xl neumorphic-inset flex items-center justify-center mx-auto text-[#6C63FF]">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h3 className="text-sm font-extrabold text-[#3D4852] tracking-tight">AI Co-founder Assistant</h3>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Ask anything about <strong className="text-[#3D4852] font-bold">{project?.title || 'your project'}</strong>, edit documents, or generate code artifacts!
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
                <ChatMessage key={i} index={i} message={m} projectId={id} projectTitle={project?.title} onEditUserMessage={handleEditUserMessage} />
              ))}
              {error && (
                <div className="text-center py-1 flex items-center justify-center">
                  <div className="neumorphic-inset px-4 py-2 rounded-2xl text-[11px] text-amber-700 font-bold inline-flex items-center gap-2.5">
                    <span>{error}</span>
                    <button
                      onClick={() => handleSend(messages[messages.length - 1]?.content || '')}
                      disabled={isSending}
                      className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-black/5 flex-shrink-0">
              <ChatInput onSend={handleSend} isDisabled={isSending} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
