import LoadingSpinner from '../common/LoadingSpinner';

export default function ProjectStatusCard({ project, onBack, onRetry, onViewDocs }) {
  const isGenerating = project.status === 'generating';

  return (
    <div className="w-full liquid-glass-strong rounded-[32px] p-10 text-center">
      <span className="liquid-glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-white/60 mb-6 inline-block">
        {isGenerating ? 'AI SCULPTING IN PROGRESS' : 'PROJECT READY'}
      </span>
      
      <h1 className="text-4xl font-medium text-white mb-4">{project.title}</h1>
      <p className="text-white/50 mb-8 max-w-lg mx-auto">
        {isGenerating 
          ? "Our AI agents are currently architecting your technical foundation. This typically takes 2-4 minutes."
          : "Your documentation suite is complete. Welcome to the future of startup building."}
      </p>

      <div className="flex flex-col gap-4 items-center">
        {isGenerating && <LoadingSpinner size="lg" />}
        
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button 
            onClick={onBack}
            className="liquid-glass rounded-full px-8 py-3 text-sm text-white/70 hover:text-white transition-all"
          >
            Back to Dashboard
          </button>
          
          {project.status === 'complete' && (
            <button 
              onClick={onViewDocs}
              className="liquid-glass-strong rounded-full px-8 py-3 text-sm text-white font-medium hover:scale-105 transition-transform"
            >
              View Document Suite
            </button>
          )}

          {project.status === 'error' && (
            <button 
              onClick={onRetry}
              className="liquid-glass-strong rounded-full px-8 py-3 text-sm text-white font-medium hover:scale-105 transition-transform"
            >
              Retry Generation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
