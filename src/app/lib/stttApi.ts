const STTT_API_BASE_URL = import.meta.env.DEV
  ? '/sttt-api'
  : 'https://somebodytotalkto.com';

const LOCAL_STTT_ORIGIN = 'https://local-sttt.somebodytotalkto.com:8443';

export function stttApiUrl(path: string): string {
  return `${STTT_API_BASE_URL}${path}`;
}

export function stttAssetUrl(url: string): string {
  if (!import.meta.env.DEV || !url.startsWith(LOCAL_STTT_ORIGIN)) return url;

  return url.replace(LOCAL_STTT_ORIGIN, STTT_API_BASE_URL);
}
