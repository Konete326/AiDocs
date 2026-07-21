import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLinks = () => {
  const { isAuthenticated } = useAuth();

  const links = isAuthenticated
    ? [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/dashboard' },
        { name: 'Pricing', path: '/pricing' }
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
              relative text-sm transition-colors duration-200 px-4 py-1.5 rounded-full
              ${isActive ? 'text-white font-semibold liquid-glass no-hover' : 'text-white/60 hover:text-white'}
              cursor-pointer
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
