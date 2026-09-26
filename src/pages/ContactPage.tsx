import React from 'react';
import { SEO } from '../components/common/SEO';
import { VaultContactFormSection } from '../components/home/VaultContactFormSection';
import { Phone, Mail, MessageSquare, ShieldCheck, MapPin, FileDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#0F1926] text-[#E8E8E8] overflow-hidden pt-8 pb-0">
      <SEO
        title="VIP Commercial & Residential Outfitting Desk | Tanush Fitness"
        description="Direct manufacturer consultation, 3D CAD space proposals, wholesale machinery quotations, and flagship showroom visits."
      />

      {/* Quick Direct Channels Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#2A2A2B] pb-8">
          <div className="space-y-2">
            <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.04em] leading-snug">
              OUTFITTING DESK
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/downloads/Tanush Fitness Premium B2B Fitness Blueprint (1).pdf"
              download="Tanush_Fitness_Premium_B2B_Fitness_Blueprint.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E8E8E8] hover:bg-white text-[#0F1926] px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-lg"
            >
              <FileDown className="w-3.5 h-3.5 text-[#0F1926]" />
              <span>Download Deck</span>
            </a>

            <a
              href="https://wa.me/917383249680?text=Hello%20Tanush%20Fitness,%20I%20want%20a%20commercial%20outfitting%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0C1015] border border-[#2A2A2B] hover:border-[#D0CFCA] text-[#E8E8E8] px-5 py-2.5 rounded-full font-satoshi text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E8E8E8]" />
              <span>WhatsApp Factory Desk</span>
            </a>

            <a
              href="tel:+917383249680"
              className="btn-primary text-xs flex items-center gap-2 py-2.5 px-6 cursor-pointer shadow-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F1926]" />
              <span>+91 73832 49680</span>
            </a>
          </div>
        </div>
      </section>

      {/* Vault-Style Split Screen Form */}
      <VaultContactFormSection />

      {/* Showroom & Logistics Hubs (#E8E8E8 LIGHT CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#2A2A2B]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-3 group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#0F1926] font-mono text-xs uppercase tracking-wider font-bold">
              <MapPin className="w-4 h-4" />
              <span>Corporate Office</span>
            </div>
            <h3 className="font-satoshi text-lg font-bold text-[#0F1926] uppercase">
              Headquarters & Logistics
            </h3>
            <p className="font-sans text-xs text-[#2A2A2B]/80 leading-relaxed">
              Naroda, Ahmedabad, Gujarat
            </p>
          </div>

          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-3 group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#0F1926] font-mono text-xs uppercase tracking-wider font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Support</span>
            </div>
            <h3 className="font-satoshi text-lg font-bold text-[#0F1926] uppercase">
              Commercial Consultation
            </h3>
            <p className="font-sans text-xs text-[#2A2A2B]/80 leading-relaxed">
              +91 73832 49680 • Mon-Sat 9:00 AM - 8:00 PM
            </p>
          </div>

          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-3 group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#0F1926] font-mono text-xs uppercase tracking-wider font-bold">
              <Mail className="w-4 h-4" />
              <span>Official Desk</span>
            </div>
            <h3 className="font-satoshi text-lg font-bold text-[#0F1926] uppercase">
              Invoicing & GST Directorate
            </h3>
            <p className="font-sans text-xs text-[#2A2A2B]/80 leading-relaxed">
              Info@tanushfitness.com • 18% GST ITC Compliant Invoices
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};
