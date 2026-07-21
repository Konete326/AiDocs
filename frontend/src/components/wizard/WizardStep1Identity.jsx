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
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <TitleField formData={formData} onChange={onChange} />

        <div className="relative" ref={dropdownRef}>
          <label className="text-xs uppercase tracking-[0.2em] text-white/40 block mb-1.5">Project Type</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full liquid-glass rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer border border-white/10 hover:border-white/20 transition-all text-left"
          >
            <span className="text-sm font-medium text-white">{selectedType.label}</span>
            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 right-0 top-full mt-1.5 z-50 liquid-glass-strong rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 bg-black/90 backdrop-blur-2xl space-y-1"
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
                      className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected ? 'bg-[#38B2AC]/20 text-white border border-[#38B2AC]/30' : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{type.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#38B2AC]" />}
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
