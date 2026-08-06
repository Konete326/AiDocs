import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Send, Loader2, Code2, Eye, Wand2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import DraftAutoSaveToast from '../components/marketplace/DraftAutoSaveToast';
import PresetStarters from '../components/marketplace/PresetStarters';
import { formatCode } from '../utils/codeFormatter';
import { captureComponentSnapshot } from '../utils/thumbnailCapturer';
import { validateCode } from '../utils/codeValidator';

const categories = ['Buttons', 'Checkboxes', 'Toggle switches', 'Cards', 'Loaders', 'Inputs', 'Radio buttons', 'Forms', 'Patterns', 'Tooltips', 'UI Kits', 'Themes'];

const CreateComponent = () => {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Buttons');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [synthesizing, setSynthesizing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [splitRatio, setSplitRatio] = useState('50/50');
  const [sideBySide, setSideBySide] = useState(false);

  const codeErrors = validateCode(html, css);

  const handleRestore = (d) => {
    if (d.title) setTitle(d.title); if (d.category) setCategory(d.category);
    if (d.html) setHtml(d.html); if (d.css) setCss(d.css); if (d.aiPrompt) setAiPrompt(d.aiPrompt);
  };

  const handleFormatCode = () => {
    const { formattedHtml, formattedCss } = formatCode(html, css);
    setHtml(formattedHtml); setCss(formattedCss); toast.success('Code formatted cleanly!');
  };

  const handleSynthesize = async () => {
    if (!html && !css) return toast.error('Provide HTML or CSS code first.');
    setSynthesizing(true);
    try {
      const res = await api.post('/ui-components/synthesize-prompt', { html, css });
      if (res.data?.success) { setAiPrompt(res.data.data.aiPrompt); toast.success('AI Prompt synthesized!'); }
    } catch { toast.error('Failed to synthesize prompt.'); } finally { setSynthesizing(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error('Title is required.');
    setPublishing(true);
    try {
      let finalAiPrompt = aiPrompt.trim();
      if (!finalAiPrompt && (html || css)) {
        try {
          const synthRes = await api.post('/ui-components/synthesize-prompt', { html, css });
          if (synthRes.data?.success && synthRes.data?.data?.aiPrompt) finalAiPrompt = synthRes.data.data.aiPrompt;
        } catch {}
      }
      if (!finalAiPrompt) finalAiPrompt = `Interactive ${category} component titled "${title}" built with HTML and CSS styling.`;

      const thumbnail = await captureComponentSnapshot(iframeRef.current);
      const res = await api.post('/ui-components', { title, category, code: { html, css }, aiPrompt: finalAiPrompt, framework: 'CSS', thumbnail });
      if (res.data?.success) {
        localStorage.removeItem('clarifyai_component_draft');
        toast.success('Component published (+10 PTS)!');
        navigate('/components');
      } else {
        toast.error(res.data?.error || 'Failed to publish.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please sign in again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Error publishing component.');
      }
    } finally { setPublishing(false); }
  };

  const previewDoc = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><style>body { background-color: #E0E5EC; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; } ${css}</style></head><body>${html}</body></html>`;

  let gridCols = 'lg:grid-cols-2';
  if (splitRatio === '30/70') gridCols = 'lg:grid-cols-[1fr_2.3fr]';
  if (splitRatio === '70/30') gridCols = 'lg:grid-cols-[2.3fr_1fr]';

  return (
    <div className="min-h-screen bg-[#E0E5EC] pt-6 pb-12 px-6 md:px-8 w-full max-w-none flex flex-col">
      <DraftAutoSaveToast currentData={{ title, category, html, css, aiPrompt }} onRestore={handleRestore} />

      <div className="flex items-center justify-between gap-4 mb-4">
        <button onClick={() => navigate('/components')} className="px-4 py-2 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
          <ArrowLeft className="w-4 h-4 text-blue-600" /><span>Back to Marketplace</span>
        </button>
        <h1 className="text-xl font-extrabold text-[#3D4852]">Submit New UI Component</h1>

        <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
          {['50/50', '30/70', '70/30'].map((r) => (
            <button key={r} type="button" onClick={() => setSplitRatio(r)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${splitRatio === r ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]' : 'text-[#6B7280]'}`}>{r}</button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${gridCols} gap-6 w-full flex-1`}>
        <div className="bg-[#E0E5EC] rounded-[32px] p-5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex flex-col gap-3">
          <PresetStarters onSelectPreset={(p) => { setTitle(p.name); setCategory(p.category); setHtml(p.html); setCss(p.css); setAiPrompt(p.aiPrompt); }} />

          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-bold text-[#3D4852] block mb-1">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Glowing Button" className="w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none" required /></div>
            <div><label className="text-xs font-bold text-[#3D4852] block mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#3D4852]">HTML & CSS Code</label>
              <button type="button" onClick={handleFormatCode} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"><Wand2 className="w-3 h-3" />Format Code</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <textarea rows={4} value={html} onChange={(e) => setHtml(e.target.value)} placeholder="HTML..." className={`w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-none ${codeErrors.some(err => err.type === 'html') ? 'border border-red-400' : ''}`} />
              <textarea rows={4} value={css} onChange={(e) => setCss(e.target.value)} placeholder="CSS..." className={`w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-none ${codeErrors.some(err => err.type === 'css') ? 'border border-red-400' : ''}`} />
            </div>

            {codeErrors.length > 0 && (
              <div className="mt-2 p-2 bg-red-50/70 border border-red-200 rounded-xl text-[11px] font-semibold text-red-600 flex flex-col gap-1">
                {codeErrors.map((err, idx) => (
                  <span key={idx} className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 flex-shrink-0 text-red-500" />{err.message}</span>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1"><label className="text-xs font-bold text-[#3D4852]">AI Prompt Specification (Auto-synthesized on Publish)</label><button type="button" onClick={handleSynthesize} disabled={synthesizing} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">{synthesizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}Auto-Synthesize</button></div>
            <textarea rows={2.5} value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Optional: Leave blank to auto-synthesize on publish..." className="w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-none" />
          </div>

          <button type="submit" disabled={publishing} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">{publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}Publish Component (+10 PTS)</button>
        </div>

        <div className="bg-[#E0E5EC] rounded-[32px] p-5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-600" />Live Real-time Preview</h3>
            <button type="button" onClick={() => setSideBySide(!sideBySide)} className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${sideBySide ? 'bg-blue-600 text-white shadow-md' : 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'}`}><Code2 className="w-3.5 h-3.5" />Side Code</button>
          </div>

          <div className={`flex-1 flex ${sideBySide ? 'flex-row gap-3' : 'flex-col'} overflow-hidden`}>
            {sideBySide && (
              <div className="w-1/2 p-3 bg-white/40 rounded-2xl border border-white/40 overflow-y-auto font-mono text-xs text-[#3D4852]">
                <h4 className="font-bold text-[11px] text-blue-600 mb-1">HTML</h4><pre className="mb-2 whitespace-pre-wrap">{html}</pre>
                <h4 className="font-bold text-[11px] text-blue-600 mb-1">CSS</h4><pre className="whitespace-pre-wrap">{css}</pre>
              </div>
            )}
            <iframe ref={iframeRef} srcDoc={previewDoc} title="Preview" className={`${sideBySide ? 'w-1/2' : 'w-full'} h-full border-0 rounded-2xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]`} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComponent;
