import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { TEAM_DIVISIONS } from '../data/agencyData';
import { teamService } from '../services/teamService';
import { DiscordAvatar } from '../components/DiscordAvatar';
import {
  Users,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  Activity,
  MessageSquare,
  Zap,
  ShieldCheck,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { TeamDepartment, TeamMember } from '../types';

export const TeamPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedDept, setSelectedDept] = useState<'All' | TeamDepartment>('All');
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const [lightboxMember, setLightboxMember] = useState<TeamMember | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => teamService.getTeamMembers());

  useEffect(() => {
    const unsubscribe = teamService.subscribe(() => {
      setTeamMembers(teamService.getTeamMembers());
    });
    return unsubscribe;
  }, []);

  const filteredMembers =
    selectedDept === 'All'
      ? teamMembers
      : teamMembers.filter((m) => m.department === selectedDept);

  const networkingMembers = teamMembers.filter((m) => m.department === 'Networking Relations Team');
  const escalationsMembers = teamMembers.filter((m) => m.department === 'Partner Success & Escalations');

  // Lightbox navigation helper
  const handlePrevImage = () => {
    if (!lightboxMember) return;
    const currentIndex = filteredMembers.findIndex((m) => m.id === lightboxMember.id);
    const prevIndex = (currentIndex - 1 + filteredMembers.length) % filteredMembers.length;
    setLightboxMember(filteredMembers[prevIndex]);
  };

  const handleNextImage = () => {
    if (!lightboxMember) return;
    const currentIndex = filteredMembers.findIndex((m) => m.id === lightboxMember.id);
    const nextIndex = (currentIndex + 1) % filteredMembers.length;
    setLightboxMember(filteredMembers[nextIndex]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#365DE8]/10 text-[#365DE8] dark:bg-[#6C8CFF]/15 dark:text-[#6C8CFF] border border-[#365DE8]/20 dark:border-[#6C8CFF]/30">
          <Users className="w-3.5 h-3.5" />
          <span>Agency Operational Structure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Two Specialized Teams. One High-Impact Standard.
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Superb Apex Digital organizes its operations into two focused divisions: our frontline{' '}
          <strong className="text-[#172033] dark:text-[#F5F7FA] font-semibold">Networking Relations Team</strong>—our proactive outreach ambassadors and most valuable client problem solvers—and our{' '}
          <strong className="text-[#172033] dark:text-[#F5F7FA] font-semibold">Partner Success & Escalations</strong> division, ensuring ironclad technical execution, rapid incident mitigation, and SLA governance.
        </p>
      </div>

      {/* 2. Pro Division Overview Cards (Side-by-Side Highlight) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team 1: Networking Relations Team */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-[#FFFFFF] dark:bg-[#121923] border-2 border-[#365DE8]/40 dark:border-[#6C8CFF]/40 shadow-lg flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-[#365DE8]/10 text-[#365DE8] dark:bg-[#6C8CFF]/20 dark:text-[#6C8CFF]">
                <HeartHandshake className="w-4 h-4" />
                <span>Frontline Advocates & Client Solutions</span>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#EEF2F8] dark:bg-[#1C2636] text-[#365DE8] dark:text-[#6C8CFF] border border-[#365DE8]/20">
                {networkingMembers.length} Verified Specialists
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
                Networking Relations Team
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                Proactive Outreach · Diagnostic Problem Solvers · Essential Client Champions
              </p>
            </div>

            {/* Pro Tone Brief Narrative */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#18212F] border border-[#E2E8F0] dark:border-[#283548] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                <Sparkles className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Our Most Valuable People & Direct Problem Solvers</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                The <strong className="text-[#172033] dark:text-[#F5F7FA]">Networking Relations Team</strong> represents the heartbeat of our agency. Reaching out directly to creators, organizations, and gaming guilds, these trusted specialists listen deeply, diagnose operational hurdles, solve client problems on the spot, and rightfully connect clients to tailored creative and technical solutions with continuous, dedicated support.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                How This Team Empowers You:
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                  <span><strong>Proactive Outreach:</strong> Reaches out actively to understand your vision before bottlenecks emerge.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                  <span><strong>Direct Problem Solvers:</strong> Unpacks friction and diagnoses hurdles with immediate, actionable remedies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                  <span><strong>Rightful Connections:</strong> Directs you to the exact production units and server architectures you need.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                  <span><strong>Dedicated Support:</strong> Delivers ongoing personal advocacy and attentive milestone guidance.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#DCE3EE] dark:border-[#283343] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#526078] dark:text-[#B2BDCB]">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Discovery & Outreach</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDept('Networking Relations Team')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-all shadow-sm"
            >
              <span>View Networking Relations Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Team 2: Partner Success & Escalations */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-[#FFFFFF] dark:bg-[#121923] border-2 border-[#DCE3EE] dark:border-[#283343] hover:border-[#365DE8]/40 dark:hover:border-[#6C8CFF]/40 shadow-lg flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide uppercase bg-[#6D4AE6]/10 text-[#6D4AE6] dark:bg-[#9B8AFB]/20 dark:text-[#9B8AFB]">
                <ShieldAlert className="w-4 h-4" />
                <span>Operational Continuity & Escalation Response</span>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#EEF2F8] dark:bg-[#1C2636] text-[#6D4AE6] dark:text-[#9B8AFB] border border-[#6D4AE6]/20">
                {escalationsMembers.length} Specialists
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
                Partner Success & Escalations
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#6D4AE6] dark:text-[#9B8AFB]">
                Technical SLA Integrity · Rapid Incident Mitigation · Retainer Governance
              </p>
            </div>

            {/* Pro Tone Brief Narrative */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#18212F] border border-[#E2E8F0] dark:border-[#283548] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                <Activity className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB]" />
                <span>Mission-Critical Operations Backbone</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                The <strong className="text-[#172033] dark:text-[#F5F7FA]">Partner Success & Escalations Team</strong> functions as our high-tier operational backbone. Specializing in mission-critical technical execution, ongoing retainer health, and urgent crisis escalation, they ensure zero downtime, rigorous quality assurance, and swift resolution for high-stakes challenges across Discord, live broadcasting, and creator infrastructure.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                How This Team Safeguards You:
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0 mt-0.5" />
                  <span><strong>SLA Governance:</strong> Guarantees prioritized revision turnarounds and contracted delivery milestones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0 mt-0.5" />
                  <span><strong>Rapid Incident Triage:</strong> Mitigates bot outages, server compromises, and broadcast overlay anomalies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0 mt-0.5" />
                  <span><strong>Delivery Assurance:</strong> Rigorous quality control checks before any creative deliverable is deployed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0 mt-0.5" />
                  <span><strong>Priority Escalations:</strong> Dedicated tier-1 channel escalation for partner emergencies.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#DCE3EE] dark:border-[#283343] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#526078] dark:text-[#B2BDCB]">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Standby for Escalation & Retainer Care</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDept('Partner Success & Escalations')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-[#6D4AE6] hover:bg-[#5b3bc7] dark:bg-[#9B8AFB] dark:text-[#0B0F14] text-white transition-all shadow-sm"
            >
              <span>View Escalations Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Team Member Directory Navigation & Filter */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DCE3EE] dark:border-[#283343]">
          <div>
            <h2 className="text-2xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
              Specialist Directory ({filteredMembers.length})
            </h2>
            <p className="text-xs text-[#526078] dark:text-[#8A99AD] mt-1">
              Click on any specialist's profile image to view high-resolution photo details.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedDept('All')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                selectedDept === 'All'
                  ? 'bg-[#FFFFFF] dark:bg-[#1C2636] text-[#172033] dark:text-[#F5F7FA] shadow-sm'
                  : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
              }`}
            >
              All Specialists ({teamMembers.length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedDept('Networking Relations Team')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedDept === 'Networking Relations Team'
                  ? 'bg-[#FFFFFF] dark:bg-[#1C2636] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                  : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Networking Relations Team ({networkingMembers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedDept('Partner Success & Escalations')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedDept === 'Partner Success & Escalations'
                  ? 'bg-[#FFFFFF] dark:bg-[#1C2636] text-[#6D4AE6] dark:text-[#9B8AFB] shadow-sm'
                  : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Partner Success & Escalations ({escalationsMembers.length})</span>
            </button>
          </div>
        </div>

        {/* 4. Team Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredMembers.map((member) => {
            const isNetworking = member.department === 'Networking Relations Team';

            return (
              <div
                key={member.id}
                className="group relative rounded-3xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#365DE8]/50 dark:hover:border-[#6C8CFF]/50 transition-all hover:shadow-xl"
              >
                {/* Top Profile Banner */}
                <div className={`h-24 w-full bg-gradient-to-r ${member.bannerGradient || 'from-blue-600 to-indigo-900'} relative p-4 flex items-start justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                      {isNetworking ? 'Networking Relations' : 'Partner Success'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-emerald-400 border border-emerald-400/30">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{member.status}</span>
                  </div>
                </div>

                {/* Profile Card Body */}
                <div className="p-7 pt-0 relative flex-1 flex flex-col justify-between space-y-6">
                  {/* Avatar Section overlapping Banner */}
                  <div className="-mt-12 flex items-end justify-between gap-4">
                    {/* Clickable Profile Image with Lightbox preview */}
                    <div
                      onClick={() => setLightboxMember(member)}
                      className="p-1 rounded-full bg-[#FFFFFF] dark:bg-[#121923] shadow-lg cursor-pointer"
                      title={`Click to view ${member.name}'s full profile image`}
                    >
                      <DiscordAvatar
                        name={member.name}
                        initials={member.initials}
                        avatarUrl={member.avatarUrl}
                        theme={member.avatarTheme}
                        size="xl"
                        showStatus={true}
                        status="Discord Active"
                        isClickable={true}
                        onClick={() => setLightboxMember(member)}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxMember(member)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#EEF2F8] hover:bg-[#E2E8F0] dark:bg-[#1A2332] dark:hover:bg-[#253042] text-[#365DE8] dark:text-[#6C8CFF] transition-colors flex items-center gap-1.5"
                        title="View profile image full size"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModalMember(member)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#365DE8]/10 hover:bg-[#365DE8]/20 dark:bg-[#6C8CFF]/15 dark:hover:bg-[#6C8CFF]/25 text-[#365DE8] dark:text-[#6C8CFF] transition-colors flex items-center gap-1.5"
                      >
                        <span>Profile Card</span>
                      </button>
                    </div>
                  </div>

                  {/* NAME PROMINENTLY BELOW PROFILE IMAGE */}
                  <div className="space-y-2 pt-1">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Name as on profile image */}
                        <h3 className="text-2xl font-extrabold text-[#172033] dark:text-[#F5F7FA] tracking-tight">
                          {member.name}
                        </h3>

                        {/* Discord Verified Badge */}
                        <span
                          title="Verified Discord Specialist"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#5865F2]/10 text-[#5865F2] dark:bg-[#5865F2]/20 dark:text-[#8E9BFF] border border-[#5865F2]/30"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>Discord Verified</span>
                        </span>
                      </div>

                      {/* Discord Handle (Strictly Display Only - No Copy Option) */}
                      <div className="flex items-center gap-2 text-xs pt-0.5">
                        <span className="font-mono text-[#526078] dark:text-[#8A99AD] bg-[#EEF2F8] dark:bg-[#18212F] px-2.5 py-0.5 rounded-md border border-[#DCE3EE] dark:border-[#283548]">
                          {member.discordTag}
                        </span>
                      </div>
                    </div>

                    {/* Operational Role */}
                    <p className="text-sm font-bold text-[#365DE8] dark:text-[#6C8CFF] leading-snug">
                      {member.role}
                    </p>
                  </div>

                  {/* Discord Roles Pills */}
                  {member.discordRoles && member.discordRoles.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {member.discordRoles.map((roleName, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EEF2F8] dark:bg-[#192230] text-[#172033] dark:text-[#D1D9E4] border border-[#DCE3EE] dark:border-[#283343]"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            idx === 0 ? 'bg-[#365DE8]' : idx === 1 ? 'bg-purple-500' : 'bg-emerald-500'
                          }`} />
                          <span>{roleName}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Focus Areas */}
                  <div className="pt-4 border-t border-[#DCE3EE]/70 dark:border-[#283343]/70 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                      Core Expertise & Solutions:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {member.focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#F8FAFC] dark:bg-[#18212F] text-[#526078] dark:text-[#B2BDCB] border border-[#E2E8F0] dark:border-[#283548]"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA (No Copy Option) */}
                  <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#DCE3EE]/50 dark:border-[#283343]/50">
                    <button
                      type="button"
                      onClick={() => navigate('contact')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Consult with {member.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setLightboxMember(member)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#EEF2F8] hover:bg-[#E2E8F0] dark:bg-[#1C2636] dark:hover:bg-[#253348] text-[#172033] dark:text-[#F5F7FA] transition-all flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>View Image</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Engagement Comparison Matrix: When to Engage Which Team */}
      <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 sm:p-10 space-y-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF]">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] dark:text-[#F5F7FA]">
            When to Engage Each Team
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Clear alignment ensures your requests are resolved with maximum speed and domain precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#18212F] border border-[#E2E8F0] dark:border-[#283548] space-y-4">
            <div className="flex items-center gap-2.5 text-[#365DE8] dark:text-[#6C8CFF]">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                Engage Networking Relations When:
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
              <li className="flex items-start gap-2">
                <span className="text-[#365DE8] dark:text-[#6C8CFF] font-bold">·</span>
                <span>You need consultative scoping for a new Discord server, Twitch rebrand, or YouTube system.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#365DE8] dark:text-[#6C8CFF] font-bold">·</span>
                <span>You are experiencing community friction and need expert diagnosis to find the rightful solution.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#365DE8] dark:text-[#6C8CFF] font-bold">·</span>
                <span>You need dedicated hands-on support, onboarding assistance, or ongoing client advocacy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#365DE8] dark:text-[#6C8CFF] font-bold">·</span>
                <span>You want to discuss customized retainer plans or multi-channel creator partnerships.</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#18212F] border border-[#E2E8F0] dark:border-[#283548] space-y-4">
            <div className="flex items-center gap-2.5 text-[#6D4AE6] dark:text-[#9B8AFB]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                Engage Partner Success & Escalations When:
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
              <li className="flex items-start gap-2">
                <span className="text-[#6D4AE6] dark:text-[#9B8AFB] font-bold">·</span>
                <span>You experience an urgent Discord security event, raid, or critical bot failure requiring fast mitigation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D4AE6] dark:text-[#9B8AFB] font-bold">·</span>
                <span>You are live streaming and encounter OBS overlay crashes, stream dropouts, or audio anomalies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D4AE6] dark:text-[#9B8AFB] font-bold">·</span>
                <span>You have an active retainer and need priority SLA revision turnaround or delivery QA sign-off.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D4AE6] dark:text-[#9B8AFB] font-bold">·</span>
                <span>You need executive escalation for high-stakes platform permissions or credential delegation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. Bottom Call to Action */}
      <div className="rounded-3xl bg-gradient-to-r from-[#172033] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-12 border border-[#283343] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Client Partnerships</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Connect With Our Specialized Divisions Today
          </h2>
          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            Whether you want our <strong className="text-white">Networking Relations Team</strong> to scope your next creative breakthrough or need immediate assistance from <strong className="text-white">Partner Success & Escalations</strong>, our team is ready to support you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('contact')}
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] text-white transition-all shadow-md flex items-center justify-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Connect with Networking Relations</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('quote')}
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Request Project Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7. Fullscreen Image Lightbox Modal for Visitors to View All Images */}
      {lightboxMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxMember(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#111214] border border-[#2B2D31] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#2B2D31] bg-[#18191C]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span>{lightboxMember.name}</span>
                    <ShieldCheck className="w-4 h-4 text-[#5865F2]" />
                  </h3>
                  <div className="text-xs font-mono text-[#949BA4]">
                    {lightboxMember.discordTag} · {lightboxMember.department}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentMember = lightboxMember;
                    setLightboxMember(null);
                    setActiveModalMember(currentMember);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-[#DBDEE1] transition-colors"
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxMember(null)}
                  className="w-8 h-8 rounded-full bg-[#2B2D31] hover:bg-[#35373C] text-white flex items-center justify-center transition-colors"
                  title="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Stage with Previous/Next Controls */}
            <div className="relative bg-[#0A0A0C] flex items-center justify-center p-6 sm:p-10 min-h-[380px]">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/10 z-10"
                title="Previous Specialist"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Profile Image Display */}
              <div className="max-w-md w-full aspect-square rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl relative bg-[#121923] flex items-center justify-center group">
                {lightboxMember.avatarUrl ? (
                  <img
                    src={lightboxMember.avatarUrl}
                    alt={`${lightboxMember.name} profile image`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DiscordAvatar
                    name={lightboxMember.name}
                    initials={lightboxMember.initials}
                    theme={lightboxMember.avatarTheme}
                    size="2xl"
                    showStatus={false}
                  />
                )}

                {/* Name Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <div className="text-base font-extrabold">{lightboxMember.name}</div>
                    <div className="text-xs text-[#949BA4] font-mono">{lightboxMember.discordTag}</div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#365DE8]/30 text-[#6C8CFF] border border-[#365DE8]/40">
                    {lightboxMember.department === 'Networking Relations Team' ? 'Networking Team' : 'Partner Success'}
                  </span>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/10 z-10"
                title="Next Specialist"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnail Strip */}
            <div className="p-4 bg-[#141517] border-t border-[#2B2D31] overflow-x-auto">
              <div className="flex items-center gap-3 justify-center min-w-max mx-auto">
                {filteredMembers.map((m) => {
                  const isActive = m.id === lightboxMember.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setLightboxMember(m)}
                      className={`relative flex items-center gap-2 p-1.5 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-[#365DE8]/20 border-2 border-[#365DE8]'
                          : 'bg-[#1E1F22] border border-[#2B2D31] hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#121923] shrink-0">
                        {m.avatarUrl ? (
                          <img
                            src={m.avatarUrl}
                            alt={m.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-slate-800">
                            {m.initials}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-white pr-2 whitespace-nowrap">
                        {m.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Discord Profile Card Modal (No Copy Option) */}
      {activeModalMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalMember(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[#111214] text-white shadow-2xl border border-[#2B2D31] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner */}
            <div className={`h-28 w-full bg-gradient-to-r ${activeModalMember.bannerGradient || 'from-indigo-700 to-purple-900'} relative p-3 flex justify-end`}>
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Avatar & Header */}
            <div className="p-6 pt-0 relative">
              <div className="-mt-14 mb-4 flex items-end justify-between">
                <div
                  className="p-1.5 rounded-full bg-[#111214] cursor-pointer"
                  onClick={() => {
                    const m = activeModalMember;
                    setActiveModalMember(null);
                    setLightboxMember(m);
                  }}
                  title="Click to view full image"
                >
                  <DiscordAvatar
                    name={activeModalMember.name}
                    initials={activeModalMember.initials}
                    avatarUrl={activeModalMember.avatarUrl}
                    theme={activeModalMember.avatarTheme}
                    size="xl"
                    showStatus={true}
                    status={activeModalMember.status}
                    isClickable={true}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const m = activeModalMember;
                      setActiveModalMember(null);
                      setLightboxMember(m);
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Image</span>
                  </button>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#23A55A]/20 text-[#23A55A] border border-[#23A55A]/30">
                    Active
                  </span>
                </div>
              </div>

              {/* Discord Profile Card Info */}
              <div className="rounded-2xl bg-[#1E1F22] p-5 space-y-4 border border-[#2B2D31]">
                {/* Name */}
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>{activeModalMember.name}</span>
                    <ShieldCheck className="w-4 h-4 text-[#5865F2]" />
                  </h4>
                  {/* Clean text display - No copy button */}
                  <div className="text-xs font-mono text-[#949BA4] bg-[#111214] px-2.5 py-1 rounded-lg inline-block border border-[#2B2D31]">
                    {activeModalMember.discordTag}
                  </div>
                  <div className="text-xs font-semibold text-[#5865F2] pt-0.5">
                    {activeModalMember.role}
                  </div>
                </div>

                {/* Discord Roles */}
                {activeModalMember.discordRoles && (
                  <div className="space-y-1.5 pt-2 border-t border-[#2B2D31]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#949BA4] block">
                      Discord Roles
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalMember.discordRoles.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#2B2D31] text-[#DBDEE1]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Me */}
                <div className="space-y-1.5 pt-2 border-t border-[#2B2D31]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#949BA4] block">
                    About Specialist
                  </span>
                  <p className="text-xs text-[#DBDEE1] leading-relaxed">
                    {activeModalMember.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5 pt-2 border-t border-[#2B2D31]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#949BA4] block">
                    Core Solutions
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeModalMember.focusAreas.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#2B2D31] text-[#949BA4]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons (Strictly No Copy Button) */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const m = activeModalMember;
                      setActiveModalMember(null);
                      setLightboxMember(m);
                    }}
                    className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#2B2D31] hover:bg-[#35373C] text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalMember(null);
                      navigate('contact');
                    }}
                    className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Specialist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
