import { Plus } from 'lucide-react';

const AddColumnButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="liquid-glass rounded-3xl w-full h-[380px] max-h-[400px] flex flex-col items-center justify-center gap-3 hover:scale-[1.01] transition-all cursor-pointer border border-dashed border-white/15 hover:border-white/30 group"
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Plus className="w-5 h-5 text-white/60 group-hover:text-white" />
      </div>
      <span className="text-xs font-semibold text-white/50 group-hover:text-white/80">Add Column</span>
    </button>
  );
};

export default AddColumnButton;
