import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ServiceIconBadge, ServiceIconType } from '../components/common/ServiceIconBadge';
import { ApexLogo } from '../components/common/ApexLogo';

const heroStudioImg = '/images/hero_apex_digital_studio_1791938469349.jpg';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  FileCheck,
  Sparkles,
  Layers,
  ArrowUpRight,
  Check,
  Star,
  MessageSquareQuote,
} from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/agencyData';
import { reviewService } from '../services/reviewService';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { ReviewSubmissionModal } from '../components/reviews/ReviewSubmissionModal';
import { Review } from '../types';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState(reviewService.getStats());
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const loadReviews = () => {
      setReviews(reviewService.getApprovedReviews().slice(0, 3));
      setStats(reviewService.getStats());
    };
    loadReviews();
    window.addEventListener('sad_reviews_updated', loadReviews);
    return () => window.removeEventListener('sad_reviews_updated', loadReviews);
  }, []);

  const servicesPreview = [
    {
      num: '01',
      title: 'Discord Services',
      subtitle: 'Server Architecture & Moderation',
      iconKey: 'discord' as ServiceIconType,
      description:
        'Complete server configuration, role permission matrices, bot automation, and ongoing community administration built for scale.',
      deliverables: [
        'Structured category hierarchy & private staff channels',
        'Role-based permissions model with zero permission leaks',
        'Verification gates & ticket automation workflows',
      ],
      path: 'services/discord' as const,
    },
    {
      num: '02',
      title: 'Twitch Services',
      subtitle: 'Broadcast Presentation & Overlays',
      iconKey: 'twitch' as ServiceIconType,
      description:
        'Custom stream overlays, alerts, panels, and OBS setup assistance calibrated for high performance and viewer engagement.',
      deliverables: [
        'Animated starting, BRB, and intermission scenes',
        'Custom event alert boxes & chatbox styling',
        'Responsive info panels & offline screen suite',
      ],
      path: 'services/twitch' as const,
    },
    {
      num: '03',
      title: 'YouTube Services',
      subtitle: 'Thumbnail Systems & Video Editing',
      iconKey: 'youtube' as ServiceIconType,
      description:
        'High-CTR thumbnail frameworks, responsive channel headers, video editing pipelines, and short-form Shorts repurposing.',
      deliverables: [
        'High-contrast thumbnail template systems',
        'Multi-resolution banner packages across desktop & TV',
        'Long-form editing & short-form vertical cutdowns',
      ],
      path: 'services/youtube' as const,
    },
    {
      num: '04',
      title: 'Social Media Services',
      subtitle: 'Multi-Platform Visual Cohesion',
      iconKey: 'social-media' as ServiceIconType,
      description:
        'Brand-consistent post templates, reels production, content calendars, and campaign asset libraries across major networks.',
      deliverables: [
        'Editable Figma & Canva multi-channel graphic kits',
        'TikTok, Reels & Shorts viral clip formatting',
        'Structured monthly editorial scheduling calendars',
      ],
      path: 'services/social-media' as const,
    },
    {
      num: '05',
      title: 'Community Management',
      subtitle: 'Active Moderation & Health Reviews',
      iconKey: 'community-management' as ServiceIconType,
      description:
        'Community guidelines, staff SOPs, member engagement workflows, and organized monthly retention summaries.',
      deliverables: [
        'Rules documentation & dispute escalation protocols',
        'Scheduled community events & stage AMA hosting',
        'Monthly active member retention & sentiment reporting',
      ],
      path: 'services/community-management' as const,
    },
    {
      num: '06',
      title: 'Creator Branding',
      subtitle: 'Visual Systems & Media Kits',
      iconKey: 'creator-branding' as ServiceIconType,
      description:
        'Distinctive logo marks, color tokens, typography guidelines, and commercial sponsor rate cards.',
      deliverables: [
        'Scalable vector logo & avatar design system',
        'Brand guidelines manual with hex color tokens',
        'Professional commercial media kit & sponsor deck',
      ],
      path: 'services/creator-branding' as const,
    },
  ];

  return (
    <div className="w-full space-y-24">
      {/* 1. HERO SECTION: Split Layout with Dominant Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] shadow-xs">
                <ApexLogo variant="icon" size="sm" />
                <span className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                  Superb Apex Digital
                </span>
                <span className="text-xs text-[#526078] dark:text-[#B2BDCB]">·</span>
                <span className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                  Full-Service Digital & Community Agency
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA] leading-[1.08] text-balance">
                Digital Communities. Exceptional Creative. One Dedicated Team.
              </h1>

              <p className="text-base sm:text-lg text-[#526078] dark:text-[#B2BDCB] leading-relaxed max-w-2xl">
                From Discord community management and Twitch channel branding to YouTube content and social media support, Superb Apex Digital helps creators and businesses build, manage, and grow their digital presence.
              </p>
            </div>

            {/* Action Buttons: 1 Primary + 1 Secondary */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('services')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] dark:hover:bg-[#85a0ff] rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => navigate('team')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#172033] dark:text-[#F5F7FA] bg-[#EEF2F8] dark:bg-[#192331] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF]"
              >
                <span>Meet the Team</span>
              </button>
            </div>

            {/* Honest Trust Notice */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#526078] dark:text-[#B2BDCB]">
              <ShieldCheck className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0" />
              <span>
                Zero password handovers · Role-delegated permissions · One-off projects & monthly retainers
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (Clean Split Frame) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE3EE] dark:border-[#283343] shadow-2xl bg-[#121923]">
              <ImageWithFallback
                src={heroStudioImg}
                alt="Superb Apex Digital studio workstation with community operations and creative systems"
                aspectRatio="16:9"
                className="w-full h-auto"
                title="Superb Apex Digital Creative Operations Studio"
                category="Agency Studio"
              />
              <div className="p-4 bg-[#FFFFFF]/90 dark:bg-[#121923]/90 backdrop-blur-sm border-t border-[#DCE3EE] dark:border-[#283343] flex items-center justify-between text-xs">
                <span className="font-medium text-[#172033] dark:text-[#F5F7FA]">Creative Operations & Community Suite</span>
                <span className="text-[#526078] dark:text-[#B2BDCB] font-mono tabular-nums">Production 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FULL-WIDTH STRIP: 4 Core Agency Pillars */}
      <section className="w-full bg-[#EEF2F8] dark:bg-[#121923] border-y border-[#DCE3EE] dark:border-[#283343] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-1">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#365DE8] dark:text-[#6C8CFF] font-display tabular-nums">
                6 Disciplines
              </span>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Discord, Twitch, YouTube, Social, Governance & Brand Design
              </p>
            </div>

            <div className="space-y-1">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA] font-display">
                100% Native
              </span>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Strict platform-delegated role access with zero password collection
              </p>
            </div>

            <div className="space-y-1">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA] font-display">
                Dual Models
              </span>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                One-time turnkey architectural setups and recurring monthly retainers
              </p>
            </div>

            <div className="space-y-1">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#6D4AE6] dark:text-[#9B8AFB] font-display">
                Dedicated Lead
              </span>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                Single operational point of contact across all deliverables
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES SHOWCASE: Icon-Centric Architecture Cards (No Images On Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Integrated Creative & Operational Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Specialized Services Tailored for Creators & Communities
          </h2>
          <p className="text-sm sm:text-base text-[#526078] dark:text-[#B2BDCB] max-w-2xl">
            Every service is represented by its dedicated platform system and available as a focused one-time project or comprehensive monthly partnership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesPreview.map((service) => (
            <div
              key={service.num}
              className="group rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden flex flex-col justify-between hover:border-[#365DE8]/60 dark:hover:border-[#6C8CFF]/60 hover:shadow-md transition-all"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Platform Icon Badge & Section Tag */}
                <div className="flex items-center justify-between">
                  <ServiceIconBadge type={service.iconKey} size="lg" />
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#EEF2F8] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] border border-[#DCE3EE] dark:border-[#283343]">
                    Section {service.num}
                  </span>
                </div>

                {/* Service Heading & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                  {service.description}
                </p>

                {/* Core Deliverable Checklist */}
                <div className="pt-3 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#526078] dark:text-[#B2BDCB]">
                    {service.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 mt-auto">
                <div className="py-2 px-3 rounded-lg bg-[#EEF2F8] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] flex items-center justify-between text-[11px] mb-3">
                  <span className="text-[#526078] dark:text-[#B2BDCB]">Engagement:</span>
                  <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">Turnkey & Retainer</span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(service.path)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#365DE8]/10 hover:bg-[#365DE8] text-[#365DE8] hover:text-white dark:bg-[#6C8CFF]/10 dark:hover:bg-[#6C8CFF] dark:text-[#6C8CFF] dark:hover:text-[#0B0F14] transition-all"
                >
                  <span>Explore {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WORKFLOW / PROCESS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-12 transition-colors">
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
              Delivery Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
              Our 5-Stage Execution Framework
            </h2>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
              A predictable, documented workflow from initial discovery to delivery or ongoing administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                name: 'Discovery',
                desc: 'Auditing existing setups, community dynamics, platform constraints, and goals.',
              },
              {
                step: '02',
                name: 'Planning',
                desc: 'Defining exact deliverable scope, timelines, responsibilities, and pricing.',
              },
              {
                step: '03',
                name: 'Creation & Setup',
                desc: 'Executing channel architecture, stream graphics, templates, or bot systems.',
              },
              {
                step: '04',
                name: 'Review & Revisions',
                desc: 'Presenting deliverables for client feedback and applying structured revisions.',
              },
              {
                step: '05',
                name: 'Handover / Retainer',
                desc: 'Transferring full source files or commencing active monthly management.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] space-y-2"
              >
                <span className="text-xs font-mono font-bold text-[#365DE8] dark:text-[#6C8CFF]">
                  {st.step}
                </span>
                <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">{st.name}</h3>
                <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('process')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
            >
              <span>View full process & client requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CONCEPT SHOWCASE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
              Visual Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
              Featured Concept Demonstrations
            </h2>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
              Authentic concept designs showcasing our architectural approach and deliverables.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('portfolio')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline shrink-0"
          >
            <span>Browse all concept showcases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                    {item.category}
                  </span>
                  <span className="text-[#526078] dark:text-[#B2BDCB] text-[11px]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                  Key Deliverables:
                </span>
                <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-1">
                  {item.deliverables.slice(0, 2).map((del, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED CLIENT REVIEWS & RATINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
              Rated {stats.averageRating} / 5.0 by Creators & Communities
            </h2>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
              Authentic reviews from verified clients across Discord architecture, stream overhauls, video pipelines, and creator branding.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] transition-all shadow-xs"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Leave a Review</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('reviews')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
            >
              <span>View all reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* 7. TRUST & RESPONSIBLE ACCESS CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#121923] to-[#192331] text-[#F5F7FA] p-8 lg:p-12 border border-[#283343] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C8CFF]">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Security & Integrity Standard</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F7FA]">
                Responsible Access. Zero Credential Risk.
              </h2>

              <p className="text-sm text-[#B2BDCB] max-w-2xl leading-relaxed">
                We believe creator and business security comes first. Superb Apex Digital exclusively utilizes platform-native role delegations (Discord Administrator, YouTube Channel Manager, Twitch Editor, and Meta Partner IDs). We will never ask for your account password or two-factor authentication codes.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#B2BDCB]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6C8CFF]" />
                  <span>Documented Handover Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6C8CFF]" />
                  <span>Formal Client Confidentiality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#6C8CFF]" />
                  <span>100% Client Asset Ownership</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => navigate('trust')}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#0B0F14] bg-[#6C8CFF] hover:bg-[#85a0ff] rounded-lg transition-colors"
              >
                <span>Read Access Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate('quote')}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#F5F7FA] bg-[#283343] hover:bg-[#324055] rounded-lg transition-colors"
              >
                <span>Discuss Your Project</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center space-y-6 max-w-2xl mx-auto py-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Ready to Build or Scale Your Digital Presence?
          </h2>
          <p className="text-sm sm:text-base text-[#526078] dark:text-[#B2BDCB]">
            Whether you need a new Discord server deployed, a full Twitch stream rebrand, or ongoing monthly media management, our team is ready to scope your project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('quote')}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] rounded-xl transition-all shadow-sm"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              type="button"
              onClick={() => navigate('pricing')}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#172033] dark:text-[#F5F7FA] bg-[#EEF2F8] dark:bg-[#192331] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] rounded-xl transition-colors"
            >
              <span>Explore Scope Tiers</span>
            </button>
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitted={() => {
          setReviews(reviewService.getApprovedReviews().slice(0, 3));
          setStats(reviewService.getStats());
        }}
      />
    </div>
  );
};
