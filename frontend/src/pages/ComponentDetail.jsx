import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Award, Maximize2, Code2, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import UserAvatar from '../components/common/UserAvatar';
import FullScreenSandboxModal from '../components/marketplace/FullScreenSandboxModal';
import LiveCodeEditor from '../components/marketplace/LiveCodeEditor';
import EmbedSnippetModal from '../components/marketplace/EmbedSnippetModal';
import PromptModal from '../components/marketplace/PromptModal';

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

  const getPreviewDoc = () => `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><style>* { box-sizing: border-box; } html, body { background-color: #E0E5EC; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: sans-serif; } ${cssCode}</style></head><body>${htmlCode}</body></html>`;

  if (loading) return <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!component) return <div className="min-h-screen bg-[#E0E5EC] p-8 text-center pt-24"><h2 className="text-[#3D4852] font-bold text-xl mb-4">Component not found</h2><button onClick={() => navigate('/components')} className="bg-blue-600 text-white px-5 py-2 rounded-2xl font-bold">Back to Components</button></div>;

  const handleCreatorClick = () => {
    const creatorId = component.creator?._id || component.creator?.id || component.creator;
    navigate(`/components?creator=${creatorId}`);
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

          <div onClick={handleCreatorClick} className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity bg-[#E0E5EC] px-3 py-1.5 rounded-2xl shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]">
            <UserAvatar user={component.creator} size="sm" />
            <span className="font-bold text-xs text-[#3D4852]">{component.creator?.displayName || 'Creator'}</span>
            <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> {component.creator?.creatorPoints || 0} PTS
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
              <div className="flex items-center justify-between text-xs text-[#6B7280] font-bold mb-2">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-600" /> Live Interactive Preview</span>
                <span className="text-[11px] text-blue-600 font-semibold">Real-time rendering</span>
              </div>
              <iframe srcDoc={getPreviewDoc()} title="Preview" scrolling="no" className="w-full flex-1 border-0 rounded-xl overflow-hidden" />
            </div>

            <LiveCodeEditor htmlCode={htmlCode} setHtmlCode={setHtmlCode} cssCode={cssCode} setCssCode={setCssCode} />
          </div>
        </div>
      </div>

      {isPromptOpen && <PromptModal rawPrompt={component.aiPrompt} onClose={() => setIsPromptOpen(false)} />}
      {isFullScreen && <FullScreenSandboxModal htmlCode={htmlCode} cssCode={cssCode} title={component.title} onClose={() => setIsFullScreen(false)} />}
      {isEmbedOpen && <EmbedSnippetModal componentId={component._id} title={component.title} onClose={() => setIsEmbedOpen(false)} />}
    </div>
  );
};

export default ComponentDetail;
