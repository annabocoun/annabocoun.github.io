import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="main-content">
      <div className="static-page">
        <div className="about-me-container">
          <div className="about-me-text">
            <h1 className="static-page-title">{t.about.title}</h1>
            <p className="static-page-body">{t.about.body}</p>
          </div>
          <img 
            src={`${import.meta.env.BASE_URL}images/MISH/FOTKA_MISH.jpg`} 
            alt="Anna Bocoun" 
            className="about-me-image" 
          />
        </div>
      </div>
    </main>
  );
}
