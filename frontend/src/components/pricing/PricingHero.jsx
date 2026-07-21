import { SpecialText } from '../ui/SpecialText';

const PricingHero = () => (
  <div className="text-center space-y-4 mb-8">
    <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#38B2AC] font-bold inline-block mb-2">
      🎉 Limited Time Offer — 100% Free Access
    </div>
    <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
      All features unlocked for <br />
      <em className="font-serif italic text-white/70">every creator</em>
    </h1>
    <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mt-3 leading-relaxed">
      <SpecialText speed={12} delay={0.3} inView={true} className="text-white/60">
        Enjoy full access to unlimited projects, AI Co-founder Chat, and Kanban Workspace for a limited time.
      </SpecialText>
    </p>
  </div>
);

export default PricingHero;
