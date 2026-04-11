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
              relative text-sm transition-colors px-3 py-1.5 
              ${isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'}
              ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${isActive ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white/60' : ''}
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
