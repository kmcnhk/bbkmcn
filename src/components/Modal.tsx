import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-950 border border-kmcn-green/30 shadow-[0_0_40px_rgba(0,255,0,0.1)] p-6 sm:p-10 corner-border before:border-kmcn-green after:border-kmcn-green"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-zinc-500 hover:text-kmcn-green transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-8 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-1 bg-kmcn-green" />
                <span className="font-mono text-[10px] text-kmcn-green tracking-[0.3em] uppercase">Course Details</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tighter text-white">{title}</h3>
            </div>
            <div className="text-zinc-400 font-light leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
