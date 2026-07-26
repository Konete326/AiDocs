import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TitleField from './fields/TitleField';
import ProblemField from './fields/ProblemField';

const types = [
  { id: 'saas', label: 'SaaS / Web App' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'ai', label: 'AI Tool / Service' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'other', label: 'Other Project' },
];

export default function WizardStep1Identity({ formData, onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedType = types.find((t) => t.id === formData.projectType) || types[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <TitleField formData={formData} onChange={onChange} />

        <div className="relative" ref={dropdownRef}>
          <label className="text-xs uppercase tracking-[0.2em] text-[#6B7280] font-extrabold block mb-1.5">Project Type</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full neumorphic-inset rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer text-left text-[#3D4852] font-extrabold text-sm border border-black/5 hover:border-[#6C63FF]/30 transition-all bg-[#E0E5EC]"
          >
            <span className="text-sm font-extrabold text-[#3D4852]">{selectedType.label}</span>
            <ChevronDown className={`w-4 h-4 text-[#6C63FF] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 right-0 top-full mt-2 z-50 neumorphic-card rounded-2xl p-2 shadow-2xl border border-black/10 bg-[#E0E5EC] text-[#3D4852] space-y-1"
              >
                {types.map((type) => {
                  const isSelected = formData.projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        onChange('projectType', type.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected ? 'bg-[#6C63FF] text-white shadow-md' : 'text-[#3D4852] hover:bg-black/5'
                      }`}
                    >
                      <span>{type.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProblemField formData={formData} onChange={onChange} />
    </div>
  );
}
