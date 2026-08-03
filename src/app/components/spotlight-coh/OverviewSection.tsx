import React, { useState } from 'react';
import { CalendarDays, ExternalLink, PlayCircle } from 'lucide-react';
import { useSpotlightProfiles } from './useSpotlightProfiles';
import type { NormalizedProfile } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';
const DIRECTOR_CTA_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '10px 18px',
  borderRadius: '9999px',
  background: '#0057B8',
  border: '1px solid #0057B8',
  color: '#ffffff',
  fontFamily: FONT,
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: 1.4,
  textDecoration: 'none',
};

const pillars = [
  {
    icon: '🧑‍⚕️',
    label: 'Multidisciplinary, Patient-First Care',
    text: 'Hematology, cardiology, neurology, nephrology, pathology, transplantation and other specialties work together to coordinate care around the patient.',
  },
  {
    icon: '🔬',
    label: 'Advanced Diagnostic Precision',
    text: 'Mayo Clinic uses tools such as mass spectrometry and specialized imaging to identify the exact amyloid type and guide treatment decisions.',
  },
  {
    icon: '🏥',
    label: 'Research and Treatment Leadership',
    text: 'Mayo Clinic has helped shape modern amyloidosis care through clinical research, diagnostic standards, and access to advanced therapies and clinical trials.',
  },
];

const programParagraphs = [
  'Mayo Clinic\'s Amyloidosis Program is built around whole-person, highly coordinated care for all major forms of amyloidosis. A typical multidisciplinary evaluation can often be completed in about three business days, giving patients a precise diagnosis, an assessment of prognosis, and a personalized treatment plan.',
  'The program brings together experts across multiple specialties with advanced laboratory, imaging and pathology support. Mayo Clinic has also reported a historical footprint of 7,302 unique amyloidosis patients treated between 1963 and 2016, reflecting the program\'s long-standing depth of experience.',
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
        fontWeight: 300,
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
        fontWeight: 400,
        color: '#686868',
        margin: '8px 0 20px',
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
        className="overview-introduction"
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
          Backed by a 70-year legacy across its Arizona, Florida, and Minnesota campuses, the Mayo
          Clinic Amyloidosis Program is a global powerhouse treating over 3,200 patients annually.
          The program delivers holistic, patient-centered care, housing a complete multidisciplinary
          team under a single roof to provide efficient three-day evaluations. Renowned for landmark
          milestones, including the development of CyBorD therapy, mass-spectrometry amyloid typing,
          and FDA-cleared AI diagnostics, Mayo Clinic seamlessly integrates groundbreaking research,
          exclusive clinical trials, and advanced surgical care to set the global standard in
          amyloidosis treatment.
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

const DirectorCard: React.FC<{ director: NormalizedProfile }> = ({ director }) => {
  const [expanded, setExpanded] = useState(false);
  const extendedContent = [director.bio, ...director.extendedContent].filter(Boolean);
  const profilePrefix = director.titlePrefix
    ? `${director.titlePrefix.replace(/\.+$/, '')}.`
    : /\b(?:MD|DO|MBBS)\b/i.test(director.nameSuffix)
      ? 'Dr.'
      : '';
  const profileFullName = [director.firstName, director.lastName].filter(Boolean).join(' ')
    || director.displayName;
  const learnMoreLabel = `Learn more about ${[profilePrefix, profileFullName].filter(Boolean).join(' ')}`;

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      <div
        className="director-profile-row"
        style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}
      >
        {director.photoUrl && (
          <img
            src={director.photoUrl}
            alt={director.displayName}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              border: `3px solid ${BRAND}`,
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ fontFamily: FONT, minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#000000', lineHeight: 1.45, margin: 0 }}>
            {director.displayName}
          </h3>
          {(director.titlePrefix || director.specialtyLine1) && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                lineHeight: 1.45,
                margin: '4px 0 0',
                fontFamily: FONT,
              }}
            >
              {[director.titlePrefix, director.specialtyLine1].filter(Boolean).join(', ')}
            </p>
          )}
          {director.specialtyLine2 && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgb(0, 87, 184)',
                lineHeight: 1.45,
                margin: '3px 0 0',
                fontFamily: FONT,
              }}
            >
              {director.specialtyLine2}
            </p>
          )}
        </div>
      </div>

      {director.highlights.length > 0 && (
        <div style={{ margin: '0 0 12px' }}>
          {director.highlights.map((highlight) => (
            <div
              key={highlight}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '3px' }}>
                <circle cx="8" cy="8" r="8" fill="var(--oav-brand)" opacity="0.1" />
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="var(--oav-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '14px', color: '#000000', lineHeight: 1.6, fontFamily: FONT }}>
                {highlight}
              </span>
            </div>
          ))}
        </div>
      )}

      {extendedContent.length > 0 && (
        <>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
              fontSize: '13px',
              fontWeight: 700,
              color: BRAND,
              fontFamily: FONT,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{expanded ? '▾' : '▸'}</span>
            <span>{learnMoreLabel}</span>
          </button>

          {expanded && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--oav-border)' }}>
              {extendedContent.map((paragraph, index) => (
                <p
                  key={`${director.uid}-${index}`}
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#000000',
                    lineHeight: 1.7,
                    margin: '0 0 10px',
                    fontFamily: FONT,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </>
      )}

      {(director.registrationUrl || director.videoUrl || director.appointmentUrl) && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--oav-border)',
          }}
        >
          {director.registrationUrl && (
            <a
              href={director.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={DIRECTOR_CTA_STYLE}
            >
              <CalendarDays size={16} aria-hidden="true" />
              Register
            </a>
          )}

          {director.videoUrl && (
            <a
              href={director.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={DIRECTOR_CTA_STYLE}
            >
              <PlayCircle size={16} aria-hidden="true" />
              Watch video
            </a>
          )}

          {director.appointmentUrl && (
            <a
              href={director.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={DIRECTOR_CTA_STYLE}
            >
              Schedule an appointment
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export const DirectorsSection: React.FC = () => {
  const { directors, loading } = useSpotlightProfiles();

  return (
    <section className="section-inner" style={{ background: 'var(--oav-page-bg)', padding: '24px 0 8px' }}>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 300,
          color: '#000000',
          fontFamily: FONT,
          lineHeight: 1.3,
          margin: '0 0 20px',
        }}
      >
        Meet the {directors.length === 1 ? 'Director' : 'Directors'}
      </h2>

      {loading ? (
        <EmptyPartnerState
          title="Loading partner profiles"
          body="Checking for Mayo partner profile data now."
        />
      ) : directors.length === 0 ? (
        <EmptyPartnerState
          title="No partners are available at this time."
          body="Director profiles have not been provided through the partner profile API yet."
        />
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {directors.map((director) => <DirectorCard key={director.uid} director={director} />)}
        </div>
      )}
    </section>
  );
};

export const AboutProgramSection: React.FC = () => (
  <section
    className="section-inner"
    style={{
      background: 'var(--oav-page-bg)',
      padding: '32px 0 24px',
    }}
  >
    <details
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          padding: '18px 20px',
          fontFamily: FONT,
          listStylePosition: 'inside',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#000000' }}>
          About Mayo Clinic Amyloidosis Program
        </span>
        <span
          style={{
            display: 'block',
            paddingLeft: '22px',
            marginTop: '5px',
            fontSize: '13px',
            fontWeight: 300,
            color: '#4B5563',
            lineHeight: 1.5,
          }}
        >
          Learn how Mayo Clinic coordinates multidisciplinary amyloidosis diagnosis, care, and treatment planning
        </span>
      </summary>

      <div
        style={{ borderTop: '1px solid var(--oav-border)', padding: '20px' }}
      >
        {programParagraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: index < programParagraphs.length - 1 ? '0 0 14px 0' : 0,
              fontFamily: FONT,
            }}
          >
            {paragraph}
          </p>
        ))}

        <div
          style={{
            marginTop: '18px',
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
            Why Mayo Clinic is recognized in this field
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
    </details>
  </section>
);
