import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 mt-12 bg-white/[0.02] rounded-[3rem] p-8 max-w-2xl mx-auto border border-white/[0.05]">
      <p className="text-sm text-white/50 mb-4 font-medium italic">
        "Want to see a detailed feature comparison?"
      </p>
      <button 
        onClick={() => navigate('/features')}
        className="liquid-glass rounded-full px-8 py-3.5 flex items-center gap-2 mx-auto text-sm text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer border-none outline-none group shadow-xl"
      >
        <span>View full feature details</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default PricingFeatures;
