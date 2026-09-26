import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';
import { TanushLogo } from './TanushLogo';

export const BottomNavDock: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  const handleNav = (page: PageType, sectionId?: string) => {
    navigateTo(page);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 sm:px-8 pointer-events-none select-none transform-gpu translate-z-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Floating Pill: TANUSH FITNESS */}
        <div className="pointer-events-auto">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            className="bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#D0CFCA] px-5 sm:px-6 py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-2xl cursor-pointer group hover:bg-[#0F1926]"
          >
            <TanushLogo variant="white" height={32} className="h-8 w-auto group-hover:scale-105 transition-transform" />
          </a>
        </div>

        {/* Center Floating Dock */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] p-2 rounded-full shadow-2xl font-satoshi text-xs sm:text-[13px] uppercase tracking-wider">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNav('about');
            }}
            className={`px-5 py-2 rounded-full font-bold transition-all duration-300 cursor-pointer ${
              currentPage === 'about'
                ? 'bg-[#E8E8E8] text-[#0F1926] shadow-md font-black'
                : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-white/10'
            }`}
          >
            About
          </a>

          <a
            href="#equipment"
            onClick={(e) => {
              e.preventDefault();
              handleNav('equipment');
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              currentPage === 'equipment'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-black shadow-md'
                : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-white/10'
            }`}
          >
            Equipment
          </a>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNav('services');
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              currentPage === 'services'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-black shadow-md'
                : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-white/10'
            }`}
          >
            Gym Management
          </a>

          <a
            href="#manpower"
            onClick={(e) => {
              e.preventDefault();
              handleNav('manpower');
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              currentPage === 'manpower'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-black shadow-md'
                : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-white/10'
            }`}
          >
            Manpower
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav('contact');
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-black shadow-md'
                : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-white/10'
            }`}
          >
            Consultation
          </a>
        </div>

        {/* Right Floating Circular Menu Button */}
        <div className="pointer-events-auto">
          <a
            href="/#directory"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home', 'directory');
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#D0CFCA] hover:bg-[#E8E8E8] flex flex-col items-center justify-center gap-1.5 text-[#E8E8E8] transition-all duration-300 shadow-2xl group cursor-pointer"
            aria-label="Scroll to Directory Section"
            title="Navigate to Directory"
          >
            <span className="w-5 sm:w-6 h-[2px] bg-[#E8E8E8] group-hover:bg-[#0F1926] rounded-full transition-all duration-300 group-hover:scale-x-110" />
            <span className="w-5 sm:w-6 h-[2px] bg-[#E8E8E8] group-hover:bg-[#0F1926] rounded-full transition-all duration-300 group-hover:scale-x-110" />
          </a>
        </div>
      </div>
    </div>
  );
};
