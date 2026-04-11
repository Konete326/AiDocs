import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UpgradeModal from '../common/UpgradeModal';

const NavLinks = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isFree = !user?.plan || user.plan === 'free';

  const links = isAuthenticated
    ? [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/dashboard' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Review', path: '/feedback' },
        { name: 'Workspace', path: '/dashboard', isProtected: true }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Review', path: '/feedback' }
      ];

  const handleLinkClick = (e, link) => {
    if (link.isProtected && isFree) {
      e.preventDefault();
      setShowUpgrade(true);
    }
  };

  return (
    <>
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              onClick={(e) => handleLinkClick(e, link)}
              className={({ isActive }) => `
                relative text-sm transition-all duration-300 px-4 py-1.5 rounded-full
                ${isActive ? 'text-white font-semibold liquid-glass scale-105' : 'text-white/60 hover:text-white/90 hover:scale-105'}
                ${link.disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
              `}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={() => {
          setShowUpgrade(false);
          navigate('/pricing');
        }}
      />
    </>
  );
};

export default NavLinks;
