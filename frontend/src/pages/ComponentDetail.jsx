import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Code2, Maximize2, Loader2, Eye, Sun, Moon, Award, Smartphone, Tablet, Monitor } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import UserAvatar from '../components/common/UserAvatar';
import FullScreenSandboxModal from '../components/marketplace/FullScreenSandboxModal';
import LiveCodeEditor from '../components/marketplace/LiveCodeEditor';
import EmbedSnippetModal from '../components/marketplace/EmbedSnippetModal';
import PromptModal from '../components/marketplace/PromptModal';
import { buildAgentPromptContext } from '../utils/agentPromptBuilder';

const ComponentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [viewportWidth, setViewportWidth] = useState('100%');

  useEffect(() => {
    const fetchComp = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/ui-components/${id}`);
        if (res.data?.success) {
          setComponent(res.data.data);
          setHtmlCode(res.data.data?.code?.html || res.data.data?.code?.tailwind || '');
          setCssCode(res.data.data?.code?.css || '');
        } else { toast.error('Component not found.'); }
      } catch { toast.error('Failed to load component.'); } finally { setLoading(false); }
    };
    fetchComp();
  }, [id]);

  const handleCopyAgentContext = () => {
    if (!component) return;
    const text = buildAgentPromptContext({ ...component, code: { html: htmlCode, css: cssCode } });
    navigator.clipboard.writeText(text);
    toast.success('Copied Cursor / Claude AI Agent Prompt Context!');
  };

  const getPreviewDoc = () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; scrollbar-width: none !important; -ms-overflow-style: none !important; }
    *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: ${isPreviewDark ? '#1E293B' : '#E0E5EC'};
      color: ${isPreviewDark ? '#F8FAFC' : '#3D4852'};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    #stage {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    #preview-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: max-content;
      height: max-content;
      padding: 20px;
      box-sizing: border-box;
      transform-origin: center center;
      transition: transform 0.15s ease-out;
    }
    #preview-wrapper > * {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    ${cssCode}
  </style>
</head>
<body>
  <div id="stage">
    <div id="preview-wrapper">${htmlCode}</div>
  </div>
  <script>
    (function() {
      function autoFit() {
        var wrapper = document.getElementById('preview-wrapper');
        var stage = document.getElementById('stage');
        if (!wrapper || !stage) return;
        wrapper.style.transform = 'none';

        var rect = wrapper.getBoundingClientRect();
        var contentW = rect.width || wrapper.offsetWidth || 1;
        var contentH = rect.height || wrapper.offsetHeight || 1;

        var availW = stage.clientWidth - 32;
        var availH = stage.clientHeight - 32;

        var scaleW = availW / contentW;
        var scaleH = availH / contentH;
        var scale = Math.min(scaleW, scaleH, 0.92);

        wrapper.style.transform = 'scale(' + Math.max(0.2, scale) + ')';
      }
      if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', autoFit); } else { autoFit(); }
      setTimeout(autoFit, 50); setTimeout(autoFit, 150); setTimeout(autoFit, 300); window.addEventListener('resize', autoFit);
    })();
  </script>
</body>
</html>`;

  if (loading) return <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!component) return <div className="min-h-screen bg-[#E0E5EC] p-8 text-center pt-24"><h2 className="text-[#3D4852] font-bold text-xl mb-4">Component not found</h2><button onClick={() => navigate('/components')} className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-bold">Back to Components</button></div>;

  const handleCreatorClick = () => {
    const creatorId = component.creator?._id || component.creator?.id || component.creator;
    if (creatorId) navigate(`/profile/${creatorId}`);
  };

  return (
    <div className="min-h-screen bg-[#E0E5EC] pt-4 pb-12 px-6 md:px-8 w-full max-w-none">
      <div className="w-full max-w-none">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="px-3.5 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" /><span>Back</span>
            </button>
            <button onClick={() => navigate('/components')} className="px-3.5 py-1.5 bg-[#E0E5EC] text-blue-600 font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all cursor-pointer">
              Marketplace
            </button>
          </div>

          <div onClick={handleCreatorClick} className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity bg-[#E0E5EC] px-3.5 py-1.5 rounded-2xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30" title={`View all components by ${component.creator?.displayName || 'Creator'}`}>
            <UserAvatar user={component.creator} size="sm" />
            <span className="font-bold text-xs text-[#3D4852] hover:text-blue-600 transition-colors">{component.creator?.displayName || 'Creator'}</span>
            <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3 text-blue-600" /> {component.creator?.creatorPoints || 0} PTS
            </span>
          </div>
        </div>

        <div className="bg-[#E0E5EC] rounded-[28px] p-5 md:p-6 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0E5EC] text-blue-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]">{component.category}</span>
              <h1 className="text-xl md:text-2xl font-extrabold text-[#3D4852]">{component.title}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsPromptOpen(true)} className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-3.5 h-3.5" /><span>Get AI Prompt</span>
              </button>
              <button onClick={() => setIsEmbedOpen(true)} className="px-3.5 py-2 bg-[#E0E5EC] text-blue-600 font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                <Code2 className="w-3.5 h-3.5 text-blue-600" /><span>Embed</span>
              </button>
              <button onClick={() => setIsFullScreen(true)} className="px-3.5 py-2 bg-[#E0E5EC] text-[#3D4852] hover:text-blue-600 font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" /><span>Full-Screen</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#E0E5EC] rounded-2xl p-4 shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] min-h-[420px] flex flex-col">
              <div className="flex flex-wrap items-center justify-between text-xs text-[#6B7280] font-bold mb-3 gap-2">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-600" /> Live Interactive Preview</span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20">
                    {[
                      { id: 'mobile', width: '375px', label: '375px', icon: Smartphone },
                      { id: 'tablet', width: '768px', label: '768px', icon: Tablet },
                      { id: 'full', width: '100%', label: 'Full', icon: Monitor }
                    ].map((v) => {
                      const Icon = v.icon;
                      const isActive = viewportWidth === v.width;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setViewportWidth(v.width)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isActive
                              ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'
                              : 'text-[#6B7280] hover:text-[#3D4852]'
                          }`}
                          title={`Preview at ${v.label}`}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="hidden sm:inline">{v.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setIsPreviewDark(!isPreviewDark)}
                    className="px-2.5 py-1 rounded-xl bg-[#E0E5EC] text-[#3D4852] font-bold text-xs shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer hover:text-blue-600"
                    title="Toggle Light / Dark Preview Theme"
                  >
                    {isPreviewDark ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                    <span>{isPreviewDark ? 'Light' : 'Dark'}</span>
                  </button>
                </div>
              </div>

              <div
                style={{
                  width: viewportWidth === '100%' ? '100%' : viewportWidth,
                  maxWidth: '100%',
                  height: '100%',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className={`flex flex-col items-center justify-center mx-auto relative min-h-[340px] ${
                  viewportWidth !== '100%'
                    ? 'border-4 border-[#3D4852] rounded-[28px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] bg-[#E0E5EC] overflow-hidden p-1'
                    : 'w-full h-full rounded-xl overflow-hidden'
                }`}
              >
                {viewportWidth !== '100%' && (
                  <div className="w-full flex items-center justify-center py-1 bg-[#3D4852] text-[10px] font-bold text-gray-300 rounded-t-xl gap-1.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="ml-2 font-mono text-[9px]">{viewportWidth === '375px' ? 'Mobile View — 375px' : 'Tablet View — 768px'}</span>
                  </div>
                )}
                <iframe srcDoc={getPreviewDoc()} title="Preview" scrolling="no" className="w-full flex-1 border-0 rounded-b-xl overflow-hidden" />
              </div>
            </div>

            <LiveCodeEditor htmlCode={htmlCode} setHtmlCode={setHtmlCode} cssCode={cssCode} setCssCode={setCssCode} creatorName={component?.creator?.displayName || component?.creator?.username || 'Founder'} componentId={component?._id || ''} />
          </div>
        </div>
      </div>

      {isPromptOpen && <PromptModal rawPrompt={component.aiPrompt} component={component} onClose={() => setIsPromptOpen(false)} />}
      {isFullScreen && <FullScreenSandboxModal htmlCode={htmlCode} cssCode={cssCode} title={component.title} onClose={() => setIsFullScreen(false)} />}
      {isEmbedOpen && <EmbedSnippetModal componentId={component._id} title={component.title} onClose={() => setIsEmbedOpen(false)} />}
    </div>
  );
};

export default ComponentDetail;
