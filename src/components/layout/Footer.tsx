import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ApexLogo } from '../common/ApexLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Shield, GitBranch, ArrowUpRight } from 'lucide-react';
import { RoutePath } from '../../types';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const servicesList: { path: RoutePath; label: string }[] = [
    { path: 'services/discord', label: 'Discord Services' },
    { path: 'services/twitch', label: 'Twitch Services' },
    { path: 'services/youtube', label: 'YouTube Services' },
    { path: 'services/social-media', label: 'Social Media Services' },
    { path: 'services/community-management', label: 'Community Management' },
    { path: 'services/creator-branding', label: 'Creator Branding & Design' },
  ];

  const companyList: { path: RoutePath; label: string }[] = [
    { path: 'about', label: 'About Superb Apex Digital' },
    { path: 'team', label: 'Team Directory' },
    { path: 'process', label: 'Our 5-Stage Process' },
    { path: 'portfolio', label: 'Concept Showcase' },
    { path: 'pricing', label: 'Pricing & Scope Model' },
    { path: 'reviews', label: 'Client Ratings & Reviews' },
    { path: 'trust', label: 'Trust & Responsible Access' },
    { path: 'faq', label: 'Frequently Asked Questions' },
    { path: 'contact', label: 'Contact Our Team' },
  ];

  return (
    <footer className="w-full bg-[#EEF2F8] dark:bg-[#121923] border-t border-[#DCE3EE] dark:border-[#283343] transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand info column (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF] rounded-lg"
              aria-label="Superb Apex Digital Home"
            >
              <ApexLogo size="md" />
            </button>

            <p className="text-sm text-[#526078] dark:text-[#B2BDCB] max-w-sm leading-relaxed">
              From Discord community management and Twitch channel branding to YouTube content and social media support, Superb Apex Digital helps creators and businesses build, manage, and grow their digital presence.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#526078] dark:text-[#B2BDCB]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#365DE8] dark:text-[#6C8CFF] shrink-0" />
                <span>100% Platform-Native Delegated Access — No Passwords Collected</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#6D4AE6] dark:text-[#9B8AFB] shrink-0" />
                <span>GitHub Pages & Static Web Compatible — Automated CI/CD Deployment</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA]">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-[#526078] dark:text-[#B2BDCB]">
              {servicesList.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency & Process Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA]">
              Agency & Operations
            </h3>
            <ul className="space-y-2 text-sm text-[#526078] dark:text-[#B2BDCB]">
              {companyList.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="hover:text-[#365DE8] dark:hover:text-[#6C8CFF] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement & Inquiries Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172033] dark:text-[#F5F7FA]">
              Work With Us
            </h3>
            <p className="text-xs text-[#526078] dark:text-[#B2BDCB] leading-relaxed">
              Available for one-time architectural projects and dedicated monthly operational retainers.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('quote')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-[#526078] dark:text-[#B2BDCB]/80 pt-1">
              Direct inquiries typically receive scoping response within 24 business hours.
            </p>
          </div>
        </div>

        {/* Bottom hairline bar with copyright, theme selector, and legal policies */}
        <div className="mt-12 pt-6 border-t border-[#DCE3EE] dark:border-[#283343] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#526078] dark:text-[#B2BDCB]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Superb Apex Digital. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#526078] dark:text-[#B2BDCB]">Theme:</span>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('privacy')}
              className="hover:text-[#172033] dark:hover:text-[#F5F7FA] transition-colors"
            >
              Privacy Policy (Draft)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate('terms')}
              className="hover:text-[#172033] dark:hover:text-[#F5F7FA] transition-colors"
            >
              Terms of Service (Draft)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => navigate('trust')}
              className="hover:text-[#172033] dark:hover:text-[#F5F7FA] transition-colors"
            >
              Access Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
