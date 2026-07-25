import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'earth',
    name: 'Earth Aurora',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4',
    color: '#4f46e5'
  },
  {
    id: 'animation',
    name: 'Abstract Motion',
    video: 'https://res.cloudinary.com/dwrtj67eh/video/upload/v1776773400/themes/animation.mp4',
    color: '#06b6d4'
  },
  {
    id: 'tree',
    name: 'Sacred Forest',
    video: 'https://res.cloudinary.com/dwrtj67eh/video/upload/v1776773427/themes/tree.mp4',
    color: '#10b981'
  },
  {
    id: 'pink',
    name: 'Sakura Glow',
    video: 'https://res.cloudinary.com/dwrtj67eh/video/upload/v1776773411/themes/pink.mp4',
    color: '#ec4899'
  },
  {
    id: 'relex',
    name: 'Zen Reflection',
    video: 'https://res.cloudinary.com/dwrtj67eh/video/upload/v1776773423/themes/relex.mp4',
    color: '#8b5cf6'
  },
  {
    id: 'horror',
    name: 'Midnight Mist',
    video: 'https://res.cloudinary.com/dwrtj67eh/video/upload/v1776773404/themes/horror.mp4',
    color: '#475569'
  }
];

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('app-theme-id') || 'earth';
  });

  const [isGlassEnabled, setIsGlassEnabled] = useState(() => {
    const saved = localStorage.getItem('app-glass-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const currentTheme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];

  useEffect(() => {
    if (isGlassEnabled) {
      document.documentElement.classList.remove('no-glass-blur');
    } else {
      document.documentElement.classList.add('no-glass-blur');
    }
    localStorage.setItem('app-glass-enabled', JSON.stringify(isGlassEnabled));
  }, [isGlassEnabled]);

  const updateTheme = (themeId) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('app-theme-id', themeId);
  };

  const toggleGlass = () => {
    setIsGlassEnabled(!isGlassEnabled);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      updateTheme, 
      allThemes: THEMES,
      isGlassEnabled,
      toggleGlass
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
