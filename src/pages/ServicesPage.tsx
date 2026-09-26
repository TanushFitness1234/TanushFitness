import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_SERVICES } from '../data/services';
import { BusinessService } from '../types';
import { SEO } from '../components/common/SEO';
import {
  Briefcase,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarqueeStrip } from '../components/common/MarqueeStrip';

export const ServicesPage: React.FC = () => {
  const { submitServiceEnquiry, showToast } = useApp();

  const [selectedService, setSelectedService] = useState<BusinessService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    gymName: '',
    serviceRequired: '',
    mobile: '',
    email: '',
    additionalRequirements: '',
  });

  const handleOpenEnquiryModal = (service: BusinessService) => {
    setSelectedService(service);
    setFormState(prev => ({ ...prev, serviceRequired: service.name }));
    setIsModalOpen(true);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.mobile || !formState.gymName) {
      showToast('Please provide Name, Gym/Facility Name, and Mobile Number.', 'error');
      return;
    }

    submitServiceEnquiry({
      name: formState.name,
      gymName: formState.gymName,
      serviceRequired: formState.serviceRequired || selectedService?.name || 'GYM MANAGEMENT SERVICE',
      mobile: formState.mobile,
      email: formState.email,
      additionalRequirements: formState.additionalRequirements,
    });

    showToast('Consultation request received! Our Outfitting Director will connect with you.', 'success');

    setIsModalOpen(false);
    setSelectedService(null);
    setFormState({
      name: '',
      gymName: '',
      serviceRequired: '',
      mobile: '',
      email: '',
      additionalRequirements: '',
    });
  };

  return (
    <main className="pt-24 pb-20 bg-[#0F1926] min-h-screen text-[#E8E8E8]">
      <SEO
        title="Gym Architecture & Outfitting Services | Tanush Fitness"
        description="3D CAD space modeling, acoustic rubber flooring, digital access turnstiles, marketing launch funnels, and AMC facility maintenance."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2B] pb-8">
          <div className="space-y-3">
            <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.04em] leading-snug">
              GYM MANAGEMENT OUTFITTING
            </h1>

            <p className="text-sm sm:text-base text-[#D0CFCA] max-w-2xl font-sans leading-relaxed">
              From raw commercial square footage to fully commissioned athletic destinations. 3D CAD blueprints, high-density acoustic flooring, turnstiles, and automated operational management.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917383249680"
              className="btn-primary flex items-center gap-2 text-xs py-3 px-6 shadow-lg cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F1926]" />
              <span>Book Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeStrip theme="white" speed="slow" />

      {/* Services Grid (3 PER ROW MATCHING MANPOWER & EQUIPMENT) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BUSINESS_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1926]">
                  <img
                    src={service.image}
                    alt={service.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1926]/60 via-transparent to-transparent" />

                  {/* Impact Tag in Bottom Right */}
                  {service.badge && (
                    <div className="absolute bottom-3 right-3 bg-[#0F1926] px-2.5 py-1 rounded-md text-[9px] font-mono text-[#E8E8E8] font-bold border border-white/15">
                      ⚡ {service.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-[#2A2A2B] uppercase tracking-wider font-bold">
                      {service.category || 'COMMERCIAL & RESIDENTIAL SETUP'}
                    </div>
                    <h3 className="font-satoshi text-base sm:text-lg font-bold uppercase text-[#0F1926] tracking-[0.03em] mt-1 group-hover:text-[#2A2A2B] transition leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#2A2A2B]/80 font-sans leading-relaxed mt-2 line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Key Scope & Deliverables */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-[#0F1926]/10">
                      <div className="text-[11px] font-sans text-[#0F1926] uppercase tracking-wider font-extrabold">
                        Key Deliverables:
                      </div>
                      <ul className="space-y-1.5 text-xs font-sans text-[#2A2A2B]/80">
                        {service.benefits.slice(0, 3).map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1926] shrink-0 mt-0.5" />
                            <span className="leading-snug text-[11px]">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5 border-t border-[#0F1926]/10 mt-3">
                <button
                  type="button"
                  onClick={() => handleOpenEnquiryModal(service)}
                  className="btn-dark flex-1 w-full py-2.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Request Proposal</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Enquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0C1015]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#0F1926]/15 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#2A2A2B] uppercase tracking-widest block mb-1 font-bold">
                    GYM MANAGEMENT PROPOSAL
                  </span>
                  <h3 className="font-satoshi text-2xl font-bold text-[#0F1926] uppercase">
                    {selectedService?.name || 'GYM MANAGEMENT Commercial Consultation'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-[#0F1926]/10 hover:bg-[#0F1926]/20 text-[#0F1926] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sameer Kapoor"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Gym / Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Iron Sanctuary Club"
                    value={formState.gymName}
                    onChange={e => setFormState({ ...formState, gymName: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Mobile Hotline</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.mobile}
                      onChange={e => setFormState({ ...formState, mobile: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Work Email</label>
                    <input
                      type="email"
                      placeholder="sameer@ironclub.in"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Specific Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your square footage, location, floor acoustic needs..."
                    value={formState.additionalRequirements}
                    onChange={e => setFormState({ ...formState, additionalRequirements: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl p-3 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-dark w-full py-3 text-xs uppercase tracking-wider mt-2 cursor-pointer shadow-lg"
                >
                  Submit Proposal Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
