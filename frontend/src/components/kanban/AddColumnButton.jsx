import { Plus } from 'lucide-react';

const AddColumnButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="neumorphic-card rounded-3xl w-full h-[380px] max-h-[400px] flex flex-col items-center justify-center gap-3 hover:scale-[1.01] transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-2xl neumorphic-inset flex items-center justify-center text-[#6C63FF] group-hover:scale-110 transition-transform">
        <Plus className="w-6 h-6 text-[#6C63FF]" />
      </div>
      <span className="text-xs font-bold text-[#3D4852] group-hover:text-[#6C63FF] transition-colors">Add Column</span>
    </button>
  );
};

export default AddColumnButton;
