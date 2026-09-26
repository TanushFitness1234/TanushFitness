import React from 'react';
import { PARTNER_LOGOS } from '../../data/partnerLogos';
import { motion } from 'framer-motion';

export const BrandStrip: React.FC = () => {
  return (
    <section className="py-14 bg-[#F0EBE3]/10 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-black uppercase tracking-widest text-[#6B6358] mb-8 font-mono">
          Trusted By Premier Commercial & Residential Gym Chains & Athletic Clubs Worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {PARTNER_LOGOS.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-4 rounded-none bg-[#1A2018] border border-white/10 shadow-sm hover:border-white/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div
                dangerouslySetInnerHTML={{ __html: partner.symbolSvg.replace(/text-zinc-400/g, 'text-white/40 group-hover:text-white') }}
                className="mb-2"
              />
              <span className="text-xs font-black text-white/70 group-hover:text-white tracking-wider font-satoshi uppercase">
                {partner.name}
              </span>
              <span className="text-[10px] text-[#6B6358] line-clamp-1 mt-0.5 font-medium">
                {partner.subtitle}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
