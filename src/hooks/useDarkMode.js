import { useState, useEffect } from 'react';

// Hook to manage dark mode preference and class on <html>
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const handler = (e) => {
      // Only follow system change if user has not explicitly chosen a theme
      try {
        const saved = localStorage.getItem('theme');
        if (saved) return; // user's explicit choice takes precedence
      } catch (e) {}
      setIsDark(e.matches);
    };
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
    };
  }, []);

  const toggle = () => setIsDark((v) => !v);

  return [isDark, toggle];
}
