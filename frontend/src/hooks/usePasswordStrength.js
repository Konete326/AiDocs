import { useState, useMemo } from 'react';

export const usePasswordStrength = (password) => {
  const score = useMemo(() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    if (/[A-Z]/.test(password)) s++;
    return s;
  }, [password]);

  return score;
};
