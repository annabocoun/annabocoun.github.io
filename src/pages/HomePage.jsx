import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import projects from '../data/projects.json';
import PdfViewer from '../components/PdfViewer';

export default function HomePage() {
  const { t } = useLanguage();
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <main className="main-content">
      {showPortfolio ? (
        <div className="portfolio-section">
          <button
            className="back-to-projects-btn"
            onClick={() => setShowPortfolio(false)}
          >
            ← Back to Projects
          </button>
          <PdfViewer pdfPath="/public/images/BOCOUN_PORTFOLIO_laika.pdf" />
        </div>
      ) : (
        <>
          <div className="portfolio-banner">
            <button
              className="view-portfolio-btn"
              onClick={() => setShowPortfolio(true)}
            >
              📄 View Full Portfolio
            </button>
          </div>
          <div className="home-projects">
            {projects.map((project) => {
              const projectT = t.projects[project.id];
              return (
                <Link
                  key={project.id}
                  to={`/project/${project.slug}`}
                  className="project-strip"
                >
                  <img
                    src={project.coverImage}
                    alt={projectT ? projectT.title : project.displayName}
                    loading="lazy"
                    style={project.cropFocus ? { objectPosition: project.cropFocus } : undefined}
                  />
                  <div className="project-strip-overlay">
                    <span className="project-strip-title">
                      {projectT ? projectT.title : project.displayName}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}