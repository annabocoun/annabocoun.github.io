import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="public/images/BOCOUN_PORTFOLIO_laika.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button
          onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span>Page {pageNumber} of {numPages}</span>
        <button
          onClick={() => setPageNumber(prev => (numPages ? Math.min(prev + 1, numPages) : prev))}
          disabled={pageNumber === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
