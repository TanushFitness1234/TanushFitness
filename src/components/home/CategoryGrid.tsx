import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeader } from '../common/SectionHeader';
import { EQUIPMENT_CATEGORIES } from '../../data/categories';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CategoryGrid: React.FC = () => {
  const { navigateTo, setFilter } = useApp();

  const fallbackImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80';

  return (
    <section className="py-20 sm:py-28 bg-[#1A2018] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="COMMERCIAL & RESIDENTIAL EQUIPMENT CATEGORIES"
          title="Explore Equipment Categories"
          description="Source commercial & residential power racks, precision cardio, urethane weights, functional rigs, rubber flooring, and lockers directly from verified B2B manufacturers."
          actionText="View Full Equipment Catalog"
          actionHref="#equipment"
          onActionClick={() => navigateTo('equipment')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {EQUIPMENT_CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href="#equipment"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={(e) => {
                e.preventDefault();
                setFilter('category', cat.id);
                navigateTo('equipment');
              }}
              className="group relative rounded-none overflow-hidden bg-[#1A2018] border border-white/10 hover:border-[#E8E8E8] transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 text-[#F0EBE3]"
            >
              {/* Top Bright Photo */}
              <div className="relative aspect-[16/10] bg-[#ECE6DB] overflow-hidden border-b border-white/10">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#090C10]/90 text-white font-mono shadow-sm">
                    {cat.itemCount} Items
                  </span>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#0D1118]">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-white transition-colors leading-snug font-satoshi uppercase">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#A8A090] line-clamp-2 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/80 group-hover:text-white uppercase tracking-wider font-mono group-hover:translate-x-1 transition-all">
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
