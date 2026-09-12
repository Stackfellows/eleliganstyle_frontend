'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useUI } from '@/lib/context/UIContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useUI();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto bg-[#FFFFFF] border border-[#ECE7E6] shadow-xl p-4 flex items-center gap-4 text-[#171515] relative"
          >
            {toast.image ? (
              <div className="w-12 h-12 relative bg-[#F8F5F4] flex-shrink-0 overflow-hidden border border-[#ECE7E6]">
                <Image
                  src={toast.image}
                  alt={toast.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#F8E8EA] text-[#C58C97] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 stroke-[2]" />
              </div>
            )}

            <div className="flex-1 pr-4">
              <h5 className="font-serif text-sm font-light text-[#171515]">{toast.title}</h5>
              {toast.message && (
                <p className="text-xs text-[#6E6767] font-sans font-light mt-0.5">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#6E6767] hover:text-[#171515] transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
