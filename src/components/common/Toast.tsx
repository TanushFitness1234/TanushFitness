import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast.visible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#E8E8E8]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#E8E8E8]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#E8E8E8]" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0C1015] text-[#E8E8E8] shadow-2xl border border-[#2A2A2B] font-mono text-xs font-bold"
      >
        {getIcon()}
        <span>{toast.message}</span>
      </motion.div>
    </AnimatePresence>
  );
};
