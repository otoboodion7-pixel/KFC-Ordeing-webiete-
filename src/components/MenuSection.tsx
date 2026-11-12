import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/mockMenu';
import { Flame, Star, Search, Plus } from 'lucide-react';
import { CustomizeModal } from './CustomizeModal';
import { motion } from 'motion/react';

interface MenuSectionProps {
  activeCategory: string;
  onAddToCart: (item: CartItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ activeCategory, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.options?.spiciness || item.options?.sides || item.options?.drinks) {
      setCustomizingItem(item);
    } else {
      const cartItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        item,
        quantity: 1,
        selectedDips: [],
        totalItemPrice: item.price
      };
      onAddToCart(cartItem);
    }
  };

  return (
    <section className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight capitalize text-zinc-900">
              {activeCategory === 'all' ? "The Colonel's Menu" : activeCategory}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Freshly prepared, crispy and juicy fried chicken and meals.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search buckets, burgers, wings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E4002B] transition shadow-inner"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-200">
            <p className="text-lg font-bold text-zinc-600">No items found matching your craving.</p>
            <p className="text-sm text-zinc-400 mt-1">Try searching for another favorite meal.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setCustomizingItem(item)}
                className="group bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-[#E4002B]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-60 bg-zinc-100 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {item.isPopular && (
                    <div className="absolute top-4 left-4 bg-[#E4002B] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-300" />
                      <span>Best Seller</span>
                    </div>
                  )}

                  {item.isSpicy && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-zinc-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <span>🌶️ Spicy</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 font-mono">
                      🔥 {item.calories} kcal
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {item.rating} ({item.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#E4002B] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div>
                      <span className="text-xs text-zinc-400 block font-medium">Price</span>
                      <span className="text-2xl font-black text-zinc-900">${item.price.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className="flex items-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-600/30 transition transform active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <CustomizeModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
