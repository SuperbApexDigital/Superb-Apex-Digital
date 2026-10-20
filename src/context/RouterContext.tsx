import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { RoutePath } from '../types';

interface QueryParams {
  [key: string]: string;
}

interface RouterContextType {
  route: RoutePath;
  params: QueryParams;
  navigate: (to: RoutePath, queryParams?: QueryParams) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const VALID_ROUTES: RoutePath[] = [
  'home',
  'services',
  'services/discord',
  'services/twitch',
  'services/youtube',
  'services/social-media',
  'services/community-management',
  'services/creator-branding',
  'team',
  'about',
  'process',
  'portfolio',
  'pricing',
  'reviews',
  'admin',
  'trust',
  'faq',
  'contact',
  'quote',
  'privacy',
  'terms',
  'not-found',
];

function parseCurrentLocation(): { route: RoutePath; params: QueryParams } {
  if (typeof window === 'undefined') {
    return { route: 'home', params: {} };
  }

  // 1. Process hash route if present
  const rawHash = window.location.hash || '';
  if (rawHash && rawHash !== '#' && rawHash !== '#/') {
    let clean = rawHash.replace(/^#\/?/, '').trim();
    if (clean === 'index.html' || clean.startsWith('index.html?')) {
      clean = clean.replace(/^index\.html\/?/, '');
    }

    if (!clean) {
      return { route: 'home', params: {} };
    }

    const [pathPart, queryPart] = clean.split('?');
    const params: QueryParams = {};

    if (queryPart) {
      try {
        const searchParams = new URLSearchParams(queryPart);
        searchParams.forEach((val, key) => {
          params[key] = val;
        });
      } catch {
        // Query param parsing fallback
      }
    }

    const cleanPath = (pathPart || 'home').replace(/\/+$/, '').trim();
    // Case-insensitive match against VALID_ROUTES (e.g. /Admin, #/Admin, /admin)
    const matchedHashRoute = VALID_ROUTES.find(
      (r) => r.toLowerCase() === cleanPath.toLowerCase()
    );
    if (matchedHashRoute) {
      return { route: matchedHashRoute, params };
    }

    return { route: 'not-found', params };
  }

  // 2. Fallback: Parse path directly if accessed without hash (e.g. myWebsite/Admin)
  const pathname = window.location.pathname || '/';
  const segments = pathname.split('/').filter(Boolean);

  // If first segment is repository name (GitHub Pages <user>.github.io/<repo>), remove it if not a route
  if (segments.length > 0) {
    const firstLower = segments[0].toLowerCase();
    const isKnownRoute = VALID_ROUTES.some(
      (r) => r.toLowerCase() === firstLower || r.toLowerCase().startsWith(`${firstLower}/`)
    );
    if (!isKnownRoute && firstLower !== 'index.html') {
      segments.shift();
    }
  }

  const remainingPath = segments.join('/').replace(/\/+$/, '').trim();
  if (!remainingPath || remainingPath.toLowerCase() === 'index.html') {
    // Check if query param specifies admin or page (e.g. ?admin or ?Admin)
    if (typeof window !== 'undefined' && window.location.search) {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page') || searchParams.get('p');
        if (page) {
          const match = VALID_ROUTES.find((r) => r.toLowerCase() === page.toLowerCase());
          if (match) return { route: match, params: {} };
        }
        if (searchParams.has('admin') || searchParams.has('Admin')) {
          return { route: 'admin', params: {} };
        }
      } catch {
        // Fallback
      }
    }
    return { route: 'home', params: {} };
  }

  // Case-insensitive matching for direct paths like /Admin
  const matchedPathRoute = VALID_ROUTES.find(
    (r) => r.toLowerCase() === remainingPath.toLowerCase()
  );
  if (matchedPathRoute) {
    return { route: matchedPathRoute, params: {} };
  }

  return { route: 'home', params: {} };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() => {
    return parseCurrentLocation().route;
  });
  const [currentParams, setCurrentParams] = useState<QueryParams>(() => {
    return parseCurrentLocation().params;
  });

  // Sync state from current URL
  const syncLocation = useCallback(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseCurrentLocation();
    setCurrentRoute(parsed.route);
    setCurrentParams(parsed.params);
  }, []);

  useEffect(() => {
    syncLocation();

    const handleLocationChange = () => {
      syncLocation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [syncLocation]);

  const navigate = useCallback((to: RoutePath, queryParams?: QueryParams) => {
    let target = `#/${to === 'home' ? '' : to}`;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const qs = new URLSearchParams(queryParams).toString();
      target += `?${qs}`;
    }
    window.location.hash = target;
    setCurrentRoute(to);
    setCurrentParams(queryParams || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <RouterContext.Provider
      value={{
        route: currentRoute,
        params: currentParams,
        navigate,
        goBack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
