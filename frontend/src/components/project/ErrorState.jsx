import { AlertCircle } from 'lucide-react';

const ErrorState = ({ onRetry }) => (
  <div className="liquid-glass-strong rounded-3xl p-12 text-center flex flex-col items-center gap-4">
    <AlertCircle className="w-12 h-12 text-white/40" />
    <h2 className="text-xl font-medium text-white">Generation failed</h2>
    <p className="text-sm text-white/60">Something went wrong while generating your documents.</p>
    <button
      onClick={onRetry}
      className="liquid-glass-strong rounded-full px-8 py-3 text-white text-sm hover:scale-105 transition-transform cursor-pointer mt-2"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
