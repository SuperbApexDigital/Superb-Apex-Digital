import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { ServiceDetail } from '../types';
import { ServiceIconBadge } from '../components/common/ServiceIconBadge';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Lock,
  FileCheck,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface ServiceDetailPageProps {
  service: ServiceDetail;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* 1. SERVICE HERO: Clean Platform-First Split Layout (Zero Stock Photos) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => navigate('services')}
              className="text-xs font-semibold text-[#526078] dark:text-[#B2BDCB] hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors"
            >
              ← Back to All Services
            </button>

            <div className="flex items-center gap-4">
              <ServiceIconBadge type={service.iconKey} size="lg" />
              <div>
                <span className="block text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
                  {service.tagline}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
                  {service.name}
                </h1>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('quote', { service: service.id })}
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] rounded-xl transition-all shadow-sm"
            >
              <span>Inquire About {service.name}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              type="button"
              onClick={() => navigate('trust')}
              className="inline-flex items-center justify-center px-4 py-3 text-xs font-semibold text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA] bg-[#EEF2F8] dark:bg-[#192331] rounded-xl transition-colors"
            >
              <ShieldCheck className="w-4 h-4 mr-1.5 text-[#365DE8] dark:text-[#6C8CFF]" />
              <span>Review Access Protocol</span>
            </button>
          </div>
        </div>

        {/* Right Column: Authoritative Service Blueprint & Engagement Spec Card (No Stock Photos) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Platform Identification Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE3EE] dark:border-[#283343]">
              <div className="flex items-center gap-3">
                <ServiceIconBadge type={service.iconKey} size="md" />
                <div>
                  <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
                    {service.name} Specification
                  </h3>
                  <span className="text-[11px] font-mono text-[#526078] dark:text-[#B2BDCB]">
                    Engineered by Superb Apex
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                Verified System
              </span>
            </div>

            {/* Engagement Specifications */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#172033] dark:text-[#F5F7FA] block">Turnkey Timeline</span>
                  <p className="text-[#526078] dark:text-[#B2BDCB]">{service.engagementModels.oneTime.typicalScope}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#172033] dark:text-[#F5F7FA] block">Monthly Retainer Option</span>
                  <p className="text-[#526078] dark:text-[#B2BDCB]">{service.engagementModels.monthly.typicalScope}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#172033] dark:text-[#F5F7FA] block">Delegated Access Standard</span>
                  <p className="text-[#526078] dark:text-[#B2BDCB]">100% platform-native role delegation · Zero password collection</p>
                </div>
              </div>
            </div>

            {/* Included Deliverable Sample */}
            <div className="pt-4 border-t border-[#DCE3EE] dark:border-[#283343] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                Deliverable Guarantees:
              </span>
              <ul className="space-y-1.5 text-xs text-[#526078] dark:text-[#B2BDCB]">
                {service.deliverables.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Action Link */}
            <button
              type="button"
              onClick={() => navigate('quote', { service: service.id })}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-all shadow-xs"
            >
              <span>Configure {service.name} Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. PROBLEMS ADDRESSED */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 space-y-6 transition-colors">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Diagnostic Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Challenges We Resolve
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Common pain points creators and organizations face before partnering with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.challengesSolved.map((challenge, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]"
            >
              <AlertCircle className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
                {challenge}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CAPABILITIES BREAKDOWN */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Engineering & Creative Scope
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Capabilities & Service Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-2.5 shadow-xs"
            >
              <span className="text-xs font-mono font-bold text-[#365DE8] dark:text-[#6C8CFF]">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TANGIBLE DELIVERABLES */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 space-y-6 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Tangible Handover
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            What You Receive Upon Completion
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Verified assets, master files, and documentation delivered with each deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.deliverables.map((del, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-[#172033] dark:text-[#F5F7FA]">
                {del}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ENGAGEMENT OPTIONS: ONE-TIME VS MONTHLY */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Engagement Structures
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Available Purchase & Retainer Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#365DE8] dark:text-[#6C8CFF]">
              <Clock className="w-4 h-4" />
              <span>One-Time Project Delivery</span>
            </div>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              {service.engagementModels.oneTime.description}
            </p>
            <div className="p-3 bg-[#EEF2F8] dark:bg-[#192331] rounded-lg text-xs text-[#172033] dark:text-[#F5F7FA] font-medium">
              Timeline: {service.engagementModels.oneTime.typicalScope}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6D4AE6] dark:text-[#9B8AFB]">
              <Calendar className="w-4 h-4" />
              <span>Monthly Partnership Retainer</span>
            </div>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              {service.engagementModels.monthly.description}
            </p>
            <div className="p-3 bg-[#EEF2F8] dark:bg-[#192331] rounded-lg text-xs text-[#172033] dark:text-[#F5F7FA] font-medium">
              Cadence: {service.engagementModels.monthly.typicalScope}
            </div>
          </div>
        </div>
      </div>

      {/* 6. ACCESS PROTOCOL & CLIENT REQUIREMENTS */}
      <div className="rounded-2xl bg-[#121923] text-[#F5F7FA] border border-[#283343] p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C8CFF]">
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Delegated Access Notice</span>
        </div>

        <p className="text-xs sm:text-sm text-[#B2BDCB] leading-relaxed">
          {service.accessNotice}
        </p>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA] block">
            Client Inputs Required to Begin:
          </span>
          <ul className="text-xs text-[#B2BDCB] space-y-1.5">
            {service.clientRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#6C8CFF] font-bold">·</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 7. SERVICE FAQS */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Service Clarifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Frequently Asked Questions: {service.name}
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#172033] dark:text-[#F5F7FA] hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-[#365DE8] dark:text-[#6C8CFF]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-[#526078] dark:text-[#B2BDCB]" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed border-t border-[#DCE3EE]/40 dark:border-[#283343]/40 mt-1 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. CONVERSION CALLOUT */}
      <div className="rounded-2xl bg-gradient-to-r from-[#EEF2F8] to-[#FFFFFF] dark:from-[#121923] dark:to-[#192331] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Request a Proposal for {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            Tell us about your current channels, audience, and goals to receive an itemized proposal with clear delivery milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('quote', { service: service.id })}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-xs"
        >
          Request Scoped Proposal
        </button>
      </div>

      {/* 9. EXPLORE RELATED SERVICES */}
      <div className="pt-8 border-t border-[#DCE3EE] dark:border-[#283343] space-y-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF] block">
          Explore Related Disciplines
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherServices.slice(0, 3).map((rel) => (
            <button
              key={rel.id}
              type="button"
              onClick={() => navigate(rel.route)}
              className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] hover:border-[#365DE8] dark:hover:border-[#6C8CFF] text-left transition-all group"
            >
              <h4 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA] group-hover:text-[#365DE8] dark:group-hover:text-[#6C8CFF] transition-colors">
                {rel.name}
              </h4>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB] mt-1 line-clamp-2">
                {rel.shortDescription}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
