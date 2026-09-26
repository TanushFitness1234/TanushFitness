import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ShieldCheck, Percent, CreditCard, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyTanush: React.FC = () => {
  const valueProps = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Verified Commercial & Residential Manufacturers',
      description: '100% of equipment suppliers pass rigorous structural safety and commercial & residential durability audits before listing on our marketplace.'
    },
    {
      icon: <Percent className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Wholesale Tier Pricing',
      description: 'Lock in automated volume discounts up to 35% off MSRP when outfitting complete gym zones or ordering bulk supplement cases.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Flexible Commercial & Residential Leasing',
      description: 'Preserve cash flow with 12 to 60 month equipment leasing lines, tax-deductible Section 179 benefits, and zero down payment options.'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Dedicated Account Executive',
      description: 'Every gym chain receives a personal commercial & residential concierge to coordinate white-glove freight, liftgate offloading, and room-of-choice assembly.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F0EBE3]/10 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="THE TANUSH ADVANTAGE"
          title="Why Leading Gym Owners Choose Us"
          description="Built specifically for B2B fitness buyers who require reliability, wholesale pricing, and verified supplier accountability."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-none bg-[#1A2018] border border-white/10 hover:border-white/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-[#090C10] font-satoshi uppercase leading-snug">
                {item.title}
              </h3>
              <p className="mt-2.5 text-xs text-[#7A7268] leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
