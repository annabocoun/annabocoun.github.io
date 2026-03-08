import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Flag images as inline SVG data URIs - clean, no external deps
const EN_FLAG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(%23s)"><path d="M0,0 v30 h60 v-30 z" fill="%23012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="%23fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(%23t)" stroke="%23C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="%23fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="%23C8102E" stroke-width="6"/></g></svg>`;

const CZ_FLAG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="300" fill="%23FFFFFF"/><rect y="300" width="900" height="300" fill="%23D7141A"/><polygon points="0,0 450,300 0,600" fill="%2311457E"/></svg>`;

export default function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const goHome = () => {
    navigate('/');
    closeMenu();
  };

  // Show target language flag (click to switch)
  const flagSrc = lang === 'en' ? CZ_FLAG : EN_FLAG;
  const flagAlt = lang === 'en' ? 'Czech' : 'English';

  return (
    <header className="site-header">
      <div className="header-logo" onClick={goHome} role="link" tabIndex={0} onKeyDown={e => e.key === 'Enter' && goHome()}>
        {t.name}
      </div>

      <button
        className="hamburger"
        aria-label="Menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`header-nav${menuOpen ? ' open' : ''}`}>
        <Link to="/about" onClick={closeMenu}>{t.nav.about}</Link>
        <Link to="/contact" onClick={closeMenu}>{t.nav.contact}</Link>
        <Link to="/resume" onClick={closeMenu}>{t.nav.resume}</Link>
        <button className="lang-toggle" onClick={() => { toggleLang(); closeMenu(); }} aria-label={`Switch to ${flagAlt}`}>
          <img src={flagSrc} alt={flagAlt} className="flag" />
        </button>
      </nav>
    </header>
  );
}
