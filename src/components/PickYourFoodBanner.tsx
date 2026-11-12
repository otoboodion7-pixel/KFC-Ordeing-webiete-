import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame, ArrowRight, ShoppingBag } from 'lucide-react';

interface PickYourFoodBannerProps {
  onSelectCategory: (cat: string) => void;
}

export const PickYourFoodBanner: React.FC<PickYourFoodBannerProps> = ({ onSelectCategory }) => {
  const categories = [
    { id: 'buckets', name: 'Buckets & Feasts', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80', desc: 'Family share buckets with 11 secret herbs & spices' },
    { id: 'burgers', name: 'Zinger Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', desc: 'Fiery chicken fillets with crunchy lettuce & mayo' },
    { id: 'sides', name: 'Crispy Fries & Gravy', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', desc: 'Golden seasoned fries and whipped potatoes' }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Welcoming Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#E4002B] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#E4002B]" />
            <span>Pick Your Favorite Meal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            What Are You Craving Today?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-medium">
            Explore our freshly prepared categories, hand-crafted daily to satisfy your hunger instantly.
          </p>
        </motion.div>

        {/* Moving / Falling Smooth Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => {
                onSelectCategory(cat.id);
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-zinc-50 border border-zinc-200 hover:border-[#E4002B] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 bg-zinc-100 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-bold text-lg">{cat.name}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">{cat.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider">Browse Category</span>
                  <div className="w-10 h-10 rounded-xl bg-[#E4002B] text-white flex items-center justify-center group-hover:bg-red-700 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
