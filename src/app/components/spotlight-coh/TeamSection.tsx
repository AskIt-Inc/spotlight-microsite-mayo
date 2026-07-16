import React, { useState } from 'react';
import { UserRound, X } from 'lucide-react';
import {
  type NormalizedProfile,
  useSpotlightProfiles,
} from './useSpotlightProfiles';

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

const ProfileModal: React.FC<{
  profile: NormalizedProfile;
  onClose: () => void;
}> = ({ profile, onClose }) => (
  <div
    role="presentation"
    onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(0, 0, 0, 0.55)',
    }}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`profile-title-${profile.uid}`}
      style={{
        width: '100%',
        maxWidth: '620px',
        maxHeight: '80vh',
        overflowY: 'auto',
        background: 'var(--oav-card-bg)',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          borderBottom: '1px solid var(--oav-border)',
        }}
      >
        <ProfilePhoto profile={profile} size={72} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            id={`profile-title-${profile.uid}`}
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#000000',
              margin: 0,
              fontFamily: FONT,
            }}
          >
            {profile.displayName}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--oav-brand)',
              margin: '4px 0 0',
              lineHeight: 1.5,
              fontFamily: FONT,
            }}
          >
            {[profile.titlePrefix, profile.specialtyLine1, profile.specialtyLine2]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          style={{
            border: 0,
            background: 'transparent',
            color: '#355070',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>
      </div>
      <p
        style={{
          fontSize: '15px',
          fontWeight: 300,
          color: '#000000',
          lineHeight: 1.7,
          margin: 0,
          padding: '24px',
          fontFamily: FONT,
        }}
      >
        {profile.bio}
      </p>
    </div>
  </div>
);

const ProfilePhoto: React.FC<{
  profile: NormalizedProfile;
  size?: number;
}> = ({ profile, size = 60 }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      overflow: 'hidden',
      background: 'var(--oav-brand-light)',
      border: '2px solid var(--oav-brand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {profile.photoUrl ? (
      <img
        src={profile.photoUrl}
        alt={profile.displayName}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ) : (
      <UserRound size={Math.round(size * 0.38)} color="var(--oav-brand)" />
    )}
  </div>
);

const ProfileRow: React.FC<{ profile: NormalizedProfile }> = ({ profile }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          boxShadow: 'var(--oav-card-shadow)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <ProfilePhoto profile={profile} />
        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              margin: 0,
              fontFamily: FONT,
            }}
          >
            {profile.displayName}
          </h3>
          {profile.titlePrefix && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#000000',
                margin: '4px 0 0',
                lineHeight: 1.45,
                fontFamily: FONT,
              }}
            >
              {profile.titlePrefix}
            </p>
          )}
          {(profile.specialtyLine1 || profile.specialtyLine2) && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#000000',
                margin: '3px 0 0',
                lineHeight: 1.45,
                fontFamily: FONT,
              }}
            >
              {[profile.specialtyLine1, profile.specialtyLine2]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
        {profile.bio && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              flexShrink: 0,
              border: 0,
              background: 'transparent',
              color: 'var(--oav-brand)',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 300,
              fontFamily: FONT,
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            View more
          </button>
        )}
      </article>
      {open && <ProfileModal profile={profile} onClose={() => setOpen(false)} />}
    </>
  );
};

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
            color: '#000000',
            marginTop: '8px',
            marginBottom: 0,
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          Mayo Clinic — the multidisciplinary team behind the Amyloidosis Program
        </p>
      </div>

      {loading ? (
        <EmptyState
          title="Loading partner profiles"
          body="Checking for Mayo team profiles now."
        />
      ) : profiles.length === 0 ? (
        <EmptyState
          title="No team profiles are available at this time."
          body="Team profiles will appear here when they are available from the microsite API."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {profiles.map((profile) => (
            <ProfileRow key={profile.uid} profile={profile} />
          ))}
        </div>
      )}
    </section>
  );
};
