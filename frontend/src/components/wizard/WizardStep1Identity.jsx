import { motion } from 'framer-motion';

const types = ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other'];

export default function WizardStep1Identity({ formData, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Project Title</label>
        <div className="liquid-glass rounded-xl px-4 py-3 flex items-center gap-3">
          <input 
            value={formData.title} 
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. AI-powered invoice generator"
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm"
          />
        </div>
        <p className="mt-2 text-[10px] text-white/30 uppercase tracking-wider">
          Give your idea a working name. You can change it later.
        </p>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Project Type</label>
        <div className="flex flex-wrap gap-3">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange('projectType', type)}
              className={`${
                formData.projectType === type ? 'liquid-glass-strong text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'liquid-glass text-white/60'
              } rounded-full px-5 py-2.5 text-sm cursor-pointer hover:scale-105 transition-all active:scale-95`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-4">Problem Statement</label>
        <div className="liquid-glass rounded-xl px-4 py-3 w-full">
          <textarea 
            value={formData.wizardAnswers.problemStatement}
            onChange={(e) => onChange('wizardAnswers.problemStatement', e.target.value)}
            placeholder="What gap in the market are you filling? What is the main pain point?"
            rows={4}
            className="bg-transparent text-white placeholder:text-white/40 outline-none w-full text-sm resize-none"
          />
        </div>
        <div className="mt-3 space-y-2">
          <p className="text-[10px] text-white/30 uppercase tracking-wider flex items-center gap-2">
            <span>💡</span> Tip: Clearly define the frustration you are solving.
          </p>
          <p className="text-[10px] text-white/20 italic leading-relaxed">
            Ex: "Freelancers struggle to track unpaid invoices across multiple platforms, leading to lost revenue."
          </p>
        </div>
      </div>
    </div>
  );
}
