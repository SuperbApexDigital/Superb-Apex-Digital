import { TeamMember, PortfolioItem, PricingTier } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'lead-ops-1',
    department: 'Leadership & Operations',
    role: 'Managing Director & Client Strategy',
    initials: 'MD',
    bio: 'Oversees agency client engagements, project scoping, and delivery standards across all creative and technical divisions.',
    focusAreas: ['Agency Strategy', 'Cross-Disciplinary Scoping', 'Account Governance'],
    status: 'Active Lead',
  },
  {
    id: 'lead-ops-2',
    department: 'Leadership & Operations',
    role: 'Operations & Delivery Lead',
    initials: 'OL',
    bio: 'Coordinates project milestones, resource allocation, and quality review checkpoints for one-time builds and recurring retainers.',
    focusAreas: ['Workflow Engineering', 'Resource Scheduling', 'Delivery Timelines'],
    status: 'Active Lead',
  },
  {
    id: 'discord-team-1',
    department: 'Discord & Community Services',
    role: 'Senior Community Systems Architect',
    initials: 'CA',
    bio: 'Specializes in high-concurrency Discord server architecture, role-permission matrices, bot orchestration, and automated verification.',
    focusAreas: ['Discord Architecture', 'Permission Hardening', 'Bot Automation'],
    status: 'Active Lead',
  },
  {
    id: 'discord-team-2',
    department: 'Discord & Community Services',
    role: 'Community Operations & Moderation Specialist',
    initials: 'CM',
    bio: 'Develops staff onboarding documentation, incident response SOPs, and community engagement initiatives for creator spaces.',
    focusAreas: ['SOP Documentation', 'Crisis Escalation', 'Member Onboarding'],
    status: 'Profile Configurable',
  },
  {
    id: 'stream-team-1',
    department: 'Streaming & Creator Services',
    role: 'Broadcast Design & Stream Specialist',
    initials: 'BS',
    bio: 'Designs animated broadcast graphics, OBS scene collections, low-latency alert animations, and Twitch channel presentation suites.',
    focusAreas: ['OBS Scene Packages', 'Alert Integration', 'Twitch Channel Styling'],
    status: 'Active Lead',
  },
  {
    id: 'stream-team-2',
    department: 'Streaming & Creator Services',
    role: 'Technical Audio/Visual Consultant',
    initials: 'AV',
    bio: 'Assists streaming clients with hardware-accelerated OBS encoder settings, audio routing workflows, and dynamic overlay widgets.',
    focusAreas: ['OBS Optimization', 'Audio Pipeline', 'Widget Styling'],
    status: 'Profile Configurable',
  },
  {
    id: 'video-creative-1',
    department: 'Video & Creative Production',
    role: 'Lead Visual Designer & Brand Strategist',
    initials: 'VD',
    bio: 'Directs creator brand identity systems, typography guidelines, vector emblems, and YouTube thumbnail presentation frameworks.',
    focusAreas: ['Identity Systems', 'Thumbnail Systems', 'Typography Design'],
    status: 'Active Lead',
  },
  {
    id: 'video-creative-2',
    department: 'Video & Creative Production',
    role: 'Video Editor & Motion Designer',
    initials: 'VE',
    bio: 'Crafts high-retention video edits, animated lower thirds, stingers, and short-form video cutdowns for YouTube and TikTok.',
    focusAreas: ['Pacing & Motion', 'Shorts Repurposing', 'Post-Production'],
    status: 'Profile Configurable',
  },
  {
    id: 'social-marketing-1',
    department: 'Social Media & Marketing',
    role: 'Social Systems & Content Strategist',
    initials: 'SS',
    bio: 'Builds cross-platform design templates, editorial publishing schedules, and brand-consistent social campaigns.',
    focusAreas: ['Cross-Platform Templates', 'Content Calendars', 'Campaign Planning'],
    status: 'Active Lead',
  },
  {
    id: 'client-qa-1',
    department: 'Client Success & Quality Assurance',
    role: 'Client Success & Access Security Manager',
    initials: 'CS',
    bio: 'Oversees secure credential-free platform delegation, project revisions, client communication channels, and handover documentation.',
    focusAreas: ['Client Onboarding', 'Access Security Protocols', 'Handover Assurance'],
    status: 'Active Lead',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Nexus Apex Gaming Guild Infrastructure',
    category: 'Discord',
    badge: 'Concept Showcase',
    description:
      'A comprehensive 24-channel server architecture engineered for an esports community. Features layered role permissions, anti-raid verification gates, automated ticket logging, and custom-designed channel banners.',
    deliverables: [
      'Complete Discord server hierarchy & category layout',
      'Granular 12-tier Role Permission Matrix',
      'Automated Ticket Tool & Wick security bots configuration',
      'Custom SVG category headers and role badges',
    ],
    designSystem: 'Deep obsidian backdrop with neon cobalt accents and clean alphanumeric channel tags',
  },
  {
    id: 'portfolio-2',
    title: 'Valkyrie Horizon Broadcast Suite',
    category: 'Twitch',
    badge: 'Concept Showcase',
    description:
      'Complete Twitch stream presentation package designed for a variety broadcaster. Includes modular 16:9 webcam borders, dynamic event alerts, starting/ending screens, and a 12-panel profile layout.',
    deliverables: [
      'OBS Studio scene collection package (WebM/PNG)',
      'Custom animated follower, subscriber, and raid alerts',
      'Full profile panel set (Specs, Schedule, Socials, Rules)',
      'Hardware-calibrated GPU friendly browser sources',
    ],
    designSystem: 'Cyber-minimalist aesthetic with violet-blue glow and high-legibility geometric typography',
  },
  {
    id: 'portfolio-3',
    title: 'Forge Creator Studio Thumbnail Framework',
    category: 'YouTube',
    badge: 'Concept Showcase',
    description:
      'A modular thumbnail design system and channel branding identity built for an educational tech creator. Delivered responsive channel banners, lower-third motion templates, and layered thumbnail files.',
    deliverables: [
      'Master responsive channel art for TV, desktop, and mobile',
      '6 layered thumbnail composition templates (Figma/PSD)',
      'Animated video outro card & watermark graphic',
      'Short-form vertical video framing guidelines',
    ],
    designSystem: 'High-contrast framing with bright focal cutouts, bold sans display type, and saturated edge lighting',
  },
  {
    id: 'portfolio-4',
    title: 'Aura Social Multi-Platform Identity Suite',
    category: 'Social Media',
    badge: 'Concept Showcase',
    description:
      'A unified social media asset library across X, Instagram, LinkedIn, and TikTok for a creative software brand. Standardized post layouts, quote templates, and carousels.',
    deliverables: [
      '24 customizable feed post templates in Figma',
      'Matching multi-platform headers and profile avatars',
      'Monthly editorial content calendar blueprint',
      'Vertical Short/Reel caption motion guidelines',
    ],
    designSystem: 'Modern architectural layout with clean hairline dividers and muted slate backgrounds',
  },
  {
    id: 'portfolio-5',
    title: 'Beacon Community Moderation Operations Guide',
    category: 'Community',
    badge: 'Demonstration Work',
    description:
      'A complete community governance blueprint detailing rules of conduct, moderator escalation flows, private ticket triage systems, and weekly member engagement schedules.',
    deliverables: [
      'Standard Operating Procedures (SOP) handbook (Notion/PDF)',
      'Tiered warning, timeout, and ban policy documentation',
      'Weekly engagement activity schedule with discussion prompts',
      'Monthly community analytics reporting template',
    ],
    designSystem: 'Clear technical documentation with structured flowchart diagrams and incident checklists',
  },
  {
    id: 'portfolio-6',
    title: 'Kinetix Creator Brand Identity & Sponsor Kit',
    category: 'Creator Branding',
    badge: 'Concept Showcase',
    description:
      'Complete brand identity design for a digital creator, including master vector logo marks, typography pairing, color tokens, and a 4-page commercial sponsor rate card.',
    deliverables: [
      'Vector logo suite with emblem, wordmark, and favicon',
      'Brand style guide PDF with color hex codes and safe margins',
      'Commercial Media Kit / Sponsor Pitch Deck (Figma)',
      'Cross-platform brand application guidelines',
    ],
    designSystem: 'Crisp geometric typography with an electric blue accent palette and dark mode optical compensation',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-one-starter',
    title: 'Core Foundation Build',
    model: 'One-Time Project',
    scopeLevel: 'Essential Implementation',
    bestFor: 'New servers, single platform setups, or focused channel branding',
    features: [
      'Comprehensive architectural blueprint & channel setup',
      'Role & permission hierarchy configuration (zero leaks)',
      'Essential utility & moderation bot configuration',
      'Branded channel icons or profile graphics',
      'Documented handover walkthrough guide',
      '14-day post-delivery support window',
    ],
    typicalTimeline: '5 to 7 Business Days',
    serviceCategory: 'Discord / Twitch / YouTube',
  },
  {
    id: 'tier-one-complete',
    title: 'Full Brand & Infrastructure Suite',
    model: 'One-Time Project',
    scopeLevel: 'Comprehensive Multi-Platform',
    bestFor: 'Established creators and gaming organizations needing a unified multi-platform launch',
    features: [
      'Complete Discord architecture + bot orchestration',
      'Full broadcast package (OBS scene collection, alerts, panels)',
      'YouTube channel banner + thumbnail system (6 templates)',
      'Cross-platform social media header & avatar suite',
      'Complete Brand Style Guide document with color & typography tokens',
      'Dedicated project manager & 30-day post-delivery support',
    ],
    typicalTimeline: '10 to 18 Business Days',
    serviceCategory: 'Multi-Platform Agency Bundle',
  },
  {
    id: 'tier-retainer-essential',
    title: 'Essential Operations Retainer',
    model: 'Monthly Retainer',
    scopeLevel: 'Monthly Ongoing Support',
    bestFor: 'Creators needing regular server maintenance, graphic refreshes, and support',
    features: [
      'Ongoing Discord server administration & bot updates',
      'Monthly channel graphics & announcement embeds formatting',
      'Ticket system monitoring & escalation handling',
      'Bi-weekly community health & activity review',
      'Dedicated communication channel in agency Discord/Slack',
      'Predictable monthly scope with flexible roll-over credits',
    ],
    typicalTimeline: 'Ongoing Monthly Engagement',
    serviceCategory: 'Discord & Community Administration',
  },
  {
    id: 'tier-retainer-dedicated',
    title: 'Dedicated Media & Operations Partner',
    model: 'Monthly Retainer',
    scopeLevel: 'Comprehensive Ongoing Retainer',
    bestFor: 'High-volume content creators, streamers, and communities needing an integrated creative team',
    features: [
      'Dedicated creative pipeline for thumbnails, social graphics, and stream assets',
      'Video editing / Shorts repurposing allocation',
      'Supervised community management & moderation team oversight',
      'Real-time event & tournament broadcast support coordination',
      'Monthly analytics review & strategic optimization sessions',
      'Priority turnaround with dedicated account director',
    ],
    typicalTimeline: 'Ongoing Monthly Engagement (Quarterly review)',
    serviceCategory: 'Full-Service Digital Retainer',
  },
];

export const AGENCY_FAQS = [
  {
    category: 'Engagement & Pricing',
    question: 'How does Superb Apex Digital determine project pricing?',
    answer:
      'We price based on the exact scope of deliverables, platform requirements, and whether the engagement is a one-time deployment or an ongoing monthly retainer. Because every creator and community operates at a different scale, we provide custom, itemized proposals following an initial inquiry rather than one-size-fits-all rigid pricing.',
  },
  {
    category: 'Engagement & Pricing',
    question: 'Can we begin with a one-time project and transition to a monthly retainer later?',
    answer:
      'Yes, this is our most common client path. Many creators hire us to design and build their Discord server or stream graphics suite first, and subsequently retain our team for ongoing monthly server administration, video thumbnail production, and community management.',
  },
  {
    category: 'Security & Access',
    question: 'Do you ever require our platform account passwords or 2-factor codes?',
    answer:
      'Never. Under no circumstances will Superb Apex Digital request or accept account passwords or two-factor authentication codes. All work is conducted strictly via native delegated access: Discord Administrator roles, YouTube Channel Manager permissions, Twitch Editor roles, and Meta Business Suite invites. Account ownership remains 100% with you at all times.',
  },
  {
    category: 'Security & Access',
    question: 'What happens to our access permissions once a one-time project is finished?',
    answer:
      'Once a one-time project is completed and you have approved the deliverables, we provide a formal Handover Checklist instructing you how to adjust or revoke our temporary team permissions. All source assets and credentials remain exclusively in your custody.',
  },
  {
    category: 'Workflow & Revisions',
    question: 'What is the typical revision process for creative deliverables?',
    answer:
      'Every project includes defined review checkpoints. During the initial concept stage, you provide feedback on mood boards and draft layouts. Once a direction is selected, each deliverable includes two dedicated revision rounds for fine-tuning text, framing, and color grading before final export.',
  },
  {
    category: 'Workflow & Revisions',
    question: 'What file formats and source assets do we receive upon completion?',
    answer:
      'You receive full production-ready assets and raw editable files. Depending on the service, this includes layered Figma/PSD files, vector SVGs, OBS scene JSON collections, transparent PNGs, WebM video files, and structured PDF documentation.',
  },
  {
    category: 'Ownership & Legal',
    question: 'Do we own the full intellectual property rights to our branding and assets?',
    answer:
      'Yes. Full commercial ownership of all custom logos, overlays, graphics, and server structures transfers to you upon final invoice settlement. Superb Apex Digital reserves only the right to display the work as part of our agency portfolio.',
  },
];
