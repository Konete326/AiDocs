import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Send, Loader2, Code2, Eye, Wand2, AlertTriangle, Sun, Moon, Smartphone, Tablet, Monitor, Save, Maximize2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import PresetStarters from '../components/marketplace/PresetStarters';
import DraftAutoSaveToast from '../components/marketplace/DraftAutoSaveToast';
import { formatHtml, formatCss, formatCode, formatByteSize } from '../utils/codeFormatter';
import { validateCode } from '../utils/codeValidator';
import VsCodeComingSoonModal from '../components/vscode/VsCodeComingSoonModal';

const categories = [
  'Buttons', 'Checkboxes', 'Toggle switches', 'Cards', 'Loaders',
  'Inputs', 'Radio buttons', 'Forms', 'Patterns', 'Tooltips', 'UI Kits', 'Themes'
];

const CreateComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const editId = id || searchParams.get('edit');
  const isEditing = Boolean(editId);

  const iframeRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Buttons');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [initialData, setInitialData] = useState({ title: '', category: 'Buttons', html: '', css: '', aiPrompt: '' });
  const [publishing, setPublishing] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [synthesizing, setSynthesizing] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);
  const [isVsCodeModalOpen, setIsVsCodeModalOpen] = useState(false);
  const [splitRatio, setSplitRatio] = useState('50/50');
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [viewportWidth, setViewportWidth] = useState('100%');
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showIdeModal, setShowIdeModal] = useState(false);

  const codeErrors = validateCode(html, css);

  const isFormDirty = Boolean(title.trim() || html.trim() || css.trim()) &&
    (title !== initialData.title || category !== initialData.category || html !== initialData.html || css !== initialData.css || aiPrompt !== initialData.aiPrompt);

  const handleBackClick = () => {
    if (isFormDirty) {
      setShowUnsavedModal(true);
    } else {
      navigate('/components');
    }
  };

  useEffect(() => {
    if (!editId) return;
    const fetchExistingComponent = async () => {
      setLoadingEdit(true);
      try {
        const res = await api.get(`/ui-components/${editId}`);
        if (res.data?.success) {
          const comp = res.data.data;
          const loadedTitle = comp.title || '';
          const loadedCat = comp.category || 'Buttons';
          const loadedHtml = comp.code?.html || comp.code?.tailwind || '';
          const loadedCss = comp.code?.css || '';
          const loadedPrompt = comp.aiPrompt || '';

          setTitle(loadedTitle);
          setCategory(loadedCat);
          setHtml(loadedHtml);
          setCss(loadedCss);
          setAiPrompt(loadedPrompt);
          setInitialData({
            title: loadedTitle,
            category: loadedCat,
            html: loadedHtml,
            css: loadedCss,
            aiPrompt: loadedPrompt
          });
        }
      } catch {
        toast.error('Failed to load component data for editing.');
      } finally {
        setLoadingEdit(false);
      }
    };
    fetchExistingComponent();
  }, [editId]);

  const handleFormatHtml = () => {
    if (!html.trim()) return;
    setHtml(formatHtml(html));
    toast.success('HTML formatted cleanly!');
  };

  const handleFormatCss = () => {
    if (!css.trim()) return;
    setCss(formatCss(css));
    toast.success('CSS formatted cleanly!');
  };

  const handleFormatCode = () => {
    const { formattedHtml, formattedCss } = formatCode(html, css);
    setHtml(formattedHtml);
    setCss(formattedCss);
    toast.success('Code formatted cleanly!');
  };

  const handleSynthesize = async () => {
    if (!html.trim() && !css.trim()) {
      toast.error('Add HTML/CSS code before auto-synthesizing AI prompt.');
      return;
    }
    setSynthesizing(true);
    try {
      const res = await api.post('/ui-components/synthesize-prompt', { html, css, category });
      if (res.data?.success && res.data?.data?.aiPrompt) {
        setAiPrompt(res.data.data.aiPrompt);
        toast.success('AI Prompt synthesized!');
      }
    } catch {
      toast.error('Failed to synthesize prompt.');
    } finally {
      setSynthesizing(false);
    }
  };

  const handleDuplicateAsNew = async () => {
    if (!title.trim() || !html.trim()) {
      toast.error('Title and HTML code are required!');
      return;
    }

    setDuplicating(true);
    try {
      let finalAiPrompt = aiPrompt.trim();
      if (!finalAiPrompt) {
        finalAiPrompt = `Interactive ${category} UI component titled "${title}". Features clean HTML structure, Tailwind styling, and custom CSS rules with full visual fidelity and responsive layout.`;
      }

      const dupTitle = title.endsWith('(Copy)') ? title : `${title} (Copy)`;
      const res = await api.post('/ui-components', {
        title: dupTitle,
        category,
        code: { html, css },
        aiPrompt: finalAiPrompt,
        framework: 'CSS'
      });

      if (res.data?.success) {
        toast.success('Component duplicated as new (+10 PTS)!');
        window.dispatchEvent(new CustomEvent('clarifyai_component_created', { detail: { category } }));
        navigate('/components');
      } else {
        toast.error(res.data?.error || 'Failed to duplicate component.');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to duplicate component');
    } finally {
      setDuplicating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !html.trim()) {
      toast.error('Title and HTML code are required!');
      return;
    }

    setPublishing(true);
    try {
      let finalAiPrompt = aiPrompt.trim();
      if (!finalAiPrompt) {
        finalAiPrompt = `Interactive ${category} UI component titled "${title}". Features clean HTML structure, Tailwind styling, and custom CSS rules with full visual fidelity and responsive layout.`;
      }

      if (isEditing) {
        const res = await api.put(`/ui-components/${editId}`, {
          title,
          category,
          code: { html, css, react: html, tailwind: html },
          aiPrompt: finalAiPrompt
        });

        if (res.data?.success) {
          toast.success('Component updated successfully!');
          window.dispatchEvent(new CustomEvent('clarifyai_component_updated', {
            detail: {
              component: res.data.data,
              category: res.data.data?.category || category
            }
          }));
          navigate(`/components/${editId}`);
        } else {
          toast.error(res.data?.error || 'Failed to update component.');
        }
      } else {
        const res = await api.post('/ui-components', {
          title,
          category,
          code: { html, css },
          aiPrompt: finalAiPrompt,
          framework: 'CSS'
        });

        if (res.data?.success) {
          localStorage.removeItem('clarifyai_component_draft');
          toast.success('Component published successfully (+10 PTS)!');
          window.dispatchEvent(new CustomEvent('clarifyai_component_created', { detail: { category } }));
          navigate('/components');
        } else {
          toast.error(res.data?.error || 'Failed to publish component.');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to process component');
    } finally {
      setPublishing(false);
    }
  };

  const handleRestore = (draft) => {
    if (draft.title) setTitle(draft.title);
    if (draft.category) setCategory(draft.category);
    if (draft.html) setHtml(draft.html);
    if (draft.css) setCss(draft.css);
    if (draft.aiPrompt) setAiPrompt(draft.aiPrompt);
  };

  const previewDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; scrollbar-width: none !important; -ms-overflow-style: none !important; }
    *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; background-color: ${isPreviewDark ? '#1E293B' : '#E0E5EC'}; display: flex; align-items: center; justify-content: center; overflow: hidden; font-family: system-ui, -apple-system, sans-serif; transition: background-color 0.3s ease; }
    #stage { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    #preview-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; width: max-content; height: max-content; padding: 16px; box-sizing: border-box; transform-origin: center center; transition: transform 0.15s ease-out; }
    #preview-wrapper > * { margin-left: auto !important; margin-right: auto !important; }
    ${css}
  </style>
</head>
<body>
  <div id="stage">
    <div id="preview-wrapper">${html}</div>
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

  let gridCols = 'lg:grid-cols-2';
  if (splitRatio === '30/70') gridCols = 'lg:grid-cols-[1fr_2.3fr]';
  if (splitRatio === '70/30') gridCols = 'lg:grid-cols-[2.3fr_1fr]';

  if (loadingEdit) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
        <span className="text-xs font-bold text-[#3D4852]">Loading component for editing...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E0E5EC] pt-6 pb-12 px-6 md:px-8 w-full max-w-none flex flex-col">
      {!isEditing && <DraftAutoSaveToast currentData={{ title, category, html, css, aiPrompt }} onRestore={handleRestore} />}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <button onClick={handleBackClick} className="px-4 py-2 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-blue-600" /><span>Back to Marketplace</span>
          </button>
          <button
            type="button"
            onClick={() => setIsVsCodeModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-[4px_4px_10px_rgba(37,99,235,0.35)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30"
          >
            <Code2 className="w-4 h-4 text-white" />
            <span>Edit in VS Code</span>
          </button>
        </div>

        <h1 className="text-xl font-extrabold text-[#3D4852]">{isEditing ? 'Edit UI Component' : 'Submit New UI Component'}</h1>

        <div className="flex items-center gap-1 bg-[#E0E5EC] p-1 rounded-xl shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20">
          {[
            { id: 'mobile', width: '375px', label: 'Mobile (375px)', icon: Smartphone },
            { id: 'tablet', width: '768px', label: 'Tablet (768px)', icon: Tablet },
            { id: 'full', width: '100%', label: 'Desktop (Full)', icon: Monitor }
          ].map((v) => {
            const Icon = v.icon;
            const isActive = viewportWidth === v.width;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setViewportWidth(v.width)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                    ? 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] border border-blue-400/30'
                    : 'text-[#6B7280] hover:text-[#3D4852]'
                  }`}
                title={`Switch preview to ${v.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${gridCols} gap-6 w-full flex-1`}>
        <div className="bg-[#E0E5EC] rounded-[32px] p-5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex flex-col gap-3">
          {!isEditing && (
            <PresetStarters selectedCategory={category} onSelectPreset={(p) => { setTitle(p.name); setCategory(p.category); setHtml(p.html); setCss(p.css); setAiPrompt(p.aiPrompt); }} />
          )}

          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-bold text-[#3D4852] block mb-1">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Glowing Button" className="w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none" required /></div>
            <div><label className="text-xs font-bold text-[#3D4852] block mb-1">Category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#3D4852]">HTML & CSS Code</label>
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" onClick={handleFormatHtml} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"><Wand2 className="w-3 h-3" />Format HTML</button>
                <button type="button" onClick={handleFormatCss} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"><Wand2 className="w-3 h-3" />Format CSS</button>
                <button type="button" onClick={handleFormatCode} className="text-[11px] font-bold text-[#6B7280] hover:text-[#3D4852] flex items-center gap-1 cursor-pointer"><Wand2 className="w-3 h-3" />Format Both</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <textarea rows={8} value={html} onChange={(e) => setHtml(e.target.value)} placeholder="HTML..." className={`w-full p-3 bg-[#E0E5EC] rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-y min-h-[160px] ${codeErrors.some(err => err.type === 'html') ? 'border border-red-400' : ''}`} />
              <textarea rows={8} value={css} onChange={(e) => setCss(e.target.value)} placeholder="CSS..." className={`w-full p-3 bg-[#E0E5EC] rounded-xl text-xs font-mono text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-y min-h-[160px] ${codeErrors.some(err => err.type === 'css') ? 'border border-red-400' : ''}`} />
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
            <textarea rows={4} value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Optional: Leave blank to auto-synthesize on publish..." className="w-full p-3 bg-[#E0E5EC] rounded-xl text-xs text-[#3D4852] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] focus:outline-none resize-y min-h-[100px]" />
          </div>

          {isEditing ? (
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="submit"
                disabled={publishing}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{publishing ? 'Saving...' : 'Save Update'}</span>
              </button>

              <button
                type="button"
                onClick={handleBackClick}
                className="w-full py-2.5 bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-red-500" />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <button type="submit" disabled={publishing} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-[4px_4px_8px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
              {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{publishing ? 'Publishing...' : 'Publish Component (+10 PTS)'}</span>
            </button>
          )}
        </div>

        <div className="bg-[#E0E5EC] rounded-[32px] p-5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex flex-col h-full min-h-[500px]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-600" />Live Real-time Preview</h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0E5EC] text-blue-600 shadow-[inset_1.5px_1.5px_3px_rgba(163,177,198,0.5),inset_-1.5px_-1.5px_3px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20" title="Dynamic Code Byte Size">
                {formatByteSize(html, css)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsPreviewDark(!isPreviewDark)} className="px-2.5 py-1 rounded-xl bg-[#E0E5EC] text-[#3D4852] font-bold text-xs shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer hover:text-blue-600">
                {isPreviewDark ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                <span>{isPreviewDark ? 'Light' : 'Dark'}</span>
              </button>

              <button type="button" onClick={() => setSideBySide(!sideBySide)} className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${sideBySide ? 'bg-blue-600 text-white shadow-md' : 'bg-[#E0E5EC] text-blue-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6),-3px_-3px_6px_rgba(255,255,255,0.5)]'}`}><Code2 className="w-3.5 h-3.5" />Side Code</button>
            </div>
          </div>

          <div className={`flex-1 flex ${sideBySide ? 'flex-row gap-3' : 'flex-col'} overflow-hidden items-center justify-center relative w-full h-full min-h-[380px] bg-[#E0E5EC] p-3 rounded-2xl shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30`}>
            {sideBySide && (
              <div className="w-1/2 p-3 bg-white/40 rounded-2xl border border-white/40 overflow-y-auto font-mono text-xs text-[#3D4852] h-full">
                <h4 className="font-bold text-[11px] text-blue-600 mb-1">HTML</h4><pre className="mb-2 whitespace-pre-wrap">{html}</pre>
                <h4 className="font-bold text-[11px] text-blue-600 mb-1">CSS</h4><pre className="whitespace-pre-wrap">{css}</pre>
              </div>
            )}
            <div
              style={{
                width: viewportWidth === '100%' ? '100%' : viewportWidth,
                maxWidth: '100%',
                height: '100%',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className={`flex flex-col items-center justify-center mx-auto relative ${sideBySide ? 'w-1/2' : ''
                } ${viewportWidth !== '100%'
                  ? 'border-4 border-[#3D4852] rounded-[28px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] bg-[#E0E5EC] overflow-hidden p-1'
                  : 'rounded-2xl overflow-hidden'
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
              <iframe
                ref={iframeRef}
                srcDoc={previewDoc}
                title="Preview"
                className="w-full flex-1 border-0 rounded-b-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </form>

      {showUnsavedModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#E0E5EC] rounded-[28px] p-6 max-w-md w-full shadow-[12px_12px_24px_rgba(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.7)] border border-[#A3B1C6]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] border border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#3D4852]">Unsaved Changes</h3>
                <p className="text-xs text-[#6B7280]">You have unsaved edits in progress.</p>
              </div>
            </div>
            <p className="text-xs text-[#3D4852] font-medium bg-[#E0E5EC] p-3 rounded-xl shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.5)] mb-5 border border-[#A3B1C6]/20">
              Are you sure you want to leave without saving? Any unsaved edits will be discarded.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowUnsavedModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#3D4852] bg-[#E0E5EC] hover:bg-white/50 shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 cursor-pointer"
              >
                Keep Editing
              </button>
              <button
                onClick={() => {
                  setShowUnsavedModal(false);
                  navigate('/components');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-[3px_3px_6px_rgba(220,38,38,0.3)] cursor-pointer"
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <VsCodeComingSoonModal isOpen={isVsCodeModalOpen} onClose={() => setIsVsCodeModalOpen(false)} />
    </div>
  );
};

export default CreateComponent;
