import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PdfViewer.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-document">
        <Document
          file="/images/BOCOUN_PORTFOLIO_laika.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>Loading PDF...</p>}
          error={<p>Error loading PDF. Please check the file path.</p>}
        >
          <Page pageNumber={pageNumber} className="pdf-page" />
        </Document>
      </div>
      <div className="pdf-controls">
        <button onClick={handlePrevious} disabled={pageNumber === 1}>
          ← Previous
        </button>
        <span className="pdf-page-info">
          Page {pageNumber} of {numPages || 0}
        </span>
        <button onClick={handleNext} disabled={pageNumber === numPages}>
          Next →
        </button>
      </div>
    </div>
  );
}