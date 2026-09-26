import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VaultMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS: { num: string; title: string; page: PageType }[] = [
  { num: '01', title: 'Home', page: 'home' },
  { num: '02', title: 'Equipment Sanctuary', page: 'equipment' },
  { num: '03', title: 'Gym Management', page: 'services' },
  { num: '04', title: 'Manpower Services', page: 'manpower' },
  { num: '05', title: 'About', page: 'about' },
  { num: '06', title: 'VIP Consultation', page: 'contact' },
];

export const VaultMenuDrawer: React.FC<VaultMenuDrawerProps> = ({ isOpen, onClose }) => {
  const { currentPage, navigateTo } = useApp();

  const handleNav = (page: PageType) => {
    navigateTo(page);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0F1926] text-[#E8E8E8] flex flex-col justify-between overflow-y-auto"
        >
          {/* TOP UTILITY HEADER */}
          <div className="bg-[#0C1015] text-[#E8E8E8] py-3 sm:py-4 px-6 sm:px-12 flex items-center justify-between border-b border-[#2A2A2B] z-20 shrink-0">
            <div>
              <a
                href="mailto:Info@tanushfitness.com"
                className="font-mono text-xs sm:text-sm text-[#D0CFCA] hover:text-white underline tracking-wider"
              >
                Info@tanushfitness.com
              </a>
            </div>

            <div className="flex items-center gap-5 sm:gap-6">
              <a
                href="https://in.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#D0CFCA] hover:text-white transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#D0CFCA] hover:text-white transition"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#D0CFCA] hover:text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#D0CFCA] hover:text-white transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="ml-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* MAIN MENU BODY */}
          <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-6 sm:py-8 my-auto flex items-center overflow-hidden">
            <div className="space-y-3 sm:space-y-4 md:space-y-4.5 z-10 w-full max-w-3xl">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.num}
                  href={item.page === 'home' ? '/' : `#${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.page);
                  }}
                  className="group flex items-baseline gap-3 sm:gap-5 cursor-pointer select-none"
                >
                  <span className="font-mono text-xs sm:text-sm md:text-base text-[#D0CFCA] font-bold tracking-widest shrink-0">
                    {item.num}
                  </span>

                  <div className="relative flex-1">
                    <span className="font-satoshi text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase text-[#E8E8E8] group-hover:text-[#D0CFCA] group-hover:translate-x-2 transition-all duration-300 block leading-tight">
                      {item.title}
                    </span>
                    <div className="h-[1.5px] sm:h-[2px] bg-[#2A2A2B] w-full mt-1 group-hover:bg-[#E8E8E8] transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="py-4 sm:py-5 px-6 sm:px-12 z-20 shrink-0 bg-[#0C1015] border-t border-[#2A2A2B]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-5 sm:gap-6">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('home');
                  }}
                  className="bg-[#0F1926] text-[#E8E8E8] border border-[#2A2A2B] hover:border-[#D0CFCA] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full font-satoshi font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-xl transition-all duration-300 cursor-pointer"
                >
                  TANUSH FITNESS
                </a>

                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('about');
                  }}
                  className="text-[#D0CFCA] hover:text-white font-mono text-xs tracking-wider underline sm:no-underline hover:underline cursor-pointer"
                >
                  Terms & Conditions
                </a>
              </div>

              {/* Right Credits */}
              <div className="text-xs font-mono text-[#D0CFCA]">
                Made for <span className="font-bold text-[#E8E8E8]">Tanush Fitness Sanctuary</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
