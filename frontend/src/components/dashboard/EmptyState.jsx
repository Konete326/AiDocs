import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="liquid-glass-strong rounded-3xl p-12 text-center max-w-md">
        <FileText className="w-12 h-12 text-white/30 mb-4 mx-auto" />
        <h2 className="text-xl font-medium text-white">No projects yet</h2>
        <p className="text-sm text-white/60 mt-2">
          Create your first project and let AI generate your complete technical docs.
        </p>
        <button
          onClick={() => navigate('/projects/new')}
          className="liquid-glass-strong rounded-full px-8 py-3 mt-6 text-white text-sm font-medium hover:scale-105 transition-transform"
        >
          Create First Project
        </button>
      </div>
    </div>
  );
}
