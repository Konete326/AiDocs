import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MousePointer, MessageSquare, Send, X, Trash2, CheckCircle2, Sparkles, Eye, Layers } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function Clarifyation() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // Handle element hover & highlight when inspecting
  useEffect(() => {
    if (!isInspecting) {
      setHoveredElement(null);
      return;
    }

    const handleMouseOver = (e) => {
      e.stopPropagation();
      const target = e.target;
      // Skip clarifying overlay elements
      if (target.closest('.clarifyation-widget')) return;

      const rect = target.getBoundingClientRect();
      const selector = target.id 
        ? `#${target.id}` 
        : target.className && typeof target.className === 'string'
          ? `.${target.className.split(' ').filter(Boolean).join('.')}`
          : target.tagName.toLowerCase();

      setHoveredElement({
        rect,
        selector,
        tagName: target.tagName.toLowerCase(),
        text: target.innerText ? target.innerText.slice(0, 40) : '',
        target
      });
    };

    const handleClick = (e) => {
      if (e.target.closest('.clarifyation-widget')) return;
      e.preventDefault();
      e.stopPropagation();

      const target = e.target;
      const rect = target.getBoundingClientRect();
      const selector = target.id 
        ? `#${target.id}` 
        : target.className && typeof target.className === 'string'
          ? `.${target.className.split(' ').filter(Boolean).join('.')}`
          : target.tagName.toLowerCase();

      const newPin = {
        id: Date.now(),
        number: annotations.length + 1,
        elementSelector: selector,
        tagName: target.tagName.toLowerCase(),
        elementText: target.innerText ? target.innerText.slice(0, 60) : '',
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
        bounds: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        url: window.location.pathname,
        comment: ''
      };

      setActivePin(newPin);
      setIsInspecting(false);
      setHoveredElement(null);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick, true);
    };
  }, [isInspecting, annotations]);

  const handleSavePinComment = () => {
    if (!activePin) return;
    const finalPin = { ...activePin, comment: commentText.trim() || 'Visual UI feedback annotation' };
    setAnnotations(prev => [...prev, finalPin]);
    setActivePin(null);
    setCommentText('');
    toast.success(`Annotation #${finalPin.number} dropped!`);
  };

  const handleRemoveAnnotation = (pinId) => {
    setAnnotations(prev => prev.filter(a => a.id !== pinId));
    toast.success('Annotation removed');
  };

  const handleSubmitToAi = async () => {
    if (annotations.length === 0 || isSending) return;
    if (!projectId) {
      toast.error('Open a project page to submit visual annotations to AI Co-founder!');
      return;
    }

    setIsSending(true);
    try {
      await api.post(`/projects/${projectId}/annotations`, {
        annotations,
        pageUrl: window.location.pathname
      });

      toast.success('Visual feedback sent to AI Co-founder!');
      setAnnotations([]);
      setShowDrawer(false);
      navigate(`/projects/${projectId}/chat`);
    } catch (err) {
      console.error('Failed submitting annotations:', err);
      toast.error('Failed submitting annotations to AI');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="clarifyation-widget">
      {/* Target Element Highlight Box */}
      {hoveredElement && (
        <div
          className="fixed pointer-events-none z-50 border-2 border-[#6C63FF] bg-[#6C63FF]/10 rounded transition-all duration-75 shadow-lg"
          style={{
            top: hoveredElement.rect.top,
            left: hoveredElement.rect.left,
            width: hoveredElement.rect.width,
            height: hoveredElement.rect.height
          }}
        >
          <span className="absolute -top-6 left-0 bg-[#6C63FF] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow font-bold">
            {hoveredElement.selector}
          </span>
        </div>
      )}

      {/* Render Active Annotations Pins on Screen */}
      {annotations.map(pin => (
        <div
          key={pin.id}
          className="absolute z-40 w-7 h-7 rounded-full bg-[#6C63FF] text-white font-extrabold text-xs flex items-center justify-center shadow-lg ring-4 ring-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all"
          style={{ top: pin.y, left: pin.x }}
          title={pin.comment || pin.elementSelector}
          onClick={() => setShowDrawer(true)}
        >
          {pin.number}
        </div>
      ))}

      {/* Active Pin Comment Modal */}
      {activePin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm neumorphic-card rounded-3xl p-5 bg-[#E0E5EC] text-[#3D4852] flex flex-col gap-3 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#6C63FF] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Add UI Comment #{activePin.number}
              </span>
              <button onClick={() => setActivePin(null)} className="text-[#6B7280] hover:text-[#3D4852]">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-[11px] font-mono text-[#6B7280] neumorphic-inset p-2 rounded-xl">
              Target: <span className="text-[#3D4852] font-bold">{activePin.elementSelector}</span>
            </div>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What change or fix is needed here? (e.g. Make this button wider, fix font size)..."
              rows={3}
              className="w-full neumorphic-inset rounded-2xl p-3 text-xs outline-none text-[#3D4852] font-medium resize-none"
              autoFocus
            />

            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={() => setActivePin(null)}
                className="px-3 py-1.5 text-xs font-bold text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePinComment}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Controller (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {isActive ? (
          <div className="neumorphic-card rounded-full p-1.5 bg-[#E0E5EC] flex items-center gap-2 shadow-2xl border border-black/5 animate-in slide-in-from-bottom-3">
            {/* Logo Badge */}
            <div className="w-8 h-8 rounded-full bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-xs shadow-md">
              ⚡
            </div>

            {/* Inspect Button */}
            <button
              onClick={() => setIsInspecting(!isInspecting)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${isInspecting ? 'bg-[#6C63FF] text-white shadow-sm' : 'neumorphic-btn text-[#3D4852]'}`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>{isInspecting ? 'Click Element...' : 'Inspect UI'}</span>
            </button>

            {/* Drawer Toggle */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className="px-3 py-1.5 rounded-full text-xs font-bold neumorphic-btn text-[#3D4852] flex items-center gap-1.5 cursor-pointer relative"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#6C63FF]" />
              <span>Pins ({annotations.length})</span>
            </button>

            {/* Close Clarifyation Mode */}
            <button
              onClick={() => { setIsActive(false); setIsInspecting(false); }}
              className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsActive(true)}
            className="neumorphic-card rounded-full px-4 py-2 bg-[#E0E5EC] text-[#3D4852] font-extrabold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-all cursor-pointer border border-black/5"
            title="Clarifyation Visual UI Annotator"
          >
            <div className="w-6 h-6 rounded-full bg-[#6C63FF] text-white flex items-center justify-center text-xs">
              ⚡
            </div>
            <span>Clarifyation AI</span>
            {annotations.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6C63FF] text-white text-[10px] font-bold flex items-center justify-center">
                {annotations.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Pins & Comments Drawer Panel */}
      {showDrawer && (
        <div className="fixed bottom-20 right-6 z-50 w-80 neumorphic-card rounded-3xl p-4 bg-[#E0E5EC] text-[#3D4852] flex flex-col gap-3 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 border-b border-black/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <h4 className="text-xs font-extrabold">Clarifyation Pins ({annotations.length})</h4>
            </div>
            <button onClick={() => setShowDrawer(false)} className="text-[#6B7280] hover:text-[#3D4852]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
            {annotations.length === 0 ? (
              <p className="text-xs text-[#6B7280] text-center py-4 font-medium">No visual pins dropped yet. Click "Inspect UI" and select any element on screen!</p>
            ) : (
              annotations.map(pin => (
                <div key={pin.id} className="neumorphic-inset rounded-2xl p-2.5 flex items-start justify-between gap-2 text-xs">
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6C63FF] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {pin.number}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-[#6C63FF] font-bold">{pin.elementSelector}</span>
                      <span className="text-[#3D4852] font-semibold mt-0.5">{pin.comment || 'No comment text'}</span>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveAnnotation(pin.id)} className="text-[#6B7280] hover:text-red-500 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {annotations.length > 0 && (
            <button
              onClick={handleSubmitToAi}
              disabled={isSending}
              className="w-full bg-[#6C63FF] hover:bg-[#8B84FF] text-white py-2 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Sending to AI Co-founder...' : 'Send Annotations to AI Co-founder'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
