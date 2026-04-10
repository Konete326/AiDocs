import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Can I upgrade or downgrade anytime?",
    answer: "Yes, you can change your plan at any time. Upgrades are instant, downgrades take effect at the end of your billing period."
  },
  {
    question: "What happens to my projects if I downgrade?",
    answer: "Your existing projects and documents are always safe. You just won't be able to create new projects beyond the free tier limit."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee on all paid plans, no questions asked."
  }
];

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-24 max-w-3xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, index) => (
        <div 
          key={index}
          className="liquid-glass rounded-2xl p-5 cursor-pointer hover:scale-[1.01] transition-transform"
          onClick={() => toggleItem(index)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/80">{item.question}</h3>
            <ChevronDown 
              className={`w-4 h-4 text-white/50 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </div>
          {openIndex === index && (
            <p className="text-sm text-white/60 mt-3 leading-relaxed">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingFaq;
