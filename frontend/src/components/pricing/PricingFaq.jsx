import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "How long is all feature access free?",
    answer: "All premium features including AI Co-founder Chat, Kanban Workspace, and unlimited exports are 100% FREE as part of our limited-time launch offer."
  },
  {
    question: "Can I export my generated documents?",
    answer: "Yes! You can copy content directly, download individual documents as PDF or Word files, or download complete project packages."
  },
  {
    question: "What documents does ClarifyAI generate?",
    answer: "We generate 9 comprehensive blueprints for every project: PRD, SRD, Tech Stack, DB Schema, User Flows, MVP Plan, Folder Structure, Claude Context, and System Prompts."
  },
  {
    question: "Is there any project creation limit?",
    answer: "No! During our limited time offer, you can create unlimited projects and document blueprints without any restrictions."
  },
  {
    question: "How does the AI Co-founder Chat work?",
    answer: "The AI Co-founder Chat contextualizes all your project documents in real-time, helping you refine architecture, brainstorm features, and optimize roadmaps."
  },
  {
    question: "Can I edit generated documents manually?",
    answer: "Yes! Every document viewer includes an inline Markdown editor so you can edit, update, or customize your business blueprints at any time."
  },
  {
    question: "What is the Kanban Workspace?",
    answer: "The Kanban Workspace automatically organizes your project MVP plan into interactive progress boards (To Do, In Progress, Done) for effortless roadmap tracking."
  },
  {
    question: "Do I need to enter credit card details?",
    answer: "No credit card or payment information is required to access all features during this free promotional period."
  }
];

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        <p className="text-xs text-white/50">Everything you need to know about ClarifyAI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {FAQ_ITEMS.map((item, index) => (
          <div 
            key={index}
            className="liquid-glass no-hover rounded-2xl p-4.5 cursor-pointer transition-all border border-white/5 hover:border-white/10"
            onClick={() => toggleItem(index)}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-semibold text-white/90 leading-snug">{item.question}</h3>
              <ChevronDown 
                className={`w-4 h-4 text-white/50 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </div>
            {openIndex === index && (
              <p className="text-xs text-white/60 mt-2.5 leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingFaq;
