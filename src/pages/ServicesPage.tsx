import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceIconBadge } from '../components/common/ServiceIconBadge';
import { ArrowRight, CheckCircle2, Clock, Calendar, ShieldCheck, Check } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredServices = selectedFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === selectedFilter);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Services & Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Digital Solutions for Modern Creators & Communities
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Superb Apex Digital delivers tailored creative and operational services. Every service is available as a turnkey one-time implementation or as an ongoing monthly partnership.
        </p>
      </div>

      {/* Interactive Filter Tabs (Button-based functional segmented control) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EEF2F8] dark:bg-[#121923] rounded-xl border border-[#DCE3EE] dark:border-[#283343] w-fit">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'discord', label: 'Discord' },
          { id: 'twitch', label: 'Twitch' },
          { id: 'youtube', label: 'YouTube' },
          { id: 'social-media', label: 'Social Media' },
          { id: 'community-management', label: 'Community' },
          { id: 'creator-branding', label: 'Branding' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedFilter === tab.id
                ? 'bg-[#FFFFFF] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] shadow-xs'
                : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services List / Cards - Clean Icon-First Layout (Zero Stock Photos) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#365DE8]/50 dark:hover:border-[#6C8CFF]/50 transition-all"
          >
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header with Authentic Platform Icon Badge */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <ServiceIconBadge type={service.iconKey} size="lg" />
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                      {service.name}
                    </h2>
                    <p className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#EEF2F8] dark:bg-[#192331] text-[#526078] dark:text-[#B2BDCB] border border-[#DCE3EE] dark:border-[#283343]">
                  Platform Spec
                </span>
              </div>

              {/* Service Description */}
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Core Capabilities List */}
              <div className="space-y-2 pt-2 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                  Core Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
                  {service.capabilities.slice(0, 4).map((cap, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#172033] dark:text-[#F5F7FA]">{cap.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Model Indicator */}
              <div className="pt-3 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60 flex flex-wrap items-center gap-4 text-xs text-[#526078] dark:text-[#B2BDCB]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                  <span>One-Time Project Available</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#6D4AE6] dark:text-[#9B8AFB]" />
                  <span>Monthly Retainer Available</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-6 sm:p-8 pt-0 flex flex-wrap items-center justify-between gap-4 mt-auto">
              <button
                type="button"
                onClick={() => navigate(service.route)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#172033] dark:text-[#F5F7FA] hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors"
              >
                <span>Read Full Service Specification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate('quote', { service: service.id })}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors"
              >
                Inquire About Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models Comparative Section */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Structure & Flexibility
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            How We Partner: One-Time Projects vs. Monthly Retainers
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Choose the engagement model that matches your current stage of growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* One-Time */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] space-y-4">
            <div className="flex items-center gap-2 text-[#365DE8] dark:text-[#6C8CFF]">
              <Clock className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                One-Time Architectural Projects
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Best for migrations, new channel setups, brand redesigns, or server overhauls where you need expert execution with a clean handover.
            </p>
            <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-2 pt-2 border-t border-[#DCE3EE] dark:border-[#283343]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Defined scope, fixed milestone schedule, and delivery acceptance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Includes source assets, Figma files, and documentation manual</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Post-launch stabilization support window included</span>
              </li>
            </ul>
          </div>

          {/* Monthly */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] space-y-4">
            <div className="flex items-center gap-2 text-[#6D4AE6] dark:text-[#9B8AFB]">
              <Calendar className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                Monthly Operational Retainers
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Best for scaling creators, active gaming communities, and brands requiring continuous management, content editing, and moderation coverage.
            </p>
            <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-2 pt-2 border-t border-[#DCE3EE] dark:border-[#283343]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6D4AE6] dark:text-[#9B8AFB]" />
                <span>Dedicated account lead with agreed response SLAs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6D4AE6] dark:text-[#9B8AFB]" />
                <span>Recurring deliverables, content production, and monthly reviews</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6D4AE6] dark:text-[#9B8AFB]" />
                <span>Predictable monthly billing with flexible scope adjustments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Notice Banner */}
      <div className="p-6 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-[#526078] dark:text-[#B2BDCB]">
          <ShieldCheck className="w-5 h-5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0" />
          <span>
            All services operate under 100% platform-native role permissions. We never store or request passwords or 2FA codes.
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate('trust')}
          className="text-[#365DE8] dark:text-[#6C8CFF] font-semibold hover:underline shrink-0"
        >
          Review Access Protocol →
        </button>
      </div>
    </div>
  );
};
