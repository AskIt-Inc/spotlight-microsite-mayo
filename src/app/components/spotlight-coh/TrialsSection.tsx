import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { mayoAmyloidosisTrialIds, type Trial } from './data';
import { useFormProtection } from '../../hooks/useFormProtection';
import { stttApiUrl } from '../../lib/stttApi';

const FONT = 'gotham, sans-serif';
const ENDPOINT = stttApiUrl('/api/spotlight/research-interest');
const MAYO_TRIALS_URL = 'https://www.mayo.edu/research/clinical-trials/diseases-conditions/amyloidosis';
const PARTNER_TID = 13455;
const CLINICAL_TRIALS_API_URL = 'https://clinicaltrials.gov/api/v2/studies';

type FormState = 'idle' | 'open' | 'submitting' | 'submitted' | 'error';

interface ClinicalTrialsGovStudy {
  protocolSection?: {
    descriptionModule?: { briefSummary?: string; detailedDescription?: string };
    designModule?: { phases?: string[]; studyType?: string };
    identificationModule?: { briefTitle?: string; nctId?: string };
    statusModule?: { overallStatus?: string };
  };
}

const getRecruitingTrials = (studies: ClinicalTrialsGovStudy[]): Trial[] => studies
  .filter((study) => study.protocolSection?.statusModule?.overallStatus === 'RECRUITING')
  .map((study) => {
    const protocol = study.protocolSection!;
    return {
      id: protocol.identificationModule?.nctId ?? '',
      title: protocol.identificationModule?.briefTitle ?? 'Clinical trial',
      status: 'Recruiting',
      description: protocol.descriptionModule?.briefSummary ?? protocol.descriptionModule?.detailedDescription ?? 'Study details are available on ClinicalTrials.gov.',
      phase: protocol.designModule?.phases?.join(' / ') ?? protocol.designModule?.studyType ?? 'Clinical study',
    };
  })
  .sort((first, second) => first.id.localeCompare(second.id));

const TrialCard: React.FC<{ trial: Trial }> = ({ trial }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { honeypotProps, getProtectionPayload, isSuspicious, resetTimer } = useFormProtection();
  const canExpressInterest = trial.status.toLowerCase() === 'recruiting';

  const inputStyle = (field: string) => ({
    background: '#ffffff',
    border: `1px solid ${focusedField === field ? '#1C1C1C' : '#E5E5E5'}`,
    borderRadius: '4px',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(0,110,142,0.14)' : 'none',
    boxSizing: 'border-box' as const,
    display: 'block',
    fontFamily: FONT,
    fontSize: '14px',
    marginTop: '4px',
    outline: 'none',
    padding: '8px 12px',
    width: '100%',
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('submitting');
    try {
      if (isSuspicious()) {
        setFormState('submitted');
        return;
      }
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submitter_email: email,
          submitter_name: name,
          submitter_phone: phone || undefined,
          indication: 'Amyloidosis',
          interest_type: 'clinical_trial',
          trial_name: `${trial.id}: ${trial.title}`,
          microsite_url: window.location.origin,
          partner_tid: PARTNER_TID,
          ...getProtectionPayload(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setFormState('submitted');
    } catch {
      setFormState('error');
    }
  };

  return (
    <div>
      <article className="trial-card" style={{ alignItems: 'flex-start', background: 'var(--oav-card-bg)', border: '1px solid var(--oav-border)', borderRadius: formState === 'idle' ? '8px' : '8px 8px 0 0', boxShadow: 'var(--oav-card-shadow)', display: 'flex', gap: '24px', justifyContent: 'space-between', padding: '20px 24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#4B5563', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>{trial.id}</div>
          <h3 style={{ color: 'var(--oav-text-primary)', fontFamily: FONT, fontSize: '16px', fontWeight: 700, lineHeight: 1.4, margin: '0 0 8px' }}>{trial.title}</h3>
          <span style={{ background: '#F8F5EE', border: '1px solid #E0D5C0', borderRadius: '9999px', color: '#1C1C1C', display: 'inline-block', fontFamily: FONT, fontSize: '11px', fontWeight: 300, padding: '2px 10px' }}>{trial.status}</span>
          <p style={{ color: '#000000', display: '-webkit-box', fontFamily: FONT, fontSize: '14px', lineHeight: 1.7, margin: '8px 0 0', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>{trial.description}</p>
          <div style={{ color: '#4B5563', fontFamily: FONT, fontSize: '12px', marginTop: '6px' }}>{trial.phase}</div>
        </div>
        {canExpressInterest && formState === 'idle' && <button type="button" onClick={() => { resetTimer(); setFormState('open'); }} style={{ background: 'transparent', border: '1px solid #1C1C1C', borderRadius: '4px', color: '#1C1C1C', cursor: 'pointer', flexShrink: 0, fontFamily: FONT, fontSize: '13px', fontWeight: 300, padding: '8px 16px', whiteSpace: 'nowrap' }}>Express Interest</button>}
      </article>

      {formState === 'open' && (
        <div style={{ background: '#F8F5EE', border: '1px solid #E0D5C0', borderRadius: '0 0 8px 8px', borderTop: 'none', marginTop: '-8px', padding: '20px 24px' }}>
          <div style={{ color: '#000000', fontFamily: FONT, fontSize: '16px', fontWeight: 300 }}>Express your interest in this trial</div>
          <p style={{ color: '#000000', fontFamily: FONT, fontSize: '14px', lineHeight: 1.5, margin: '4px 0 16px' }}>A member of the research team will be in touch.</p>
          <form onSubmit={submit}>
            <label style={{ display: 'block', fontFamily: FONT, fontSize: '14px', marginBottom: '12px' }}>Full name <span style={{ color: '#dc2626' }}>*</span><input type="text" required value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} placeholder="Your full name" style={inputStyle('name')} /></label>
            <label style={{ display: 'block', fontFamily: FONT, fontSize: '14px', marginBottom: '12px' }}>Email address <span style={{ color: '#dc2626' }}>*</span><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} placeholder="you@example.com" style={inputStyle('email')} /></label>
            <label style={{ display: 'block', fontFamily: FONT, fontSize: '14px', marginBottom: '12px' }}>Phone number (optional)<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} placeholder="+1 (555) 000-0000" style={inputStyle('phone')} /></label>
            <div style={{ height: 0, left: '-9999px', opacity: 0, overflow: 'hidden', position: 'absolute' }} aria-hidden="true"><input {...honeypotProps} /></div>
            <p style={{ color: '#4B5563', fontFamily: FONT, fontSize: '12px', margin: '0 0 12px' }}>Your details will only be shared with the Mayo Clinic amyloidosis research team.</p>
            <button type="submit" disabled={formState === 'submitting'} style={{ background: formState === 'submitting' ? '#4B5563' : '#1C1C1C', border: 'none', borderRadius: '4px', color: '#ffffff', cursor: formState === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: FONT, fontSize: '14px', padding: '10px 16px', width: '100%' }}>{formState === 'submitting' ? 'Submitting...' : 'Submit Interest'}</button>
            <div style={{ marginTop: '8px', textAlign: 'center' }}><button type="button" onClick={() => setFormState('idle')} style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', fontFamily: FONT, fontSize: '12px' }}>Cancel</button></div>
          </form>
        </div>
      )}
      {formState === 'submitted' && <div style={{ alignItems: 'center', background: '#F8F5EE', border: '1px solid #E0D5C0', borderRadius: '0 0 8px 8px', borderTop: 'none', display: 'flex', fontFamily: FONT, fontSize: '14px', gap: '12px', marginTop: '-8px', padding: '20px 24px' }}><CheckCircle size={20} color="#7CC242" />Thank you. The research team will be in touch soon.</div>}
      {formState === 'error' && <div style={{ alignItems: 'center', background: '#F8F5EE', border: '1px solid #E0D5C0', borderRadius: '0 0 8px 8px', borderTop: 'none', display: 'flex', fontFamily: FONT, fontSize: '14px', gap: '12px', marginTop: '-8px', padding: '20px 24px' }}><AlertCircle size={20} />Something went wrong. Please try again or email <a href="mailto:info@somebodytotalkto.com">info@somebodytotalkto.com</a>.</div>}
    </div>
  );
};

export const TrialsSection: React.FC = () => {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      format: 'json',
      pageSize: '100',
      'postFilter.ids': mayoAmyloidosisTrialIds.join(','),
    });

    fetch(`${CLINICAL_TRIALS_API_URL}?${params.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`ClinicalTrials.gov returned ${response.status}`);
        const payload = await response.json() as { studies?: ClinicalTrialsGovStudy[] };
        setTrials(getRecruitingTrials(payload.studies ?? []));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <section style={{ background: 'var(--oav-page-bg)', padding: '16px 0 56px' }}>
      <div className="trials-section-inner">
        <h2 style={{ color: 'var(--oav-text-primary)', fontFamily: FONT, fontSize: '28px', fontWeight: 300, lineHeight: 1.3, margin: 0 }}>Clinical Trials</h2>
        <p style={{ color: '#686868', fontFamily: FONT, fontSize: '14px', fontWeight: 400, lineHeight: 1.5, margin: '8px 0 0' }}>Current amyloidosis clinical trials at Mayo Clinic</p>
        <a href={MAYO_TRIALS_URL} target="_blank" rel="noopener noreferrer" style={{ alignItems: 'center', color: '#0057B8', display: 'inline-flex', fontFamily: FONT, fontSize: '14px', fontWeight: 400, gap: '4px', marginTop: '16px', textDecoration: 'none' }}><ExternalLink size={13} /> View all at Mayo Clinic</a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
          {trials.map((trial) => <TrialCard key={trial.id} trial={trial} />)}
          {!loadError && trials.length === 0 && <p style={{ fontFamily: FONT }}>Loading current trial availability…</p>}
          {loadError && <p style={{ fontFamily: FONT }}>Current clinical-trial availability could not be loaded. Please try again later.</p>}
        </div>
      </div>
    </section>
  );
};
