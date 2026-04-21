import { useTheme } from '../../context/ThemeContext';

export default function PersistentBackground() {
  const { currentTheme } = useTheme();

  return (
    <video
      key={currentTheme.id}
      src={currentTheme.video}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        opacity: 1,
      }}
    />
  );
}
