import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const FONT = 'gotham, sans-serif';
const EMPLOYER_LOGOS_API_URL = 'https://somebodytotalkto.com/api/session-editor/partners/logos';

interface EmployerLogo {
  tid: number;
  logo?: {
    alt: string;
    url: string;
  };
}

interface EmployerLogosResponse {
  data?: EmployerLogo[];
}

const featuredPrograms = [
  {
    employerTids: [12758, 12761],
    month: 'June 2026',
    program: 'University of Chicago & Endeavor Health',
    description: 'Review the University of Chicago and Endeavor Health Spotlight Series.',
    url: 'https://uchicago.oneamyloidosisvoice.com/',
  },
  {
    employerTids: [12759],
    month: 'July 2026',
    program: 'City of Hope Amyloidosis Program',
    description: 'Explore the City of Hope Amyloidosis Program Spotlight Series.',
    url: 'https://cityofhope.oneamyloidosisvoice.com/',
  },
  {
    employerTids: [12351],
    month: 'August 2026',
    program: 'Vanderbilt Amyloidosis Multidisciplinary Program',
    description: 'Visit the Vanderbilt Amyloidosis Multidisciplinary Program Spotlight Series.',
    url: 'https://vanderbilt.oneamyloidosisvoice.com/',
  },
];

export const LearnMoreSection: React.FC = () => {
  const [employerLogos, setEmployerLogos] = useState<Map<number, EmployerLogo['logo']>>(new Map());

  useEffect(() => {
    let cancelled = false;

    async function loadEmployerLogos() {
      try {
        const response = await fetch(EMPLOYER_LOGOS_API_URL);
        if (!response.ok) return;

        const payload = (await response.json()) as EmployerLogosResponse;
        const logos = new Map(
          (payload.data ?? [])
            .filter((employer) => employer.logo?.url)
            .map((employer) => [employer.tid, employer.logo]),
        );

        if (!cancelled) {
          setEmployerLogos(logos);
        }
      } catch {
        // Keep the spotlight links available if logo data cannot be loaded.
      }
    }

    loadEmployerLogos();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="learn-more-heading"
      style={{
        background: '#F3F0EA',
        border: '1px solid #D8D1C5',
        borderRadius: '14px',
        fontFamily: FONT,
        marginTop: '8px',
        overflow: 'hidden',
        padding: '32px',
      }}
    >
      <p
        style={{
          color: '#756B61',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          margin: '0 0 10px',
          textTransform: 'uppercase',
        }}
      >
        Previous spotlight series
      </p>
      <h2
        id="learn-more-heading"
        style={{
          color: '#2D2926',
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: 1.25,
          margin: '0 0 10px',
          maxWidth: '660px',
        }}
      >
        Learn more about our Amyloidosis Program Spotlight Series
      </h2>
      <p
        style={{
          color: '#756B61',
          fontSize: '16px',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 26px',
          maxWidth: '620px',
        }}
      >
        Visit a featured microsite to meet its program, explore sessions, and access its resources.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {featuredPrograms.map((featuredProgram) => {
          const logos = featuredProgram.employerTids
            .map((employerTid) => employerLogos.get(employerTid))
            .filter((logo): logo is NonNullable<EmployerLogo['logo']> => Boolean(logo?.url));

          return (
            <article
              key={featuredProgram.month}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D8D1C5',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '290px',
                padding: '22px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '7px',
                  height: featuredProgram.employerTids.length > 1 ? '74px' : '46px',
                  marginBottom: '16px',
                  alignItems: 'flex-start',
                }}
              >
                {logos.map((logo) => (
                  <img
                    alt={logo.alt || featuredProgram.program}
                    key={logo.url}
                    src={logo.url}
                    style={{
                      maxHeight: featuredProgram.employerTids.length > 1 ? '31px' : '42px',
                      maxWidth: '180px',
                      objectFit: 'contain',
                      objectPosition: 'left center',
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  color: '#756B61',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  margin: '0 0 8px',
                  textTransform: 'uppercase',
                }}
              >
                {featuredProgram.month} spotlight
              </p>
              <h3
                style={{
                  color: '#2D2926',
                  fontSize: '18px',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  margin: '0 0 10px',
                }}
              >
                {featuredProgram.program}
              </h3>
              <p
                style={{
                  color: '#4B5563',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  margin: '0 0 20px',
                }}
              >
                {featuredProgram.description}
              </p>
              <a
                href={featuredProgram.url}
                rel="noopener noreferrer"
                style={{
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: '1px solid #2D2926',
                  color: '#2D2926',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  fontSize: '14px',
                  fontWeight: 700,
                  gap: '7px',
                  justifyContent: 'center',
                  marginTop: 'auto',
                  minHeight: '42px',
                  padding: '0 14px',
                  textDecoration: 'none',
                }}
                target="_blank"
              >
                Visit microsite <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};
