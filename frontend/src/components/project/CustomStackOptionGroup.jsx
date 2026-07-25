import { Check, AlertTriangle } from 'lucide-react';
import { checkIncompatibility } from '../../utils/stackCompatibility';

export default function CustomStackOptionGroup({ label, category, options, selectedValue, onSelect, currentStack }) {
  const { frontend, backend, database, auth } = currentStack;

  return (
    <div className="space-y-1">
      <label className="text-[9.5px] uppercase tracking-widest text-blue-600 block font-mono font-bold select-none">
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

          let btnStyle = 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100 hover:border-slate-300';
          if (isSelected) {
            btnStyle = isInvalid
              ? 'bg-rose-600 !text-white font-bold border-rose-500 shadow-md shadow-rose-600/30'
              : 'bg-blue-600 !text-white font-bold border-blue-500 shadow-md shadow-blue-600/30';
          } else if (conflict) {
            btnStyle = 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100';
          }

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`px-2 py-1.5 rounded-lg text-[10.5px] transition-all duration-150 cursor-pointer text-left flex items-center justify-between border ${btnStyle}`}
            >
              <span className={`truncate pr-1 ${isSelected ? '!text-white font-bold' : 'text-slate-900 font-semibold'}`}>
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
