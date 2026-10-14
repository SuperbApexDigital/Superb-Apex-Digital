import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ApexLogo } from '../components/common/ApexLogo';
import { Home, ArrowRight, Layers, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      <div className="w-16 h-16 rounded-2xl bg-[#EEF2F8] dark:bg-[#121923] border border-[#DCE3EE] dark:border-[#283343] flex items-center justify-center mx-auto text-[#365DE8] dark:text-[#6C8CFF]">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-[#365DE8] dark:text-[#6C8CFF]">
          HTTP 404 · PAGE NOT FOUND
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033] dark:text-[#F5F7FA]">
          Destination Not Found
        </h1>
        <p className="text-sm text-[#526078] dark:text-[#B2BDCB] max-w-md mx-auto leading-relaxed">
          The requested page route could not be located in the Superb Apex Digital site directory. Use the navigation links below to return to the active agency sections.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#365DE8] hover:bg-[#2e50cb] dark:bg-[#6C8CFF] dark:text-[#0B0F14] text-white transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('services')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#EEF2F8] dark:bg-[#192331] hover:bg-[#DCE3EE] dark:hover:bg-[#283343] text-[#172033] dark:text-[#F5F7FA] transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>Explore Services</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('quote')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg text-[#365DE8] dark:text-[#6C8CFF] hover:underline"
        >
          <span>Request a Quote →</span>
        </button>
      </div>
    </div>
  );
};
