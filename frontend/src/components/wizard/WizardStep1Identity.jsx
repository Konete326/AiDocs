import { motion } from 'framer-motion';
import TitleField from './fields/TitleField';
import ProblemField from './fields/ProblemField';

const types = ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other'];

export default function WizardStep1Identity({ formData, onChange }) {
  return (
    <div className="space-y-8">
      <TitleField formData={formData} onChange={onChange} />

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

      <ProblemField formData={formData} onChange={onChange} />
    </div>
  );
}
