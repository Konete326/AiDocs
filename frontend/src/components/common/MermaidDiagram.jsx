import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Layout, ZoomIn, ZoomOut, RotateCcw, Maximize2, X, Download, ChevronDown, Image } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MermaidDiagram({ chartCode }) {
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const formatVerticalDiagram = (code) => {
    if (!code) return '';
    let formatted = code.trim();
    formatted = formatted
      .replace(/^(\s*graph|\s*flowchart)\s+LR\b/gmi, '$1 TD')
      .replace(/^(\s*graph|\s*flowchart)\s+RL\b/gmi, '$1 TD')
      .replace(/^(\s*graph|\s*flowchart)\s+BT\b/gmi, '$1 TD');
    return formatted;
  };

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default || mermaidModule;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          flowchart: {
            diagramPadding: 10,
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 50,
            rankSpacing: 50,
          },
          themeVariables: {
            primaryColor: '#6C63FF',
            primaryTextColor: '#ffffff',
            primaryBorderColor: 'rgba(255,255,255,0.2)',
            lineColor: '#8B84FF',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a'
          },
          securityLevel: 'loose'
        });

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const verticalCode = formatVerticalDiagram(chartCode);
        const { svg } = await mermaid.render(id, verticalCode);
        if (isMounted) {
          setSvgContent(svg);
          setError(false);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) setError(true);
      }
    };

    if (chartCode) {
      renderDiagram();
    }
    return () => { isMounted = false; };
  }, [chartCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(chartCode);
    setCopied(true);
    toast.success('Mermaid diagram code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Mermaid SVG Diagram downloaded!');
  };

  const handleDownloadPng = () => {
    if (!svgContent) return;
    try {
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const URLObj = window.URL || window.webkitURL || window;
      const blobURL = URLObj.createObjectURL(svgBlob);

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 4;
        const width = (image.width || 900) * scale;
        const height = (image.height || 600) * scale;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `diagram_4K_${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URLObj.revokeObjectURL(blobURL);
        toast.success('High-DPI 4K PNG Diagram exported!');
      };
      image.onerror = () => {
        handleDownloadSvg();
      };
      image.src = blobURL;
    } catch (err) {
      handleDownloadSvg();
    }
  };

  return (
    <>
      <div className="my-3 liquid-glass-strong rounded-2xl p-4 border border-white/15 ring-1 ring-white/10 shadow-xl relative group">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/80">
            <Layout className="w-3.5 h-3.5 text-[#38B2AC]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Interactive Mermaid.js Diagram</span>
            {zoomScale !== 1 && (
              <span className="text-[9.5px] font-mono text-[#6C63FF] bg-[#6C63FF]/20 px-2 py-0.5 rounded-full font-bold">
                {Math.round(zoomScale * 100)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-0.5 bg-black/20 rounded-xl border border-white/10">
              <button
                onClick={handleZoomIn}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="px-3 py-1 rounded-xl bg-white text-slate-800 hover:bg-slate-100 text-[11px] font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 shadow-md"
              >
                <span>Options</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-700 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 shadow-2xl rounded-2xl p-1.5 z-[999] flex flex-col gap-1 text-xs text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => { handleResetZoom(); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-2.5 transition-colors cursor-pointer border-none text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#6C63FF]" />
                    <span>Reset Zoom</span>
                  </button>
                  <button
                    onClick={() => { setIsFullscreen(true); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-2.5 transition-colors cursor-pointer border-none text-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#38B2AC]" />
                    <span>Fullscreen View</span>
                  </button>
                  <button
                    onClick={() => { handleDownloadPng(); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-2.5 transition-colors cursor-pointer border-none text-xs"
                  >
                    <Image className="w-3.5 h-3.5 text-purple-600" />
                    <span>Export 4K PNG</span>
                  </button>
                  <button
                    onClick={() => { handleDownloadSvg(); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-2.5 transition-colors cursor-pointer border-none text-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Export SVG</span>
                  </button>
                  <button
                    onClick={() => { handleCopyCode(); setIsMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-2.5 transition-colors cursor-pointer border-none text-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copied ? 'Copied Code' : 'Copy Code'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {!error && svgContent ? (
          <div className="overflow-auto flex justify-center py-3 text-white min-h-[340px] max-h-[580px] w-full">
            <div 
              ref={containerRef}
              className="transition-transform duration-200 ease-out origin-center [&_svg]:max-w-full [&_svg]:w-full [&_svg]:min-h-[320px] [&_svg]:h-auto flex justify-center w-full"
              style={{ transform: `scale(${zoomScale})` }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          <pre className="text-xs font-mono text-white/80 overflow-x-auto p-2 rounded-xl bg-black/20">
            {chartCode}
          </pre>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[99999] flex flex-col bg-black/90 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#6C63FF]" />
              <h3 className="text-sm font-bold tracking-tight">Interactive Mermaid.js Diagram Studio</h3>
              <span className="text-xs font-mono text-[#38B2AC] bg-[#38B2AC]/15 px-2.5 py-0.5 rounded-full font-bold">
                {Math.round(zoomScale * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/10 rounded-2xl p-1 border border-white/10">
                <button onClick={handleZoomIn} className="p-2 rounded-xl hover:bg-white/20 text-white cursor-pointer" title="Zoom In">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={handleZoomOut} className="p-2 rounded-xl hover:bg-white/20 text-white cursor-pointer" title="Zoom Out">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button onClick={handleResetZoom} className="p-2 rounded-xl hover:bg-white/20 text-white cursor-pointer" title="Reset">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button onClick={handleDownloadSvg} className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md">
                <Download className="w-4 h-4" />
                <span>Export SVG</span>
              </button>

              <button onClick={() => setIsFullscreen(false)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto flex items-center justify-center p-6">
            <div
              className="transition-transform duration-200 ease-out origin-center [&_svg]:max-w-full [&_svg]:h-auto flex justify-center"
              style={{ transform: `scale(${zoomScale * 1.3})` }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        </div>
      )}
    </>
  );
}
