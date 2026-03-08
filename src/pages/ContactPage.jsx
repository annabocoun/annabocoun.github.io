import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Minimalist SVG icons (dark grey, no fill, clean line style)
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.9 21 3 14.1 3 5.5c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function CopyItem({ icon, value, label, copyText, t }) {
  const [toast, setToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    });
  };

  return (
    <div>
      <button className="contact-item" onClick={handleCopy} aria-label={`Copy ${label}`}>
        <span className="contact-icon">{icon}</span>
        <span className="contact-value">{value}</span>
        {toast && <span className="copy-toast">{t.contact.copied}</span>}
      </button>
      <p className="copy-hint">{t.contact.clickToCopy}</p>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="main-content">
      <div className="static-page">
        <h1 className="static-page-title">{t.contact.title}</h1>
        <div className="contact-items">
          <CopyItem
            icon={<EnvelopeIcon />}
            value={t.contact.email}
            label="email"
            copyText={t.contact.email}
            t={t}
          />
          <CopyItem
            icon={<PhoneIcon />}
            value={t.contact.phone}
            label="phone number"
            copyText={t.contact.phone}
            t={t}
          />
        </div>
      </div>
    </main>
  );
}
