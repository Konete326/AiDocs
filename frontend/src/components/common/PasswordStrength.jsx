const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const strengthLogic = () => {
    let s = 0;
    if (password.length >= 8) s += 1;
    if (/\d/.test(password)) s += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    return s;
  };
  const strength = strengthLogic();
  const getLabel = () => {
    switch(strength) {
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "Weak";
    }
  };
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className={`h-1 rounded-full flex-1 ${strength >= num ? (strength === 1 ? 'bg-white/20' : strength === 2 ? 'bg-white/40' : strength === 3 ? 'bg-white/60' : 'bg-white/80') : 'bg-white/10'}`} />
        ))}
      </div>
      <p className="text-xs text-white/40">{getLabel()}</p>
    </div>
  );
};

export default PasswordStrength;
