import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Layout } from 'lucide-react';

export default function MermaidDiagram({ chartCode }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 liquid-glass-strong rounded-2xl p-4 border border-white/15 ring-1 ring-white/10 shadow-xl overflow-hidden relative group">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-white/80">
          <Layout className="w-3.5 h-3.5 text-[#38B2AC]" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Visual Flowchart Diagram</span>
        </div>
        <button
          onClick={handleCopyCode}
          className="liquid-glass rounded-full px-2.5 py-0.5 text-[9.5px] text-white/60 hover:text-white flex items-center gap-1 transition-all cursor-pointer border border-white/5"
          title="Copy diagram code"
        >
          {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Diagram</>}
        </button>
      </div>

      {!error && svgContent ? (
        <div 
          ref={containerRef} 
          className="overflow-x-auto flex justify-center py-2 text-white [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <pre className="text-xs font-mono text-white/80 overflow-x-auto p-2 rounded-xl bg-black/20">
          {chartCode}
        </pre>
      )}
    </div>
  );
}
