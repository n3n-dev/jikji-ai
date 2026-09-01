'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ko from '../dictionaries/ko.json';
import en from '../dictionaries/en.json';

type Locale = 'ko' | 'en';
type Dictionary = typeof ko;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && (saved === 'ko' || saved === 'en')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(saved);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale('ko');
    }
    setMounted(true);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = locale === 'ko' ? ko : en;

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
