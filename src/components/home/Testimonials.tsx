import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TESTIMONIALS } from '../../data/testimonials';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F0EBE3]/10 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="CLIENT SUCCESS STORIES"
          title="What Gym Executives Say"
          description="Read how franchise owners and facility directors leverage Tanush Fitness to cut procurement costs and streamline operations."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-none bg-[#0D1118] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400/90">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400/90" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-[#F0EBE3] border border-white/10 uppercase font-mono">
                    {item.stats}
                  </span>
                </div>

                <Quote className="w-7 h-7 text-white/10" />

                <p className="text-xs sm:text-sm text-[#A8A090] leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-white/10 shrink-0 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white font-satoshi">{item.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-[#A8A090]">{item.title}</div>
                  <div className="text-[11px] text-[#6B6358] font-mono uppercase mt-0.5">{item.gymName} · {item.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
