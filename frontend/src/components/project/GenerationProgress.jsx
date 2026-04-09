export default function GenerationProgress({ current, total = 9 }) {
  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">Generation Progress</h3>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full ${i < current ? 'bg-white/60' : 'bg-white/10'}`} 
          />
        ))}
      </div>
      <p className="text-xs text-white/40 mt-4 uppercase tracking-widest">
        {current} of {total} documents generated
      </p>
    </div>
  );
}
