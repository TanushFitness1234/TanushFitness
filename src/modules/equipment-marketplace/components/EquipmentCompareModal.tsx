import React from 'react';
import { Product } from '../types';
import { useApp } from '../../../context/AppContext';
import { X, FileText, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EquipmentCompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
}

export const EquipmentCompareModal: React.FC<EquipmentCompareModalProps> = ({
  products,
  isOpen,
  onClose,
  onRemoveItem,
}) => {
  const { addToEnquiryCart, setIsEnquiryCartOpen } = useApp();

  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

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

  if (!isOpen || products.length === 0) return null;

  // Extract all unique spec keys across selected products
  const allSpecKeys = Array.from(
    new Set(products.flatMap(p => Object.keys(p.specs || {})))
  );

  return (
    <AnimatePresence>
      <div data-lenis-prevent="true" className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          data-lenis-prevent="true"
          className="bg-[#E8E8E8] text-[#0F1926] rounded-2xl max-w-5xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#2A2A2B]/20 relative my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0F1926] text-[#E8E8E8] hover:bg-[#2A2A2B] hover:scale-105 flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
            title="Close"
            aria-label="Close Comparison Modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase text-[#2A2A2B] font-mono flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5 text-[#0F1926]" />
              <span>EQUIPMENT SPECIFICATION COMPARISON</span>
            </span>
            <h2 className="text-2xl font-black text-[#0F1926] font-satoshi uppercase mt-0.5">
              Side-by-Side Equipment Analysis
            </h2>
            <p className="text-xs text-[#2A2A2B]/80 font-mono">Comparing {products.length} Commercial & Residential Models</p>
          </div>

          {/* Comparison Matrix Table */}
          <div
            onWheel={handleNestedScrollWheel}
            className="overflow-x-auto max-h-[60vh] overflow-y-auto overscroll-contain touch-pan-y light-scrollbar border border-[#0F1926]/15 rounded-xl bg-white"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0F1926]/5 border-b border-[#0F1926]/15">
                  <th className="p-4 text-xs font-mono font-bold uppercase text-[#2A2A2B] w-1/4">
                    Attribute
                  </th>
                  {products.map(p => (
                    <th key={p.id} className="p-4 text-xs font-mono font-bold text-[#0F1926] relative">
                      <button
                        onClick={() => onRemoveItem(p.id)}
                        className="absolute top-2 right-2 text-[#2A2A2B] hover:text-[#0F1926] cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="aspect-square w-20 h-20 rounded-xl overflow-hidden mb-2 border border-[#0F1926]/15 bg-[#0C1015] mx-auto flex items-center justify-center p-2">
                        <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="text-xs font-black text-[#0F1926] font-satoshi uppercase text-center line-clamp-2">
                        {p.name}
                      </div>
                      <div className="text-[10px] font-bold text-[#2A2A2B] uppercase text-center font-mono mt-0.5">
                        {p.brand}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1926]/10 text-xs font-mono">
                {/* Category */}
                <tr>
                  <td className="p-4 font-bold text-[#2A2A2B] bg-[#0F1926]/5">Category</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center font-semibold text-[#0F1926]">
                      {p.category}
                    </td>
                  ))}
                </tr>

                {/* Applications */}
                <tr>
                  <td className="p-4 font-bold text-[#2A2A2B] bg-[#0F1926]/5">Target Application</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {(p.applicationTypes || ['Commercial & Residential Gym']).map((app, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#0F1926]/10 text-[#0F1926] font-bold border border-[#0F1926]/15">
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Minimum Order Quantity */}
                <tr>
                  <td className="p-4 font-bold text-[#2A2A2B] bg-[#0F1926]/5">Minimum Order Qty</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center font-bold text-[#0F1926]">
                      {p.minOrderQty || 1} Unit
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-4 font-bold text-[#2A2A2B] bg-[#0F1926]/5">B2B Rating</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center font-bold text-[#0F1926]">
                      ★ {p.rating} / 5.0 ({p.reviewCount} Reviews)
                    </td>
                  ))}
                </tr>

                {/* Dynamic Specs Rows */}
                {allSpecKeys.map(specKey => (
                  <tr key={specKey}>
                    <td className="p-4 font-bold text-[#2A2A2B] bg-[#0F1926]/5 uppercase text-[11px]">
                      {specKey}
                    </td>
                    {products.map(p => (
                      <td key={p.id} className="p-4 text-center text-[#2A2A2B] font-medium">
                        {p.specs?.[specKey] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Actions Row */}
                <tr className="bg-[#0F1926]/5">
                  <td className="p-4 font-bold text-[#2A2A2B]">Action</td>
                  {products.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      <button
                        onClick={() => {
                          addToEnquiryCart(p, 1);
                          setIsEnquiryCartOpen(true);
                        }}
                        className="btn-dark w-full py-2.5 px-3 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1 shadow-md cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
