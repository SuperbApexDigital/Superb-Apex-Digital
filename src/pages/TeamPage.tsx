import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { TEAM_MEMBERS } from '../data/agencyData';
import { ShieldCheck, Info, ArrowRight, UserCheck } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = [
    'All',
    'Leadership & Operations',
    'Discord & Community Services',
    'Streaming & Creator Services',
    'Video & Creative Production',
    'Social Media & Marketing',
    'Client Success & Quality Assurance',
  ];

  const filteredMembers =
    selectedDept === 'All'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === selectedDept);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Agency Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Our Multidisciplinary Team Structure
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Superb Apex Digital operates as a coordinated collective of community engineers, broadcast designers, video editors, and client success leads. We organize our operations by discipline to deliver focused expertise across every channel.
        </p>
      </div>

      {/* Honest Transparency Note */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex items-start gap-3.5 text-xs text-[#526078] dark:text-[#B2BDCB]">
        <Info className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#172033] dark:text-[#F5F7FA]">
            Agency Directory Transparency Notice
          </p>
          <p>
            Departments reflect our operational capabilities. In adherence to our agency integrity standards, we display functional role definitions and verified leadership desks rather than unverified biographical marketing claims. Individual specialist profiles are configured directly by authorized site leads.
          </p>
        </div>
      </div>

      {/* Department Filter Tabs (Interactive button tabs) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EEF2F8] dark:bg-[#121923] rounded-xl border border-[#DCE3EE] dark:border-[#283343] w-fit">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedDept === dept
                ? 'bg-[#FFFFFF] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
            }`}
          >
            {dept === 'Client Success & Quality Assurance' ? 'Client QA' : dept}
          </button>
        ))}
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex flex-col justify-between space-y-6 shadow-sm hover:border-[#365DE8]/40 dark:hover:border-[#6C8CFF]/40 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {/* Polished Branded Role Monogram */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#365DE8] to-[#6D4AE6] dark:from-[#6C8CFF] dark:to-[#9B8AFB] flex items-center justify-center text-white dark:text-[#0B0F14] font-bold text-sm tracking-wider font-display shadow-sm">
                  {member.initials}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#526078] dark:text-[#B2BDCB]">
                  <UserCheck className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                  <span>{member.status}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                  {member.department}
                </span>
                <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                  {member.role}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                {member.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60 space-y-2">
              <span className="text-[11px] font-semibold text-[#172033] dark:text-[#F5F7FA] block">
                Primary Responsibilities:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#526078] dark:text-[#B2BDCB]">
                {member.focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="after:content-['·'] after:ml-1.5 last:after:content-none"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Note */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Collaborate With Our Dedicated Specialists
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            Every client is assigned a designated Operations Lead who coordinates cross-departmental delivery, ensuring seamless communication across all deliverables.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('quote')}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-sm"
        >
          <span>Schedule Scoping Conversation</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
        </button>
      </div>
    </div>
  );
};
