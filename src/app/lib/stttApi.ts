const STTT_API_BASE_URL = import.meta.env.DEV
  ? 'https://local-sttt.somebodytotalkto.com:8443'
  : 'https://somebodytotalkto.com';

export function stttApiUrl(path: string): string {
  return `${STTT_API_BASE_URL}${path}`;
}
