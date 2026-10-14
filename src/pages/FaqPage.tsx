import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { AGENCY_FAQS } from '../data/agencyData';
import { Search, ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Engagement & Pricing', 'Security & Access', 'Workflow & Revisions', 'Ownership & Legal'];

  const filteredFaqs = AGENCY_FAQS.filter((faq) => {
    const matchesCat = selectedCat === 'All' || faq.category === selectedCat;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#365DE8] dark:text-[#6C8CFF]">
          Client Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
          Clear, straightforward answers about how Superb Apex Digital operates, protects your accounts, executes revisions, and structures project proposals.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#526078] dark:text-[#B2BDCB]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] text-sm text-[#172033] dark:text-[#F5F7FA] placeholder-[#526078]/60 dark:placeholder-[#B2BDCB]/60 focus:outline-none focus:ring-2 focus:ring-[#365DE8] dark:focus:ring-[#6C8CFF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EEF2F8] dark:bg-[#121923] rounded-xl border border-[#DCE3EE] dark:border-[#283343] w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCat === cat
                  ? 'bg-[#FFFFFF] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] shadow-sm'
                  : 'text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] text-xs text-[#526078] dark:text-[#B2BDCB]">
            No questions found matching your search. Please reach out to our team directly!
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-[#172033] dark:text-[#F5F7FA] hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#365DE8] dark:text-[#6C8CFF] block">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 shrink-0 text-[#365DE8] dark:text-[#6C8CFF]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0 text-[#526078] dark:text-[#B2BDCB]" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] leading-relaxed border-t border-[#DCE3EE]/40 dark:border-[#283343]/40 mt-1 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Help Notice */}
      <div className="rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F5F7FA]">
            Still Have a Specific Question?
          </h3>
          <p className="text-xs sm:text-sm text-[#526078] dark:text-[#B2BDCB] max-w-xl">
            Our team is happy to review your server setup, channel branding, or streaming requirements in detail.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('contact')}
          className="px-6 py-3 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shrink-0 shadow-sm"
        >
          <span>Send General Message</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
        </button>
      </div>
    </div>
  );
};
