import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="liquid-glass rounded-[32px] p-12 text-center w-full max-w-2xl">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl neumorphic-inset-deep flex items-center justify-center">
          <FileText className="w-8 h-8 text-[#6C63FF]" />
        </div>
        <h2 className="text-xl font-extrabold text-[#3D4852]">No projects yet</h2>
        <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
          Create your first project and let AI generate your complete technical docs.
        </p>
        <button
          onClick={() => navigate('/projects/new')}
          className="rounded-2xl px-8 py-3.5 mt-6 bg-[#6C63FF] hover:bg-[#8B84FF] text-white text-sm font-bold transition-all cursor-pointer shadow-md"
        >
          Create First Project
        </button>
      </div>
    </div>
  );
}
