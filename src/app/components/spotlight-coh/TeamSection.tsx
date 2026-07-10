import React from 'react';
import { UserRound } from 'lucide-react';
import { useSpotlightProfiles } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';

const EmptyState: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div
    style={{
      background: 'var(--oav-card-bg)',
      border: '1px solid var(--oav-border)',
      borderRadius: '10px',
      padding: '30px 24px',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '9999px',
        margin: '0 auto 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--oav-brand-light)',
        color: 'var(--oav-brand)',
      }}
    >
      <UserRound size={22} />
    </div>
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
        color: '#355070',
        lineHeight: 1.7,
        margin: 0,
        fontFamily: FONT,
      }}
    >
      {body}
    </p>
  </div>
);

export const TeamSection: React.FC = () => {
  const { profiles, loading } = useSpotlightProfiles();

  return (
    <section className="section-inner" style={{ background: 'var(--oav-page-bg)', padding: '24px 0 8px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#000000',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#355070',
            marginTop: '8px',
            marginBottom: 0,
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          This section only renders partner profile data from the microsite API
        </p>
      </div>

      {loading ? (
        <EmptyState
          title="Loading partner profiles"
          body="Checking for Mayo team and support staff profiles now."
        />
      ) : profiles.length === 0 ? (
        <EmptyState
          title="No partners are available at this time."
          body="Team, provider, and support-staff cards will appear here after partner profile data is available."
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
          }}
        >
          {profiles.map((profile) => (
            <article
              key={profile.uid}
              style={{
                background: 'var(--oav-card-bg)',
                border: '1px solid var(--oav-border)',
                borderRadius: '10px',
                padding: '18px',
                boxShadow: 'var(--oav-card-shadow)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  background: 'var(--oav-brand-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  border: '2px solid var(--oav-utility-border)',
                }}
              >
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.displayName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <UserRound size={22} color="var(--oav-brand)" />
                )}
              </div>

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
                  color: 'var(--oav-brand)',
                  margin: '0 0 10px',
                  lineHeight: 1.5,
                  fontFamily: FONT,
                }}
              >
                {[profile.titlePrefix, profile.specialtyLine1, profile.specialtyLine2]
                  .filter(Boolean)
                  .join(' · ')}
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
                {profile.bio || 'Profile details are available through the Mayo partner feed.'}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
