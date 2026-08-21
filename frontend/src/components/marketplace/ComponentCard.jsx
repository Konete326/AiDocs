import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Code2, Sparkles, Award, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserAvatar from '../common/UserAvatar';
import PromptModal from './PromptModal';
import VsCodeComingSoonModal from '../vscode/VsCodeComingSoonModal';
import { attachAttributionToCode } from '../../utils/codeAttribution';
import { formatByteSize } from '../../utils/codeFormatter';
import { useAuth } from '../../context/AuthContext';

const ComponentCard = ({ component, onFavorite, onEdit, onDelete, isOwner }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isVsCodeModalOpen, setIsVsCodeModalOpen] = useState(false);

  const currentUserId = user?._id || user?.id;
  const isLiked = Boolean(
    (currentUserId && component?.favoritedBy?.some(id => (id._id || id)?.toString() === currentUserId.toString())) ||
    component?.isFavorited ||
    (component?.favoritesCount > 0 && component?.hasLiked)
  );

  const getPreviewDoc = () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * {
      box-sizing: border-box;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #stage {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      padding: 12px;
    }
    #preview-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: max-content;
      height: max-content;
      padding: 8px;
      box-sizing: border-box;
      transform-origin: center center;
    }
    #preview-wrapper > * {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    ${component?.code?.css || ''}
  </style>
</head>
<body>
  <div id="stage">
    <div id="preview-wrapper">
      ${component?.code?.html || component?.code?.tailwind || ''}
    </div>
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

        var availW = stage.clientWidth - 24;
        var availH = stage.clientHeight - 24;

        var scaleW = availW / contentW;
        var scaleH = availH / contentH;
        var scale = Math.min(scaleW, scaleH, 0.92);

        wrapper.style.transform = 'scale(' + Math.max(0.2, scale) + ')';
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoFit);
      } else {
        autoFit();
      }
    })();
  </script>
</body>
</html>`;

  const handleCopyCode = (e) => {
    e.stopPropagation();
    const creatorName = component?.creator?.displayName || component?.creator?.username || 'Founder';
    const compId = component?._id || '';
    let rawCode = component?.code?.react || component?.code?.tailwind || component?.code?.html || component?.code?.css || '';
    if (rawCode) {
      const isCssOnly = !component?.code?.html && !component?.code?.tailwind && component?.code?.css;
      rawCode = attachAttributionToCode(rawCode, creatorName, isCssOnly ? 'css' : 'html', compId);
    }
    navigator.clipboard.writeText(rawCode);
    setCopiedCode(true);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOpenPromptModal = (e) => {
    e.stopPropagation();
    setIsPromptOpen(true);
  };

  const handleNavigateDetail = (e) => {
    e.stopPropagation();
    navigate(`/components/${component._id}`);
  };

  return (
    <>
      <div
        onClick={handleNavigateDetail}
        className="bg-[#E0E5EC] rounded-[28px] p-5 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/30 cursor-pointer flex flex-col justify-between overflow-hidden hover:border-blue-400/60 hover:shadow-[9px_9px_16px_rgba(59,130,246,0.25),-9px_-9px_16px_rgba(255,255,255,0.6)] transition-all duration-200"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3
              onClick={handleNavigateDetail}
              className="font-extrabold text-[#3D4852] text-sm truncate hover:text-blue-600 transition-colors"
              title={component.title}
            >
              {component.title}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0E5EC] text-[#6B7280] shadow-[inset_1.5px_1.5px_3px_rgba(163,177,198,0.5),inset_-1.5px_-1.5px_3px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20" title="Component Byte Size">
                {formatByteSize(component?.code?.html || component?.code?.tailwind || '', component?.code?.css || '')}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0E5EC] text-blue-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20">
                {component.framework || 'CSS'}
              </span>
              {isOwner && (
                <button
                  onClick={(e) => { e.stopPropagation(); setIsVsCodeModalOpen(true); }}
                  className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-[2px_2px_4px_rgba(37,99,235,0.3)] border border-blue-500/20 active:scale-95 transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                  title="Edit in VS Code Studio"
                >
                  <Code2 className="w-3.5 h-3.5 text-white" />
                  <span>VS Code</span>
                </button>
              )}
              <button
                onClick={handleNavigateDetail}
                className="px-2 py-0.5 bg-[#E0E5EC] text-[#3D4852] hover:text-blue-600 rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                title="View Component & Sandbox"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>View</span>
              </button>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="h-52 w-full rounded-2xl bg-[#E0E5EC] shadow-[inset_6px_6px_10px_rgba(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)] border border-[#A3B1C6]/20 overflow-hidden relative mb-4 flex items-center justify-center pointer-events-auto"
          >
            <iframe
              srcDoc={getPreviewDoc()}
              title={component.title}
              loading="lazy"
              scrolling="no"
              className="w-full h-full border-0 pointer-events-auto"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3 px-1 min-w-0">
            <div
              onClick={(e) => {
                e.stopPropagation();
                const creatorId = component.creator?._id || component.creator?.id || component.creator;
                if (creatorId) navigate(`/profile/${creatorId}`);
              }}
              className="flex items-center gap-1.5 min-w-0 flex-1 mr-2 cursor-pointer hover:opacity-85 transition-opacity"
              title={`View ${component.creator?.displayName || 'Creator'}'s Profile`}
            >
              <UserAvatar user={component.creator} size="xs" className="flex-shrink-0" />
              <span className="truncate font-semibold text-[#3D4852] text-xs hover:text-blue-600 transition-colors">
                {component.creator?.displayName || 'Creator'}
              </span>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0">
                <Award className="w-2.5 h-2.5" />{component.creator?.creatorPoints || 0}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="flex items-center gap-1 font-semibold text-[#3D4852] text-xs"><Eye className="w-3.5 h-3.5 text-blue-600" />{component.viewsCount || 0}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onFavorite(component._id); }}
                className={`px-2 py-1 bg-[#E0E5EC] rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.5),-2px_-2px_4px_rgba(255,255,255,0.35)] border active:scale-90 transition-all flex items-center gap-1 cursor-pointer ${
                  isLiked ? 'text-red-500 border-red-200 shadow-[inset_1px_1px_3px_rgba(239,68,68,0.2)]' : 'text-[#6B7280] border-[#A3B1C6]/20 hover:text-red-500'
                }`}
                title={isLiked ? 'Unlike Component' : 'Like / Favorite Component'}
              >
                <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-[#6B7280]'}`} />
                <span className={`font-bold text-[11px] ${isLiked ? 'text-red-500' : 'text-[#3D4852]'}`}>{component.favoritesCount || 0}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#101010]/5">
            {isOwner ? (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit?.(component); }}
                  className="bg-[#E0E5EC] hover:bg-amber-50 text-amber-600 py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-amber-300/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-amber-600" />Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete?.(component); }}
                  className="bg-[#E0E5EC] hover:bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-red-300/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />Delete
                </button>
              </>
            ) : (
              <>
                <button onClick={handleCopyCode} className="bg-[#E0E5EC] hover:bg-white/50 text-[#3D4852] py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.35)] border border-[#A3B1C6]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />{copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
                <button onClick={handleOpenPromptModal} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold shadow-[3px_3px_6px_rgba(37,99,235,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5" />Copy AI Prompt
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isPromptOpen && <PromptModal rawPrompt={component.aiPrompt} component={component} onClose={() => setIsPromptOpen(false)} />}
      <VsCodeComingSoonModal isOpen={isVsCodeModalOpen} onClose={() => setIsVsCodeModalOpen(false)} />
    </>
  );
};

export default ComponentCard;
