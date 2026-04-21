import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  {
    id: 'aurora',
    name: 'Aurora Dreams',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
    color: '#a855f7'
  },
  {
    id: 'midnight',
    name: 'Midnight Nebula',
    video: '/backgrounds/midnight.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80',
    color: '#3b82f6'
  },
  {
    id: 'cyber',
    name: 'Cyber Grid',
    video: '/backgrounds/cyber.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    color: '#ec4899'
  },
  {
    id: 'emerald',
    name: 'Emerald Flow',
    video: '/backgrounds/emerald.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    color: '#10b981'
  }
];

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('app-theme-id') || 'aurora';
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
