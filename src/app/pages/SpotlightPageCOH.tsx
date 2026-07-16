import React from 'react';
import { HeroSection }      from '../components/spotlight-coh/HeroSection';
import { AboutProgramSection, OverviewSection } from '../components/spotlight-coh/OverviewSection';
import { HighlightsSection } from '../components/spotlight-coh/HighlightsSection';
import { TeamSection }      from '../components/spotlight-coh/TeamSection';
import { TrialsSection }    from '../components/spotlight-coh/TrialsSection';
import { SessionsSidebar }  from '../components/spotlight-coh/SessionsSidebar';

// Mayo microsite page layout.

export const SpotlightPageCOH: React.FC = () => {
  return (
    <div>
      <HeroSection />

      <div
        className="spotlight-content-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 64px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left — main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <OverviewSection />
          <AboutProgramSection />
          <HighlightsSection />
          <TeamSection />
          <TrialsSection />
        </div>

        {/* Right — sticky sessions sidebar */}
        <div
          className="spotlight-sidebar-wrapper"
          style={{
            width: '300px',
            flexShrink: 0,
            position: 'sticky' as const,
            top: '104px',
            alignSelf: 'flex-start',
            marginTop: '5px',
          }}
        >
          <SessionsSidebar />
        </div>
      </div>
    </div>
  );
};
