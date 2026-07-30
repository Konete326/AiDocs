import React from 'react';

const PasswordStrengthMeter = ({ score }) => {
  const getMeterInfo = (s) => {
    if (s === 1) return { label: 'Weak', color: '#EF4444' };
    if (s === 2) return { label: 'Fair', color: '#F59E0B' };
    if (s === 3) return { label: 'Good', color: '#F59E0B' };
    if (s === 4) return { label: 'Strong', color: '#10B981' };
    return { label: '', color: 'transparent' };
  };

  const { label, color } = getMeterInfo(score);

  return (
    <div className="mt-2 px-1">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-1.5 rounded-full flex-1 transition-all duration-300"
            style={{
              backgroundColor: score >= level ? color : '#CBD5E1'
            }}
          />
        ))}
      </div>
      {label && (
        <div 
          className="text-[11px] font-bold mt-1 uppercase tracking-wider transition-colors duration-300"
          style={{ color }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
