import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Search, FileCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <Search className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Source & Compare Products',
      description: 'Filter across 12 commercial & residential categories. Compare heavy-gauge steel specs, warranty terms, and manufacturer lead times side-by-side.'
    },
    {
      num: '02',
      icon: <FileCheck className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Lock Bulk Pricing & Quotes',
      description: 'Add items to your cart to trigger volume wholesale discounts or request a custom leasing schedule from our finance team.'
    },
    {
      num: '03',
      icon: <Truck className="w-6 h-6 text-[#A8A090] group-hover:text-white transition-colors" />,
      title: 'Unified Freight & On-Site Assembly',
      description: 'Receive tracking for your liftgate delivery. Optional certified installation technicians assemble and test all equipment on-site.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#1A2018] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="STREAMLINED PROCUREMENT"
          title="How Tanush Fitness Works"
          description="Three simple steps to outfit your gym facility with commercial & residential strength rigs, cardio, and certified staff."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-8 rounded-none bg-[#F0EBE3]/10 border border-white/10 hover:border-white/40 transition-all group shadow-sm hover:"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-none bg-[#1A2018] border border-white/10 flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-[#A8A090] group-hover:text-white transition-colors font-mono">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-black text-[#090C10] font-satoshi uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#7A7268] leading-relaxed font-normal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
