import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ApexLogo } from '../components/common/ApexLogo';
import { Shield, Target, Users, CheckCircle2, ArrowRight, Lock, Award, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* 1. Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Agency Mission & Principles
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Built for Digital Creators and Community Leaders
        </h1>
        <p className="text-base sm:text-lg text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Superb Apex Digital was founded to solve a clear problem in the digital creator ecosystem: great creative often lives in a silo separated from technical community operations. We bring these disciplines together under one roof.
        </p>
      </div>

      {/* 2. Visual & Story Split: Brand Monogram & Philosophy (No repeated images) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172033] dark:text-[#F5F7FA]">
              Our Creative & Operational Philosophy
            </h2>
            <p className="text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              When an audience lands on your Twitch stream, joins your Discord, or discovers your YouTube videos, every touchpoint communicates your standards. Mismatched graphics, cluttered server permissions, and inconsistent publishing rhythms degrade trust.
            </p>
            <p className="text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Our multidisciplinary model pairs broadcast designers, Discord systems architects, video editors, and community managers into an integrated unit. You work with a dedicated lead who understands your creative goals and protects your technical assets.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
              Who We Partner With:
            </span>
            <ul className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                <span>Active streamers and content creators scaling across multiple video platforms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                <span>Gaming guilds, esports teams, and community hubs needing hardened Discord infrastructure.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                <span>Digital-first brands and software studios building loyal online member communities.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Superb Apex Digital Official Brand Badge & Agency Credential Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md">
            <ApexLogo variant="badge" className="w-full" />
            
            <div className="mt-4 p-4 rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
              <div className="flex items-center gap-2 text-[#172033] dark:text-[#F5F7FA] font-bold">
                <Award className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Quality & Governance Assurance</span>
              </div>
              <p>
                Every deliverable passes architectural audit, mobile responsiveness check, and platform permission verification before handover.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Principles */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Agency Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Principles That Govern Every Client Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#365DE8]/10 dark:bg-[#6C8CFF]/10 text-[#365DE8] dark:text-[#6C8CFF] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
              Zero Credential Handover
            </h3>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              We insist on native delegated roles (Discord Manager, YouTube Editor, Twitch Moderator). We will never ask for your account password or 2FA codes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#6D4AE6]/10 dark:bg-[#9B8AFB]/10 text-[#6D4AE6] dark:text-[#9B8AFB] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
              Documented Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              We never leave you with undocumented mystery bots or unorganized layers. Every system includes an audit sheet and clear staff manual.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
              Accountability & Continuity
            </h3>
            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              You receive a dedicated operational lead who coordinates all disciplines, ensuring consistent style and prompt turnaround across projects.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Action Banner */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Want to meet the specialists behind our agency?
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Explore our specialized Networking Relations and Partner Success & Escalations divisions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('team')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0"
        >
          <span>View Team Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
