import React from 'react';

const FONT = 'gotham, sans-serif';

const highlights = [
  {
    eyebrow: 'Contribution',
    label: 'Disease Definition and Care Standards',
    text: 'Mayo Clinic investigators helped define key amyloidosis subtypes and contributed to widely used diagnostic and treatment recommendations for AL amyloidosis.',
  },
  {
    eyebrow: 'Innovation',
    label: 'Precision Amyloid Typing',
    text: 'Mass spectrometry and specialized imaging support accurate amyloid typing and more individualized treatment planning.',
  },
  {
    eyebrow: 'Research Frontiers',
    label: 'AI-Enhanced Cardiac Screening',
    text: 'Mayo Clinic researchers helped develop an FDA-cleared AI echocardiography tool that can screen for amyloid cardiomyopathy from a standard echo video clip.',
  },
  {
    eyebrow: 'Clinical & Surgical Excellence',
    label: 'Advanced Treatment Pathways',
    text: 'Patients can be evaluated for chemotherapy, targeted therapies, supportive heart and kidney care, stem cell transplantation, ventricular assist devices, and organ transplantation when appropriate.',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    className="section-inner"
    style={{
      background: 'var(--oav-page-bg)',
      padding: '32px 0 24px',
    }}
  >
    <div style={{ marginBottom: '24px' }}>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 300,
          color: '#000000',
          margin: 0,
          lineHeight: 1.3,
          fontFamily: FONT,
        }}
      >
        Program Highlights
      </h2>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#686868',
          margin: '8px 0 0',
          fontFamily: FONT,
          lineHeight: 1.5,
        }}
      >
        Static Mayo content updated from the planning documents you shared
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {highlights.map((item) => (
        <div
          key={item.label}
          style={{
            background: 'var(--oav-card-bg)',
            border: '1px solid var(--oav-border)',
            borderLeft: '4px solid var(--oav-brand)',
            borderRadius: '10px',
            padding: '16px 18px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#355070',
              fontFamily: FONT,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}
          >
            {item.eyebrow}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: FONT,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.03em',
              marginBottom: '6px',
            }}
          >
            {item.label}
          </div>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: 0,
              fontFamily: FONT,
            }}
          >
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);
