import { Plus } from 'lucide-react';

const AddColumnButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="liquid-glass rounded-3xl w-72 flex-shrink-0 min-h-[200px] flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
        <Plus className="w-5 h-5 text-white/40" />
      </div>
      <span className="text-sm text-white/40">Add Column</span>
    </button>
  );
};

export default AddColumnButton;
