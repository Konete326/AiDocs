import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLinks = () => {
  const { isAuthenticated } = useAuth();

  const links = isAuthenticated
    ? [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/dashboard' },
        { name: 'Components', path: '/components' },
        { name: 'Pricing', path: '/pricing' }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Components', path: '/components' },
        { name: 'Pricing', path: '/pricing' }
      ];

  return (
    <ul className="flex items-center gap-6">
      {links.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            className={({ isActive }) => `
              relative text-sm transition-colors duration-200 px-4 py-1.5 rounded-full flex items-center gap-1.5
              ${isActive ? 'text-white font-semibold liquid-glass no-hover' : 'text-white/60 hover:text-white'}
              cursor-pointer
            `}
          >
            <span>{link.name}</span>
            {link.badge && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-600 text-white shadow-sm tracking-wider">
                {link.badge}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
