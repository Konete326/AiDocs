const Button = ({
  children,
  className = '',
  variant = 'glass',
  type = 'button',
  onClick,
  ...props
}) => {
  const base =
    variant === 'strong'
      ? 'liquid-glass-strong'
      : 'liquid-glass';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} rounded-full px-8 py-3 text-white font-medium
        hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed transition-transform cursor-pointer ${className}`}
      {...props}
      aria-disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
