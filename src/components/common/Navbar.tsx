import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';
import {
  Menu,
  X,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  User,
  ArrowUpRight,
  ChevronDown,
  LogOut,
  Building2,
  Briefcase,
  Layers,
  Calendar,
  Settings,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TanushLogo } from './TanushLogo';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    openAuthModal,
    currentUser,
    logoutUser,
    isAdminAuthenticated,
    enquiryCart,
    setIsEnquiryCartOpen,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    if (isMenuOpen || isProfileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isProfileModalOpen]);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Overview', page: 'home' },
    { label: 'Equipment Sanctuary', page: 'equipment' },
    { label: 'Gym Management', page: 'services' },
    { label: 'Manpower Services', page: 'manpower' },
    { label: 'About', page: 'about' },
  ];

  const handleNav = (page: PageType) => {
    navigateTo(page);
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsProfileModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGymOwner = currentUser?.role === 'GYM_OWNER';
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Member';
  const userInitials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'TU';

  return (
    <>
      {/* Floating Bottom Navigation Dock (Vault Style) */}
      <header className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4 pointer-events-auto relative">
            {/* 1. Left: Brand Logo in Elevated Capsule Box */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#E8E8E8]/40 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-2xl transition-all group shrink-0"
            >
              <TanushLogo
                variant="white"
                height={42}
                className="h-8 sm:h-10 w-auto group-hover:opacity-95 transition-opacity drop-shadow-md"
              />
            </a>

            {/* 2. Center: Floating Pill Nav Bar (Desktop Only) */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center gap-1 bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] p-1.5 rounded-full shadow-2xl">
                {navLinks.map((item) => {
                  const isActive = currentPage === item.page;
                  const href = item.page === 'home' ? '/' : `#${item.page}`;
                  return (
                    <a
                      key={item.label}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(item.page);
                      }}
                      className={`px-3.5 sm:px-5 py-2 rounded-full font-montserrat text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap ${
                        isActive
                          ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                          : 'text-[#D0CFCA] hover:text-[#E8E8E8] hover:bg-[#2A2A2B]/40'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* 3. Right: User Account Action & Mobile/Tablet Menu Button */}
            <div ref={dropdownRef} className="flex items-center gap-2 sm:gap-2.5 shrink-0 relative">
              {/* Logged-In User Profile Button (Desktop & Mobile) */}
              {currentUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="px-3 sm:px-4 py-2 rounded-full bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#E8E8E8]/40 text-[#E8E8E8] flex items-center gap-2 transition cursor-pointer shadow-2xl group select-none"
                    title={`Logged in as ${currentUser.name}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
                    <User className="w-3.5 h-3.5 text-[#D0CFCA]" />
                    <span className="font-montserrat text-xs font-bold uppercase tracking-wider max-w-[100px] sm:max-w-[130px] truncate">
                      {firstName}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#D0CFCA] transition-transform duration-200 ${
                        isProfileDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Desktop / Tablet Profile Dropdown Popover */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-14 right-0 w-72 bg-[#E8E8E8] rounded-2xl shadow-2xl border border-[#2A2A2B]/20 p-4 text-[#0F1926] font-mono z-50 overflow-hidden"
                      >
                        {/* Dropdown Header */}
                        <div className="pb-3 border-b border-[#0F1926]/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0F1926] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                              {userInitials}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-sm text-[#0F1926] truncate font-satoshi">
                                {currentUser.name}
                              </div>
                              <div className="text-[10px] text-[#2A2A2B]/80 truncate">
                                {currentUser.email}
                              </div>
                              <div className="inline-block mt-0.5 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#0F1926]/10 text-[#0F1926]">
                                {isGymOwner ? '🏢 Gym Owner' : '👤 Job Seeker'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Options */}
                        <div className="py-2 space-y-1 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              setIsProfileModalOpen(true);
                            }}
                            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#0F1926]/10 text-[#0F1926] text-left font-bold transition cursor-pointer"
                          >
                            <User className="w-4 h-4 text-[#0F1926]" />
                            <span>{isGymOwner ? 'Business Profile' : 'My Profile'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              handleNav(isGymOwner ? 'equipment' : 'manpower');
                            }}
                            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#0F1926]/10 text-[#0F1926] text-left font-bold transition cursor-pointer"
                          >
                            {isGymOwner ? (
                              <>
                                <Layers className="w-4 h-4 text-[#0F1926]" />
                                <span>Equipment RFQs & Catalog</span>
                              </>
                            ) : (
                              <>
                                <Briefcase className="w-4 h-4 text-[#0F1926]" />
                                <span>Trainer Applications Desk</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              handleNav('contact');
                            }}
                            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#0F1926]/10 text-[#0F1926] text-left font-bold transition cursor-pointer"
                          >
                            <Settings className="w-4 h-4 text-[#0F1926]" />
                            <span>Settings & Direct Desk</span>
                          </button>

                          {(isAdminAuthenticated || currentUser?.role === 'ADMIN') && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsProfileDropdownOpen(false);
                                handleNav('admin');
                              }}
                              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#0F1926] text-left font-bold transition cursor-pointer border border-amber-500/30"
                            >
                              <ShieldCheck className="w-4 h-4 text-amber-700" />
                              <span>Admin Console</span>
                            </button>
                          )}
                        </div>

                        {/* Dropdown Footer: Logout */}
                        <div className="pt-2 border-t border-[#0F1926]/10">
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              logoutUser();
                            }}
                            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* User Account Login Button (When Not Logged In) */
                <button
                  type="button"
                  onClick={() => openAuthModal()}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#E8E8E8]/40 text-[#D0CFCA] hover:text-[#E8E8E8] flex items-center justify-center transition cursor-pointer shadow-2xl"
                  title="Account Login / Register"
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* Hamburger Menu Button (Mobile & Tablet) */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0C1015]/95 backdrop-blur-md border border-[#2A2A2B] hover:border-[#E8E8E8]/40 text-[#E8E8E8] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-2xl group"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8E8E8] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 📱 4. Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#0C1015]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 overflow-y-auto pointer-events-auto"
          >
            {/* Top Bar: Brand Logo & Close Button */}
            <div className="flex items-center justify-between border-b border-[#2A2A2B] pb-5 shrink-0">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('home');
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <TanushLogo variant="white" height={40} className="h-9 sm:h-10 w-auto" />
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-[#2A2A2B] hover:bg-[#0F1926] text-[#E8E8E8] flex items-center justify-center transition cursor-pointer border border-white/10 shadow-lg"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 sm:py-8 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-center max-w-xl w-full mx-auto">
              {navLinks.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <a
                    key={item.label}
                    href={item.page === 'home' ? '/' : `#${item.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.page);
                    }}
                    className={`w-full group flex items-center justify-between py-3.5 px-5 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#E8E8E8] text-[#0F1926] shadow-xl'
                        : 'bg-[#0F1926]/70 border border-[#2A2A2B] text-[#D0CFCA] hover:text-[#E8E8E8] hover:border-[#E8E8E8]/30 hover:bg-[#15202E]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? 'text-[#0F1926]/70 font-bold' : 'text-[#D0CFCA]/70'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className="font-montserrat text-sm sm:text-base font-bold uppercase tracking-wider"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                        isActive
                          ? 'bg-[#0F1926] text-[#E8E8E8]'
                          : 'bg-[#2A2A2B] text-[#D0CFCA] group-hover:text-[#E8E8E8] group-hover:bg-[#0F1926]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* User Profile & Quick Actions Footer */}
            <div className="space-y-4 pt-4 border-t border-[#2A2A2B] shrink-0 max-w-xl w-full mx-auto">
              {currentUser ? (
                /* Logged In User Card on Mobile */
                <div className="p-4 rounded-2xl bg-[#0F1926] border border-[#2A2A2B] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8E8E8] text-[#0F1926] flex items-center justify-center font-bold text-sm">
                        {userInitials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#E8E8E8] font-satoshi">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-[#D0CFCA]/70 font-mono truncate max-w-[180px]">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {isGymOwner ? 'GYM OWNER' : 'JOB SEEKER'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#2A2A2B] hover:bg-[#E8E8E8] text-[#E8E8E8] hover:text-[#0F1926] font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        logoutUser();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {(isAdminAuthenticated || currentUser?.role === 'ADMIN') && (
                    <a
                      href="#admin"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        handleNav('admin');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>🛡️ Executive Admin Console</span>
                    </a>
                  )}
                </div>
              ) : (
                /* Not Logged In - Quick Login Button */
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav('contact');
                    }}
                    className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl text-center"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openAuthModal();
                    }}
                    className="btn-dark w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    <span>Account Login / Register</span>
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#D0CFCA]/80 pt-2 text-center sm:text-left">
                <span>100% COMMERCIAL GST INVOICING (18% ITC) • COMMERCIAL GRADE</span>
                <a href="tel:+917383249680" className="text-[#E8E8E8] hover:underline font-bold">
                  Direct Desk: +91 73832 49680
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👤 5. Full Interactive User Profile & Account Modal */}
      <AnimatePresence>
        {isProfileModalOpen && currentUser && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-[#0C1015]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-mono overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              data-lenis-prevent
              className="bg-[#E8E8E8] rounded-2xl max-w-md w-full p-5 sm:p-8 shadow-2xl border border-[#2A2A2B]/20 relative my-auto max-h-[90vh] flex flex-col text-[#0F1926] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0F1926]/10 shrink-0">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F1926]/10 text-[#0F1926] text-[10px] font-bold uppercase tracking-wider mb-2 border border-[#0F1926]/15">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>AUTHENTICATED MEMBER</span>
                  </div>
                  <h2 className="text-xl font-black text-[#0F1926] font-satoshi uppercase tracking-[0.03em] leading-snug">
                    {isGymOwner ? 'Gym Owner Profile' : 'Trainer Profile'}
                  </h2>
                  <p className="text-xs text-[#2A2A2B]/80 mt-0.5 font-normal leading-relaxed">
                    Tanush Fitness B2B Commercial Network
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#0F1926] text-[#E8E8E8] hover:bg-[#2A2A2B] hover:scale-105 flex items-center justify-center transition-all cursor-pointer shadow-lg shrink-0"
                  title="Close modal"
                  aria-label="Close Profile Modal"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Profile Body */}
              <div
                data-lenis-prevent
                className="overflow-y-auto overscroll-contain modal-scrollbar pr-1 pt-4 pb-2 flex-1 space-y-4 text-xs"
              >
                {/* User Identity Card */}
                <div className="p-4 rounded-xl bg-white border border-[#0F1926]/15 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F1926] text-white flex items-center justify-center font-bold text-base shadow-md shrink-0">
                    {userInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#0F1926] truncate font-satoshi">
                        {currentUser.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        ACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-[#2A2A2B] font-mono mt-0.5 truncate">
                      {currentUser.email}
                    </div>
                    <div className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0F1926]/10 text-[#0F1926]">
                      {isGymOwner ? '🏢 Gym Owner / Enterprise Buyer' : '👤 Certified Trainer / Job Seeker'}
                    </div>
                  </div>
                </div>

                {/* Profile Details List */}
                <div className="space-y-2.5 bg-white/70 p-4 rounded-xl border border-[#0F1926]/10">
                  <div className="flex items-center justify-between py-1 border-b border-[#0F1926]/5">
                    <span className="text-[#2A2A2B] text-[11px] flex items-center gap-1.5 font-bold uppercase">
                      <Phone className="w-3.5 h-3.5 text-[#0F1926]" /> Mobile Line
                    </span>
                    <span className="font-bold text-[#0F1926]">{currentUser.mobile || '+91 98112 34567'}</span>
                  </div>

                  {isGymOwner && (
                    <>
                      <div className="flex items-center justify-between py-1 border-b border-[#0F1926]/5">
                        <span className="text-[#2A2A2B] text-[11px] flex items-center gap-1.5 font-bold uppercase">
                          <Building2 className="w-3.5 h-3.5 text-[#0F1926]" /> Facility / Club
                        </span>
                        <span className="font-bold text-[#0F1926] truncate max-w-[190px]">
                          {currentUser.companyName || 'Tanush Partner Gym'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-[#0F1926]/5">
                        <span className="text-[#2A2A2B] text-[11px] flex items-center gap-1.5 font-bold uppercase">
                          <FileText className="w-3.5 h-3.5 text-[#0F1926]" /> 18% GST Invoicing
                        </span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {currentUser.gstNumber || 'ITC Eligible'}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between py-1 border-b border-[#0F1926]/5">
                    <span className="text-[#2A2A2B] text-[11px] flex items-center gap-1.5 font-bold uppercase">
                      <Calendar className="w-3.5 h-3.5 text-[#0F1926]" /> Member Since
                    </span>
                    <span className="font-bold text-[#0F1926]">{currentUser.createdAt || '2026'}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#2A2A2B] text-[11px] flex items-center gap-1.5 font-bold uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0F1926]" /> Account Status
                    </span>
                    <span className="font-bold text-emerald-700 uppercase">
                      {currentUser.status || 'ACTIVE'}
                    </span>
                  </div>
                </div>

                {/* Shortcuts */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-[#2A2A2B] uppercase block">
                    Quick Shortcuts
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleNav('equipment')}
                      className="p-3 rounded-xl bg-white hover:bg-[#0F1926] text-[#0F1926] hover:text-white border border-[#0F1926]/15 text-left transition-all cursor-pointer group shadow-sm"
                    >
                      <Layers className="w-4 h-4 mb-1.5 text-current" />
                      <div className="font-bold text-[11px] uppercase">Equipment Sanctuary</div>
                      <div className="text-[9px] text-[#2A2A2B] group-hover:text-[#D0CFCA]">
                        Browse Catalog & RFQs
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNav('manpower')}
                      className="p-3 rounded-xl bg-white hover:bg-[#0F1926] text-[#0F1926] hover:text-white border border-[#0F1926]/15 text-left transition-all cursor-pointer group shadow-sm"
                    >
                      <Briefcase className="w-4 h-4 mb-1.5 text-current" />
                      <div className="font-bold text-[11px] uppercase">Manpower Portal</div>
                      <div className="text-[9px] text-[#2A2A2B] group-hover:text-[#D0CFCA]">
                        Hiring & Careers
                      </div>
                    </button>
                  </div>
                </div>

                {/* Sign Out Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileModalOpen(false);
                      logoutUser();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

