import { useEffect, useCallback, useState, useRef } from 'react';

export default function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  const prev = useCallback((e) => {
    if(e) e.stopPropagation();
    setScale(1);
    setIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback((e) => {
    if(e) e.stopPropagation();
    setScale(1);
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

  // Scroll to zoom
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent page scrolling while lightbox is open
      e.preventDefault();
      
      setScale(oldScale => {
        let newScale = oldScale - e.deltaY * 0.005;
        if (newScale < 0.5) newScale = 0.5;
        if (newScale > 5) newScale = 5;
        return newScale;
      });
    };
    
    // Bind the wheel event continuously to the window when lightbox is open
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Prevent background scroll conceptually (already handled mostly by wheel preventDefault)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="lightbox-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="lightbox-inner" onClick={handleOverlayClick}>
        {images.length > 1 && (
          <button className="lightbox-arrow prev" onClick={prev} aria-label="Previous">&#8592;</button>
        )}

        <div className="lightbox-img-wrapper" onClick={handleOverlayClick}>
          <img
            ref={imgRef}
            src={images[index]}
            alt={`Image ${index + 1}`}
            draggable={false}
            style={{ 
               transform: `scale(${scale})`, 
               transition: 'transform 0.1s ease-out',
               cursor: 'default'
            }}
          />
        </div>

        {images.length > 1 && (
          <button className="lightbox-arrow next" onClick={next} aria-label="Next">&#8594;</button>
        )}
      </div>

      <div className="lightbox-hint">
        {index + 1} / {images.length} &nbsp;|&nbsp; Scroll up/down to zoom &nbsp;|&nbsp; Click outside to close
      </div>
    </div>
  );
}
