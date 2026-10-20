/**
 * Utility to resolve profile avatar URLs consistently across mobile devices,
 * local development, subpaths, and cloud storage data URLs.
 */
export function resolveAvatarUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (
    url.startsWith('data:') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (url.startsWith('/src/assets/images/')) {
    const filename = url.split('/').pop();
    return `${cleanBase}/images/${filename}`;
  }

  if (url.startsWith('/images/')) {
    return `${cleanBase}${url}`;
  }

  return url;
}
