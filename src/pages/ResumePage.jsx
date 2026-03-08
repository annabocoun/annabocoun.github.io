import { useLanguage } from '../context/LanguageContext';

function Section({ heading, children }) {
  return (
    <div className="static-page-section">
      <h2 className="static-section-heading">{heading}</h2>
      {children}
    </div>
  );
}

function ResumeList({ items }) {
  return (
    <ul className="resume-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const { t } = useLanguage();
  const r = t.resume;

  return (
    <main className="main-content">
      <div className="static-page">
        <h1 className="static-page-title">{r.title}</h1>

        <Section heading={r.education}>
          <ResumeList items={r.educationItems} />
        </Section>

        <Section heading={r.workExperience}>
          <ResumeList items={r.workItems} />
        </Section>

        <Section heading={r.paintingPrograms}>
          <ResumeList items={r.paintingItems} />
        </Section>

        <Section heading={r.animationPrograms}>
          <ResumeList items={r.animationItems} />
        </Section>

        <Section heading={r.videoEditingPrograms}>
          <ResumeList items={r.videoItems} />
        </Section>

        <Section heading={r.other}>
          <ResumeList items={r.otherItems} />
        </Section>
      </div>
    </main>
  );
}
