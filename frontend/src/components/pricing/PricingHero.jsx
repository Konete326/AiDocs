import { SpecialText } from '../ui/SpecialText';

const PricingHero = () => (
  <div className="text-center space-y-4 mb-8">
    <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/60 inline-block mb-2">
      Transparent Pricing
    </div>
    <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
      Simple plans for <br />
      <em className="font-serif italic text-white/70">every stage</em>
    </h1>
    <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mt-3 leading-relaxed">
      <SpecialText speed={12} delay={0.3} inView={true} className="text-white/60">
        Start free and scale as you grow. No hidden fees, no surprises. Cancel anytime.
      </SpecialText>
    </p>
  </div>
);

export default PricingHero;
