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
  | 'reviews'
  | 'admin'
  | 'trust'
  | 'faq'
  | 'contact'
  | 'quote'
  | 'privacy'
  | 'terms'
  | 'not-found';

export type ThemeMode = 'dark' | 'light' | 'system';

export type ReviewServiceCategory =
  | 'Discord Services'
  | 'Twitch Services'
  | 'YouTube Services'
  | 'Social Media Services'
  | 'Community Management'
  | 'Creator Branding'
  | 'Custom Project';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface AdminReply {
  message: string;
  repliedAt: string;
  author: string;
}

export interface Review {
  id: string;
  clientName: string;
  clientRole: string;
  clientAvatar?: string;
  avatarBgColor?: string;
  serviceCategory: ReviewServiceCategory;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string; // ISO string
  status: ReviewStatus;
  featured?: boolean;
  verifiedClient?: boolean;
  adminReply?: AdminReply;
}

export interface ReviewFormData {
  clientName: string;
  clientRole: string;
  serviceCategory: ReviewServiceCategory;
  rating: number;
  title: string;
  comment: string;
  verifiedClient: boolean;
}

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

export type TeamDepartment =
  | 'Client Strategy & Creator Partnerships'
  | 'Technical Operations & Escalations'
  | 'Networking Relations Team'
  | 'Partner Success & Escalations';

export interface TeamDivision {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  briefDescription: string;
  valueProposition: string;
  coreResponsibilities: string[];
  stats: { label: string; value: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  discordTag: string;
  department: string;
  role: string;
  initials: string;
  bio: string;
  avatarTheme?: string;
  avatarUrl?: string;
  bannerGradient?: string;
  discordRoles?: string[];
  focusAreas: string[];
  status: 'Active Lead' | 'Profile Configurable' | 'Online Specialist';
  isCustom?: boolean;
  staffId?: string;
  officialEmail?: string;
  verifiedRep?: boolean;
  authorizedScope?: string[];
  verificationNotes?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Discord' | 'Twitch' | 'YouTube' | 'Social Media' | 'Creator Branding' | 'Community';
  badge: string;
  description: string;
  deliverables: string[];
  designSystem: string;
  image?: string;
  metrics?: string;
  clientOrg?: string;
  verifiedClient?: boolean;
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
