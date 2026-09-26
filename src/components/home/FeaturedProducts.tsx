import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Star, FileText, Heart, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo, addToEnquiryCart, toggleWishlist, isInWishlist } = useApp();

  const featured = products.slice(0, 6);
  const fallbackImage = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80';

  return (
    <section className="py-16 sm:py-24 bg-[#F0EBE3]/10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="FACTORY DIRECT INDUSTRIAL MACHINERY"
          title="Featured Commercial & Residential Equipment"
          description="Source heavy power rigs, pin-selected stacks, commercial & residential cardio, and urethane free weights directly from verified manufacturers."
          actionText="View Full Equipment Catalog"
          actionHref="#equipment"
          onActionClick={() => navigateTo('equipment')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, idx) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-none bg-[#0D1118] border border-white/10 hover:border-white/20 overflow-hidden flex flex-col justify-between shadow-sm"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/11] bg-[#090C10] overflow-hidden border-b border-white/10 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#A8A090] font-bold uppercase tracking-wide">{product.brand}</span>
                      <div className="flex items-center gap-1 text-[#A8A090] font-bold">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white hover:text-white transition-colors leading-snug line-clamp-1 font-satoshi uppercase">
                      <a
                        href="#equipment"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('equipment');
                        }}
                        className="hover:underline cursor-pointer"
                      >
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1.5 text-xs text-[#A8A090] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* B2B Logistics & RFQ Actions */}
                  <div className="pt-3 border-t border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="flex items-center gap-1 text-[#A8A090] font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> Commercial & Residential Batch Ready
                      </span>
                      <span className="text-[#6B6358]">MOQ: {product.minOrderQty || 1} Unit</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <button
                        onClick={() => addToEnquiryCart(product, 1)}
                        className="w-full py-2.5 px-2 rounded-none bg-[#090C10] hover:bg-[#E8E8E8] hover:text-[#0F1926] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm uppercase cursor-pointer group"
                      >
                        <FileText className="w-3.5 h-3.5 text-white/80 group-hover:text-[#0F1926] transition-colors" />
                        <span>+ Add to RFQ</span>
                      </button>

                      <a
                        href="#equipment"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('equipment');
                        }}
                        className="w-full py-2.5 px-2 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors uppercase text-center cursor-pointer"
                      >
                        <span>Full Specs</span>
                        <ArrowRight className="w-3 h-3 text-[#A8A090]" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
