import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PdfViewer from '../components/PdfViewer';
import projects from '../data/projects.json';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="main-content">
      <PdfViewer />
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
    </main>
  );
}