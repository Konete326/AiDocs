const GlassCard = ({ children, className = '', strong = false, ...props }) => {
  const base = strong ? 'liquid-glass-strong no-hover' : 'liquid-glass no-hover';
  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
