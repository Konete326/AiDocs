import { useState } from 'react';
import { Minimize2, Sun, Moon } from 'lucide-react';

const FullScreenSandboxModal = ({ htmlCode, cssCode, title, onClose }) => {
  const [isDark, setIsDark] = useState(false);

  const previewDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; scrollbar-width: none !important; -ms-overflow-style: none !important; }
    *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
    html, body {
      background-color: ${isDark ? '#1E293B' : '#E0E5EC'};
      color: ${isDark ? '#F8FAFC' : '#3D4852'};
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    #preview-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      max-height: 100%;
      padding: 24px;
      box-sizing: border-box;
    }
    ${cssCode || ''}
  </style>
</head>
<body>
  <div id="preview-wrapper">${htmlCode || ''}</div>
</body>
</html>`;

  return (
    <div className={`fixed inset-0 z-[200] ${isDark ? 'bg-[#1E293B]' : 'bg-[#E0E5EC]'} flex flex-col overflow-hidden transition-colors duration-300`}>
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`px-4 py-2 ${isDark ? 'bg-[#334155] text-white shadow-lg' : 'bg-[#E0E5EC] text-[#3D4852] shadow-[6px_6px_12px_rgba(163,177,198,0.7),-6px_-6px_12px_rgba(255,255,255,0.6)]'} font-bold text-xs rounded-2xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20`}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button
          onClick={onClose}
          className={`px-4 py-2 ${isDark ? 'bg-[#334155] text-white shadow-lg' : 'bg-[#E0E5EC] text-[#3D4852] shadow-[6px_6px_12px_rgba(163,177,198,0.7),-6px_-6px_12px_rgba(255,255,255,0.6)]'} font-bold text-xs rounded-2xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20`}
        >
          <Minimize2 className="w-4 h-4 text-blue-500" />
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
