const DocumentEditor = ({ content, onChange, saveError }) => (
  <div className="rounded-2xl h-full flex flex-col overflow-hidden">
    <textarea
      className="bg-[#d8dde6] text-[#3D4852] text-sm leading-relaxed outline-none w-full resize-none font-mono flex-1 p-4 rounded-2xl border border-slate-300 focus:border-[#6C63FF] transition-colors overflow-y-auto"
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
    {saveError && <p className="text-xs text-rose-600 mt-2">{saveError}</p>}
  </div>
);

export default DocumentEditor;
