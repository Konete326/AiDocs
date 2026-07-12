import { ChevronDown } from 'lucide-react';
import TitleField from './fields/TitleField';
import ProblemField from './fields/ProblemField';

const types = ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other'];

export default function WizardStep1Identity({ formData, onChange }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <TitleField formData={formData} onChange={onChange} />

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-1.5">Project Type</label>
          <div className="liquid-glass rounded-xl px-4 py-2.5 flex items-center justify-between relative">
            <select
              value={formData.projectType}
              onChange={(e) => onChange('projectType', e.target.value)}
              className="bg-transparent !text-white outline-none w-full text-sm cursor-pointer select-none appearance-none pr-8 relative z-10"
            >
              {types.map((type) => (
                <option key={type} value={type} className="bg-[#1e1e24] !text-white py-2">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-white/40 absolute right-4 pointer-events-none z-0" />
          </div>
        </div>
      </div>

      <ProblemField formData={formData} onChange={onChange} />
    </div>
  );
}
