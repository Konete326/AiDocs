import FeatureComparisonTable from '../components/features/FeatureComparisonTable';
import FeatureSection from '../components/features/FeatureSection';

const Features = () => {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      <div className="fixed inset-0 bg-black/40 z-[1]" />
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-16 pt-24 pb-20 px-4 md:px-8">
        <div className="text-center space-y-4">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/60 inline-block mb-2">Capabilities</div>
          <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Full feature <em className="font-serif italic text-white/70">comparison</em></h1>
          <p className="text-white/60 text-sm max-w-lg mx-auto">Compare our plans side-by-side to find the right fit for your workflow.</p>
        </div>
        <FeatureComparisonTable />
        <FeatureSection />
      </div>
    </div>
  );
};

export default Features;
