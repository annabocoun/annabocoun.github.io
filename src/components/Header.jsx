import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Using reliable external flags to ensure visibility
const EN_FLAG = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg';
const CZ_FLAG = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg';

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
