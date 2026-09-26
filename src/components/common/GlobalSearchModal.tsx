import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { BUSINESS_SERVICES } from '../../data/services';
import { Search, X, Dumbbell, Users, Briefcase, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { products, navigateTo, jobListings } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], jobs: [], services: [] };
    const q = query.toLowerCase();

    const matchingProducts = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchingJobs = jobListings.filter(
      j =>
        j.title.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.gymName.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchingServices = BUSINESS_SERVICES.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q)
    ).slice(0, 4);

    return {
      products: matchingProducts,
      jobs: matchingJobs,
      services: matchingServices,
    };
  }, [query, jobListings]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.products.length + searchResults.jobs.length + searchResults.services.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090C10]/70 backdrop-blur-md flex items-start justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="bg-[#1A2018] rounded-none max-w-2xl w-full shadow-2xl border border-white/10 overflow-hidden relative"
        >
          {/* Header Search Input */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-white/80 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Global search equipment, hiring openings, or business services..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full text-sm font-mono text-white placeholder-[#6B6358] focus:outline-none bg-transparent"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            {!query.trim() ? (
              <div className="py-8 text-center text-xs font-mono text-[#A8A090] space-y-2">
                <p>Type to search across Tanush Fitness B2B ecosystem.</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white/80 text-[10px]">Power Rack</span>
                  <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white/80 text-[10px]">Club Manager</span>
                  <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white/80 text-[10px]">Fitness Trainer</span>
                  <span className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white/80 text-[10px]">3D Interior</span>
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-[#A8A090]">
                No matching results found for "{query}".
              </div>
            ) : (
              <>
                {/* 1. Commercial & Residential Equipment */}
                {searchResults.products.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold uppercase text-white/80 font-mono tracking-wider flex items-center gap-1.5">
                      <Dumbbell className="w-3.5 h-3.5" />
                      <span>Commercial & Residential Equipment ({searchResults.products.length})</span>
                    </div>
                    <div className="divide-y divide-white/10 bg-[#090C10] rounded-none border border-white/10 overflow-hidden">
                      {searchResults.products.map(p => (
                        <a
                          key={p.id}
                          href="#equipment"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo('equipment');
                            onClose();
                          }}
                          className="p-3 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0C1015] border border-white/10 flex items-center justify-center p-1 shrink-0">
                              <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white font-satoshi uppercase">{p.name}</div>
                              <div className="text-[10px] font-mono text-[#A8A090]">{p.brand} • {p.category}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Manpower Openings */}
                {searchResults.jobs.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold uppercase text-white/80 font-mono tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Gym Openings ({searchResults.jobs.length})</span>
                    </div>
                    <div className="divide-y divide-white/10 bg-[#090C10] rounded-none border border-white/10 overflow-hidden">
                      {searchResults.jobs.map(j => (
                        <a
                          key={j.id}
                          href="#manpower"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo('manpower');
                            onClose();
                          }}
                          className="p-3 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-white font-satoshi uppercase">{j.title}</div>
                            <div className="text-[10px] font-mono text-[#A8A090]">{j.gymName} • {j.location}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Business Growth Services */}
                {searchResults.services.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-bold uppercase text-white/80 font-mono tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Business Growth Services ({searchResults.services.length})</span>
                    </div>
                    <div className="divide-y divide-white/10 bg-[#090C10] rounded-none border border-white/10 overflow-hidden">
                      {searchResults.services.map(s => (
                        <a
                          key={s.id}
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo('services');
                            onClose();
                          }}
                          className="p-3 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img src={s.image} alt={s.name} className="w-10 h-10 object-cover rounded-none border border-white/10" />
                            <div>
                              <div className="text-xs font-bold text-white font-satoshi uppercase">{s.name}</div>
                              <div className="text-[10px] font-mono text-[#A8A090]">{s.category}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
