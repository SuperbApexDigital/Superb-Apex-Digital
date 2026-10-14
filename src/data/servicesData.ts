import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'discord',
    route: 'services/discord',
    name: 'Discord Services',
    iconKey: 'discord',
    tagline: 'Architected Server Systems & High-Retention Community Infrastructure',
    shortDescription:
      'Complete server configuration, role permissions, custom bot automations, and ongoing community administration built for creators, brands, and gaming hubs.',
    fullDescription:
      'Superb Apex Digital designs and manages Discord environments tailored to scale without clutter or chaos. From initial category hierarchy and bulletproof role permissions to verification gates, onboarding channels, and automated ticket workflows, we build communities that keep members engaged and secure.',
    challengesSolved: [
      'Unorganized channel sprawl leading to low member engagement',
      'Security risks from permission leaks, raid vulnerabilities, and misconfigured bots',
      'Member confusion during onboarding resulting in high drop-off rates',
      'Burnt-out creator teams struggling to maintain server operations alone',
    ],
    capabilities: [
      {
        title: 'Server Architecture & Hierarchy',
        description:
          'Structured category blueprints, read-only broadcast channels, discussion rooms, and stage channels organized for clarity.',
      },
      {
        title: 'Role & Permission Systems',
        description:
          'Granular permissions model separating administrators, moderators, VIPs, subscribers, and standard members with zero permission leaks.',
      },
      {
        title: 'Bot Setup & Automation',
        description:
          'Configuration of verification bots, automated welcome screens, reaction roles, leveling mechanisms, and moderation logging.',
      },
      {
        title: 'Community Rules & Onboarding',
        description:
          'Clear rule presentation, clickable agreement gates, channel roadmaps, and frictionless member guides.',
      },
      {
        title: 'Event & Announcement Management',
        description:
          'Formatted rich embed announcements, scheduled community game nights, AMA stage coordination, and community calendars.',
      },
      {
        title: 'Server Audits & Optimization',
        description:
          'Deep forensic review of existing servers to prune inactive channels, fix permission vulnerabilities, and reorganize structure.',
      },
    ],
    deliverables: [
      'Complete production-ready Discord server setup or migration',
      'Documented Role Permission Matrix (PDF / Notion guide)',
      'Configured moderation and utility bot integrations',
      'Branded channel banner graphics and role icons',
      'Automated onboarding rules and verification workflow',
      'Moderator handbook and escalation protocol',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'New server deployment, overhaul audit, or single architecture upgrade.',
        typicalScope: 'Delivered in 5–10 business days with full owner handover.',
      },
      monthly: {
        available: true,
        description: 'Ongoing server administration, bot maintenance, announcement formatting, and role sync.',
        typicalScope: 'Dedicated monthly retainer with scheduled ticket coverage and regular audits.',
      },
    },
    clientRequirements: [
      'Discord Server Administrator access (delegated via role; never password sharing)',
      'Brand guidelines, logos, and color palette preferences',
      'List of intended server roles, bots, and integration requirements',
    ],
    accessNotice:
      'Superb Apex Digital never requests account passwords or 2FA codes. All work is conducted via Discord role-based Administrator or Manager permissions and transferred to the server owner.',
    faqs: [
      {
        question: 'Can you work on our existing Discord server without wiping our current member list?',
        answer:
          'Yes. We perform live server restructuring safely during scheduled low-traffic windows or build in a private staging template before executing changes, ensuring zero member disruptions.',
      },
      {
        question: 'Do you provide human community moderators in addition to technical setup?',
        answer:
          'We offer technical server administration and structured community management retainers. For active 24/7 human moderation, we define shift parameters and team rosters in your custom scope.',
      },
      {
        question: 'What bots do you support?',
        answer:
          'We configure industry standards such as Dyno, Carl-bot, Ticket Tool, Mee6, Wick, and custom webhook integrations depending on your community needs and privacy standards.',
      },
    ],
  },
  {
    id: 'twitch',
    route: 'services/twitch',
    name: 'Twitch Services',
    iconKey: 'twitch',
    tagline: 'Professional Stream Presentation, Modular Overlays & Channel Identity',
    shortDescription:
      'Custom broadcast graphics, animated stream overlays, dynamic alert systems, panels, and OBS setup support tailored to your streaming brand.',
    fullDescription:
      'A professional stream demands cohesive visuals that match the creator’s personality and audience expectations. Superb Apex Digital builds broadcast packages for Twitch streamers — including starting screens, webcam frames, modular gameplay overlays, chat boxes, alert packages, and profile panels.',
    challengesSolved: [
      'Generic or mismatched stream graphics that dilute personal brand value',
      'Technical OBS audio/video layer confusion causing stream delays or dropouts',
      'Outdated channel panels that fail to guide viewers to social links or sponsors',
      'Time spent troubleshooting stream graphics instead of broadcasting and engaging',
    ],
    capabilities: [
      {
        title: 'Full Broadcast Overlays',
        description:
          'Modular webcam frames, game border layouts, 16:9 talk-show screens, and intermission layouts optimized for OBS/Streamlabs.',
      },
      {
        title: 'Starting, BRB & Ending Scenes',
        description:
          'Clean branded scene transition screens with audio synchronization and subtle motion pacing.',
      },
      {
        title: 'Custom Alert Packages',
        description:
          'Coordinated follower, subscriber, cheer, and raid alert visuals styled to match your channel theme.',
      },
      {
        title: 'Channel Panels & Profile Graphics',
        description:
          'Custom vector banner, offline graphic, profile avatar adjustments, and informative panel sets.',
      },
      {
        title: 'OBS & Audio Layer Setup Assistance',
        description:
          'Guided OBS scene collection packaging, browser source optimization, and bitrate/resolution configuration recommendations.',
      },
      {
        title: 'Content Repurposing & Clip Curation',
        description:
          'Review of live VODs to extract high-energy clips formatted for vertical shorts and social teasers.',
      },
    ],
    deliverables: [
      'OBS-ready Scene Collection (ZIP with PNG/WebM/JSON packages)',
      'Full set of channel panels (About, Schedule, Socials, Specs, Rules)',
      'Animated or static Starting, BRB, Gameplay, and Offline screens',
      'Custom alert animations compatible with StreamElements or Streamlabs',
      'Detailed installation guide with video walkthrough',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'Complete channel brand overhaul or new streamer starter broadcast suite.',
        typicalScope: 'Design review + full asset generation delivered in 7–12 business days.',
      },
      monthly: {
        available: true,
        description: 'Monthly graphics updates, seasonal event overlays, sponsor banner swaps, and VOD clip repurposing.',
        typicalScope: 'Ongoing creative retainer tailored to active broadcast schedules.',
      },
    },
    clientRequirements: [
      'Channel brand colors, aesthetic references, and streamer identity notes',
      'Current streaming software preference (OBS Studio, Streamlabs, etc.)',
      'Twitch Editor access where remote schedule/panel configuration is required (never password credentials)',
    ],
    accessNotice:
      'We use Twitch Editor role delegations or direct package file deliverables. We will never ask for your Twitch password or login credentials.',
    faqs: [
      {
        question: 'Do you guarantee an increase in viewers or subscribers?',
        answer:
          'No. We adhere to honest agency standards: exceptional visual presentation elevates credibility and viewer retention, but viewership growth depends on your content, consistency, and game selection.',
      },
      {
        question: 'Are the files optimized so they do not cause frame drops or lag?',
        answer:
          'Yes. All assets are lightweight, hardware-accelerated WebM/PNG files calibrated specifically to minimize GPU and CPU overhead during streaming.',
      },
    ],
  },
  {
    id: 'youtube',
    route: 'services/youtube',
    name: 'YouTube Services',
    iconKey: 'youtube',
    tagline: 'High-Impact Thumbnail Systems, Channel Art & Content Production Workflows',
    shortDescription:
      'Cohesive YouTube channel art, tested thumbnail design frameworks, video editing pipelines, and short-form repurposing for creators and businesses.',
    fullDescription:
      'Growing a YouTube presence requires both compelling visual packaging and consistent production quality. Superb Apex Digital partners with creators and media brands to establish recognizable thumbnail identity systems, channel headers, end-screens, video editing workflows, and Shorts repurposing pipelines.',
    challengesSolved: [
      'Inconsistent thumbnail styles hurting click-through rate (CTR)',
      'Time-consuming video editing backlogs that delay upload schedules',
      'Missed short-form opportunities from unedited long-form video archives',
      'Amateur channel art that lowers perceived sponsor value',
    ],
    capabilities: [
      {
        title: 'Thumbnail Identity Systems',
        description:
          'Consistent composition templates, expressive typography, high-contrast framing, and color grading designed to perform across mobile and desktop.',
      },
      {
        title: 'Channel Art & Brand Assets',
        description:
          'Multi-device responsive channel banners (TV, desktop, mobile), profile avatars, watermark icons, and community post templates.',
      },
      {
        title: 'Video Editing & Post-Production',
        description:
          'Pacing, audio sweetening, motion graphics, sound design, and color grading aligned with your channel rhythm.',
      },
      {
        title: 'YouTube Shorts Repurposing',
        description:
          'Extracting highlight moments from long-form videos with vertical 9:16 reframing, animated captions, and hook pacing.',
      },
      {
        title: 'Metadata & Publishing Support',
        description:
          'Title ideation, description template formatting, chapter timestamping, and playlist organization.',
      },
      {
        title: 'Channel Health & Layout Audits',
        description:
          'Comprehensive evaluation of existing channel presentation, upload consistency, and visual coherence.',
      },
    ],
    deliverables: [
      'High-resolution channel banner calibrated for all screen sizes',
      'Layered thumbnail PSD / Figma template library',
      'Custom video intro/outro stinger and lower-third motion graphics',
      'Edited video masters and vertical Shorts packages',
      'Upload checklist and metadata structuring document',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'Channel visual rebranding, template package creation, or single video editing project.',
        typicalScope: 'Turnaround in 5–10 business days with collaborative revision rounds.',
      },
      monthly: {
        available: true,
        description: 'Dedicated monthly thumbnail retainers, ongoing video editing slots, and Shorts production.',
        typicalScope: 'Fixed monthly cadence (e.g., 4–8 long videos + 16 Shorts per month).',
      },
    },
    clientRequirements: [
      'Raw footage / audio assets delivered via cloud storage (Google Drive, Dropbox, Frame.io)',
      'Brand assets and channel focus area briefing',
      'YouTube Channel Manager access via Google Account delegation if direct scheduling is desired (no passwords)',
    ],
    accessNotice:
      'We utilize official YouTube Studio Channel Manager / Editor permissions. No Google account passwords or recovery codes are ever collected.',
    faqs: [
      {
        question: 'Do you guarantee virality or monetized subscriber thresholds?',
        answer:
          'No. Superb Apex Digital never makes artificial performance guarantees. We provide verified creative excellence and industry-standard production rigor that positions your content for optimal organic engagement.',
      },
      {
        question: 'How do revisions work for video edits and thumbnails?',
        answer:
          'Every package includes structured revision rounds (typically 2 rounds per deliverable) with timestamped feedback to ensure the final cut matches your vision.',
      },
    ],
  },
  {
    id: 'social-media',
    route: 'services/social-media',
    name: 'Social Media Services',
    iconKey: 'social-media',
    tagline: 'Multi-Platform Visual Cohesion, Content Calendars & Campaign Assets',
    shortDescription:
      'Strategic post graphics, short-form video adaptation, editorial calendars, and brand-consistent asset libraries across X, Instagram, TikTok, and LinkedIn.',
    fullDescription:
      'Maintaining an active presence across multiple social networks can quickly stretch any team thin. Superb Apex Digital creates unified social media assets that preserve your brand identity everywhere you communicate. We design social templates, produce campaign graphics, edit reels/TikToks, and build actionable content schedules.',
    challengesSolved: [
      'Fragmented branding where every platform looks like a different company',
      'Inconsistent posting rhythm due to lacking pre-made graphic templates',
      'Low engagement on static text announcements that need visual impact',
      'Time sink of manually resizing and reformatting assets for each platform',
    ],
    capabilities: [
      {
        title: 'Platform Profile Optimization',
        description:
          'Matching headers, avatars, bio layouts, and highlight covers across X, Instagram, TikTok, LinkedIn, and Facebook.',
      },
      {
        title: 'Brand-Consistent Post Templates',
        description:
          'Reusable quote cards, carousel infographics, announcement graphics, and stat highlights crafted in your design system.',
      },
      {
        title: 'Short-Form Video Production',
        description:
          'Engaging 9:16 reels and TikToks with motion graphics, captions, sound selection, and sharp pacing.',
      },
      {
        title: 'Content Calendars & Scheduling',
        description:
          'Structured monthly content plans organized by thematic pillars, key dates, and campaign launches.',
      },
      {
        title: 'Campaign & Event Creative',
        description:
          'Dedicated promotional bundles for product drops, tournaments, charity streams, and milestones.',
      },
      {
        title: 'Performance & Presentation Audits',
        description:
          'Quarterly visual reviews analyzing which asset types produce the strongest audience interaction.',
      },
    ],
    deliverables: [
      'Master social design system with editable Figma / Canva templates',
      'Multi-platform header and avatar suite',
      'Batch of ready-to-publish feed posts and carousels (PNG/JPG)',
      'Monthly editorial calendar spreadsheet / Notion workspace',
      'Short-form vertical video cutdowns with burned-in subtitles',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'Complete cross-platform profile rebranding or launch campaign asset bundle.',
        typicalScope: 'Delivered in 7–14 business days with template training.',
      },
      monthly: {
        available: true,
        description: 'Monthly asset creation retainers: weekly post deliveries, reel edits, and calendar planning.',
        typicalScope: 'Predictable recurring schedule with dedicated Slack / Discord sync.',
      },
    },
    clientRequirements: [
      'Brand identity guidelines, logos, and preferred tone of voice',
      'Access to delegated platform manager roles (Meta Business Suite, Buffer/Later team seats, etc.)',
      'Key dates and upcoming announcement highlights',
    ],
    accessNotice:
      'We operate strictly through native business accounts or scheduling tools. We never ask for personal social account passwords.',
    faqs: [
      {
        question: 'Which social platforms do you support?',
        answer:
          'We produce assets for X (formerly Twitter), Instagram, TikTok, YouTube Community, LinkedIn, and Facebook. We tailor aspect ratios and text density for each platform.',
      },
      {
        question: 'Can you write the captions and copy as well as design the images?',
        answer:
          'Yes, our social media packages include coordinated caption drafts, relevant hashtags, and call-to-action suggestions.',
      },
    ],
  },
  {
    id: 'community-management',
    route: 'services/community-management',
    name: 'Community Management',
    iconKey: 'community-management',
    tagline: 'Active Moderation Workflows, Member Engagement & Health Monitoring',
    shortDescription:
      'Structured moderation frameworks, escalation procedures, community engagement planning, and operational support to keep digital spaces safe and active.',
    fullDescription:
      'A thriving digital community requires constant care, attentive leadership, and clear boundary enforcement. Superb Apex Digital builds and supports community management operations. We define house rules, implement moderation protocols, run community engagement initiatives, and provide organized reporting on server health.',
    challengesSolved: [
      'Toxic behavior or spam overwhelming creator-led spaces',
      'Lack of clear escalation rules when disputes or crises occur',
      'Slow response times to new member inquiries and ticket queues',
      'Silence in community channels outside of stream or video release hours',
    ],
    capabilities: [
      {
        title: 'Moderation System Design',
        description:
          'Comprehensive codes of conduct, warning tier systems, timeout standards, and ban appeal procedures.',
      },
      {
        title: 'Staff Onboarding & Training',
        description:
          'Moderator training handbooks, ticket resolution guides, and communication guidelines for community staff.',
      },
      {
        title: 'Member Engagement Initiatives',
        description:
          'Community discussion prompts, weekly trivia, creator Q&As, feedback forums, and event hosting.',
      },
      {
        title: 'Crisis & Escalation Protocols',
        description:
          'Pre-planned emergency lockdown steps, communication templates, and creator escalation alerts.',
      },
      {
        title: 'Ticket & Support Queue Administration',
        description:
          'Configured private ticket systems for member inquiries, partnership proposals, and report handling.',
      },
      {
        title: 'Community Health Reporting',
        description:
          'Monthly analytics reviews tracking active chatters, retention rates, message volume, and resolved tickets.',
      },
    ],
    deliverables: [
      'Complete Community Management Operations Manual',
      'Standard Operating Procedures (SOPs) for moderators',
      'Incident reporting logging system',
      'Engagement schedule with weekly conversation starters',
      'Monthly Community Health & Retention Report',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'Community audit, handbook writing, and moderation infrastructure setup.',
        typicalScope: 'Delivered in 5–8 business days with staff briefing session.',
      },
      monthly: {
        available: true,
        description: 'Ongoing community leadership, moderator supervision, ticket review, and event coordination.',
        typicalScope: 'Monthly operational retainer with defined hours and emergency response commitments.',
      },
    },
    clientRequirements: [
      'Clear business or creator values regarding community guidelines',
      'Designated primary contact for escalation notifications',
      'Platform admin / manager access (Discord, Reddit, Discourse, etc.)',
    ],
    accessNotice:
      'Service hours, coverage boundaries, and escalation arrangements are explicitly agreed upon in writing before service commencement.',
    faqs: [
      {
        question: 'Do you offer 24/7 round-the-clock moderation coverage?',
        answer:
          'Coverage windows are tailored to your requirements. We provide structured shift models or dedicated automated bot protection backed by scheduled human oversight based on community scale.',
      },
      {
        question: 'How do you handle rogue members or controversial situations?',
        answer:
          'Every client community operates under pre-approved SOPs. Minor infractions follow standardized warning tiers, while severe policy violations trigger immediate containment and direct creator notification.',
      },
    ],
  },
  {
    id: 'creator-branding',
    route: 'services/creator-branding',
    name: 'Creator Branding & Digital Creative',
    iconKey: 'creator-branding',
    tagline: 'Distinctive Visual Identity Systems, Typography & Multi-Platform Style Guides',
    shortDescription:
      'Unified brand strategy, custom wordmarks, typography rules, color palettes, and comprehensive digital media kits designed specifically for content creators.',
    fullDescription:
      'Great content deserves a recognizable brand identity. Superb Apex Digital develops complete visual systems for creators, gaming organizations, and digital-first businesses. We create logos, establish typographic rules, define color schemes, and produce media kits that help you land sponsor partnerships.',
    challengesSolved: [
      'Inconsistent visual presentation that makes creator channels look amateurish',
      'Inability to pitch sponsors effectively due to the absence of a professional media kit',
      'Constant hesitation when making graphics because no color or font system exists',
      'Difficulty standing out in crowded streaming and content niches',
    ],
    capabilities: [
      {
        title: 'Creator Visual Identity',
        description:
          'Distinctive emblems, monogram marks, wordmarks, and mascot vector adaptations crafted for high visibility at 32px or 4K.',
      },
      {
        title: 'Color & Typography Hierarchy',
        description:
          'Curated color palettes with contrast verification for dark and light displays, paired with expressive display and readable body typefaces.',
      },
      {
        title: 'Cross-Platform Brand Guidelines',
        description:
          'A comprehensive Brand Style Guide (PDF) specifying safe margins, minimum sizes, color codes (HEX/RGB), and misuses.',
      },
      {
        title: 'Creator Sponsor Media Kits',
        description:
          'Sleek, editable 2–4 page rate cards and sponsor presentation decks highlighting audience demographics, platforms, and offerings.',
      },
      {
        title: 'Digital Graphic Asset Libraries',
        description:
          'Custom vector pattern backgrounds, social stickers, lower thirds, and video transition badges.',
      },
      {
        title: 'Brand Refresh & Evolution',
        description:
          'Modernizing legacy creator logos and channel branding while preserving recognizable community identity.',
      },
    ],
    deliverables: [
      'Master Vector Logo Suite (AI, SVG, EPS, transparent PNG)',
      'Creator Brand Identity Guidelines manual (PDF)',
      'Typography and color swatch tokens document',
      'Sponsor Pitch Deck / Media Kit (Figma / PDF)',
      'Cross-platform avatar and header asset package',
    ],
    engagementModels: {
      oneTime: {
        available: true,
        description: 'Complete brand development from discovery to asset library delivery.',
        typicalScope: 'Executed over 2–3 weeks with concept exploration and revision stages.',
      },
      monthly: {
        available: true,
        description: 'Creative design retainer for ongoing branded asset creation (event graphics, thumbnails, merch assets).',
        typicalScope: 'Monthly design hours allocated to your creative pipeline.',
      },
    },
    clientRequirements: [
      'Completed brand discovery questionnaire covering target audience and vision',
      'Existing visual materials or portfolio archives, if refreshing an existing brand',
      'Target content verticals (gaming, commentary, education, lifestyle, tech)',
    ],
    accessNotice:
      'All source design files (vector SVGs, Figma files, raw assets) become 100% the property of the client upon project completion and final payment.',
    faqs: [
      {
        question: 'Do we own the full intellectual property rights to our logos and branding?',
        answer:
          'Yes. Full ownership and commercial usage rights transfer entirely to you upon completion. Superb Apex Digital reserves only the right to display the work in our portfolio.',
      },
      {
        question: 'What if we already have a logo and just need it refined or modernized?',
        answer:
          'We offer Brand Refresh packages designed specifically to polish existing marks, vectorize low-res assets, and build out the missing color and typography systems around them.',
      },
    ],
  },
];
