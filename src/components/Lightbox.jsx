import { useEffect, useCallback, useState, useRef } from 'react';

export default function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const overlayRef = useRef(null);

  const prev = useCallback(() => {
    setZoomed(false);
    setIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setZoomed(false);
    setIndex(i => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, onClose]);

  // Close on scroll outside the image
  useEffect(() => {
    const handleWheel = (e) => {
      if (zoomed) return; // don't close while zoomed
      onClose();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onClose, zoomed]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="lightbox-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">&#x2715;</button>

      <div className="lightbox-inner">
        {images.length > 1 && (
          <button className="lightbox-arrow prev" onClick={prev} aria-label="Previous">&#8592;</button>
        )}

        <div
          className={`lightbox-img-wrapper${zoomed ? ' zoomed' : ''}`}
          onClick={() => setZoomed(z => !z)}
        >
          <img
            src={images[index]}
            alt={`Image ${index + 1}`}
            draggable={false}
          />
        </div>

        {images.length > 1 && (
          <button className="lightbox-arrow next" onClick={next} aria-label="Next">&#8594;</button>
        )}
      </div>

      <div className="lightbox-hint">
        {index + 1} / {images.length} &nbsp;|&nbsp; Click to zoom &nbsp;|&nbsp; Scroll to close
      </div>
    </div>
  );
}
