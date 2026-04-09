import React from 'react';

const PasswordStrengthMeter = ({ score }) => {
  const getStrengthLabel = (s) => {
    if (s === 1) return 'Weak';
    if (s === 2) return 'Fair';
    if (s === 3) return 'Good';
    if (s === 4) return 'Strong';
    return '';
  };

  return (
    <div className="mt-2 px-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 rounded-full flex-1 ${
              score >= level
                ? score === 1 ? 'bg-red-400' : score === 2 ? 'bg-orange-400' : score === 3 ? 'bg-blue-400' : 'bg-green-400'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{getStrengthLabel(score)}</div>
    </div>
  );
};

export default PasswordStrengthMeter;
