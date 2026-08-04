import React, { useMemo, useState } from 'react';
import { CalendarDays, ExternalLink, UserRound, X } from 'lucide-react';
import {
  type NormalizedProfile,
  type TeamCategory,
  type TeamHierarchySection,
  useSpotlightProfiles,
} from './useSpotlightProfiles';
import { type NormalizedSession, useSpotlightSessions } from './useSpotlightSessions';

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
  session?: NormalizedSession;
  onClose: () => void;
}> = ({ profile, session, onClose }) => (
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
        <ProfilePhoto
          profile={profile}
          size={72}
          borderColor="#0057B8"
          borderWidth={3}
          iconColor="#0057B8"
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            id={`profile-title-${profile.uid}`}
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#000000',
              margin: 0,
              fontFamily: FONT,
            }}
          >
            {profile.displayName}
          </h3>
          {(profile.titlePrefix || profile.specialtyLine1) && (
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#000000',
                margin: '2px 0 0',
                lineHeight: 1.5,
                fontFamily: FONT,
              }}
            >
              {[profile.titlePrefix, profile.specialtyLine1].filter(Boolean).join(' · ')}
            </p>
          )}
          {profile.specialtyLine2 && (
            <p
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgb(0, 87, 184)',
                margin: '2px 0 0',
                lineHeight: 1.5,
                fontFamily: FONT,
              }}
            >
              {profile.specialtyLine2}
            </p>
          )}
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
      {session && (
        <div style={{ padding: '0 24px 24px' }}>
          <div
            style={{
              background: '#E1F0FF',
              border: '1px solid #AFD7FF',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div
              style={{
                color: '#0057B8',
                fontFamily: FONT,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '4px',
                textTransform: 'uppercase',
              }}
            >
              Session: {[session.month, session.day].filter(Boolean).join(' ')}
            </div>
            <h4
              style={{
                color: '#002443',
                fontFamily: FONT,
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: 1.4,
                margin: '0 0 6px',
              }}
            >
              {session.title}
            </h4>
            {session.description && (
              <p
                style={{
                  color: '#002443',
                  fontFamily: FONT,
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {session.description}
              </p>
            )}
          </div>
          {session.canRegister && (
            <a
              href={session.regUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                alignItems: 'center',
                background: '#0057B8',
                borderRadius: '5px',
                boxSizing: 'border-box',
                color: '#ffffff',
                display: 'inline-flex',
                fontFamily: FONT,
                fontSize: '14px',
                fontWeight: 400,
                gap: '8px',
                justifyContent: 'center',
                marginTop: '16px',
                padding: '10px 16px',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              Register for this session <ExternalLink size={14} color="#ffffff" />
            </a>
          )}
        </div>
      )}
      {profile.appointmentUrl && (
        <div
          style={{
            borderTop: '1px solid var(--oav-border)',
            margin: '0 24px',
            padding: '16px 0 24px',
          }}
        >
          <a
            href={profile.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              alignItems: 'center',
              border: '1px solid #0057B8',
              borderRadius: '5px',
              boxSizing: 'border-box',
              color: '#0057B8',
              display: 'inline-flex',
              fontFamily: FONT,
              fontSize: '14px',
              fontWeight: 400,
              gap: '8px',
              justifyContent: 'center',
              padding: '10px 16px',
              textDecoration: 'none',
              width: '100%',
            }}
          >
            Schedule an appointment <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  </div>
);

const ProfilePhoto: React.FC<{
  profile: NormalizedProfile;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  iconColor?: string;
}> = ({ profile, size = 60, borderColor = 'var(--oav-brand)', borderWidth = 2, iconColor = 'var(--oav-brand)' }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      overflow: 'hidden',
      background: 'var(--oav-brand-light)',
      border: `${borderWidth}px solid ${borderColor}`,
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
      <UserRound size={Math.round(size * 0.38)} color={iconColor} />
    )}
  </div>
);

const ProfileRow: React.FC<{
  profile: NormalizedProfile;
  sessionDates: string[];
  session?: NormalizedSession;
}> = ({ profile, sessionDates, session }) => {
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
          {(profile.titlePrefix || profile.specialtyLine1) && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                margin: '4px 0 0',
                lineHeight: 1.45,
                fontFamily: FONT,
              }}
            >
              {[profile.titlePrefix, profile.specialtyLine1]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}
          {profile.specialtyLine2 && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgb(0, 87, 184)',
                margin: '3px 0 0',
                lineHeight: 1.45,
                fontFamily: FONT,
              }}
            >
              {profile.specialtyLine2}
            </p>
          )}
          {sessionDates.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#002443',
                fontSize: '12px',
                fontWeight: 400,
                marginTop: '6px',
                fontFamily: FONT,
              }}
            >
              <CalendarDays size={16} aria-hidden="true" />
              <span>{sessionDates.join(' · ')}</span>
            </div>
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
      {open && <ProfileModal profile={profile} session={session} onClose={() => setOpen(false)} />}
    </>
  );
};

const CategoryGroup: React.FC<{
  category: TeamCategory;
  sectionKey: string;
  sessionDatesByProfile: Map<number, string[]>;
  sessionByProfile: Map<number, NormalizedSession>;
}> = ({ category, sectionKey, sessionDatesByProfile, sessionByProfile }) => (
  <div>
    {category.label && category.label.toLowerCase() !== 'uncategorized' && (
      <h3
        style={{
          color: '#002443',
          fontFamily: FONT,
          fontSize: '18px',
          fontWeight: 700,
          margin: '0 0 12px',
        }}
      >
        {category.label}
      </h3>
    )}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {category.members.map((profile) => (
        <ProfileRow
          key={`${sectionKey}-${category.id ?? 'uncategorized'}-${profile.uid}`}
          profile={profile}
          sessionDates={sessionDatesByProfile.get(profile.uid) ?? []}
          session={sessionByProfile.get(profile.uid)}
        />
      ))}
    </div>
  </div>
);

const HierarchySection: React.FC<{
  section: TeamHierarchySection;
  sessionDatesByProfile: Map<number, string[]>;
  sessionByProfile: Map<number, NormalizedSession>;
}> = ({ section, sessionDatesByProfile, sessionByProfile }) => {
  const [selectedLocationId, setSelectedLocationId] = useState(section.locations[0]?.id);
  const selectedLocation = section.locations.find(({ id }) => id === selectedLocationId)
    ?? section.locations[0];
  const categories = selectedLocation ? selectedLocation.categories : section.categories;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        {section.label}
      </h2>

      {section.locations.length > 0 && (
        <div
          role="tablist"
          aria-label={`${section.label} locations`}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {section.locations.map((location) => {
            const selected = location.id === selectedLocation?.id;
            return (
              <button
                key={location.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedLocationId(location.id)}
                style={{
                  background: selected ? '#0057B8' : 'var(--oav-card-bg)',
                  border: '1px solid #0057B8',
                  borderRadius: '9999px',
                  color: selected ? '#ffffff' : '#0057B8',
                  cursor: 'pointer',
                  fontFamily: FONT,
                  fontSize: '14px',
                  fontWeight: 700,
                  padding: '8px 14px',
                }}
              >
                {location.label}
              </button>
            );
          })}
        </div>
      )}

      {categories.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {categories.map((category) => (
            <CategoryGroup
              key={`${section.key}-${selectedLocation?.id ?? 'section'}-${category.id ?? 'uncategorized'}`}
              category={category}
              sectionKey={section.key}
              sessionDatesByProfile={sessionDatesByProfile}
              sessionByProfile={sessionByProfile}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No team profiles are available for this location."
          body="Profiles will appear here when assignments are available from the microsite API."
        />
      )}
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const { sections, loading } = useSpotlightProfiles();
  const { sessions } = useSpotlightSessions();
  const sessionDatesByProfile = useMemo(() => {
    const datesByProfile = new Map<number, string[]>();

    for (const session of sessions) {
      if (!session.month || !session.day) continue;

      const month = session.month.charAt(0) + session.month.slice(1).toLowerCase();
      const date = `${month} ${session.day}`;
      for (const presenterUid of session.presenterUids) {
        const dates = datesByProfile.get(presenterUid) ?? [];
        if (!dates.includes(date)) {
          dates.push(date);
        }
        datesByProfile.set(presenterUid, dates);
      }
    }

    return datesByProfile;
  }, [sessions]);
  const sessionByProfile = useMemo(() => {
    const sessionsByProfile = new Map<number, NormalizedSession>();

    for (const session of sessions) {
      for (const presenterUid of session.presenterUids) {
        const existing = sessionsByProfile.get(presenterUid);
        if (!existing || (session.status === 'upcoming' && existing.status !== 'upcoming')) {
          sessionsByProfile.set(presenterUid, session);
        }
      }
    }

    return sessionsByProfile;
  }, [sessions]);

  return (
    <section className="section-inner" style={{ background: 'var(--oav-page-bg)', padding: '24px 0 8px' }}>
      {loading ? (
        <EmptyState
          title="Loading partner profiles"
          body="Checking for Mayo team profiles now."
        />
      ) : sections.length === 0 ? (
        <EmptyState
          title="No team profiles are available at this time."
          body="Team profiles will appear here when they are available from the microsite API."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {sections.map((section) => (
            <HierarchySection
              key={section.key}
              section={section}
              sessionDatesByProfile={sessionDatesByProfile}
              sessionByProfile={sessionByProfile}
            />
          ))}
        </div>
      )}
    </section>
  );
};
