import { useState, useRef } from 'react';
import { Minimize2, Sun, Moon, Wand2, Sparkles, Save, Send, Smartphone, Tablet, Monitor, Eye, Code2, AlertTriangle, Layers, RotateCcw, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatHtml, formatCss } from '../../utils/codeFormatter';
import { validateCode } from '../../utils/codeValidator';

const categories = [
  'Buttons', 'Checkboxes', 'Toggle switches', 'Cards', 'Loaders',
  'Inputs', 'Radio buttons', 'Forms', 'Patterns', 'Tooltips', 'UI Kits', 'Themes'
];

const FullScreenIdeModal = ({
  html, setHtml,
  css, setCss,
  title, setTitle,
  category, setCategory,
  aiPrompt, setAiPrompt,
  isEditing,
  onSave,
  onDuplicate,
  onSynthesize,
  publishing,
  duplicating,
  synthesizing,
  onClose
}) => {
  const iframeRef = useRef(null);
  const [activeTab, setActiveTab] = useState('html');
  const [viewMode, setViewMode] = useState('split');
  const [splitRatio, setSplitRatio] = useState('50/50');
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [isIdeDark, setIsIdeDark] = useState(true);
  const [viewportWidth, setViewportWidth] = useState('100%');
  const [copiedCode, setCopiedCode] = useState(false);

  const codeErrors = validateCode(html, css);

  const handleFormatCurrent = () => {
    if (activeTab === 'html') {
      if (!html.trim()) return;
      setHtml(formatHtml(html));
      toast.success('HTML formatted in IDE!');
    } else {
      if (!css.trim()) return;
      setCss(formatCss(css));
      toast.success('CSS formatted in IDE!');
    }
  };

  const handleFormatAll = () => {
    if (html.trim()) setHtml(formatHtml(html));
    if (css.trim()) setCss(formatCss(css));
    toast.success('All IDE code formatted!');
  };

  const handleCopyCurrent = () => {
    const textToCopy = activeTab === 'html' ? html : css;
    navigator.clipboard.writeText(textToCopy || '');
    setCopiedCode(true);
    toast.success(`${activeTab.toUpperCase()} copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const previewDoc = `<!DOCTYPE html>
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
      background-color: ${isPreviewDark ? '#0F172A' : '#E0E5EC'};
      color: ${isPreviewDark ? '#F8FAFC' : '#3D4852'};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
      transition: background-color 0.3s ease;
    }
    #stage { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    #preview-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; width: max-content; height: max-content; padding: 24px; box-sizing: border-box; transform-origin: center center; transition: transform 0.15s ease-out; }
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
        var scale = Math.min(scaleW, scaleH, 0.95);

        wrapper.style.transform = 'scale(' + Math.max(0.15, scale) + ')';
      }
      if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', autoFit); } else { autoFit(); }
      setTimeout(autoFit, 50); setTimeout(autoFit, 150); setTimeout(autoFit, 300); window.addEventListener('resize', autoFit);
    })();
  </script>
</body>
</html>`;

  let editorWidthClass = 'w-1/2';
  let previewWidthClass = 'w-1/2';
  if (viewMode === 'editor') {
    editorWidthClass = 'w-full';
    previewWidthClass = 'hidden';
  } else if (viewMode === 'preview') {
    editorWidthClass = 'hidden';
    previewWidthClass = 'w-full';
  } else {
    if (splitRatio === '30/70') {
      editorWidthClass = 'w-[30%]';
      previewWidthClass = 'w-[70%]';
    } else if (splitRatio === '70/30') {
      editorWidthClass = 'w-[70%]';
      previewWidthClass = 'w-[30%]';
    }
  }

  const htmlLineCount = (html || '').split('\n').length;
  const cssLineCount = (css || '').split('\n').length;
  const activeLineCount = activeTab === 'html' ? htmlLineCount : cssLineCount;

  return (
    <div className={`fixed inset-0 z-[300] flex flex-col ${isIdeDark ? 'bg-[#0F172A] text-slate-100' : 'bg-[#E0E5EC] text-[#3D4852]'} transition-colors duration-300 overflow-hidden font-sans`}>
      <header className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
        isIdeDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 shadow-md'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 font-extrabold text-xs">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>ClarifyAI Studio IDE</span>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Theme / Component Title..."
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border focus:outline-none w-48 md:w-64 ${
              isIdeDark
                ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500'
                : 'bg-[#E0E5EC] border-[#A3B1C6]/40 text-[#3D4852] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)]'
            }`}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border focus:outline-none cursor-pointer ${
              isIdeDark
                ? 'bg-slate-800 border-slate-700 text-slate-100'
                : 'bg-[#E0E5EC] border-[#A3B1C6]/40 text-[#3D4852] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)]'
            }`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${isIdeDark ? 'bg-slate-800 border-slate-700' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 shadow-inner'}`}>
            {['split', 'editor', 'preview'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2.5 py-1 text-[11px] font-bold capitalize rounded-lg transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white shadow-md'
                    : isIdeDark ? 'text-slate-400 hover:text-slate-200' : 'text-[#6B7280]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {viewMode === 'split' && (
            <div className={`flex items-center gap-1 p-1 rounded-xl border ${isIdeDark ? 'bg-slate-800 border-slate-700' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 shadow-inner'}`}>
              {['50/50', '70/30', '30/70'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setSplitRatio(ratio)}
                  className={`px-2 py-1 text-[10px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                    splitRatio === ratio
                      ? 'bg-indigo-600 text-white shadow'
                      : isIdeDark ? 'text-slate-400' : 'text-[#6B7280]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsIdeDark(!isIdeDark)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isIdeDark ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 text-indigo-600 shadow-[3px_3px_6px_rgba(163,177,198,0.6)]'
            }`}
            title="Toggle IDE Theme"
          >
            {isIdeDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onSynthesize}
            disabled={synthesizing}
            className="px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Auto-synthesize AI Prompt specification"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{synthesizing ? 'Synthesizing...' : 'AI Prompt'}</span>
          </button>

          {isEditing ? (
            <>
              <button
                onClick={onSave}
                disabled={publishing}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{publishing ? 'Saving...' : 'Save Updates'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Minimize2 className="w-3.5 h-3.5 text-red-400" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={onSave}
              disabled={publishing}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{publishing ? 'Publishing...' : 'Publish Theme (+10 PTS)'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isIdeDark ? 'bg-slate-800 border-slate-700 text-red-400 hover:bg-red-500/20' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 text-red-500 shadow-[3px_3px_6px_rgba(163,177,198,0.6)]'
            }`}
            title="Exit Fullscreen IDE"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`${editorWidthClass} flex flex-col border-r ${isIdeDark ? 'bg-[#090D16] border-slate-800' : 'bg-[#E0E5EC] border-[#A3B1C6]/30'} transition-all duration-200`}>
          <div className={`px-4 py-2 border-b flex items-center justify-between gap-2 ${
            isIdeDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 text-[#3D4852]'
          }`}>
            <div className="flex items-center gap-1.5">
              {['html', 'css'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow'
                      : isIdeDark ? 'text-slate-400 hover:text-slate-200' : 'text-[#6B7280]'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{tab}</span>
                  <span className="text-[10px] opacity-70">({tab === 'html' ? htmlLineCount : cssLineCount}L)</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFormatCurrent}
                className="px-2.5 py-1 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-bold text-[11px] flex items-center gap-1 border border-blue-500/20 cursor-pointer"
                title={`Format ${activeTab.toUpperCase()}`}
              >
                <Wand2 className="w-3 h-3" />
                <span>Format {activeTab.toUpperCase()}</span>
              </button>

              <button
                onClick={handleFormatAll}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/20 cursor-pointer"
                title="Format HTML & CSS"
              >
                <Wand2 className="w-3 h-3" />
                <span>Format Both</span>
              </button>

              <button
                onClick={handleCopyCurrent}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                title={`Copy ${activeTab.toUpperCase()}`}
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden relative">
            <div className={`w-12 py-3 px-1 text-right font-mono text-[11px] select-none border-r ${
              isIdeDark ? 'bg-slate-950 text-slate-600 border-slate-800/60' : 'bg-[#E0E5EC]/80 text-[#6B7280] border-[#A3B1C6]/30'
            } flex flex-col overflow-hidden`}>
              {Array.from({ length: Math.max(1, activeLineCount) }).map((_, i) => (
                <div key={i} className="h-5 leading-5">{i + 1}</div>
              ))}
            </div>

            <div className="flex-1 h-full overflow-hidden relative">
              {activeTab === 'html' ? (
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="<!-- Write HTML or full theme layout here -->"
                  className={`w-full h-full p-3 font-mono text-xs focus:outline-none resize-none leading-5 ${
                    isIdeDark ? 'bg-[#0B101D] text-emerald-300 selection:bg-blue-500/30' : 'bg-[#E0E5EC]/60 text-[#3D4852]'
                  }`}
                  style={{ whiteSpace: 'pre', tabSize: 2 }}
                />
              ) : (
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  placeholder="/* Write custom CSS styles or Tailwind classes here */"
                  className={`w-full h-full p-3 font-mono text-xs focus:outline-none resize-none leading-5 ${
                    isIdeDark ? 'bg-[#0B101D] text-cyan-300 selection:bg-blue-500/30' : 'bg-[#E0E5EC]/60 text-[#3D4852]'
                  }`}
                  style={{ whiteSpace: 'pre', tabSize: 2 }}
                />
              )}
            </div>
          </div>

          {codeErrors.length > 0 && (
            <div className="px-4 py-2 bg-red-950/80 border-t border-red-800/50 text-[11px] font-mono text-red-300 flex items-center gap-2 overflow-x-auto">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>{codeErrors[0].message}</span>
            </div>
          )}
        </div>

        <div className={`${previewWidthClass} flex flex-col h-full overflow-hidden ${isIdeDark ? 'bg-slate-950' : 'bg-[#E0E5EC]'} transition-all duration-200`}>
          <div className={`px-4 py-2 border-b flex items-center justify-between gap-3 ${
            isIdeDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 text-[#3D4852]'
          }`}>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase">Real-Time Theme Preview</span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 p-0.5 rounded-lg border ${isIdeDark ? 'bg-slate-800 border-slate-700' : 'bg-[#E0E5EC] border-[#A3B1C6]/30 shadow-inner'}`}>
                {[
                  { id: 'mobile', width: '375px', label: 'Mobile', icon: Smartphone },
                  { id: 'tablet', width: '768px', label: 'Tablet', icon: Tablet },
                  { id: 'full', width: '100%', label: 'Desktop', icon: Monitor }
                ].map((v) => {
                  const Icon = v.icon;
                  const isActive = viewportWidth === v.width;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setViewportWidth(v.width)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow'
                          : isIdeDark ? 'text-slate-400' : 'text-[#6B7280]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{v.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsPreviewDark(!isPreviewDark)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                  isIdeDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-[#E0E5EC] border-[#A3B1C6]/30 text-[#3D4852] shadow-sm'
                }`}
              >
                {isPreviewDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
                <span>{isPreviewDark ? 'Light Stage' : 'Dark Stage'}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-hidden flex items-center justify-center relative">
            <div
              style={{
                width: viewportWidth === '100%' ? '100%' : viewportWidth,
                maxWidth: '100%',
                height: '100%',
                transition: 'all 0.3s ease'
              }}
              className={`h-full flex flex-col mx-auto overflow-hidden rounded-xl shadow-2xl border ${
                isIdeDark ? 'border-slate-800 bg-[#0F172A]' : 'border-[#A3B1C6]/40 bg-[#E0E5EC]'
              }`}
            >
              <iframe
                ref={iframeRef}
                srcDoc={previewDoc}
                title="VS Code Online Sandbox Preview"
                className="w-full flex-1 border-0 overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenIdeModal;
