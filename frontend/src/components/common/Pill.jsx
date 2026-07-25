const Pill = ({ children, className = '', strong = false }) => {
  const base = strong ? 'liquid-glass-strong' : 'liquid-glass';
  return (
    <span className={`${base} rounded-full px-4 py-1.5 text-xs text-white/80 ${className}`}>
      {children}
    </span>
  );
};

export default Pill;
