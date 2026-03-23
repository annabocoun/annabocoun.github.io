import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import projects from '../data/projects.json';
import Lightbox from '../components/Lightbox';

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="main-content">
        <div className="static-page">
          <h1 className="static-page-title">Not Found</h1>
          <button onClick={() => navigate('/')} style={{ fontFamily: 'Arial', marginTop: 16, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const projectT = t.projects[project.id];
  const title = projectT ? projectT.title : project.displayName;
  const subtitle = projectT ? projectT.subtitle : '';
  const description = projectT ? projectT.description : '';

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const gridItems = [];
  const lightboxImages = [];

  project.images.forEach((src) => {
    if (src === 'SEPARATOR') {
      gridItems.push({ type: 'separator' });
    } else {
      const lightboxIndex = lightboxImages.length;
      lightboxImages.push(src);
      gridItems.push({ type: 'image', src, lightboxIndex });
    }
  });

  return (
    <main className="main-content">
      <div className="project-page">
        <div className="project-page-header">
          <h1 className="project-page-title">{title}</h1>
          {subtitle && <p className="project-page-subtitle">{subtitle}</p>}
        </div>

        {description && (
          <p className="project-page-description">{description}</p>
        )}

        {gridItems.length > 0 && (
          <div className="project-image-grid">
            {gridItems.map((item, i) => {
              if (item.type === 'separator') {
                return <hr key={i} className="project-separator" />;
              }
              return (
                <div
                  key={i}
                  className="project-image-item"
                  onClick={() => openLightbox(item.lightboxIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openLightbox(item.lightboxIndex)}
                  aria-label={`View image ${item.lightboxIndex + 1}`}
                >
                  <img src={item.src} alt={`${title} - image ${item.lightboxIndex + 1}`} loading="lazy" />
                </div>
              );
            })}
          </div>
        )}

        {project.videos.length > 0 && (
          <div className="project-video-section">
            {project.videos.map((src, i) => (
              <div key={i} className="project-video-item">
                <video controls preload="metadata">
                  <source src={src} />
                  Your browser does not support video playback.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </main>
  );
}
