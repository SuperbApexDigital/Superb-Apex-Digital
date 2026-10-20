/**
 * Utility to resolve profile avatar and static image URLs consistently across mobile devices,
 * local development, GitHub Pages (including custom repository names), and cloud storage data URLs.
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

  // Detect base URL from Vite or runtime environment
  let base = import.meta.env.BASE_URL || './';

  // If hosted on GitHub Pages (<user>.github.io/<repo>) and base is still default '/', infer repo subpath
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && segments[0] !== 'index.html' && (!base || base === '/')) {
      base = `/${segments[0]}/`;
    }
  }

  const filename = url.split('/').pop();
  if (!filename) return url;

  // Format base to end with slash
  const slashBase = base.endsWith('/') ? base : `${base}/`;

  if (url.includes('/images/') || url.includes('/assets/images/')) {
    return `${slashBase}images/${filename}`;
  }

  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  return `${slashBase}${cleanUrl}`;
}
