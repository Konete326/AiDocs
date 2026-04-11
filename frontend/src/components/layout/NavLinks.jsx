import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLinks = () => {
  const { isAuthenticated } = useAuth();

  const links = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Projects', path: '/dashboard#projects' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Workspace', path: '/dashboard', disabled: true }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' }
      ];

  return (
    <ul className="flex items-center gap-6">
      {links.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.path}
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
  );
};

export default NavLinks;
