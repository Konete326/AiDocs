import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Layout, ZoomIn, ZoomOut, RotateCcw, Maximize2, X, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MermaidDiagram({ chartCode }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default || mermaidModule;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
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
        const { svg } = await mermaid.render(id, chartCode.trim());
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

  return (
    <>
      <div className="my-3 liquid-glass-strong rounded-2xl p-4 border border-white/15 ring-1 ring-white/10 shadow-xl overflow-hidden relative group">
        <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/80">
            <Layout className="w-3.5 h-3.5 text-[#38B2AC]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Interactive Mermaid.js Diagram</span>
            {zoomScale !== 1 && (
              <span className="text-[9.5px] font-mono text-[#6C63FF] bg-[#6C63FF]/20 px-2 py-0.5 rounded-full font-bold">
                {Math.round(zoomScale * 100)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 flex-wrap">
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
              <button
                onClick={handleResetZoom}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Reset Zoom (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-xl bg-black/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              title="Expand Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDownloadSvg}
              className="p-1.5 rounded-xl bg-black/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              title="Download SVG Diagram"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopyCode}
              className="liquid-glass rounded-full px-2.5 py-1 text-[9.5px] text-white/80 hover:text-white flex items-center gap-1 transition-all cursor-pointer border border-white/5 font-bold"
              title="Copy diagram code"
            >
              {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Code</>}
            </button>
          </div>
        </div>

        {!error && svgContent ? (
          <div className="overflow-auto flex justify-center py-2 text-white max-h-[500px]">
            <div 
              ref={containerRef}
              className="transition-transform duration-200 ease-out origin-center [&_svg]:max-w-full [&_svg]:h-auto flex justify-center"
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
