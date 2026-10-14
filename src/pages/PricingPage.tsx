import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRICING_TIERS } from '../data/agencyData';
import {
  CheckCircle2,
  Info,
  ArrowRight,
  Sliders,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate } = useRouter();

  // Interactive Scope Estimator State
  const [selectedServices, setSelectedServices] = useState<string[]>(['Discord Server Setup']);
  const [selectedModel, setSelectedModel] = useState<'One-Time Project' | 'Monthly Retainer'>('One-Time Project');
  const [urgency, setUrgency] = useState<'Standard Timeline' | 'Expedited Sprint'>('Standard Timeline');
  const [copied, setCopied] = useState(false);

  const availableServices = [
    'Discord Server Setup & Architecture',
    'Discord Bot Orchestration & Verification',
    'Twitch Broadcast Package & Overlays',
    'Twitch Custom Alert Animations',
    'YouTube Thumbnail System (6 templates)',
    'YouTube Channel Art & End-Screen Suite',
    'Social Media Master Templates Suite',
    'Short-Form Video Production & Cutdowns',
    'Community Moderation SOPs & Rules',
    'Ongoing Community Administration',
    'Creator Brand Identity & Media Kit',
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

  const handleCopyScope = () => {
    const text = `Superb Apex Digital - Project Scope Brief\nModel: ${selectedModel}\nDelivery: ${urgency}\nSelected Services:\n${selectedServices.map((s) => `• ${s}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleProceedToQuote = () => {
    navigate('quote', {
      model: selectedModel,
      services: selectedServices.join(','),
      urgency,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Scope & Pricing Framework
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Transparent Scope-Based Engagement
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Because digital communities and creator channels operate at widely varied scales, we structure our proposals strictly around verified deliverable scope and platform needs.
        </p>
      </div>

      {/* Honest Pricing Policy Notice */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex items-start gap-3.5 text-xs text-[#526078] dark:text-[#B2BDCB]">
        <Info className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#172033] dark:text-[#F5F7FA]">
            Agency Pricing Transparency Standard
          </p>
          <p>
            We never display fabricated discounts, false countdown timers, or artificial crossed-out prices. Each client receives a formal, itemized quotation reflecting exact asset counts, animation parameters, and coverage windows.
          </p>
        </div>
      </div>

      {/* Scope Tiers Overview */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
            Standard Engagement Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Turnkey Builds & Operational Retainers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#365DE8]/40 dark:hover:border-[#6C8CFF]/40 transition-all"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#365DE8] dark:text-[#6C8CFF]">
                    {tier.model}
                  </span>
                  <h3 className="text-base font-bold text-[#172033] dark:text-[#F5F7FA]">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-[#526078] dark:text-[#B2BDCB] pt-1">
                    {tier.bestFor}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F7F8FC] dark:bg-[#192331] text-[11px] text-[#172033] dark:text-[#F5F7FA] font-medium">
                  Timeline: {tier.typicalTimeline}
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                    Scope Deliverables:
                  </span>
                  <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-2">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('quote', { tier: tier.title })}
                className="w-full inline-flex items-center justify-center px-3 py-2.5 text-xs font-semibold rounded-lg bg-[#EEF2F8] dark:bg-[#192331] hover:bg-[#365DE8] hover:text-white dark:hover:bg-[#6C8CFF] dark:hover:text-[#0B0F14] text-[#172033] dark:text-[#F5F7FA] transition-colors"
              >
                <span>Request Proposal for This Tier</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Scope & Deliverables Estimator */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 space-y-8 transition-colors">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
            <Sliders className="w-4 h-4" />
            <span>Interactive Scope Configurator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
            Configure Your Custom Project Scope
          </h2>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB]">
            Select the services you require to assemble an instant deliverable checklist and pass it directly to our inquiry desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Model Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                1. Select Engagement Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['One-Time Project', 'Monthly Retainer'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedModel(m)}
                    className={`p-3.5 rounded-xl border text-left transition-colors text-xs font-semibold ${
                      selectedModel === m
                        ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#365DE8] dark:border-[#6C8CFF] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                        : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                2. Target Delivery Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['Standard Timeline', 'Expedited Sprint'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUrgency(u)}
                    className={`p-3 rounded-xl border text-left transition-colors text-xs font-semibold ${
                      urgency === u
                        ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#365DE8] dark:border-[#6C8CFF] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                        : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Checklist */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                3. Choose Required Deliverables ({selectedServices.length} selected)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableServices.map((svc) => {
                  const isChecked = selectedServices.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-colors text-xs ${
                        isChecked
                          ? 'bg-[#FFFFFF] dark:bg-[#192331] border-[#365DE8] dark:border-[#6C8CFF] text-[#172033] dark:text-[#F5F7FA] font-medium shadow-sm'
                          : 'bg-[#F7F8FC] dark:bg-[#121923] border-[#DCE3EE] dark:border-[#283343] text-[#526078] dark:text-[#B2BDCB]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
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
          </div>

          {/* Summary Box: Right 4 cols */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343] shadow-md space-y-5 sticky top-24">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                Assembled Scope Summary
              </span>
              <h3 className="text-lg font-bold text-[#172033] dark:text-[#F5F7FA]">
                Project Scope Package
              </h3>
            </div>

            <div className="space-y-2 text-xs text-[#526078] dark:text-[#B2BDCB] border-y border-[#DCE3EE] dark:border-[#283343] py-3">
              <div className="flex justify-between">
                <span>Engagement Model:</span>
                <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{selectedModel}</span>
              </div>
              <div className="flex justify-between">
                <span>Schedule:</span>
                <span className="font-semibold text-[#172033] dark:text-[#F5F7FA]">{urgency}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Scope Modules:</span>
                <span className="font-mono font-bold text-[#365DE8] dark:text-[#6C8CFF]">{selectedServices.length}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#172033] dark:text-[#F5F7FA] block">
                Included Deliverable Modules:
              </span>
              <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-1 max-h-48 overflow-y-auto pr-1">
                {selectedServices.map((svc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{svc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleProceedToQuote}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shadow-sm"
              >
                <span>Transfer Scope to Formal Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleCopyScope}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-[#F7F8FC] dark:bg-[#121923] hover:bg-[#EEF2F8] dark:hover:bg-[#283343] text-[#526078] dark:text-[#B2BDCB] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Scope Brief'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Influencing Factors */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
          What Factors Shape Your Project Proposal?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-2">
            <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
              Platform & Channel Count
            </h3>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Standalone Discord servers require different infrastructure than cross-platform deployments spanning Twitch, YouTube, and multi-network social feeds.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-2">
            <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
              Motion & Asset Complexity
            </h3>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Static graphic templates versus animated WebM broadcast stinger transitions and custom bot code integrations require distinct specialist allocations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] space-y-2">
            <h3 className="text-sm font-bold text-[#172033] dark:text-[#F5F7FA]">
              Retainer Coverage Hours
            </h3>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              For monthly retainers, pricing reflects dedicated weekly hours, ticket queue response windows, and content publishing cadence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
