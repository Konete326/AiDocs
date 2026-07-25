import { AlertCircle } from 'lucide-react';

const ErrorState = ({ onRetry }) => (
  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-12 text-center flex flex-col items-center gap-4 max-w-md mx-auto">
    <AlertCircle className="w-12 h-12 text-red-500" />
    <h2 className="text-xl font-bold text-slate-900">Generation failed</h2>
    <p className="text-sm text-slate-600 font-medium">Something went wrong while generating your documents.</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-sm font-semibold hover:scale-105 transition-transform cursor-pointer mt-2 border-none shadow-sm"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
