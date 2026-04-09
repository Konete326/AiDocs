import React from 'react';

export default function LoadingSpinner({ size = 'sm' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-white/20 border-t-white/80 ${sizeClasses[size]}`}
    />
  );
}
