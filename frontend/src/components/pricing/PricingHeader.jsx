const PricingHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="liquid-glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/60 inline-block">
        Simple Pricing
      </div>
      <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
        Choose your <em className="font-serif italic text-white/70">plan</em>
      </h1>
      <p className="text-white/60 text-base max-w-md mx-auto mt-3">
        Generate professional technical documentation in minutes. No credit card required for free tier.
      </p>
    </div>
  );
};

export default PricingHeader;
