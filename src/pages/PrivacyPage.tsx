import React from 'react';
import { useRouter } from '../context/RouterContext';
import { AlertCircle, Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Legal Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Privacy Policy (Draft for Review)
        </h1>
        <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
          Last Updated: October 2026 · Status: Operational Draft
        </p>
      </div>

      {/* Draft Disclaimer Notice */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Business Owner Notice:</p>
          <p>
            This document serves as an operational draft tailored to Superb Apex Digital’s digital service model. Legal entity details, physical corporate jurisdiction, and specific statutory disclosures must be confirmed by authorized legal counsel prior to formal business reliance.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            1. Information We Collect
          </h2>
          <p>
            Superb Apex Digital collects information that you voluntarily submit through our contact, scoping, and quotation forms. This may include your name, email address, Discord username, channel names, platform URLs, and project specifications.
          </p>
          <p>
            We do not collect sensitive authentication credentials, passwords, or two-factor authentication tokens. We advise all prospective and active clients never to provide passwords under any circumstances.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            2. How Information Is Used
          </h2>
          <p>
            Information provided is used solely to evaluate project requirements, prepare itemized proposals, coordinate communications, and deliver contracted services. We do not sell, rent, or lease prospective or client contact details to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            3. Platform-Native Delegated Access
          </h2>
          <p>
            In the course of executing Discord server setups, YouTube uploads, Twitch panels, or social media scheduling, our personnel access accounts exclusively through platform-native role delegations (e.g. Discord Administrator role, YouTube Channel Manager, Twitch Editor, Meta Partner Suite). You retain full authority to review, limit, or revoke delegated access at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            4. Third-Party Hosting & Processing
          </h2>
          <p>
            This website is hosted statically via GitHub Pages. Standard server-level technical requests (such as IP addresses and browser headers) are processed in accordance with GitHub’s privacy policies. Inquiries submitted through our forms may be processed via client-selected automation webhooks or secure email services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
            5. Client Data Rights & Inquiries
          </h2>
          <p>
            You may request deletion or modification of any prospective contact information stored in our communications database at any time by contacting our team via the website contact form.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-[#DCE3EE] dark:border-[#283343]">
        <button
          type="button"
          onClick={() => navigate('contact')}
          className="text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
        >
          Have questions regarding privacy or access handling? Contact our team →
        </button>
      </div>
    </div>
  );
};
