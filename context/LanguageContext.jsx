'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const languages = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('astro_preferred_lang');
      if (savedLang && ['en', 'ta', 'hi'].includes(savedLang)) {
        setLang(savedLang);
      }
    } catch (e) {}
  }, []);

  const setLanguage = (newLang) => {
    if (['en', 'ta', 'hi'].includes(newLang)) {
      setLang(newLang);
      try {
        localStorage.setItem('astro_preferred_lang', newLang);
      } catch (e) {}
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
