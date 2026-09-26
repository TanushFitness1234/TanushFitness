import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_CATEGORIES } from '../data/categories';
import { Product } from '../types';
import { EquipmentCompareModal } from '../modules/equipment-marketplace/components/EquipmentCompareModal';
import { SEO } from '../components/common/SEO';
import {
  Sparkles,
  FileText,
  Eye,
  Heart,
  Search,
  Check,
  Dumbbell,
  Send,
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  Download,
  Phone,
  SlidersHorizontal,
  CheckCircle2,
  Zap,
  Activity,
  Award,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarqueeStrip } from '../components/common/MarqueeStrip';

export const EquipmentPage: React.FC = () => {
  const {
    products,
    enquiryCart,
    addToEnquiryCart,
    toggleWishlist,
    isInWishlist,
    setIsEnquiryCartOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeApplication, setActiveApplication] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalQuantity, setModalQuantity] = useState(1);

  const fallbackImage = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80';

  const brandsList = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (activeCategory !== 'all' && p.categoryId !== activeCategory) {
        return false;
      }
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      if (activeApplication !== 'all') {
        const apps = p.applicationTypes || ['Commercial & Residential Gym'];
        if (!apps.includes(activeApplication as any)) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCat) return false;
      }
      return true;
    });
  }, [activeCategory, selectedBrand, activeApplication, searchQuery]);

  React.useEffect(() => {
    if (selectedProduct) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedProduct]);

  const handleNestedScrollWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.currentTarget;
    const isDown = e.deltaY > 0;
    const isUp = e.deltaY < 0;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;
    const isAtTop = target.scrollTop <= 0;

    if ((isDown && isAtBottom) || (isUp && isAtTop)) {
      e.preventDefault();
    }
  };

  const handleOpenDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setModalQuantity(1);
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 commercial machinery models simultaneously.');
        return prev;
      }
      return [...prev, product];
    });
  };

  return (
    <main className="pt-24 pb-20 bg-[#0F1926] min-h-screen text-[#E8E8E8]">
      <SEO
        title="Commercial & Residential Equipment Sanctuary | Tanush Fitness B2B"
        description="Factory direct heavy power racks, plate-loaded selectorized machines, cardio consoles, and urethane free weights. 100% itemized RFQ quotations."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2B] pb-8">
          <div className="space-y-3">
            <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.04em] leading-snug">
              EQUIPMENT SANCTUARY
            </h1>

            <p className="text-sm sm:text-base text-[#D0CFCA] max-w-2xl font-sans leading-relaxed">
              Precision-engineered commercial & residential strength lines, selectorized pin-loaded stacks, and Olympic competition platforms. Add items to your project list for official 18% GST ITC procurement quotes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsEnquiryCartOpen(true)}
              className="btn-primary flex items-center gap-2 text-xs py-3 px-6 shadow-lg cursor-pointer group"
              title="Open Project RFQ Basket"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#0F1926] group-hover:scale-110 transition-transform" />
              <span>Project RFQ Basket</span>
              {enquiryCart.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#0F1926] text-[#E8E8E8] text-[10px] font-mono font-bold">
                  {enquiryCart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            <a
              href="tel:+917383249680"
              className="btn-dark flex items-center gap-2 text-xs py-3 px-6 shadow-lg cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#E8E8E8]" />
              <span>Direct Outfitting Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeStrip theme="white" speed="slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Controls Bar: Search & Category Pills */}
        <div className="space-y-4 border-b border-[#2A2A2B] pb-6">
          {/* Search & Brands Strip */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D0CFCA]" />
              <input
                type="text"
                placeholder="Search power racks, cable crossover, dumbbells..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#0C1015] border border-[#2A2A2B] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#E8E8E8] placeholder-[#D0CFCA] focus:outline-none focus:border-[#E8E8E8] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D0CFCA] hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Application Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#D0CFCA] uppercase mr-1 hidden sm:inline font-bold">Facility:</span>
              {['all', 'Commercial & Residential Gym', 'CrossFit Box', 'Hotel & Resort', 'Corporate Campus'].map((app) => (
                <button
                  key={app}
                  type="button"
                  onClick={() => setActiveApplication(app)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                    activeApplication === app
                      ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                      : 'bg-[#0C1015] text-[#D0CFCA] border border-[#2A2A2B] hover:border-[#D0CFCA] hover:text-white'
                  }`}
                >
                  {app === 'all' ? 'All Spaces' : app}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                  : 'bg-[#0C1015] text-[#D0CFCA] border border-[#2A2A2B] hover:border-[#D0CFCA] hover:text-white'
              }`}
            >
              All Machinery ({products.length})
            </button>
            {EQUIPMENT_CATEGORIES.map((cat) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                      : 'bg-[#0C1015] text-[#D0CFCA] border border-[#2A2A2B] hover:border-[#D0CFCA] hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-60 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid (3 PER ROW) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            const isCompared = compareList.some(p => p.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1.5"
              >
                <div>
                  {/* Visual Image Header */}
                  <div
                    onClick={() => handleOpenDetailModal(product)}
                    className="relative aspect-[16/11] w-full overflow-hidden cursor-pointer bg-[#0C1015] flex items-center justify-center p-4 sm:p-5"
                  >
                    <img
                      src={product.image || fallbackImage}
                      alt={product.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1015]/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-mono text-[#2A2A2B] uppercase tracking-wider font-bold">
                        {product.brand} // {product.category}
                      </div>

                      <h3
                        onClick={() => handleOpenDetailModal(product)}
                        className="font-satoshi text-base sm:text-lg font-bold uppercase text-[#0F1926] tracking-[0.03em] mt-1 group-hover:text-[#2A2A2B] transition cursor-pointer line-clamp-1 leading-snug"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#2A2A2B]/80 font-sans leading-relaxed mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-6 pt-0 space-y-2.5 border-t border-[#0F1926]/10 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      addToEnquiryCart(product, 1);
                      setIsEnquiryCartOpen(true);
                    }}
                    className="btn-dark w-full py-2.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Add to RFQ Project List</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenDetailModal(product)}
                      className="border border-[#0F1926]/20 hover:border-[#0F1926] text-[#0F1926] flex-1 py-1.5 text-[11px] font-mono uppercase font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-white/50"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#0F1926]" />
                      <span>CAD Specs</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleCompare(product)}
                      className={`border flex-1 py-1.5 text-[11px] font-mono uppercase font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        isCompared
                          ? 'border-[#0F1926] bg-[#0F1926] text-white'
                          : 'border-[#0F1926]/20 hover:border-[#0F1926] text-[#0F1926] bg-white/50'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-[#0C1015] rounded-3xl border border-[#2A2A2B]">
            <Dumbbell className="w-12 h-12 text-[#D0CFCA] mx-auto opacity-50" />
            <h3 className="font-satoshi text-xl font-bold uppercase text-[#E8E8E8]">
              No machinery found
            </h3>
            <p className="text-xs text-[#D0CFCA] font-mono max-w-md mx-auto">
              No equipment matching your active filters. Clear search or select another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSelectedBrand('all');
                setActiveApplication('all');
                setSearchQuery('');
              }}
              className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono overscroll-contain"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="bg-[#E8E8E8] text-[#0F1926] rounded-2xl max-w-4xl lg:max-w-5xl w-full p-5 sm:p-7 md:p-8 shadow-2xl border border-[#2A2A2B]/20 relative my-6 sm:my-8 max-h-[92vh] overflow-y-auto overscroll-contain touch-pan-y"
            >
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#0F1926]/15">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#2A2A2B] tracking-wider mb-1 flex items-center gap-2">
                    <span>COMMERCIAL MACHINERY CAD SCHEMATICS</span>
                    <span className="opacity-40">//</span>
                    <span className="font-bold text-[#0F1926]">{selectedProduct.brand}</span>
                    <span className="opacity-40">//</span>
                    <span className="text-[#2A2A2B]/70">{selectedProduct.category}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F1926] font-satoshi uppercase leading-snug">
                    {selectedProduct.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="p-2.5 rounded-full bg-[#0F1926]/10 hover:bg-[#0F1926]/20 text-[#0F1926] transition cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-6">
                {/* Left Column: Images & Badges */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0C1015] border border-[#0F1926]/15 shadow-inner flex items-center justify-center p-4 sm:p-6">
                    <img
                      src={selectedProduct.gallery?.[selectedImage] || selectedProduct.image || fallbackImage}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {selectedProduct.gallery.map((img: string, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer border flex items-center justify-center p-1.5 shrink-0 transition-all ${
                            selectedImage === idx ? 'border-[#0F1926] bg-[#0C1015] shadow-md scale-105' : 'border-[#0F1926]/15 bg-[#0C1015]/60 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="thumbnail" className="max-w-full max-h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights Pill Row */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-[#0F1926]/10 shadow-xs">
                      <div className="text-[#2A2A2B]/70 uppercase font-bold text-[9px]">Certification</div>
                      <div className="text-[#0F1926] font-bold mt-0.5">EN 957 / ASTM Grade</div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-[#0F1926]/10 shadow-xs">
                      <div className="text-[#2A2A2B]/70 uppercase font-bold text-[9px]">Tax Compliance</div>
                      <div className="text-[#0F1926] font-bold mt-0.5">18% GST ITC Eligible</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Descriptions, Technical Specs & Actions */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Scrollable Description Box */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#2A2A2B]/70 mb-1.5 font-mono">
                      Equipment Overview
                    </div>
                    <div
                      data-lenis-prevent="true"
                      onWheel={handleNestedScrollWheel}
                      className="bg-white/90 rounded-xl p-3 sm:p-3.5 border border-[#0F1926]/15 shadow-sm max-h-24 sm:max-h-28 overflow-y-auto overscroll-contain touch-pan-y light-scrollbar text-xs text-[#2A2A2B] font-sans leading-relaxed space-y-1.5"
                    >
                      {selectedProduct.description ? (
                        selectedProduct.description.split(/\\n|\n/).map((para: string, pIdx: number) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para.trim()}
                          </p>
                        ))
                      ) : (
                        <p>Heavy-duty commercial grade machinery engineered for professional gym performance.</p>
                      )}
                    </div>
                  </div>

                  {/* Structured & Scrollable Spec List */}
                  <div className="bg-white rounded-xl border border-[#0F1926]/15 shadow-sm overflow-hidden">
                    <div className="px-3.5 py-2 bg-[#0F1926]/5 border-b border-[#0F1926]/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F1926] font-mono">
                        Specifications
                      </span>
                      <span className="text-[9px] font-mono text-[#2A2A2B]/60 uppercase font-semibold">
                        Commercial Grade
                      </span>
                    </div>
                    <div
                      data-lenis-prevent="true"
                      onWheel={handleNestedScrollWheel}
                      className="divide-y divide-[#0F1926]/10 font-mono text-xs max-h-40 sm:max-h-44 overflow-y-auto overscroll-contain touch-pan-y light-scrollbar"
                    >
                      {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-12 gap-2 px-3.5 py-2 hover:bg-[#0F1926]/[0.02] transition-colors items-start">
                          <span className="col-span-5 text-[#2A2A2B]/70 uppercase text-[10px] font-bold tracking-wider pt-0.5">
                            {key}:
                          </span>
                          <span className="col-span-7 text-[#0F1926] font-bold text-[11px] leading-snug break-words">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Cart Action - Perfectly Fitted & Responsive */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                    <div className="flex items-center justify-between sm:justify-center gap-3 bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 shrink-0 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="text-[#2A2A2B] hover:text-[#0F1926] font-bold text-base px-2 cursor-pointer transition hover:scale-110"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-[#0F1926] px-2 min-w-[1.5rem] text-center">{modalQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="text-[#2A2A2B] hover:text-[#0F1926] font-bold text-base px-2 cursor-pointer transition hover:scale-110"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addToEnquiryCart(selectedProduct, modalQuantity);
                        setSelectedProduct(null);
                        setIsEnquiryCartOpen(true);
                      }}
                      className="btn-dark flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all !whitespace-normal text-center leading-snug rounded-xl"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Add to Outfitting RFQ Project</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <EquipmentCompareModal
          products={compareList}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveItem={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
        />
      )}


    </main>
  );
};
