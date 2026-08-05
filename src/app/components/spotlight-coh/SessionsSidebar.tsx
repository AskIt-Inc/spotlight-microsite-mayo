import React, { useState } from 'react';
import { Calendar, Loader, User } from 'lucide-react';
import { type NormalizedSession, useSpotlightSessions } from './useSpotlightSessions';

const FONT = 'gotham, sans-serif';
const MAYO_BLUE = '#0057B8';

const SidebarSessionRow: React.FC<{ session: NormalizedSession }> = ({ session }) => {
  const [hovered, setHovered] = useState(false);
  const isPending = session.workflowStatus === 'pending';

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--oav-border)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '44px',
          flexShrink: 0,
          textAlign: 'center' as const,
          background: 'var(--oav-page-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '6px',
          padding: '5px 4px',
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: 'var(--oav-brand)',
            lineHeight: 1,
            fontFamily: FONT,
          }}
        >
          {session.month}
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.day}
        </div>
        <div
          style={{
            fontSize: '9px',
            color: '#355070',
            lineHeight: 1,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.dayOfWeek}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '11px',
            color: '#355070',
            marginBottom: '3px',
            fontFamily: FONT,
          }}
        >
          {session.time}
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.35,
            fontFamily: FONT,
          }}
        >
          {session.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            fontSize: '12px',
            color: '#000000',
            fontFamily: FONT,
          }}
        >
          <User size={11} color="#355070" style={{ flexShrink: 0 }} />
          {session.hasPresenter ? session.presenter : 'Presenter TBD'}
        </div>

        {isPending && (
          <div
            style={{
              display: 'inline-flex',
              marginTop: '7px',
              padding: '3px 7px',
              borderRadius: '9999px',
              background: '#FEF3C7',
              color: '#92400E',
              fontSize: '10px',
              fontWeight: 700,
              lineHeight: 1.2,
              fontFamily: FONT,
            }}
          >
            Pending approval
          </div>
        )}

        {session.canRegister && (
          <a
            href={session.regUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Register"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              marginTop: '8px',
              padding: '5px 12px',
              background: hovered ? 'var(--oav-brand-hover)' : 'var(--oav-brand)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
              textDecoration: 'none',
            }}
          >
            <Calendar size={11} color="#ffffff" style={{ flexShrink: 0 }} />
            Register
          </a>
        )}
      </div>
    </div>
  );
};

export const SessionsSidebar: React.FC = () => {
  const { sessions, loading } = useSpotlightSessions();

  const monthOrder: Record<string, number> = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  };

  const sorted = [...sessions].sort((a, b) => {
    const monthDelta = (monthOrder[a.month] ?? 99) - (monthOrder[b.month] ?? 99);
    if (monthDelta !== 0) {
      return monthDelta;
    }
    return parseInt(a.day, 10) - parseInt(b.day, 10);
  });

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        boxShadow: 'var(--oav-card-shadow)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--oav-border)',
          background: MAYO_BLUE,
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: FONT,
          }}
        >
          Upcoming Sessions
        </div>
      </div>

      {loading ? (
        <div
          style={{
            padding: '32px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#355070',
            fontFamily: FONT,
            fontSize: '13px',
          }}
        >
          <Loader size={16} color="var(--oav-brand)" style={{ animation: 'spin 1s linear infinite' }} />
          Loading sessions…
        </div>
      ) : sorted.length === 0 ? (
        <div
          style={{
            padding: '28px 18px',
            textAlign: 'center',
            color: '#355070',
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '9999px',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--oav-brand-light)',
            }}
          >
            <Calendar size={20} color="var(--oav-brand)" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#000000', marginBottom: '6px' }}>
            No sessions are available at this time.
          </div>
          <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            Session cards will appear here when session data is available from the microsite API.
          </p>
        </div>
      ) : (
        <div className="sessions-list">
          {sorted.map((session) => (
            <SidebarSessionRow key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};
