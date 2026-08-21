import { Check, AlertTriangle } from 'lucide-react';
import { checkIncompatibility } from '../../utils/stackCompatibility';

export default function CustomStackOptionGroup({ label, category, options = [], selectedValue, onSelect, currentStack }) {
  const { frontend, backend, database, auth } = currentStack;

  return (
    <div className="space-y-1">
      <label className="text-[9.5px] uppercase tracking-widest text-[#6C63FF] block font-mono font-bold select-none">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {options.map((item) => {
          const isSelected = selectedValue === item;
          let testF = frontend, testB = backend, testD = database, testA = auth;
          if (category === 'frontend') testF = item;
          if (category === 'backend') testB = item;
          if (category === 'database') testD = item;
          if (category === 'auth') testA = item;

          const conflict = checkIncompatibility(category, item, testF, testB, testD, testA);
          const isInvalid = isSelected && Boolean(conflict);

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`px-2.5 py-1.5 rounded-xl text-[10.5px] font-bold transition-all duration-150 cursor-pointer text-left flex items-center justify-between border ${
                isSelected
                  ? isInvalid
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : 'bg-[#6C63FF] text-white border-[#6C63FF] shadow-sm'
                  : conflict
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-700'
                  : 'neumorphic-btn text-[#3D4852] border-[#CAD1DB]'
              }`}
            >
              <span className={`truncate pr-1 ${isSelected ? 'text-white font-bold' : 'text-[#3D4852] font-semibold'}`}>
                {item}
              </span>
              {isSelected && (
                isInvalid ? (
                  <AlertTriangle className="w-3 h-3 text-white font-bold shrink-0" />
                ) : (
                  <Check className="w-3 h-3 text-white font-bold shrink-0" />
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
