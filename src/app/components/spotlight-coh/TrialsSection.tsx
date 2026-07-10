import React from 'react';
import { ExternalLink } from 'lucide-react';

const FONT = 'gotham, sans-serif';

export const TrialsSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-page-bg)',
        padding: '16px 0 56px',
      }}
    >
      <div className="trials-section-inner">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap' as const,
            gap: '8px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--oav-text-primary)',
                margin: 0,
                lineHeight: 1.3,
                fontFamily: FONT,
              }}
            >
              Clinical Trials
            </h2>
            <a
              href="https://clinicaltrials.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#1C1C1C',
                textDecoration: 'none',
                marginTop: '8px',
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#1C1C1C'; }}
            >
              <ExternalLink size={13} />
              View all on ClinicalTrials.gov
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              background: 'var(--oav-card-bg)',
              border: '1px solid var(--oav-border)',
              borderRadius: '8px',
              boxShadow: 'var(--oav-card-shadow)',
              padding: '28px 24px',
              textAlign: 'center' as const,
            }}
          >
            <p
              style={{
                fontSize: '18px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: FONT,
              }}
            >
              Trials are not available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
