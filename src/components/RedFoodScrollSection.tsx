import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight } from 'lucide-react';

interface RedFoodScrollSectionProps {
  onExploreMenu: () => void;
}

export const RedFoodScrollSection: React.FC<RedFoodScrollSectionProps> = ({ onExploreMenu }) => {
  const floatingFoods = [
    { name: 'Original Recipe Bucket', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=500&q=80' },
    { name: 'Zinger Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
    { name: 'Golden Fries', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80' },
    { name: 'Hot Wings', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <section className="py-28 bg-[#E4002B] text-white relative overflow-hidden perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        <motion.div
          initial={{ opacity: 0, rotateX: 30, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            <span>Cinematic 3D Camera Rotation</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Finger Lickin&apos; Goodness In Every Bite
          </h2>
          <p className="text-white/90 text-base sm:text-lg font-medium">
            Prepared fresh by master cooks using our secret blend of 11 herbs and spices. Taste the legendary crunch today.
          </p>
        </motion.div>

        {/* 3D Rotating & Zooming food cards on scroll */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {floatingFoods.map((food, idx) => (
            <motion.div
              key={food.name}
              initial={{ opacity: 0, rotateY: 45, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: 'easeOut' }}
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: -10 }}
              className="bg-white/10 backdrop-blur-md border border-white/25 rounded-3xl p-4 shadow-2xl flex flex-col items-center space-y-3 group cursor-pointer"
              onClick={onExploreMenu}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-white/30">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <span className="font-black text-sm sm:text-base text-white">{food.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4"
        >
          <button
            onClick={onExploreMenu}
            className="inline-flex items-center gap-3 bg-white text-[#E4002B] hover:bg-zinc-100 px-8 py-4 rounded-2xl font-black text-base shadow-2xl transition transform active:scale-95"
          >
            <span>Explore Full Menu & Order Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
