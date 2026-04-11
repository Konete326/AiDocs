import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useConfirmModal } from '../../hooks/useModal';
import ConfirmModal from '../common/ConfirmModal';

const NavLinks = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { modal, confirm, close, handleConfirm } = useConfirmModal();

  const isFree = !user?.plan || user.plan === 'free';

  const links = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Projects', path: '/dashboard#projects' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Workspace', path: '/dashboard', isProtected: true }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' }
      ];

  const handleLinkClick = (e, link) => {
    if (link.isProtected && isFree) {
      e.preventDefault();
      confirm({
        title: 'Pro Feature',
        message: 'The advanced workspace is a Pro feature. Upgrade your plan to unlock AI collaboration and advanced tools.',
        confirmLabel: 'Upgrade Now',
        cancelLabel: 'Maybe Later',
        onConfirm: () => navigate('/pricing')
      });
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

      <ConfirmModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        confirmLabel={modal.confirmLabel}
        cancelLabel={modal.cancelLabel}
        onConfirm={handleConfirm}
        onCancel={close}
      />
    </>
  );
};

export default NavLinks;
