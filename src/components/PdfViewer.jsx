import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import './PdfViewer.css';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfViewer({ pdfPath }) {
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    pdfjsLib.getDocument(pdfPath).promise
      .then((pdfDoc) => {
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load PDF');
        setIsLoading(false);
        console.error(err);
      });
  }, [pdfPath]);

  useEffect(() => {
    if (!pdf) return;

    const renderPage = async () => {
      const page = await pdf.getPage(currentPage);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = document.getElementById('pdf-canvas');

      if (!canvas) return;

      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    };

    renderPage();
  }, [pdf, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  if (error) {
    return <div className="pdf-viewer-error">{error}</div>;
  }

  return (
    <div className="pdf-viewer-container">
      {isLoading && <div className="pdf-viewer-loading">Loading PDF...</div>}
      
      <div className="pdf-viewer">
        <canvas id="pdf-canvas" className="pdf-canvas"></canvas>
      </div>

      <div className="pdf-controls">
        <button
          className="pdf-nav-btn pdf-prev-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          title="Previous page or use ← arrow key"
          aria-label="Previous page"
        >
          ← Scroll Left
        </button>

        <div className="pdf-page-info">
          Page <span className="current-page">{currentPage}</span> of{' '}
          <span className="total-pages">{totalPages}</span>
        </div>

        <button
          className="pdf-nav-btn pdf-next-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          title="Next page or use → arrow key"
          aria-label="Next page"
        >
          Scroll Right →
        </button>
      </div>
    </div>
  );
}
