import React from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export const ScrollBurgerBanner: React.FC = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-white via-red-50/55 to-white overflow-hidden relative border-y border-zinc-200 perspective-[1200px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, rotateX: 25, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-3 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-[#E4002B] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            <span>Cinematic Camera Angle & 3D Motion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            Hand-Crafted With Passion & Secret Spices
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-medium">
            Every piece of chicken is hand-breaded fresh in-store every single day, guaranteeing that iconic crunch.
          </p>
        </motion.div>

        {/* 3D Rotating & Zooming Camera Angle Centerpiece */}
        <div className="relative py-12 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#E4002B]/10 border-2 border-dashed border-[#E4002B]/30 flex items-center justify-center pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateX: 45, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            whileHover={{ scale: 1.08, rotateY: 10, rotateX: -10 }}
            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#E4002B] shadow-2xl shadow-red-600/40 p-3 flex items-center justify-center overflow-hidden border-4 border-white cursor-pointer"
          >
            <motion.img
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
              alt="KFC Zinger Burger"
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
            <div className="absolute bottom-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-[#E4002B] shadow-lg">
              🌶️ ZINGER SPECIAL
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-zinc-500 text-xs sm:text-sm font-semibold tracking-wide uppercase"
        >
          Finger Lickin&apos; Good • 100% Real Whole Chicken • Freshly Prepared Daily
        </motion.div>

      </div>
    </section>
  );
};
