import React from 'react';
import { useRouter } from '../context/RouterContext';
import { AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Legal Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Terms of Service (Draft for Review)
        </h1>
        <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
          Last Updated: October 2026 · Status: Operational Draft
        </p>
      </div>

      {/* Notice */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Business Owner Notice:</p>
          <p>
            These terms represent the operational engagement structure of Superb Apex Digital. Formal corporate registration details, governing jurisdiction, and statutory arbitration clauses must be reviewed by legal counsel before being executed as binding commercial contracts.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            1. Engagement Models
          </h2>
          <p>
            Superb Apex Digital provides services under two distinct models:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>
              <strong>One-Time Architectural Projects:</strong> Defined deliverables, fixed project milestones, and structured revision rounds as specified in an agreed Scope Brief.
            </li>
            <li>
              <strong>Monthly Operational Retainers:</strong> Ongoing server maintenance, regular graphics creation, moderation supervision, and channel administration provided on a recurring monthly cycle.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            2. Intellectual Property & Ownership
          </h2>
          <p>
            Upon receipt of full payment for contracted services, all custom deliverables created specifically for the client (including vector logo files, custom overlay graphics, Discord server setups, and thumbnail templates) become 100% the intellectual property of the client. Superb Apex Digital retains only the non-exclusive right to display completed, approved work in its professional agency showcase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            3. Account Access & Security Obligations
          </h2>
          <p>
            All account permissions must be granted strictly through platform-native role delegations (e.g. Discord Administrator role, YouTube Channel Manager, Twitch Editor, Meta Partner). Clients must never provide Superb Apex Digital with raw account passwords, stream keys, or two-factor authentication codes. Clients remain responsible for maintaining their primary account security and revoking temporary permissions upon project handover.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            4. Performance & Organic Reach Disclaimers
          </h2>
          <p>
            While Superb Apex Digital delivers industry-standard creative and operational infrastructure, we do not make guarantees regarding audience growth, subscriber counts, viewer numbers, or platform algorithm monetization. Success on digital platforms depends on content quality, consistency, and market dynamics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            5. Revisions & Acceptance
          </h2>
          <p>
            Deliverables include the number of revision rounds specified in the project proposal (typically two structured rounds). Revisions must align with the original brief. Changes representing a substantial departure from the agreed scope are subject to supplementary scoping.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-[#DCE3EE] dark:border-[#283343]">
        <button
          type="button"
          onClick={() => navigate('contact')}
          className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
        >
          Have questions regarding terms or contracting? Contact our operations desk →
        </button>
      </div>
    </div>
  );
};
