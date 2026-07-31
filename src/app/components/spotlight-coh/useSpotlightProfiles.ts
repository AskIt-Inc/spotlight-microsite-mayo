import { useEffect, useMemo, useState } from 'react';

const TEAM_API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/team?partner=13455&series=5&base64=no';

interface ApiProfile {
  uid: number;
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
  specialty_line_1: string;
  specialty_line_2: string;
  spotlight_card_tag: string;
  title: string;
  bio: string;
  photo_url: string;
  employer: string;
  indication: string;
}

interface ApiCategory {
  id: number | null;
  label: string;
  members?: ApiProfile[];
  sort_order: number;
}

interface ApiLocation {
  id: number;
  label: string;
  categories?: ApiCategory[];
  sort_order: number;
}

interface ApiSection {
  key: string;
  label: string;
  categories?: ApiCategory[];
  locations?: ApiLocation[];
  sort_order: number;
}

interface ApiTeamResponse {
  data?: {
    sections?: ApiSection[];
  };
}

export interface NormalizedProfile {
  uid: number;
  lastNameKey: string;
  displayName: string;
  firstName: string;
  lastName: string;
  nameSuffix: string;
  specialtyLine1: string;
  specialtyLine2: string;
  spotlightCardTag: string;
  titlePrefix: string;
  bio: string;
  photoUrl: string;
  employer: string;
  indication: string;
}

export interface TeamCategory {
  id: number | null;
  label: string;
  members: NormalizedProfile[];
}

export interface TeamLocation {
  id: number;
  label: string;
  categories: TeamCategory[];
}

export interface TeamHierarchySection {
  key: string;
  label: string;
  categories: TeamCategory[];
  locations: TeamLocation[];
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanProfileBio(profile: ApiProfile): string {
  return stripHtml(profile.bio ?? '');
}

function normalizeLastName(lastName: string, suffix: string): string {
  let normalized = lastName.trim();

  for (const part of suffix.split(',')) {
    const token = part.trim();
    if (!token) continue;
    normalized = normalized.replace(new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), '');
  }

  return normalized.replace(/[, ]+$/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeProfile(profile: ApiProfile): NormalizedProfile {
  const lastName = normalizeLastName(profile.last_name ?? '', profile.name_suffix ?? '');
  const displayName = profile.display_name
    || [profile.first_name, lastName, profile.name_suffix].filter(Boolean).join(' ');

  return {
    uid: profile.uid,
    lastNameKey: lastName.toLowerCase(),
    displayName,
    firstName: profile.first_name ?? '',
    lastName,
    nameSuffix: profile.name_suffix ?? '',
    specialtyLine1: profile.specialty_line_1 ?? '',
    specialtyLine2: profile.specialty_line_2 ?? '',
    spotlightCardTag: profile.spotlight_card_tag ?? '',
    titlePrefix: profile.title ?? '',
    bio: cleanProfileBio(profile),
    photoUrl: profile.photo_url ?? '',
    employer: profile.employer ?? '',
    indication: profile.indication ?? '',
  };
}

function normalizeMembers(members: ApiProfile[] = []): NormalizedProfile[] {
  const seen = new Set<number>();

  return members.reduce<NormalizedProfile[]>((normalized, member) => {
    if (seen.has(member.uid)) return normalized;
    seen.add(member.uid);
    normalized.push(normalizeProfile(member));
    return normalized;
  }, []);
}

function normalizeCategories(categories: ApiCategory[] = []): TeamCategory[] {
  return categories.reduce<TeamCategory[]>((normalized, category) => {
    const members = normalizeMembers(category.members);
    if (members.length === 0) return normalized;

    normalized.push({ id: category.id, label: category.label ?? '', members });
    return normalized;
  }, []);
}

function normalizeSections(sections: ApiSection[] = []): TeamHierarchySection[] {
  return sections.map((section) => ({
    key: section.key,
    label: section.label ?? '',
    categories: normalizeCategories(section.categories),
    locations: (section.locations ?? []).map((location) => ({
      id: location.id,
      label: location.label ?? '',
      categories: normalizeCategories(location.categories),
    })),
  }));
}

export function useSpotlightProfiles() {
  const [sections, setSections] = useState<TeamHierarchySection[]>([]);
  const [profiles, setProfiles] = useState<NormalizedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        const response = await fetch(TEAM_API_URL);

        if (!response.ok) {
          throw new Error(`Team API returned ${response.status}`);
        }

        const payload = (await response.json()) as ApiTeamResponse;
        const normalizedSections = normalizeSections(payload.data?.sections);
        const normalizedProfiles: NormalizedProfile[] = [];
        const seen = new Set<number>();

        for (const section of normalizedSections) {
          const categoryGroups = [
            ...section.categories,
            ...section.locations.flatMap((location) => location.categories),
          ];
          for (const category of categoryGroups) {
            for (const profile of category.members) {
              if (seen.has(profile.uid)) continue;
              seen.add(profile.uid);
              normalizedProfiles.push(profile);
            }
          }
        }

        if (!cancelled) {
          setSections(normalizedSections);
          setProfiles(normalizedProfiles);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Team API request failed');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

  const profileMap = useMemo(
    () => new Map(profiles.map((profile) => [profile.uid, profile])),
    [profiles],
  );

  return { sections, profiles, profileMap, loading, error };
}
