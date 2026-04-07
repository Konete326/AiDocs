const GlassCard = ({ children, className = '', strong = false, ...props }) => {
  const base = strong ? 'liquid-glass-strong' : 'liquid-glass';
  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
