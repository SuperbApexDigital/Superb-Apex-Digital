import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PORTFOLIO_ITEMS } from '../data/agencyData';
import { PortfolioItem } from '../types';
import { CheckCircle2, Info, ArrowRight, Layers, X } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Discord',
    'Twitch',
    'YouTube',
    'Social Media',
    'Community',
    'Creator Branding',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Work & Capabilities Showcase
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Concept Systems & Demonstration Work
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Explore our architectural concepts, stream overlay systems, thumbnail production frameworks, and community governance blueprints. Each case study illustrates our deliverable standards and structural rigor.
        </p>
      </div>

      {/* Honest Transparency Notice */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex items-start gap-3.5 text-xs text-[#526078] dark:text-[#B2BDCB]">
        <Info className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#172033] dark:text-[#F5F7FA]">
            Showcase Transparency Notice
          </p>
          <p>
            In strict compliance with our agency ethics policy, the projects displayed here represent our original agency demonstration work, architectural prototypes, and creative systems. We never fabricate client names, invent fictitious testimonials, or publish non-consensual client case studies.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EEF2F8] dark:bg-[#121923] rounded-xl border border-[#DCE3EE] dark:border-[#283343] w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#FFFFFF] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#365DE8]/50 dark:hover:border-[#6C8CFF]/50 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                  {item.category}
                </span>
                <span className="text-[#526078] dark:text-[#B2BDCB] text-[11px] font-mono">
                  {item.badge}
                </span>
              </div>

              <h2 className="text-lg font-bold text-[#172033] dark:text-[#F5F7FA]">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#DCE3EE]/60 dark:border-[#283343]/60">
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                  Included Deliverables:
                </span>
                <ul className="text-xs text-[#526078] dark:text-[#B2BDCB] space-y-1">
                  {item.deliverables.slice(0, 3).map((del, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setActiveItem(item)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#EEF2F8] dark:bg-[#192331] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] text-[#172033] dark:text-[#F5F7FA] transition-colors"
              >
                <span>Inspect Deliverable Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#192331] transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-[#365DE8] dark:text-[#6C8CFF]">
                  {activeItem.category}
                </span>
                <span>·</span>
                <span className="text-[#526078] dark:text-[#B2BDCB] font-mono">
                  {activeItem.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              {activeItem.description}
            </p>

            <div className="space-y-2 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#192331] border border-[#DCE3EE] dark:border-[#283343]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                Design System & Technical Specification:
              </span>
              <p className="text-xs text-[#526078] dark:text-[#B2BDCB]">
                {activeItem.designSystem}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA] block">
                All Included Master Deliverables:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
                {activeItem.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#DCE3EE] dark:border-[#283343]">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 text-xs font-medium text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItem(null);
                  navigate('quote');
                }}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors"
              >
                Inquire With Similar Scope
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Have a Specific Concept in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            We adapt these design frameworks to fit your unique community culture and brand style.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('quote')}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-sm"
        >
          <span>Request Custom Proposal</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
        </button>
      </div>
    </div>
  );
};
