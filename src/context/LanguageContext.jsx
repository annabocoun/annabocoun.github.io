import { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations.jsx';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const toggleLang = () => setLang(prev => prev === 'en' ? 'cs' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
