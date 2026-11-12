import React from 'react';
import { Flame, Clock, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';

interface PromotionsProps {
  onAddToCart: (item: any) => void;
}

export const Promotions: React.FC<PromotionsProps> = ({ onAddToCart }) => {
  const promoDeals = [
    {
      id: 'promo-1',
      name: "Colonel's Mega Feast",
      subtitle: "Limited Time Offer",
      description: "12 pieces of crispy chicken, 4 regular fries, 2 large coleslaw, and a 1.5L Pepsi.",
      price: 34.99,
      originalPrice: 44.99,
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
      badge: 'Save $10',
      category: 'buckets'
    },
    {
      id: 'promo-2',
      name: "Zinger Double Deal",
      subtitle: "Wednesday Special",
      description: "Two legendary spicy Zinger burgers with crispy lettuce and pepper mayo.",
      price: 11.99,
      originalPrice: 17.98,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      badge: 'BOGO Offer',
      category: 'burgers'
    },
    {
      id: 'promo-3',
      name: "Midnight Hot Wings Bucket",
      subtitle: "Party Pack",
      description: "20 pieces of fiery hot wings coated in blazing hot seasoning with 3 signature dips.",
      price: 18.99,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
      badge: '20% OFF',
      category: 'chicken'
    }
  ];

  const handleAddPromo = (deal: typeof promoDeals[0]) => {
    const menuItem: MenuItem = {
      id: deal.id,
      name: deal.name,
      category: deal.category as any,
      description: deal.description,
      price: deal.price,
      image: deal.image,
      calories: 1450,
      rating: 4.9,
      reviewsCount: 310
    };

    onAddToCart({
      cartItemId: `${deal.id}-${Date.now()}`,
      item: menuItem,
      quantity: 1,
      selectedDips: [],
      totalItemPrice: deal.price
    });
  };

  return (
    <section className="py-16 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#E4002B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#E4002B]" />
              <span>Seasonal Specials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 mt-2">
              Featured Meal Deals & Promotions
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Handcrafted combinations offering extraordinary value and unbeatable taste.
            </p>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with smooth scale transition */}
              <div className="relative h-56 bg-zinc-100 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-[#E4002B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{deal.badge}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    {deal.subtitle}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#E4002B] transition-colors">
                    {deal.name}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed font-medium">
                    {deal.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-[#E4002B]">${deal.price.toFixed(2)}</span>
                      <span className="text-xs text-zinc-400 line-through font-mono font-bold">${deal.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPromo(deal)}
                    className="flex items-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-red-600/20 transition transform active:scale-95"
                  >
                    <span>Claim Deal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
