export type RoutePath =
  | 'home'
  | 'services'
  | 'services/discord'
  | 'services/twitch'
  | 'services/youtube'
  | 'services/social-media'
  | 'services/community-management'
  | 'services/creator-branding'
  | 'team'
  | 'about'
  | 'process'
  | 'portfolio'
  | 'pricing'
  | 'trust'
  | 'faq'
  | 'contact'
  | 'quote'
  | 'privacy'
  | 'terms'
  | 'not-found';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface ServiceDetail {
  id: string;
  route: RoutePath;
  name: string;
  iconKey: 'discord' | 'twitch' | 'youtube' | 'social-media' | 'community-management' | 'creator-branding';
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  altText?: string;
  challengesSolved: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  engagementModels: {
    oneTime: {
      available: boolean;
      description: string;
      typicalScope: string;
    };
    monthly: {
      available: boolean;
      description: string;
      typicalScope: string;
    };
  };
  clientRequirements: string[];
  accessNotice: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface TeamMember {
  id: string;
  department: string;
  role: string;
  initials: string;
  bio: string;
  focusAreas: string[];
  status: 'Active Lead' | 'Profile Configurable';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Discord' | 'Twitch' | 'YouTube' | 'Social Media' | 'Creator Branding' | 'Community';
  badge: 'Concept Showcase' | 'Demonstration Work';
  description: string;
  deliverables: string[];
  designSystem: string;
  image?: string;
}

export interface PricingTier {
  id: string;
  title: string;
  model: 'One-Time Project' | 'Monthly Retainer';
  scopeLevel: string;
  bestFor: string;
  features: string[];
  typicalTimeline: string;
  serviceCategory: string;
}
