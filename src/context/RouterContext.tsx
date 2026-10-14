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
  'trust',
  'faq',
  'contact',
  'quote',
  'privacy',
  'terms',
  'not-found',
];

function parseHash(hash: string): { route: RoutePath; params: QueryParams } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) {
    return { route: 'home', params: {} };
  }

  const [pathPart, queryPart] = clean.split('?');
  const params: QueryParams = {};

  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  const normalizedRoute = (pathPart || 'home') as RoutePath;
  if (VALID_ROUTES.includes(normalizedRoute)) {
    return { route: normalizedRoute, params };
  }

  return { route: 'not-found', params };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('home');
  const [currentParams, setCurrentParams] = useState<QueryParams>({});

  // Sync state from current URL hash
  const syncFromHash = useCallback(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseHash(window.location.hash);
    setCurrentRoute(parsed.route);
    setCurrentParams(parsed.params);
  }, []);

  useEffect(() => {
    syncFromHash();

    const handleHashChange = () => {
      syncFromHash();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [syncFromHash]);

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
