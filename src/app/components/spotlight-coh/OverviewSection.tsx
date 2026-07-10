import React from 'react';
import { useSpotlightProfiles } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';

const pillars = [
  {
    icon: '🩺',
    label: '70-Year Legacy of Care',
    text: 'Mayo Clinic has cared for people with amyloidosis for more than seven decades, with dedicated expertise across its Arizona, Florida, and Minnesota campuses.',
  },
  {
    icon: '🧑‍⚕️',
    label: 'Deep Amyloidosis Experience',
    text: 'Mayo Clinic specialists treat thousands of people with amyloidosis each year, giving the team broad experience with both common and complex presentations of this rare disease.',
  },
  {
    icon: '🔬',
    label: 'Advanced Diagnostic Precision',
    text: 'Mass spectrometry, specialized imaging, and coordinated pathology support help identify the exact amyloid type and guide treatment decisions.',
  },
];

const programParagraphs = [
  'Mayo Clinic\'s Amyloidosis Program is built around whole-person, highly coordinated care for all major forms of amyloidosis. A multidisciplinary evaluation can often be completed in about three business days, giving patients a precise diagnosis, an assessment of prognosis, and a personalized treatment plan.',
  'The program brings together experts across hematology, cardiology, neurology, nephrology, pathology, radiology, transplantation, and specialized nursing support so care decisions are made together instead of in isolation.',
  'Mayo Clinic has also reported a historical footprint of 7,302 unique amyloidosis patients treated between 1963 and 2016, reflecting the program\'s long-standing depth of experience and its role in shaping modern amyloidosis care.',
];

const recognitionPoints = [
  'Multidisciplinary, patient-first care across the specialties most often involved in amyloidosis diagnosis, treatment, and follow-up.',
  'Accurate amyloid subtype identification supported by specialized pathology and imaging tools.',
  'Access to advanced treatment pathways that may include chemotherapy, targeted therapies, stem cell transplantation, ventricular assist devices, and organ transplantation when needed.',
];

const SectionHeading: React.FC<{ title: string; subtitle: string; strong?: boolean }> = ({ title, subtitle, strong = false }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2
      style={{
        fontSize: '28px',
        fontWeight: 700,
        color: 'rgb(0, 0, 0)',
        margin: 0,
        lineHeight: 1.3,
        fontFamily: FONT,
      }}
    >
      {title}
    </h2>
    <p
      style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgb(28, 28, 28)',
        marginTop: '8px',
        marginBottom: '20px',
        fontFamily: FONT,
        lineHeight: 1.5,
      }}
    >
      {subtitle}
    </p>
  </div>
);

const EmptyPartnerState: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div
    style={{
      background: 'var(--oav-card-bg)',
      border: '1px solid var(--oav-border)',
      borderRadius: '10px',
      padding: '28px 24px',
      textAlign: 'center',
    }}
  >
    <h3
      style={{
        fontSize: '20px',
        fontWeight: 700,
        color: '#000000',
        margin: '0 0 8px',
        fontFamily: FONT,
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontSize: '14px',
        fontWeight: 300,
        color: '#000000',
        margin: 0,
        lineHeight: 1.7,
        fontFamily: FONT,
      }}
    >
      {body}
    </p>
  </div>
);

export const OverviewSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
    }}
  >
    <div>
      <blockquote
        style={{
          margin: '0 0 32px 0',
          borderLeft: `4px solid ${BRAND}`,
          paddingLeft: '20px',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.5,
            margin: 0,
            fontFamily: FONT,
          }}
        >
          Mayo Clinic combines long-standing amyloidosis experience, precise subtype diagnosis,
          and coordinated multispecialty care across Arizona, Florida, and Minnesota so patients
          can move from evaluation to treatment planning through one connected program.
        </p>
      </blockquote>

      <div
        className="overview-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.label}
            style={{
              background: 'var(--oav-page-bg)',
              border: '1px solid var(--oav-border)',
              borderRadius: '8px',
              padding: '28px 26px',
              minHeight: '220px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '25px', lineHeight: 1, flexShrink: 0 }}>{pillar.icon}</span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.02em',
                  color: BRAND,
                  fontFamily: FONT,
                  lineHeight: 1.35,
                }}
              >
                {pillar.label}
              </span>
            </div>
            <p
              style={{
                fontSize: '17px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.65,
                margin: 0,
                fontFamily: FONT,
                textAlign: 'left' as const,
              }}
            >
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const DirectorsSection: React.FC = () => {
  const { profiles, loading } = useSpotlightProfiles();

  return (
    <section className="section-inner" style={{ background: 'var(--oav-page-bg)', padding: '24px 0 8px' }}>
      <SectionHeading
        title="Meet the Directors"
        subtitle="Leadership profiles will appear here when they are available from the microsite API"
      />

      {loading ? (
        <EmptyPartnerState
          title="Loading partner profiles"
          body="Checking for Mayo partner profile data now."
        />
      ) : profiles.length === 0 ? (
        <EmptyPartnerState
          title="No partners are available at this time."
          body="Director profiles have not been provided through the partner profile API yet."
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
          }}
        >
          {profiles.slice(0, 3).map((profile) => (
            <div
              key={profile.uid}
              style={{
                background: 'var(--oav-card-bg)',
                border: '1px solid var(--oav-border)',
                borderRadius: '10px',
                padding: '18px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#000000',
                  margin: '0 0 6px',
                  fontFamily: FONT,
                }}
              >
                {profile.displayName}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#000000',
                  margin: '0 0 10px',
                  lineHeight: 1.5,
                  fontFamily: FONT,
                }}
              >
                {[profile.titlePrefix, profile.specialtyLine1].filter(Boolean).join(' · ')}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#000000',
                  margin: 0,
                  lineHeight: 1.7,
                  fontFamily: FONT,
                }}
              >
                {profile.bio || 'Profile copy is available through the Mayo partner feed.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export const AboutProgramSection: React.FC = () => (
  <section className="section-inner" style={{ background: 'var(--oav-page-bg)', padding: '24px 0 8px' }}>
    <SectionHeading
      title="About the Program"
      subtitle="Whole-person amyloidosis care with diagnosis, prognosis, and treatment planning coordinated together"
    />

    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: 'var(--oav-card-shadow)',
      }}
    >
      {programParagraphs.map((paragraph) => (
        <p
          key={paragraph}
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.75,
            margin: '0 0 14px',
            fontFamily: FONT,
          }}
        >
          {paragraph}
        </p>
      ))}

      <div
        style={{
          marginTop: '8px',
          padding: '18px',
          borderRadius: '10px',
          background: 'var(--oav-brand-light)',
          border: '1px solid var(--oav-utility-border)',
        }}
      >
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: 'var(--oav-brand)',
            margin: '0 0 10px',
            fontFamily: FONT,
          }}
        >
          Why Mayo is recognized in this field
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '18px',
            display: 'grid',
            gap: '8px',
          }}
        >
          {recognitionPoints.map((point) => (
            <li
              key={point}
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.7,
                fontFamily: FONT,
              }}
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
