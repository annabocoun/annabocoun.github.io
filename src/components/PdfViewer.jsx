
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = 5; // Update this according to your PDF

  const nextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <Document file={'/images/BOCOUN_PORTFOLIO_laika.pdf'}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button onClick={prevPage} disabled={pageNumber <= 1}>Previous</button>
        <button onClick={nextPage} disabled={pageNumber >= totalPages}>Next</button>
      </div>
    </div>
  );
};

export default PdfViewer;