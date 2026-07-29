# Mayo Clinic Microsite Handoff

## Purpose

This microsite is the Mayo Clinic Amyloidosis Program implementation. Reuse the patterns below for future partner microsites instead of rebuilding the presentation decisions from scratch.

## Active route and data ownership

- Active page route: `/`
- Page composition: `src/app/pages/SpotlightPageCOH.tsx`
- Mayo UI components: `src/app/components/spotlight-coh/`
- Profiles are API-driven through `useSpotlightProfiles.ts`.
- Sessions are API-driven through `useSpotlightSessions.ts`.
- Do not add local fallback clinician or session data. The UI must continue to reflect the partner APIs.

### API endpoints

- Profiles: `https://somebodytotalkto.com/api/spotlight/microsite/profiles?partner=13455&base64=no`
- Sessions: `https://somebodytotalkto.com/api/spotlight/microsite/sessions?partner=13455&status=all&base64=no`

## Approved typography pattern

Apply this to top-level section headings and their subtitles:

| Element | Style |
| --- | --- |
| Heading | `gotham, sans-serif`, 28px, weight 300, `#000000` |
| Subtitle | `gotham, sans-serif`, 14px, weight 400, `#686868` |
| Primary action link | 14px, weight 400, Mayo blue `#0057B8` |

This treatment is used in the Mayo Overview/Directors, Program Highlights, Meet the Team, and Clinical Trials sections. It follows the approved UChicago hierarchy while using Mayo colours.

## Mayo colour usage

- Primary blue: `#0057B8` — links, modal specialty line, photo ring, primary CTA.
- Deep navy: `#002443` — clinician specialty on profile cards and session-date text.
- Secondary text: `#686868` — section subtitles.
- Pale blue panel: `#E1F0FF` with `#AFD7FF` border — provider-modal session panel.
- Main text: `#000000`.

## Meet the Team pattern

File: `src/app/components/spotlight-coh/TeamSection.tsx`

- Profile cards: name is bold black; role/title is 14px, weight 300, black; specialty and date use deep navy.
- Detail modal: 72px circular profile photo with a 3px Mayo-blue ring; 17px bold name; 13px black role/title line; 13px Mayo-blue specialty line.
- The modal receives the profile's linked session through `presenterUids` from the sessions API. Prefer an upcoming session when more than one is linked.
- The session panel displays the date, title, and description. Show the "Register for this session" button only if `session.canRegister` is true; its target is the API-provided `session.regUrl`.

## Local development

From the repository root:

```sh
pnpm dev -- --host 127.0.0.1
```

The normal local URL is `http://localhost:5173/`.

## Current work

- Branch: `codex/mayo-modal-style`
- Uncommitted implementation: provider detail modal session panel in `src/app/components/spotlight-coh/TeamSection.tsx`.
- The prior typography updates are already on `main` in commit `d24e2e2`.

## Before handoff or release

1. Confirm that profile and session API responses load on the target environment.
2. Open at least one provider with a linked upcoming session and confirm the panel and registration CTA appear.
3. Keep session content API-driven; do not copy UChicago session copy or maroon colours into Mayo.
