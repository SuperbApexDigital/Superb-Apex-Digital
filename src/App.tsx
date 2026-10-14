/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { TeamPage } from './pages/TeamPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { TrustPage } from './pages/TrustPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { SERVICES_DATA } from './data/servicesData';

const MainContent: React.FC = () => {
  const { route } = useRouter();

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'services/discord': {
        const svc = SERVICES_DATA.find((s) => s.id === 'discord') || SERVICES_DATA[0];
        return <ServiceDetailPage service={svc} />;
      }
      case 'services/twitch': {
        const svc = SERVICES_DATA.find((s) => s.id === 'twitch') || SERVICES_DATA[1];
        return <ServiceDetailPage service={svc} />;
      }
      case 'services/youtube': {
        const svc = SERVICES_DATA.find((s) => s.id === 'youtube') || SERVICES_DATA[2];
        return <ServiceDetailPage service={svc} />;
      }
      case 'services/social-media': {
        const svc = SERVICES_DATA.find((s) => s.id === 'social-media') || SERVICES_DATA[3];
        return <ServiceDetailPage service={svc} />;
      }
      case 'services/community-management': {
        const svc = SERVICES_DATA.find((s) => s.id === 'community-management') || SERVICES_DATA[4];
        return <ServiceDetailPage service={svc} />;
      }
      case 'services/creator-branding': {
        const svc = SERVICES_DATA.find((s) => s.id === 'creator-branding') || SERVICES_DATA[5];
        return <ServiceDetailPage service={svc} />;
      }
      case 'team':
        return <TeamPage />;
      case 'about':
        return <AboutPage />;
      case 'process':
        return <ProcessPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'pricing':
        return <PricingPage />;
      case 'trust':
        return <TrustPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'quote':
        return <QuotePage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] dark:bg-[#0B0F14] text-[#172033] dark:text-[#F5F7FA] transition-colors font-body antialiased selection:bg-[#365DE8]/20 dark:selection:bg-[#6C8CFF]/20 selection:text-[#365DE8] dark:selection:text-[#6C8CFF]">
      <Navbar />
      <main className="flex-1 w-full">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <MainContent />
      </RouterProvider>
    </ThemeProvider>
  );
}
