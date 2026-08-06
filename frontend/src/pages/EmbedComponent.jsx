import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EmbedComponent = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('theme') || 'neumorphic';
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComp = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/ui-components/${id}`);
        const data = await res.json();
        if (data.success) setComponent(data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchComp();
    fetch(`/api/ui-components/${id}/embed-view`, { method: 'POST' }).catch(() => {});
  }, [id]);

  let bgClass = 'bg-[#E0E5EC]';
  let bodyBgColor = '#E0E5EC';
  if (theme === 'dark') { bgClass = 'bg-slate-900 text-white'; bodyBgColor = '#0f172a'; }
  if (theme === 'light') { bgClass = 'bg-white text-slate-900'; bodyBgColor = '#ffffff'; }

  if (loading) {
    return (
      <div className={`w-screen h-screen ${bgClass} flex items-center justify-center m-0 p-0 overflow-hidden`}>
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!component) {
    return (
      <div className={`w-screen h-screen ${bgClass} flex items-center justify-center text-xs text-[#6B7280] m-0 p-0`}>
        Component not found
      </div>
    );
  }

  const cssContent = component?.code?.css || '';
  const htmlContent = component?.code?.html || component?.code?.tailwind || '';
  const previewDoc = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><style>body { background-color: ${bodyBgColor}; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; overflow: hidden; } ${cssContent}</style></head><body>${htmlContent}</body></html>`;

  return (
    <div className={`w-screen h-screen ${bgClass} m-0 p-0 overflow-hidden border-0`}>
      <iframe
        srcDoc={previewDoc}
        title={component.title}
        className="w-full h-full border-0 m-0 p-0"
      />
    </div>
  );
};

export default EmbedComponent;
