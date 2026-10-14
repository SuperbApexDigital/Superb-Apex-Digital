import React from 'react';
import { useRouter } from '../context/RouterContext';
import {
  Compass,
  FileCheck,
  Code2,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const { navigate } = useRouter();

  const steps = [
    {
      step: '01',
      title: 'Discovery & Diagnostics',
      icon: <Compass className="w-5 h-5" />,
      tagline: 'Understanding current setup, audience behavior, and goals',
      description:
        'We begin by analyzing your existing channel presence, server logs, or branding assets. We review member engagement, identify drop-off points, evaluate OBS or streaming configurations, and audit current permission architectures.',
      clientInputs: [
        'Completed brand & platform intake questionnaire',
        'Overview of target audience demographics and primary platforms',
        'Existing visual files, brand guidelines, or channel links',
      ],
      deliverableOutcome: 'Project Scope Brief & Architectural Audit Checklist',
    },
    {
      step: '02',
      title: 'Planning & Scope Agreement',
      icon: <FileCheck className="w-5 h-5" />,
      tagline: 'Locking down deliverables, timelines, responsibilities, and terms',
      description:
        'Before a single file is exported or a server role is altered, we agree on an itemized deliverable list, fixed milestone calendar, revision bounds, and transparent pricing structure.',
      clientInputs: [
        'Approval of itemized deliverables schedule',
        'Designation of primary review contact person',
        'Service agreement sign-off and deposit confirmation',
      ],
      deliverableOutcome: 'Signed Project Scope Agreement & Production Timeline',
    },
    {
      step: '03',
      title: 'Creation & Technical Setup',
      icon: <Code2 className="w-5 h-5" />,
      tagline: 'Executing channel architecture, graphics, and bot automations',
      description:
        'Our designers and community engineers execute the agreed assets. For Discord, this means category blueprints, permission testing in staging environments, and bot configuration. For streaming, this involves OBS scene rendering, WebM alert animations, and panel design.',
      clientInputs: [
        'Delegated platform-native role permissions (where applicable)',
        'Prompt feedback on intermediate mood boards or drafts',
      ],
      deliverableOutcome: 'Complete Draft Production Suite ready for review',
    },
    {
      step: '04',
      title: 'Review & Structured Revisions',
      icon: <RefreshCw className="w-5 h-5" />,
      tagline: 'Two formal feedback rounds for adjustments and calibration',
      description:
        'We present the complete suite via preview staging links or packaged draft files. You test the server, verify the overlays in your broadcast test stream, and compile feedback. Each deliverable includes two structured revision cycles.',
      clientInputs: [
        'Consolidated timestamped or bulleted feedback from your team',
        'Confirmation of live test streaming or server permissions dry-run',
      ],
      deliverableOutcome: 'Approved Final Master Deliverables Package',
    },
    {
      step: '05',
      title: 'Handover or Ongoing Retainer',
      icon: <CheckCircle2 className="w-5 h-5" />,
      tagline: 'Master file transfer or seamless transition into monthly operations',
      description:
        'For one-time projects, we deliver all master vector SVGs, layered PSDs, scene JSON files, and a Handover Checklist detailing how to revoke temporary permissions. For monthly retainers, our operational team seamlessly begins scheduled coverage.',
      clientInputs: [
        'Final invoice settlement and formal receipt acknowledgement',
        'Optional onboarding into dedicated private agency Slack/Discord channel',
      ],
      deliverableOutcome: '100% Asset Transfer + Handover Checklist or Retainer Kickoff',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Execution Framework
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Our 5-Stage Project Process
        </h1>
        <p className="text-base sm:text-lg text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Predictability, transparency, and creative rigor. We follow a documented five-phase methodology tailored to protect your brand and secure your digital communities.
        </p>
      </div>

      {/* Process Steps */}
      <div className="space-y-8">
        {steps.map((st) => (
          <div
            key={st.step}
            className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE3EE]/60 dark:border-[#283343]/60">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#365DE8]/10 dark:bg-[#6C8CFF]/10 text-[#365DE8] dark:text-[#6C8CFF] font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  {st.step}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                    {st.title}
                  </h2>
                  <p className="text-xs font-medium text-[#365DE8] dark:text-[#6C8CFF]">
                    {st.tagline}
                  </p>
                </div>
              </div>

              <div className="text-xs text-[#526078] dark:text-[#B2BDCB] font-mono shrink-0">
                Phase {st.step} of 05
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              {st.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                  Client Inputs Needed:
                </span>
                <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-1.5">
                  {st.clientInputs.map((input, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#365DE8] dark:text-[#6C8CFF] font-bold">·</span>
                      <span>{input}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                  Milestone Deliverable:
                </span>
                <div className="flex items-start gap-2 text-xs font-medium text-[#172033] dark:text-[#F5F7FA]">
                  <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                  <span>{st.deliverableOutcome}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security & Access Box */}
      <div className="rounded-2xl bg-[#121923] text-[#F5F7FA] border border-[#283343] p-8 lg:p-10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C8CFF]">
          <ShieldCheck className="w-4 h-4" />
          <span>Security Assurance Throughout Every Step</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">
          Zero Risk to Account Credentials
        </h3>
        <p className="text-xs sm:text-sm text-[#B2BDCB] leading-relaxed max-w-2xl">
          At no point in this process will Superb Apex Digital request your account passwords, recovery codes, or two-factor tokens. Access is managed solely through platform-native role permissions that can be inspected and revoked by you at any time.
        </p>
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Ready to Begin Phase 01: Discovery?
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            Submit an initial project brief to discuss your channels, timelines, and requirements with our team.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('quote')}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-sm"
        >
          <span>Initiate Project Scoping</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
        </button>
      </div>
    </div>
  );
};
