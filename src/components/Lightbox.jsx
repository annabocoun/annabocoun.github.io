import { useEffect, useCallback, useState, useRef } from 'react';

export default function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const prev = useCallback((e) => {
    if(e) e.stopPropagation();
    resetTransform();
    setIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length, resetTransform]);

  const next = useCallback((e) => {
    if(e) e.stopPropagation();
    resetTransform();
    setIndex(i => (i + 1) % images.length);
  }, [images.length, resetTransform]);

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

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Handle Zoom towards cursor
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      const img = imgRef.current;
      if (!img) return;

      const rect = img.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      
      setScale(oldScale => {
        let newScale = oldScale - e.deltaY * 0.005;
        // User requested: cannot zoom out past original size (1x)
        if (newScale < 1) newScale = 1;
        if (newScale > 8) newScale = 8;
        
        if (newScale !== oldScale) {
          const ratio = newScale / oldScale;
          setPos(p => ({
            x: p.x - (cursorX - rect.width / 2) * (ratio - 1),
            y: p.y - (cursorY - rect.height / 2) * (ratio - 1)
          }));
        }
        return newScale;
      });
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle Panning (Drag)
  const onPointerDown = (e) => {
    if (scale <= 1) return; // Only pan when zoomed in
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  // Global pointer up to catch releases outside the image
  useEffect(() => {
    window.addEventListener('pointerup', onPointerUp);
    return () => window.removeEventListener('pointerup', onPointerUp);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };
  
  // Use a wrapper click that ignores clicks on the image itself when zoomed in,
  // making sure they pan instead of close.
  const handleWrapperClick = (e) => {
     if (e.target.tagName !== 'IMG') {
         onClose();
     }
  };

  return (
    <div className="lightbox-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="lightbox-inner" onClick={handleWrapperClick}>
        {images.length > 1 && (
          <button className="lightbox-arrow prev" onClick={prev} aria-label="Previous">&#8592;</button>
        )}

        <div className="lightbox-img-wrapper">
          <img
            ref={imgRef}
            src={images[index]}
            alt={`Image ${index + 1}`}
            draggable={false}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            style={{ 
               transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, 
               cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
               transition: isDragging.current ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>

        {images.length > 1 && (
          <button className="lightbox-arrow next" onClick={next} aria-label="Next">&#8594;</button>
        )}
      </div>

      <div className="lightbox-hint">
        {index + 1} / {images.length} &nbsp;|&nbsp; Scroll up/down to zoom &nbsp;|&nbsp; Drag to pan &nbsp;|&nbsp; Click outside to close
      </div>
    </div>
  );
}
