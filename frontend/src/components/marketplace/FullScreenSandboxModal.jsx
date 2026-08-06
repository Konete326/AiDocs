import { Minimize2 } from 'lucide-react';

const FullScreenSandboxModal = ({ htmlCode, cssCode, title, onClose }) => {
  const previewDoc = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; }
    html, body { background-color: #E0E5EC; margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
    ${cssCode || ''}
  </style>
</head>
<body>${htmlCode || ''}</body>
</html>`;

  return (
    <div className="fixed inset-0 z-[200] bg-[#E0E5EC] flex flex-col overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs rounded-2xl shadow-[6px_6px_12px_rgba(163,177,198,0.7),-6px_-6px_12px_rgba(255,255,255,0.6)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/40"
        >
          <Minimize2 className="w-4 h-4 text-blue-600" />
          <span>Exit Fullscreen</span>
        </button>
      </div>

      <iframe
        srcDoc={previewDoc}
        title={title || 'Full Screen Sandbox'}
        scrolling="no"
        className="w-full h-full border-0 overflow-hidden"
      />
    </div>
  );
};

export default FullScreenSandboxModal;
