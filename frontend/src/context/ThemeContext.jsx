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
    video: '/backgrounds/animation.mp4',
    color: '#06b6d4'
  },
  {
    id: 'tree',
    name: 'Sacred Forest',
    video: '/backgrounds/tree.mp4',
    color: '#10b981'
  },
  {
    id: 'pink',
    name: 'Sakura Glow',
    video: '/backgrounds/pink.mp4',
    color: '#ec4899'
  },
  {
    id: 'relex',
    name: 'Zen Reflection',
    video: '/backgrounds/relex.mp4',
    color: '#8b5cf6'
  },
  {
    id: 'horror',
    name: 'Midnight Mist',
    video: '/backgrounds/horror.mp4',
    color: '#475569'
  }
];

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('app-theme-id') || 'earth';
  });


  const currentTheme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];

  const updateTheme = (themeId) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('app-theme-id', themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme, allThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
