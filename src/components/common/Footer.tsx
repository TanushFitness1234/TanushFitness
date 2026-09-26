import React from 'react';
import { useApp } from '../../context/AppContext';
import { TanushLogo } from './TanushLogo';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, ArrowRight, ArrowUpRight, Lock, ArrowUp, FileDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, isAdminAuthenticated, currentUser } = useApp();
  const [secretClicks, setSecretClicks] = React.useState(0);
  const clickTimerRef = React.useRef<any>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretDeveloperTrigger = () => {
    setSecretClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 3) {
        navigateTo('admin');
        scrollToTop();
        return 0;
      }
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => setSecretClicks(0), 1800);
      return updated;
    });
  };

  const isAuthorizedAdmin = isAdminAuthenticated || currentUser?.role === 'ADMIN';

  return (
    <footer className="bg-[#0C1015] text-[#E8E8E8] border-t border-[#2A2A2B] relative overflow-hidden">
      {/* 🌟 1. RAPID DISPATCH BANNER */}
      <div className="bg-[#0F1926] border-b border-[#2A2A2B] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-satoshi text-xl sm:text-2xl font-extrabold text-[#E8E8E8] uppercase tracking-[0.03em] leading-snug">
              READY TO OUTFIT YOUR ATHLETIC DESTINATION?
            </h3>
            <p className="text-xs text-[#D0CFCA] font-sans max-w-xl">
              Connect directly with our Chief Biomechanics Engineers for 3D CAD space layouts, machinery custom frame finishes, and wholesale pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/downloads/Tanush Fitness Premium B2B Fitness Blueprint (1).pdf"
              download="Tanush_Fitness_Premium_B2B_Fitness_Blueprint.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#0C1015] border border-[#2A2A2B] hover:border-[#D0CFCA] text-[#E8E8E8] text-xs font-mono font-bold uppercase tracking-wider transition hover:bg-[#2A2A2B]/40 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileDown className="w-3.5 h-3.5 text-[#D0CFCA]" />
              <span>Download Deck</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
                scrollToTop();
              }}
              className="btn-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer shadow-lg font-mono font-bold uppercase tracking-wider"
            >
              <span>Book VIP Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:+917383249680"
              className="px-5 py-3 rounded-full border border-[#2A2A2B] hover:border-[#D0CFCA] text-[#E8E8E8] text-xs font-mono uppercase tracking-wider transition hover:bg-[#2A2A2B]/40 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D0CFCA]" />
              <span>+91 73832 49680</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🧭 2. STRUCTURED 4-COLUMN SITEMAP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Sanctuary Vision */}
          <div className="space-y-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
                scrollToTop();
              }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <TanushLogo variant="full-white" height={56} className="h-12 sm:h-14 w-auto group-hover:opacity-90 transition-opacity" />
            </a>

            <p className="text-xs text-[#D0CFCA] leading-relaxed font-sans">
              India's premier direct-manufacturer commercial fitness destination & outfitting brand. Elevating physical performance through heavy structural steel engineering and custom 360° gym architecture.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#D0CFCA] pt-2">
              <span className="flex items-center gap-1.5 text-[#E8E8E8] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#D0CFCA]" /> Commercial Grade
              </span>
              <span className="text-[#2A2A2B]">•</span>
              <span className="text-[#D0CFCA]">18% GST ITC Compliant</span>
            </div>
          </div>

          {/* Col 2: Solutions Navigation */}
          <div className="space-y-4 font-sans text-sm">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8E8E8]">
              Core Infrastructure
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D0CFCA]">
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => { e.preventDefault(); navigateTo('equipment'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Heavy Commercial Strength Machines</span>
                </a>
              </li>
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => { e.preventDefault(); navigateTo('equipment'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Pin-Loaded Selectorized Stations</span>
                </a>
              </li>
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => { e.preventDefault(); navigateTo('equipment'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Plate-Loaded Iso-Lateral Units</span>
                </a>
              </li>
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => { e.preventDefault(); navigateTo('equipment'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Custom Racks & Functional Cages</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); navigateTo('services'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>High-Density Acoustic Rubber Flooring</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Staffing */}
          <div className="space-y-4 font-sans text-sm">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8E8E8]">
              Management & Staffing
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D0CFCA]">
              <li>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); navigateTo('services'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer inline-block"
                >
                  3D CAD Floorplan & Space Modeling
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); navigateTo('services'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer inline-block"
                >
                  RFID Digital Turnstiles & Access Control
                </a>
              </li>
              <li>
                <a
                  href="#manpower"
                  onClick={(e) => { e.preventDefault(); navigateTo('manpower'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer inline-block"
                >
                  7-Division Certified Master Staffing
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); navigateTo('about'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer inline-block"
                >
                  Corporate Wellness & Hotel Blueprints
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navigateTo('contact'); scrollToTop(); }}
                  className="hover:text-[#E8E8E8] transition-colors text-left cursor-pointer inline-block"
                >
                  Annual Maintenance Contracts (AMC)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Headquarters & Manufacturing Coordinates */}
          <div className="space-y-4 font-sans text-sm">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E8E8E8]">
              Coordinates & Logistics
            </h4>
            <div className="space-y-3 text-[#D0CFCA] text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D0CFCA] shrink-0 mt-0.5" />
                <span>Naroda, Ahmedabad, Gujarat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D0CFCA] shrink-0" />
                <a href="tel:+917383249680" className="hover:text-[#E8E8E8] transition font-mono text-[#E8E8E8]">
                  +91 73832 49680
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D0CFCA] shrink-0" />
                <a href="mailto:Info@tanushfitness.com" className="hover:text-[#E8E8E8] transition font-mono text-[#E8E8E8]">
                  Info@tanushfitness.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 🏢 3. BOTTOM UTILITY BAR */}
        <div className="pt-8 border-t border-[#2A2A2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D0CFCA]">
          <div
            onClick={handleSecretDeveloperTrigger}
            className="flex items-center gap-4 text-center sm:text-left cursor-default select-none group"
            title="Tanush Precision Engineering"
          >
            <span>© 2026 Tanush Fitness Commercial Infrastructure Pvt Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5">
            {isAuthorizedAdmin && (
              <>
                <a
                  href="#admin"
                  onClick={(e) => { e.preventDefault(); navigateTo('admin'); scrollToTop(); }}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin Console</span>
                </a>
                <span className="text-[#2A2A2B]">•</span>
              </>
            )}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); navigateTo('contact'); scrollToTop(); }}
              className="hover:text-[#E8E8E8] transition-colors cursor-pointer"
            >
              Outfitting Desk
            </a>
            <span className="text-[#2A2A2B]">•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-[#2A2A2B] hover:bg-[#0F1926] hover:text-white transition text-[#E8E8E8] cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
