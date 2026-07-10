import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const STTT_LOGO_URL = 'https://somebodytotalkto.com/sites/default/files/STTT%20Logo%20Basic.png';
const MAYO_LOGO_URL = '/mayo-clinic-logo.svg';
const HERO_BLUE = '#0057B8';
const HERO_BLUE_MID = '#004A99';
const HERO_GOLD = '#FDB515';
const HERO_PALE_BLUE = '#EAF2FB';

const MayoIdentity = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '165px',
        minHeight: '60px',
        border: `1px solid ${HERO_PALE_BLUE}`,
      }}
    >
      {!imgFailed ? (
        <img
          src={MAYO_LOGO_URL}
          alt="Mayo Clinic"
          style={{ width: '121px', maxWidth: '100%', height: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: HERO_BLUE,
            fontFamily: FONT,
            lineHeight: 1,
          }}
        >
          Mayo Clinic
        </span>
      )}
    </div>
  );
};

const SeriesStrip: React.FC = () => (
  <div
    style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--oav-border)',
      padding: '10px 24px',
    }}
  >
    <div
      className="series-strip-row"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <img
        className="series-strip-logo-img"
        src={STTT_LOGO_URL}
        alt="SomeBodyToTalkTo"
        style={{ height: '42px', width: 'auto', display: 'block', flexShrink: 0 }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      <div
        className="series-strip-divider"
        style={{ width: '1px', height: '42px', background: HERO_PALE_BLUE, flexShrink: 0 }}
      />

      <div style={{ fontFamily: FONT, minWidth: 0 }}>
        <div
          className="series-strip-title"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: HERO_BLUE,
            letterSpacing: '-0.2px',
            lineHeight: 1.1,
          }}
        >
          <span>Amyloidosis Program Spotlight Series</span>
          <span style={{ color: '#1f2937' }}> · September 2026</span>
        </div>
      </div>
    </div>
  </div>
);

export const HeroSection: React.FC = () => (
  <>
    <SeriesStrip />

    <section
      style={{
        background: `linear-gradient(135deg, ${HERO_BLUE} 0%, ${HERO_BLUE_MID} 56%, #00346C 100%)`,
        borderBottom: `3px solid ${HERO_GOLD}`,
        padding: '28px 24px',
      }}
    >
      <div
        className="hero-content-row"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div
          className="hero-left-col"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            <div
              className="hero-featuring-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FFE28A',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                lineHeight: 1,
                marginBottom: '16px',
                textTransform: 'uppercase' as const,
                fontFamily: FONT,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFE28A"
                strokeWidth="2"
                strokeLinecap="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="10" r="3" />
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="4.22" y1="3.22" x2="6.34" y2="5.34" />
                <line x1="1" y1="10" x2="4" y2="10" />
                <line x1="19.78" y1="3.22" x2="17.66" y2="5.34" />
                <line x1="23" y1="10" x2="20" y2="10" />
                <path d="M7 17l1.5-4h7L17 17" />
                <line x1="5" y1="21" x2="19" y2="21" />
                <line x1="8" y1="21" x2="8" y2="17" />
                <line x1="16" y1="21" x2="16" y2="17" />
              </svg>
              <span>Featuring</span>
            </div>

            <h1
              className="hero-h1"
              style={{
                fontSize: '29px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0px 0px 10px',
                lineHeight: 1.2,
                fontFamily: FONT,
              }}
            >
              Mayo Clinic Amyloidosis Program
            </h1>

            <div
              style={{
                width: '45px',
                height: '3px',
                background: HERO_GOLD,
                borderRadius: '2px',
                marginBottom: '10px',
              }}
            />

            <p
              className="hero-program-title"
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.85)',
                margin: '0px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                fontFamily: FONT,
              }}
            >
              AMYLOIDOSIS PROGRAM
            </p>
          </div>
        </div>

        <div className="hero-logo-col" style={{ flexShrink: 0, marginRight: '7rem' }}>
          <MayoIdentity />
        </div>
      </div>
    </section>
  </>
);
