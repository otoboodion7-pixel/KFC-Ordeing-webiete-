import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, ChevronLeft, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdBannerSliderProps {
  onOrderNow: () => void;
}

export const AdBannerSlider: React.FC<AdBannerSliderProps> = ({ onOrderNow }) => {
  const slides = [
    {
      id: 1,
      title: "Finger Lickin' Good",
      subtitle: "The Legendary Original Recipe",
      description: "Hand-breaded with Colonel Sanders' secret blend of 11 herbs and spices, pressure-fried to golden perfection.",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1400&q=80",
      badge: "World Famous Since 1930",
      cta: "Order Bucket Now",
      color: "from-red-950 via-zinc-900 to-black"
    },
    {
      id: 2,
      title: "Zinger Wednesday Specials",
      subtitle: "Fiery, Crunchy & Juicy",
      description: "Double the crunch, double the spice. Grab our bestselling Zinger Burger meal with fries and an icy drink today.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=80",
      badge: "20% OFF with code COLONEL20",
      cta: "Get Zinger Deal",
      color: "from-zinc-950 via-red-950 to-zinc-900"
    },
    {
      id: 3,
      title: "Famous Mashed Potatoes & Gravy",
      subtitle: "The Ultimate Comfort Side",
      description: "Whipped fluffy potatoes smothered in our signature savory brown gravy. The perfect companion to every meal.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1400&q=80",
      badge: "Customer Favorite",
      cta: "Add to Cart",
      color: "from-amber-950 via-zinc-900 to-black"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentIndex];

  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white py-12 lg:py-20 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slider Card */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                src={current.image}
                alt={current.title}
                className="w-full h-[450px] sm:h-[500px] object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl flex flex-col justify-center min-h-[450px] sm:min-h-[500px] space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-[#E4002B] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>{current.badge}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">{current.subtitle}</span>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                    {current.title}
                  </h1>
                </div>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={onOrderNow}
                    className="flex items-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-red-600/40 transition transform active:scale-95"
                  >
                    <span>{current.cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 px-5 py-4 rounded-2xl text-sm font-semibold">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Official KFC Advertising Campaign</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-2xl bg-black/70 hover:bg-black text-white border border-white/10 flex items-center justify-center transition backdrop-blur-md shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#E4002B]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-2xl bg-black/70 hover:bg-black text-white border border-white/10 flex items-center justify-center transition backdrop-blur-md shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
