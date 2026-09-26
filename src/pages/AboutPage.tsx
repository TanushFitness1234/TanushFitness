import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Target, Eye, Award, Building2, Users, ArrowRight, CheckCircle2, Sparkles, Phone, Compass, Cpu, Wrench, Briefcase, Layers, FileDown } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { MarqueeStrip } from '../components/common/MarqueeStrip';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'what' | 'why'>('what');

  return (
    <main className="pt-24 pb-20 bg-[#0F1926] min-h-screen text-[#E8E8E8]">
      <SEO
        title="The Tanush Legacy & Precision Biomechanics | Tanush Fitness"
        description="Engineering high-performance athletic sanctuaries. Heavy laser cut structural steel, precision manufacturing, and nationwide commercial & residential outfitting."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2B] pb-8">
          <div className="space-y-3">
            <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.04em] leading-snug">
              THE TANUSH LEGACY
            </h1>

            <p className="text-sm sm:text-base text-[#D0CFCA] max-w-2xl font-sans leading-relaxed">
              We design and manufacture commercial & residential fitness environments where precision biomechanics, heavy structural steel, and architectural luxury converge.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/downloads/Tanush Fitness Premium B2B Fitness Blueprint (1).pdf"
              download="Tanush_Fitness_Premium_B2B_Fitness_Blueprint.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-xs py-3 px-5 cursor-pointer shadow-lg font-mono font-bold uppercase tracking-wider"
            >
              <FileDown className="w-4 h-4 text-[#0F1926]" />
              <span>Download Deck</span>
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('services');
              }}
              className="bg-[#0C1015] border border-[#2A2A2B] hover:border-[#E8E8E8] text-[#E8E8E8] flex items-center gap-2 text-xs py-3 px-5 rounded-full cursor-pointer shadow-md transition font-mono uppercase tracking-wider"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D0CFCA]" />
              <span>Management Solutions</span>
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeStrip theme="white" speed="slow" />

      {/* Editorial Story & Vision Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Interactive What is Tanush vs Why Tanush Section */}
        <div className="bg-[#0C1015] border border-[#2A2A2B] rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-[#2A2A2B] pb-6">
            <div className="space-y-1">
              <h2 className="font-satoshi text-xl sm:text-2xl font-extrabold text-[#E8E8E8] uppercase tracking-[0.03em] leading-snug">
                {activeTab === 'what' ? 'What is Tanush Fitness?' : 'Why Choose Tanush Fitness?'}
              </h2>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0F1926] border border-[#2A2A2B]">
              <button
                type="button"
                onClick={() => setActiveTab('what')}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                  activeTab === 'what'
                    ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                    : 'text-[#D0CFCA] hover:text-[#E8E8E8]'
                }`}
              >
                What is Tanush?
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('why')}
                className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                  activeTab === 'why'
                    ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                    : 'text-[#D0CFCA] hover:text-[#E8E8E8]'
                }`}
              >
                Why Tanush?
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              {activeTab === 'what' ? (
                <div className="space-y-4 text-[#D0CFCA] font-sans leading-relaxed text-sm sm:text-base">
                  <p>
                    Introducing India's premier commercial & residential fitness sanctuary & outfitting brand: <span className="text-[#E8E8E8] font-bold">Tanush Fitness</span>, where precision biomechanical engineering and commercial strength take center stage.
                  </p>
                  <p>
                    At Tanush, we redefine the fitness outfitting landscape with state-of-the-art heavy laser-cut equipment, certified trainer placements, and bespoke 3D CAD facility design.
                  </p>
                  <p>
                    Our commitment goes beyond machinery; we offer a holistic <span className="text-[#E8E8E8] font-semibold">360-degree comprehensive solution</span> to transform empty commercial square footage into world-class athletic destinations.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-[#D0CFCA] font-sans leading-relaxed text-sm sm:text-base">
                  <p>
                    As a testament to unwavering commitment to quality and athletic excellence, <span className="text-[#E8E8E8] font-bold">Tanush Fitness</span> redefines the B2B procurement experience.
                  </p>
                  <p>
                    With direct-from-factory pricing, 100% GST 18% Input Tax Credit invoicing, zero middleman markups, and dedicated master coach recruitment, Tanush is the trusted infrastructure partner for over 500+ commercial clubs nationwide.
                  </p>
                  <div className="p-5 rounded-xl bg-[#0F1926] border-l-4 border-[#E8E8E8] font-sans text-sm text-[#E8E8E8] italic shadow-lg">
                    "Tanush Fitness is not merely an equipment vendor; it is an end-to-end commercial infrastructure partner built for gym owners who demand perfection."
                  </div>
                </div>
              )}

              {/* 4-Stat Metric Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs text-[#D0CFCA] border-t border-[#2A2A2B]">
                <div className="p-3 rounded-xl bg-[#0F1926]/80 border border-[#2A2A2B]">
                  <span className="text-[#E8E8E8] font-extrabold block text-2xl font-satoshi">500+</span>
                  <span className="text-[#D0CFCA] text-[10px] uppercase">Clubs Outfitted</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F1926]/80 border border-[#2A2A2B]">
                  <span className="text-[#E8E8E8] font-extrabold block text-2xl font-satoshi">HEAVY STEEL</span>
                  <span className="text-[#D0CFCA] text-[10px] uppercase">Laser Cut Precision</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0F1926]/80 border border-[#2A2A2B]">
                  <span className="text-[#E8E8E8] font-extrabold block text-2xl font-satoshi">18% ITC</span>
                  <span className="text-[#D0CFCA] text-[10px] uppercase">GST Invoices</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#2A2A2B] h-72 sm:h-96 shadow-2xl">
                <img
                  src={
                    activeTab === 'what'
                      ? 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'
                      : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
                  }
                  alt="Tanush Fitness Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1015] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / USPs (#E8E8E8 Off-White Light Card Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-4 group shadow-2xl hover:-translate-y-1.5 transition-all duration-300 hover:border-[#0F1926]">
            <div className="w-12 h-12 rounded-xl bg-[#0F1926]/10 border border-[#0F1926]/15 flex items-center justify-center text-[#0F1926] group-hover:text-[#0F1926] transition-colors">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-satoshi text-xl font-bold text-[#0F1926] uppercase">Direct Factory Supply</h3>
            <p className="text-[#2A2A2B] text-xs sm:text-sm leading-relaxed font-sans">
              Eliminate third-party trading markups. Receive 18% GST Input Tax Credit compliant direct manufacturer invoicing with 10-year structural frame guarantees.
            </p>
          </div>

          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-4 group shadow-2xl hover:-translate-y-1.5 transition-all duration-300 hover:border-[#0F1926]">
            <div className="w-12 h-12 rounded-xl bg-[#0F1926]/10 border border-[#0F1926]/15 flex items-center justify-center text-[#0F1926] group-hover:text-[#0F1926] transition-colors">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-satoshi text-xl font-bold text-[#0F1926] uppercase">3D CAD Facility Modeling</h3>
            <p className="text-[#2A2A2B] text-xs sm:text-sm leading-relaxed font-sans">
              Full architectural spatial planning, acoustic rubber isolation, and RFID turnstile integration customized to your commercial floor plan.
            </p>
          </div>

          <div className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl p-8 space-y-4 group shadow-2xl hover:-translate-y-1.5 transition-all duration-300 hover:border-[#0F1926]">
            <div className="w-12 h-12 rounded-xl bg-[#0F1926]/10 border border-[#0F1926]/15 flex items-center justify-center text-[#0F1926] group-hover:text-[#0F1926] transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-satoshi text-xl font-bold text-[#0F1926] uppercase">Certified Master Staffing</h3>
            <p className="text-[#2A2A2B] text-xs sm:text-sm leading-relaxed font-sans">
              Recruit credentialed NASM, CSCS, ACE, and K11 fitness directors and personal training talent through verified recruitment funnels.
            </p>
          </div>
        </div>


        {/* CTA Bar */}
        <div className="bg-[#0C1015] border border-[#2A2A2B] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="font-satoshi text-2xl sm:text-3xl font-extrabold text-[#E8E8E8] uppercase">
              Ready to Outfit Your Commercial Sanctuary?
            </h3>
            <p className="text-[#D0CFCA] text-sm font-sans max-w-xl">
              Connect with our Executive Engineering Team for official project RFQ quotes and spatial CAD modeling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/downloads/Tanush Fitness Premium B2B Fitness Blueprint (1).pdf"
              download="Tanush_Fitness_Premium_B2B_Fitness_Blueprint.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#0F1926] border border-[#2A2A2B] hover:border-[#E8E8E8] text-[#E8E8E8] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <FileDown className="w-3.5 h-3.5 text-[#E8E8E8]" />
              <span>Download Deck</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
              className="btn-primary shrink-0 px-8 py-3.5 text-xs uppercase tracking-wider cursor-pointer shadow-lg inline-block text-center"
            >
              Connect With Factory Desk
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
