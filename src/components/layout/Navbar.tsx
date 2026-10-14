import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { ApexLogo } from '../common/ApexLogo';
import { ThemeToggle } from '../common/ThemeToggle';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { RoutePath } from '../../types';

export const Navbar: React.FC = () => {
  const { route, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { path: RoutePath; label: string }[] = [
    { path: 'services', label: 'Services' },
    { path: 'team', label: 'Team' },
    { path: 'process', label: 'Process' },
    { path: 'portfolio', label: 'Portfolio' },
    { path: 'pricing', label: 'Pricing' },
    { path: 'about', label: 'About' },
  ];

  const handleNavClick = (path: RoutePath) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isCurrent = (path: RoutePath) => {
    if (path === 'services' && route.startsWith('services')) return true;
    return route === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F7F8FC]/90 dark:bg-[#0B0F14]/90 border-b border-[#DCE3EE] dark:border-[#283343] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones, gap-8, single line */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand wordmark (single element, whitespace-nowrap shrink-0) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF] rounded-lg p-0.5"
              aria-label="Superb Apex Digital Home"
            >
              <ApexLogo size="md" />
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links with subtle hover underlines */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#526078] dark:text-[#B2BDCB]"
          >
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#172033] dark:hover:text-[#F5F7FA] ${
                    active
                      ? 'text-[#365DE8] dark:text-[#6C8CFF] font-semibold'
                      : ''
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#365DE8] dark:bg-[#6C8CFF] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary CTA action + Theme Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => handleNavClick('quote')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] dark:hover:bg-[#839eff] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#526078] dark:text-[#B2BDCB] hover:bg-[#EEF2F8] dark:hover:bg-[#192331] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365DE8] dark:focus-visible:ring-[#6C8CFF]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] dark:bg-[#121923] border-b border-[#DCE3EE] dark:border-[#283343] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent(link.path)
                    ? 'bg-[#EEF2F8] dark:bg-[#192331] text-[#365DE8] dark:text-[#6C8CFF] font-semibold'
                    : 'text-[#526078] dark:text-[#B2BDCB] hover:bg-[#F7F8FC] dark:hover:bg-[#192331]/50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Quick access to Trust & FAQ on mobile */}
            <div className="pt-2 border-t border-[#DCE3EE] dark:border-[#283343] mt-2 space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick('trust')}
                className="flex items-center gap-2 text-left px-3 py-2 text-xs text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#365DE8] dark:text-[#6C8CFF]" />
                <span>Responsible Access & Trust</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('faq')}
                className="text-left px-3 py-2 text-xs text-[#526078] dark:text-[#B2BDCB] hover:text-[#172033] dark:hover:text-[#F5F7FA]"
              >
                Frequently Asked Questions
              </button>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleNavClick('quote')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#365DE8] dark:bg-[#6C8CFF] dark:text-[#0B0F14] rounded-lg shadow-sm"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
