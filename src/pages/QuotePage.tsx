import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  CheckCircle2,
  Send,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Info,
  Clock,
  Calendar,
  Layers,
} from 'lucide-react';

export const QuotePage: React.FC = () => {
  const { params } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [engagementModel, setEngagementModel] = useState<'One-Time Project' | 'Monthly Retainer'>(
    params.model === 'Monthly Retainer' ? 'Monthly Retainer' : 'One-Time Project'
  );
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (params.service) {
      const map: { [k: string]: string } = {
        discord: 'Discord Services',
        twitch: 'Twitch Services',
        youtube: 'YouTube Services',
        'social-media': 'Social Media Services',
        'community-management': 'Community Management',
        'creator-branding': 'Creator Branding & Design',
      };
      return [map[params.service] || 'Discord Services'];
    }
    if (params.services) {
      return params.services.split(',').filter(Boolean);
    }
    return ['Discord Services'];
  });
  const [budgetBracket, setBudgetBracket] = useState('Standard Growth Scope');
  const [timeline, setTimeline] = useState(params.urgency || 'Standard (2-4 Weeks)');
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Discord' | 'Google Meet'>('Email');
  const [projectGoals, setProjectGoals] = useState(
    params.tier ? `Interested in tier: ${params.tier}. ` : ''
  );
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const availableServices = [
    'Discord Services',
    'Twitch Services',
    'YouTube Services',
    'Social Media Services',
    'Community Management',
    'Creator Branding & Design',
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your full or preferred name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address';
    if (!projectGoals.trim() || projectGoals.trim().length < 20) {
      errs.projectGoals = 'Please describe your project goals (at least 20 characters)';
    }
    if (!privacyAgreed) {
      errs.privacy = 'Please confirm acknowledgment of the access and privacy policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const formattedBrief = `SUPERB APEX DIGITAL - PROJECT INQUIRY BRIEF
--------------------------------------------------
Contact Name: ${name}
Email Address: ${email}
Discord Username: ${discordUsername || 'Not provided'}
Channel / Organization: ${channelName || 'Not provided'}
Channel / Web URL: ${channelUrl || 'Not provided'}

Engagement Model: ${engagementModel}
Target Schedule: ${timeline}
Preferred Contact Channel: ${preferredContact}
Scope Level Bracket: ${budgetBracket}

Requested Services:
${selectedServices.map((s) => `• ${s}`).join('\n')}

Project Goals & Description:
${projectGoals}

Access & Security Confirmation:
Client confirmed zero password sharing agreement. Native platform delegations only.
--------------------------------------------------`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailto = () => {
    const mailto = `mailto:inquiries@superbapexdigital.com?subject=${encodeURIComponent(
      `Project Proposal Inquiry: ${name} (${channelName || 'Creator'})`
    )}&body=${encodeURIComponent(formattedBrief)}`;
    window.location.href = mailto;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Project Scoping
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Request a Tailored Project Proposal
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Provide your project objectives, platforms, and target schedule below. Our agency leads will review your channels and return a structured deliverable proposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Container: 8 cols */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="space-y-6 py-6 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                    Project Inquiry Assembled
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{name}</span>. Your brief has been formatted. Below is your complete structured scope package.
                  </p>
                </div>

                {/* Preformatted Project Brief */}
                <div className="p-5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]">
                  <pre className="text-xs font-mono text-[#172033] dark:text-[#B2BDCB] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                    {formattedBrief}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Brief Copied to Clipboard!' : 'Copy Full Project Brief'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMailto}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#EEF2F8] dark:bg-[#283343] hover:bg-[#DCE3EE] dark:hover:bg-[#324055] text-[#172033] dark:text-[#F5F7FA] transition-colors"
                  >
                    <span>Launch in Mail Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setProjectGoals('');
                    }}
                    className="px-4 py-2.5 text-xs font-medium rounded-lg text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#192331] transition-colors"
                  >
                    Edit / Re-submit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* 1. Contact Info */}
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                    1. Contact & Identity
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="q-name" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Your Name *
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                          errors.name ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="q-email" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Email Address *
                      </label>
                      <input
                        id="q-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@channel.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                          errors.email ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="q-discord" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Discord Username (Optional)
                      </label>
                      <input
                        id="q-discord"
                        type="text"
                        value={discordUsername}
                        onChange={(e) => setDiscordUsername(e.target.value)}
                        placeholder="alex_creator"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="q-channel" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Channel / Guild Name
                      </label>
                      <input
                        id="q-channel"
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Apex Velocity"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="q-url" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Channel / Web URL
                      </label>
                      <input
                        id="q-url"
                        type="url"
                        value={channelUrl}
                        onChange={(e) => setChannelUrl(e.target.value)}
                        placeholder="https://youtube.com/@..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Services Selection */}
                <div className="space-y-3 pt-2 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                    2. Select Disciplines Required ({selectedServices.length} selected)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableServices.map((svc) => {
                      const isChecked = selectedServices.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-colors text-xs ${
                            isChecked
                              ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#365DE8] dark:border-[#6C8CFF] text-[#172033] dark:text-[#F5F7FA] font-medium shadow-sm'
                              : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              isChecked
                                ? 'bg-[#365DE8] border-[#365DE8] dark:bg-[#6C8CFF] dark:border-[#6C8CFF] text-white dark:text-[#0B0F14]'
                                : 'border-[#DCE3EE] dark:border-[#283343]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span>{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Engagement Model & Timing */}
                <div className="space-y-4 pt-2 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                    3. Engagement Model & Preferences
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Engagement Structure
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEngagementModel('One-Time Project')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                            engagementModel === 'One-Time Project'
                              ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#365DE8] dark:border-[#6C8CFF] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                              : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                          }`}
                        >
                          One-Time Project
                        </button>

                        <button
                          type="button"
                          onClick={() => setEngagementModel('Monthly Retainer')}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                            engagementModel === 'Monthly Retainer'
                              ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#6D4AE6] dark:border-[#9B8AFB] text-[#6D4AE6] dark:text-[#9B8AFB] shadow-sm'
                              : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                          }`}
                        >
                          Monthly Retainer
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="q-timeline" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Target Schedule
                      </label>
                      <select
                        id="q-timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      >
                        <option>Urgent Sprint (Under 2 Weeks)</option>
                        <option>Standard (2-4 Weeks)</option>
                        <option>Flexible (Next 1-2 Months)</option>
                        <option>Ongoing Monthly Cadence</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="q-budget" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Budget / Scope Bracket
                      </label>
                      <select
                        id="q-budget"
                        value={budgetBracket}
                        onChange={(e) => setBudgetBracket(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      >
                        <option>Core Foundation Scope</option>
                        <option>Standard Growth Scope</option>
                        <option>Full Multi-Platform Suite</option>
                        <option>Comprehensive Dedicated Retainer</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="q-contact" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                        Preferred Initial Contact
                      </label>
                      <select
                        id="q-contact"
                        value={preferredContact}
                        onChange={(e) => setPreferredContact(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
                      >
                        <option value="Email">Email Communication</option>
                        <option value="Discord">Discord Direct Message</option>
                        <option value="Google Meet">Discovery Video Call</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Project Goals */}
                <div className="space-y-1.5 pt-2 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">
                  <label htmlFor="q-goals" className="text-xs font-bold text-[#172033] dark:text-[#F5F7FA]">
                    Project Goals & Specific Deliverables Needed *
                  </label>
                  <textarea
                    id="q-goals"
                    rows={4}
                    value={projectGoals}
                    onChange={(e) => setProjectGoals(e.target.value)}
                    placeholder="Describe what you want to build or improve: e.g., rebrand Discord server, create 6 YouTube thumbnail templates, configure OBS scenes..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border text-xs sm:text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF] ${
                      errors.projectGoals ? 'border-red-500' : 'border-[#DCE3EE] dark:border-[#283343]'
                    }`}
                  />
                  {errors.projectGoals && <p className="text-[11px] text-red-500">{errors.projectGoals}</p>}
                </div>

                {/* Privacy & Security Checkbox */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-[#DCE3EE] dark:border-[#283343] text-[#365DE8] dark:text-[#6C8CFF] focus:ring-[#365DE8]"
                    />
                    <span className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                      I acknowledge Superb Apex Digital operates strictly via platform-delegated role permissions and will never request account passwords or 2FA codes.
                    </span>
                  </label>
                  {errors.privacy && <p className="text-[11px] text-red-500">{errors.privacy}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shadow-sm"
                  >
                    <span>Generate & Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Guidance: 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
              What Happens Next?
            </h3>
            <ol className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-2.5 list-decimal pl-4">
              <li>Our Operations Lead reviews your channel links and current setup.</li>
              <li>We compile an itemized proposal with deliverables, milestones, and turnaround timeline.</li>
              <li>You receive the proposal within 24 business hours for review.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-[#121923] text-[#F5F7FA] border border-[#283343] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6C8CFF]">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict Confidentiality</span>
            </div>
            <p className="text-xs text-[#B2BDCB] leading-relaxed">
              Your inquiry and unreleased channel plans remain strictly confidential. We execute mutual non-disclosure agreements whenever required.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-3 text-xs">
            <h4 className="font-bold text-[#172033] dark:text-[#F5F7FA]">Client Protection & Standards</h4>
            <ul className="space-y-2 text-[#526078] dark:text-[#B2BDCB]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>100% Asset Ownership:</strong> Full transfer of vector source files, presets, and code upon completion.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Password Policy:</strong> Work conducted exclusively through platform-native role delegations.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Direct Scoping SLA:</strong> Formal proposal delivered to your email within 24 business hours.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
