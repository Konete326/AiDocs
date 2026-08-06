import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Code, Award, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserAvatar from '../common/UserAvatar';

const ComponentCard = ({ component, onFavorite }) => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const getPreviewDoc = () => `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><style>body { background-color: #E0E5EC; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; overflow: hidden; } ${component?.code?.css || ''}</style></head><body>${component?.code?.html || component?.code?.tailwind || ''}</body></html>`;

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component?.code?.react || component?.code?.tailwind || component?.code?.html || component?.code?.css || '');
    setCopiedCode(true);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.aiPrompt);
    setCopiedPrompt(true);
    toast.success('AI Prompt copied!');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      onClick={() => navigate(`/components/${component._id}`)}
      className="bg-[#E0E5EC] rounded-[32px] p-5 shadow-[8px_8px_16px_rgba(163,177,198,0.5),-8px_-8px_16px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/30 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="font-extrabold text-[#3D4852] text-sm truncate">
            {component.title}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0E5EC] text-blue-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20">
            {component.framework || 'CSS'}
          </span>
        </div>

        <div className="h-44 w-full rounded-2xl bg-[#E0E5EC] shadow-[inset_5px_5px_9px_rgba(163,177,198,0.5),inset_-5px_-5px_9px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 overflow-hidden relative mb-4">
          {component.thumbnail ? (
            <img src={component.thumbnail} alt={component.title} className="w-full h-full object-cover" />
          ) : (
            <iframe srcDoc={getPreviewDoc()} title={component.title} className="w-full h-full border-0 pointer-events-none" />
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3 px-1 min-w-0">
          <div className="flex items-center gap-1.5 min-w-0 flex-1 mr-2">
            <UserAvatar user={component.creator} size="xs" className="flex-shrink-0" />
            <span className="truncate font-semibold text-[#3D4852] text-xs" title={component.creator?.displayName}>{component.creator?.displayName || 'Creator'}</span>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0">
              <Award className="w-2.5 h-2.5" />{component.creator?.creatorPoints || 0}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="flex items-center gap-1 font-semibold text-[#3D4852] text-xs"><Eye className="w-3.5 h-3.5 text-blue-600" />{component.viewsCount || 0}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onFavorite(component._id); }}
              className="px-2 py-1 bg-[#E0E5EC] rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-90 transition-all flex items-center gap-1 hover:text-red-500 cursor-pointer"
              title="Like / Favorite Component"
            >
              <Heart className={`w-3.5 h-3.5 ${component.favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-[#6B7280]'}`} />
              <span className="font-bold text-[11px] text-[#3D4852]">{component.favoritesCount || 0}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#101010]/5">
          <button onClick={handleCopyCode} className="bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <Code className="w-3.5 h-3.5 text-blue-600" />{copiedCode ? 'Copied!' : 'Copy Code'}
          </button>
          <button onClick={handleCopyPrompt} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5" />{copiedPrompt ? 'Copied!' : 'Copy AI Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
