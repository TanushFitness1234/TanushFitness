import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Dumbbell, PhoneCall, FileDown } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-[#1A2018] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#090C10] border border-white/10 p-8 sm:p-12 text-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1A2018] border border-white/10 text-[#A8A090] font-mono text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8A090]" />
                <span>FACTORY DIRECT COMMERCIAL & RESIDENTIAL PROCUREMENT</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold font-satoshi uppercase tracking-[0.03em] leading-snug">
                Ready to Outfit Your Commercial Facility?
              </h2>

              <p className="text-xs sm:text-sm text-[#A8A090] max-w-2xl font-normal leading-relaxed">
                Connect directly with factory engineers. Receive 100% itemized GST quotations, 3D floor plan CAD layouts, and nationwide delivery timelines within 24 hours.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#A8A090]">
                <span>📞 Hotline: <a href="tel:+917383249680" className="text-white font-bold hover:underline transition-colors">+91 73832 49680</a></span>
                <span>•</span>
                <span>📧 <a href="mailto:Info@tanushfitness.com" className="text-white hover:underline transition-colors">Info@tanushfitness.com</a></span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 font-mono">
              <a
                href="#equipment"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('equipment');
                }}
                className="w-full py-3 px-5 rounded-lg bg-[#E8E8E8] hover:bg-[#D0CFCA] text-[#0F1926] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer text-center"
              >
                <Dumbbell className="w-3.5 h-3.5 text-[#0F1926]" />
                <span>Build Project RFQ</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F1926]" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('contact');
                }}
                className="w-full py-3 px-5 rounded-lg bg-[#1A2018] hover:bg-[#1A2018] text-[#D8CDC0] border border-white/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-white/80" />
                <span>Schedule Consultation</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
