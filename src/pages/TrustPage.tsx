import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ShieldCheck, Key, Lock, FileText, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

export const TrustPage: React.FC = () => {
  const { navigate } = useRouter();

  const platformGuides = [
    {
      platform: 'Discord',
      howItWorks: 'Role-Based Server Delegations',
      procedure:
        'You create a dedicated temporary role (e.g., "Apex Agency") with Manager or Administrator permissions. Once setup or maintenance is verified, you revoke or delete the role in Server Settings > Roles with a single click.',
      weNeverAskFor: 'Discord account logins, phone verifications, or server ownership transfer.',
    },
    {
      platform: 'YouTube Studio',
      howItWorks: 'Google Channel Permissions',
      procedure:
        'You invite our designated agency email via YouTube Studio > Settings > Permissions with the "Manager" or "Editor" role. This grants video upload and layout management rights while keeping full Google account ownership in your hands.',
      weNeverAskFor: 'Google account passwords, recovery codes, or Primary Owner transfer.',
    },
    {
      platform: 'Twitch',
      howItWorks: 'Twitch Channel Editor & Mod Roles',
      procedure:
        'You add our designated handle under Creator Dashboard > Community > Roles Manager as an "Editor". This permits schedule updates, stream title changes, and panel adjustments without access to payouts or stream keys.',
      weNeverAskFor: 'Twitch account password, stream key export, or two-factor auth tokens.',
    },
    {
      platform: 'Social Networks & Meta',
      howItWorks: 'Partner Business Portals',
      procedure:
        'For Facebook and Instagram, access is granted via Meta Business Suite Partner ID delegation. For X/Twitter, shared TweetDeck/X Pro team seats or social scheduling platforms (Buffer, Hootsuite) are utilized.',
      weNeverAskFor: 'Personal account passwords or mobile SMS verification codes.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Security & Responsible Access
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Protecting Your Channels, Accounts & Community Trust
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Superb Apex Digital was architected from day one to operate without ever handling sensitive client credentials. We adhere to strict platform-native delegation standards that keep you in absolute control.
        </p>
      </div>

      {/* 5 Core Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#365DE8]/10 dark:bg-[#6C8CFF]/10 text-[#365DE8] dark:text-[#6C8CFF] flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            Zero Password Collection
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            We will never ask you to message us your password, stream key, or two-factor authentication recovery codes. Any request claiming to be our team asking for credentials should be reported immediately.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#6D4AE6]/10 dark:bg-[#9B8AFB]/10 text-[#6D4AE6] dark:text-[#9B8AFB] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            Principle of Least Privilege
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            We only request the specific role permissions necessary to complete the agreed work. If a project only involves channel visual layout, we will not request member moderation rights.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#365DE8]/10 dark:bg-[#6C8CFF]/10 text-[#365DE8] dark:text-[#6C8CFF] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            Documented Handover & Revocation
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            Upon final delivery of a one-time project, we supply an explicit Step-by-Step Revocation Guide so your administrator can remove or downgrade our temporary agency roles immediately.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#6D4AE6]/10 dark:bg-[#9B8AFB]/10 text-[#6D4AE6] dark:text-[#9B8AFB] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            Client Confidentiality & NDAs
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            We treat your unannounced content schedules, sponsor contracts, and internal community discussions with strict confidentiality. Project materials are restricted strictly to assigned staff.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#365DE8]/10 dark:bg-[#6C8CFF]/10 text-[#365DE8] dark:text-[#6C8CFF] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            Consensual Portfolio Use
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            We will never display private community blueprints, private server metrics, or unannounced rebrands in our public showcase without your explicit written approval.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#6D4AE6]/10 dark:bg-[#9B8AFB]/10 text-[#6D4AE6] dark:text-[#9B8AFB] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            100% Asset Ownership
          </h2>
          <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
            All design files, vector marks, video cuts, and bot configurations are transferred entirely to you upon completion. We retain zero proprietary locks or recurring licensing fees on your brand assets.
          </p>
        </div>
      </div>

      {/* Platform Delegation Breakdown */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Platform Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            How We Interface With Your Accounts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformGuides.map((guide) => (
            <div
              key={guide.platform}
              className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DCE3EE]/60 dark:border-[#283343]/60 pb-3">
                <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                  {guide.platform}
                </h3>
                <span className="text-xs font-medium text-[#365DE8] dark:text-[#6C8CFF]">
                  {guide.howItWorks}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
                <p className="leading-relaxed">
                  <strong className="text-[#172033] dark:text-[#F5F7FA]">Standard Procedure: </strong>
                  {guide.procedure}
                </p>
                <p className="leading-relaxed text-amber-700 dark:text-amber-400">
                  <strong>Strict Prohibition: </strong>
                  {guide.weNeverAskFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Have Security or NDA Questions?
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            Our Client QA lead is available to review your organization’s access requirements prior to contract signing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('contact')}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-sm"
        >
          <span>Contact Security Desk</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
        </button>
      </div>
    </div>
  );
};
