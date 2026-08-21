import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const categories = ['Buttons', 'Checkboxes', 'Toggle switches', 'Cards', 'Loaders', 'Inputs', 'Radio buttons', 'Forms', 'Patterns', 'Tooltips', 'UI Kits', 'Themes'];

const SubmitComponentModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Buttons');
  const [framework, setFramework] = useState('React');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAutoSynthesize = async () => {
    if (!htmlCode && !cssCode) {
      toast.error('Paste HTML or CSS code first to synthesize prompt.');
      return;
    }
    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/ui-components/synthesize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlCode, css: cssCode })
      });
      const data = await res.json();
      if (data.success && data.data.aiPrompt) {
        setAiPrompt(data.data.aiPrompt);
        toast.success('AI Prompt synthesized successfully!');
      } else {
        toast.error('Synthesis failed. Please write prompt manually.');
      }
    } catch {
      toast.error('Error connecting to AI Synthesizer.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !aiPrompt) {
      toast.error('Title, Category, and AI Prompt are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/ui-components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title, category, framework,
          code: { html: htmlCode, css: cssCode, react: htmlCode, tailwind: cssCode },
          aiPrompt, tags: tags.split(',').map((t) => t.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Component published! Earned +10 Creator Points!');
        window.dispatchEvent(new CustomEvent('clarifyai_component_created', { detail: { category } }));
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || 'Failed to publish component.');
      }
    } catch {
      toast.error('Network error during publishing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#E0E5EC] rounded-[32px] w-full max-w-2xl p-6 md:p-8 shadow-[12px_12px_24px_rgba(163,177,198,0.8),-12px_-12px_24px_rgba(255,255,255,0.7)] relative my-8">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-2xl bg-[#E0E5EC] shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)] hover:text-red-500 cursor-pointer">
          <X className="w-5 h-5 text-[#3D4852]" />
        </button>

        <h2 className="text-xl font-extrabold text-[#3D4852] mb-4">Submit New Component (+10 PTS)</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" placeholder="Component Title *" value={title} onChange={(e) => setTitle(e.target.value)} className="p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer">
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select value={framework} onChange={(e) => setFramework(e.target.value)} className="p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer">
              {['CSS', 'Tailwind', 'React', 'Vue', 'Svelte'].map((f) => (<option key={f} value={f}>{f}</option>))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea rows={3} placeholder="HTML Code" value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} className="p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] font-mono shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none" />
            <textarea rows={3} placeholder="CSS Code" value={cssCode} onChange={(e) => setCssCode(e.target.value)} className="p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] font-mono shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-[#3D4852]">AI Prompt for Coding Agent *</label>
              <button type="button" onClick={handleAutoSynthesize} disabled={isSynthesizing} className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-xl text-[11px] font-bold shadow-[2px_2px_4px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center gap-1 cursor-pointer">
                {isSynthesizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Auto-Generate AI Prompt
              </button>
            </div>
            <textarea rows={3} placeholder="Detailed AI Prompt..." value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} className="w-full p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none" />
          </div>

          <input type="text" placeholder="Tags (comma separated, e.g. neumorphism, button, dark)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 bg-[#E0E5EC] rounded-xl text-[#3D4852] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] focus:outline-none" />

          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-[6px_6px_12px_rgba(37,99,235,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Component (+10 PTS)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitComponentModal;
