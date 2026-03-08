import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="main-content">
      <div className="static-page">
        <h1 className="static-page-title">{t.about.title}</h1>
        <p className="static-page-body">{t.about.body}</p>
      </div>
    </main>
  );
}
