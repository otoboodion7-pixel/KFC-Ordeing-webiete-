import React from 'react';
import { Flame, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-zinc-900 py-16 lg:py-24 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#E4002B] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-[#E4002B] animate-pulse" />
              <span>Colonel Sanders Original Recipe</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-zinc-900">
              Finger Lickin&apos; <span className="text-[#E4002B]">Good Chicken</span>, Delivered Hot & Fresh.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
              Crispy, juicy, hand-breaded chicken prepared with 11 secret herbs and spices. Order your favorite buckets, burgers, and meals online for fast delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5"
              >
                <span>Order Favorite Meals</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-700 px-6 py-4 rounded-2xl font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>100% Fresh Guaranteed</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <div className="text-2xl font-black text-zinc-900">100%</div>
                <div className="text-xs text-zinc-500 font-medium">Fresh Whole Chicken</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#E4002B]">15 Min</div>
                <div className="text-xs text-zinc-500 font-medium">Lightning Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-black text-zinc-900 flex items-center gap-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs text-zinc-500 font-medium">10k+ Reviews</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Banner with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-red-100 rounded-3xl blur-2xl transform rotate-3"></div>
              <div className="relative bg-white border border-zinc-200 rounded-3xl p-4 shadow-2xl overflow-hidden group">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80"
                  alt="KFC Feast Bucket"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <div className="absolute top-6 right-6 bg-zinc-900/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Best Seller</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-100 shadow-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-zinc-900 text-base">10-Piece Family Feast Bucket</h3>
                      <p className="text-xs text-zinc-500">Includes 2 large sides & 1.5L drink</p>
                    </div>
                    <div className="text-[#E4002B] font-black text-lg">$29.99</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
