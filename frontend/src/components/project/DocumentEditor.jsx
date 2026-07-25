const DocumentEditor = ({ content, onChange, saveError }) => (
  <div className="liquid-glass rounded-2xl p-4 h-full flex flex-col">
    <textarea
      className="bg-transparent text-white/80 text-sm leading-relaxed outline-none w-full resize-none font-mono flex-1 min-h-[500px]"
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
    {saveError && <p className="text-xs text-white/50 mt-2">{saveError}</p>}
  </div>
);

export default DocumentEditor;
